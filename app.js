/*
 * Copyright (c) 2015 Kazuki Nakajima
 * Released under MIT License
 * http://opensource.org/licenses/mit-license.php
 */

var express = require('express');
var signedRequest = require('salesforce-signed-request');
var Evernote = require('evernote').Evernote;
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var sfSignedReq = require('salesforce-signed-request');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var jsforce = require('jsforce');
var Mecab = new require('mecab-async');

var zocardHostname = "YOUR_APP_NAME.herokuapp.com";
var sfConsumerSecret = "";
var evernoteConsumerKey = "";
var evernoteConsumerSecret = "";
var evernoteOAuthCallbackUrl = "https://" + zocardHostname + "/evernote/oauthCallback";
var evernoteUseSandbox = false;
var mongoSecret = "";
var mongoHostname = "";

var app = express();

var getNoteStore = function(accessToken, noteStoreType){
	var client = new Evernote.Client({token: accessToken, sandbox: evernoteUseSandbox});
	if (noteStoreType == "business"){
		var noteStore = client.getBusinessNoteStore();
	} else {
		var noteStore = client.getNoteStore();
	}
	return noteStore;
}

var getNoteListByNotebook = function(noteStore, notebookGuid, offset, maxNumOfNote, successCb, failCb){
	var filter = new Evernote.NoteFilter();
	filter.notebookGuid = notebookGuid;
	filter.order = Evernote.NoteSortOrder.CREATED;
	filter.ascending = false;

	var spec = new Evernote.NotesMetadataResultSpec();
	spec.includeTitle = true;
	spec.includeCreated = true;
	spec.includeAttributes = true;

	var offset = offset || 0;
	var maxNumOfNote = maxNumOfNote || 20;

	noteStore.findNotesMetadata(filter, offset, maxNumOfNote, spec, function(err, response) {
		if (err != null){
			failCb(err);
			return;
		}
		successCb(response.notes);
	});
}

var getNote = function(noteStore, noteGuid, successCb, failCb){
	noteStore.getNote(noteGuid, true, true, false, false, function(err, response) {
		if (err != null){
			failCb(err);
			return;
		}
		successCb(response);
	});
}

var extractPersonFromNote = function(note){
	var doc = new dom().parseFromString(note.content);
	var person = {};
	person.FullName = xpath.select('//div[@style="x-evernote:contact-info-section"]/div/div/div[2]/p[2]/span[1]/span', doc)[0].firstChild.data;
	
	// Title
	person.Title = xpath.select('//div[@style="x-evernote:contact-info-section"]/div/div/div[2]/p[2]/span[2]/span', doc)[0].firstChild.data;
	if (person.Title == 'x-evernote:contact-title'){
		person.Title = null;
	}
	
	// Company
    person.Company = xpath.select('//div[@style="x-evernote:contact-info-section"]/div/div/div[2]/p[2]/span[3]/span', doc)[0].firstChild.data;

	// Email
	person.Email = xpath.select('//div[@style="x-evernote:email; -evernote-editable:email; word-wrap: break-word;"]/div[2]/a', doc)[0].firstChild.data;
	
	// LastName & FirstName
	if (person.FullName.split(" ").length > 1){
    	person.LastName = person.FullName.split(" ")[1];
    	person.FirstName = person.FullName.split(" ")[0];
    } else {
    	
        if (typeof Mecab != 'undefined'){
        	var mecab = new Mecab();
            response = mecab.wakachiSync(person.FullName);
            if (response.length <= 1){
                person.LastName = person.FullName;
            } else if (response.length == 2){
                person.LastName = response[0];
                person.FirstName = response[1];
            } else if (response.length > 2){
                person.FirstName = "";
                for (i = 1; i < response.length; i++){
                    person.LastName = response[0];
                    person.FirstName = person.FirstName + response[i];
                }
            }
        } else {
            person.LastName = person.FullName
        }
    }

	// Phone
	var phoneList = [];
	var phoneNodeList = xpath.select('//div[@style="x-evernote:phone; -evernote-editable:phone; word-wrap: break-word;"]', doc);
	if (phoneNodeList != null){
		for (i = 0; i < phoneNodeList.length; i++){
			phoneList.push({
				phoneType : xpath.select('//div[@style="x-evernote:phone; -evernote-editable:phone; word-wrap: break-word;"]/div/p/span/span', doc)[i].firstChild.data,
				phoneNumber : xpath.select('//div[@style="x-evernote:phone; -evernote-editable:phone; word-wrap: break-word;"]/span', doc)[i].firstChild.data
			});
		}
	}
    phoneList.forEach(function(phone){
        if (phone.phoneType == "Phone"){
            person.Phone = phone.phoneNumber;
        } else if (phone.phoneType == "Mobile"){
            person.MobilePhone = phone.phoneNumber;
        }
    });

    // Card (business card image data)
    note.resources.forEach(function(resource){
        if (resource.attributes.applicationData != null && resource.attributes.applicationData.keysOnly != null){
            var isCard = false;
            resource.attributes.applicationData.keysOnly.forEach(function(key){
            	if (key == 'businesscard'){
            		isCard = true;
            	}
            });
            if (isCard){
	            person.Card = {
	            	mimeType : resource.mime,
	            	data : new Buffer(resource.data.body).toString('base64')
	        	}
            }
        }
    });

	person.NoteGuid = note.guid;
	return person;
}

var forceHttps = function (req, res, next){
  if (!process.env.PORT) {
    return next();
  };

  if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === "http") {
    res.redirect('https://' + req.headers.host + req.url);
  }else {
    return next();
  }
}

app.all('*', forceHttps);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: mongoSecret,
    store: new MongoStore({ url: 'mongodb://' + mongoHostname + '/zocard' }),
    resave: false,
    saveUninitialized: false
    //cookie: { secure: true }
}));

app.post('/canvas', function(req, res){
	var canvasRequest = sfSignedReq(req.body.signed_request, sfConsumerSecret);
	res.render('pages/canvas', { canvasRequest: canvasRequest });
});

// Evernote OAuth
app.get('/evernote/oauth', function(req, res){
	var client = new Evernote.Client({
		consumerKey: evernoteConsumerKey,
		consumerSecret: evernoteConsumerSecret,
		sandbox: evernoteUseSandbox
	});

	// Save Salesforce Credentials to Session.
	req.session.salesforceUserId = decodeURIComponent(req.query.salesforceUserId);
	req.session.salesforceToken = decodeURIComponent(req.query.salesforceToken);
	req.session.salesforceInstanceUrl = decodeURIComponent(req.query.salesforceInstanceUrl);

	// Get Request Token.
	client.getRequestToken(evernoteOAuthCallbackUrl, function(err, requestToken, requestTokenSecret, results) {
		if (err != null){
			res.render('pages/oauthCallback', { message: "Failed to get Request Token.", salesforceInstanceUrl: req.session.salesforceInstanceUrl });
		}

		// Save Request Token to Session.
		req.session.requestToken = requestToken;
		req.session.requestTokenSecret = requestTokenSecret;

		// Redirect to Authorization Server with Request Token.
		res.redirect(client.getAuthorizeUrl(requestToken));
	});
});

// Evernote OAuth Callback
app.get('/evernote/oauthCallback', function(req, res){
	var client = new Evernote.Client({
		consumerKey: evernoteConsumerKey,
		consumerSecret: evernoteConsumerSecret,
		sandbox: evernoteUseSandbox
	});

	// Retrieve request token from session.
	var requestToken = req.session.requestToken;
	var requestTokenSecret = req.session.requestTokenSecret;
	// Retrieve vefiier from URL.
	var requestVerifier = req.query.oauth_verifier;

	// Get Access Token.
	client.getAccessToken(requestToken, requestTokenSecret, requestVerifier, function(err, accessToken, accessTokenSecret, results) {
		// Since error.data has HTML, we just send this object when error ocurrs.
		if (err != null){
			res.send(error.data);
		}

		var body = {
			config : {
				token__c : accessToken,
				tokenExpiration__c : results.edam_expires
			}
		}

		var conn = new jsforce.Connection({
			instanceUrl : req.session.salesforceInstanceUrl,
			accessToken : req.session.salesforceToken,
			callOptions : {defaultNamespace : "zocard"}
		});

		// Retrieve Custom Setting from Salesforce.
		conn.apex.get("/zocard/zocard/getConfig", function(err, response){
			if (err != null){
				res.render('pages/oauthCallback', { message: "Failed to save connection. - Couldn't get custom setting.", salesforceInstanceUrl: req.session.salesforceInstanceUrl });
			}
			if (response.config.Id != null){
				body.config.Id = response.config.Id;
			}
			// Save token and expiration date to Salesforce Custom Setting.
			conn.apex.post("/zocard/zocard/updateConfig", body, function(err, response){
				if (err != null){
					res.render('pages/oauthCallback', { message: "Failed to save connection. - Couldn't update custom setting.", salesforceInstanceUrl: req.session.salesforceInstanceUrl });
				}
				res.render('pages/oauthCallback', { message: "Connected.", salesforceInstanceUrl: req.session.salesforceInstanceUrl });
			});
		});
	});
});

// Method to retrieve Notebook List
app.get('/api/evernote/notebookList', function(req, res){
	var noteStore = getNoteStore(decodeURIComponent(req.query.evernoteToken), decodeURIComponent(req.query.noteStoreType));
	noteStore.listNotebooks(function(err, notebooks) {
		if (err != null){
			res.status(400).json(err);
		}
		res.json(notebooks);
	});
});

// Method to retrieve Business Card Note List.
app.get('/api/evernote/notebook/:notebookGuid/businessCardNoteList/:numOfNote', function(req, res){
	var noteStore = getNoteStore(decodeURIComponent(req.query.evernoteToken), decodeURIComponent(req.query.noteStoreType));
	var isLast = false;
	var noteOffset = 0;
	var loopThreshold = 4;
	var loopOffset = 0;
	var getUnit = 50;
	var businessCardNoteList = [];
	var notebookGuid = req.params.notebookGuid;
	var numOfNote = req.params.numOfNote;
	
	var repeater = function(isLast){
		if (isLast){
			res.json(businessCardNoteList);
		} else {
			getNoteListByNotebook(noteStore, notebookGuid, noteOffset, getUnit,
				// Success Callback
				function(noteList){
					if (noteList.length < getUnit){
						isLast = true;
					}

					// Exclude non business card notes.
					for (i = 0; i < noteList.length; i++){
						var note = noteList[i];

						if (note.attributes.sourceApplication == "businesscard"){
							businessCardNoteList.push(note);
						}

						// We got expected number of business card notes. So exit loop and return data.
						if (businessCardNoteList.length == numOfNote){
							isLast = true;
							break;
						}
					}

					// If we reaches $loopThreshold, we exit loop and return data even if it's running short of specified number of notes.
					if (loopOffset == loopThreshold - 1){
						isLast = true;
					}

					// If there would be more notes in evernote, we retrieve another units of note.
					noteOffset += getUnit;
					loopOffset += 1;

					repeater(isLast);
				},
				// Fail Callback
				function(err){
					res.status(400).json(err);
				}
			);
		}
	}
	repeater(false);
});

// Method to retrieve Person.
app.get('/api/evernote/note/:noteGuid/person', function(req, res){
	var noteStore = getNoteStore(decodeURIComponent(req.query.evernoteToken), decodeURIComponent(req.query.noteStoreType));
	var noteGuid = req.params.noteGuid;
	getNote(noteStore, noteGuid,
		// Success Callback
		function(note){
			var person = extractPersonFromNote(note)
			res.json(person);
		},
		// Fail Callback
		function(err){
			res.status(400).json(err);
		}
	);
});

// Method to make a note saved.
app.put('/api/evernote/note/:noteGuid', function(req, res){
	var noteStore = getNoteStore(decodeURIComponent(req.query.evernoteToken), decodeURIComponent(req.query.noteStoreType));
	var noteGuid = req.params.noteGuid;
	var noteTitle = req.body.noteTitle;
	var notebookGuid = req.body.savedNotebookGuid;
	
	note = new Evernote.Note();
	note.guid = noteGuid;
	note.title = noteTitle;
	note.notebookGuid = notebookGuid;
	noteStore.updateNote(note, function(err, response){
		if (err != null){
			res.status(400).json(err);
		}
		res.json(response);
	});
});

// Launch HTTP Server
var server = app.listen(process.env.PORT || 3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
