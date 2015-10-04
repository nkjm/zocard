/*
 * Copyright (c) 2015 Kazuki Nakajima
 * Released under MIT License
 * http://opensource.org/licenses/mit-license.php
 */

angular.module('zocard', ['ngAnimate','pascalprecht.translate','canvastk4ng','ui.bootstrap'])
.config(function($translateProvider, LANG) {
    $translateProvider.translations('ja', {
        WORKSPACE:'ワークスペース',
        SETTING:'設定',
        PLEASE_SELECT_UNSAVED_NOTEBOOK: '設定タブでスキャンした名刺が保存されているノートブックを設定してください。',
        PLEASE_SELECT_SAVED_NOTEBOOK: '設定タブで処理済みの名刺を保存するノートブックを設定してください。',
        CREATED_DATE: '作成日',
        LINKED_TO_FOLLOWING_ACCOUNT: '次の取引先に紐付けられました。',
        CHANGE: '変更する',
        NO_CORRESPONDING_ACCOUNT: '該当する取引先がありません。',
        SELECT_FROM_EXISTING_ACCOUNT: '既存の取引先から選択',
        CREATE_NEW_ACCOUNT: '新規取引先を作成',
        SELECT_FROM_OTHER_ACCOUNTS: '他の取引先から選択',
        THERE_ARE_CORRESPONDING_ACCOUNTS_1: 'に該当する取引先が',
        THERE_ARE_CORRESPONDING_ACCOUNTS_2: '件あります。',
        THERE_ARE_CORRESPONDING_ACCOUNTS_3: '',
        THERE_ARE_FOLLOWING_CONTACTS: 'すでに下記の取引先責任者が存在します。',
        ACCOUNT: '取引先',
        FULLNAME: '氏名',
        MAKE_IT_PROCESSED: '保存せず処理済みにする',
        SAVE: '保存',
        CONNECTION_TO_EVERNOTE: 'Evernoteとの接続',
        DISCONNECTED: '接続されていません。',
        CONNECT: '接続',
        CONNECTED: '接続されています。',
        EXPIRATION: '有効期限',
        DISCONNECT: '接続解除',
        USE_EVERNOTE_BUSINESS: 'Evernote Businessのノートを利用する',
        UNSAVED_NOTEBOOK: 'スキャンした名刺が保存されているノートブック',
        SAVED_NOTEBOOK: '処理済みの名刺を保存するノートブック',
        NOT_SELECTED: '選択されていません',
        NUMBER_OF_NOTES_TO_RETRIEVE: '取得するノート数',
        RETRIEVING_NOTEBOOK_LIST: 'ノートブックリストを取得しています...',
        RETRIEVING_BUSINESS_CARD_NOTE_LIST: '名刺ノートのリストを取得しています...',
        RETRIEVING_BUSINESS_CARD_DETAIL: '名刺情報を抽出しています...',
        MAKEING_BUSINESS_CARD_PROCESSED: '名刺ノートを処理済みにしています...',
        LASTNAME: '姓',
        FIRSTNAME: '名',
        EMAIL: 'Email',
        PHONE: '電話',
        MOBILE_PHONE: '携帯',
        OTHER_PHONE: 'その他電話',
        DEPARTMENT: '部署',
        TITLE: '役職',
        CREATING_ACCOUNT: '取引先を作成しています...',
        CREATING_CONTACT: '取引先責任者を作成しています...',
        UPDATING_SETTING: '設定を更新しています...',
        CLOSE: '閉じる',
        LOOKUP_ACCOUNT: '既存の取引先を検索',
        SEARCH: '検索',
        VIEW: '参照',
        ACCOUNT_NAME: '取引先名',
        SELECT: '選択',
        CREATE_NEW_ACCOUNT: '新規取引先を作成',
        NEW_ACCOUNT_NAME: '新規取引先名',
        CANCEL: 'キャンセル',
        CREATE: '作成',
        NARROW_DOWN: '絞り込み',
        LINK_NOTE_TO_ACCOUNT_WITH_E4S: 'Evernote for Salesforceで取引先に名刺をリンクする',
        LINK_NOTE_TO_CONTACT_WITH_E4S: 'Evernote for Salesforceで取引先責任者に名刺をリンクする'
    });
    $translateProvider.translations('en_US', {
        WORKSPACE:'Workspace',
        SETTING:'Setting',
        PLEASE_SELECT_UNSAVED_NOTEBOOK: 'Please select a Notebook where you save scanned business cards at Setting Tab.',
        PLEASE_SELECT_SAVED_NOTEBOOK: 'Please select a Notebook to save processed business cards.',
        CREATED_DATE: 'Created Date',
        LINKED_TO_FOLLOWING_ACCOUNT: 'Linked to the following Account.',
        CHANGE: 'Change',
        NO_CORRESPONDING_ACCOUNT: 'There is no corresponding Account.',
        SELECT_FROM_EXISTING_ACCOUNT: 'Select from existing Accounts',
        CREATE_NEW_ACCOUNT: 'Create New Account',
        SELECT_FROM_OTHER_ACCOUNTS: 'Select from other Acconts',
        THERE_ARE_CORRESPONDING_ACCOUNTS_1: 'You got ',
        THERE_ARE_CORRESPONDING_ACCOUNTS_2: ' Accounts corresponding to "',
        THERE_ARE_CORRESPONDING_ACCOUNTS_3: '".',
        THERE_ARE_FOLLOWING_CONTACTS: 'There already exists following Contacts.',
        ACCOUNT: 'Account',
        FULLNAME: 'Name',
        MAKE_IT_PROCESSED: 'Make this card Processed',
        SAVE: 'Save',
        CONNECTION_TO_EVERNOTE: 'Connection to Evernote',
        DISCONNECTED: 'Disconnected',
        CONNECT: 'Connect',
        CONNECTED: 'Connected',
        EXPIRATION: 'Expiration Date',
        DISCONNECT: 'Disconnect',
        USE_EVERNOTE_BUSINESS: 'Use Notebook of Evernote Business',
        UNSAVED_NOTEBOOK: 'Notebook where you save scanned business cards',
        SAVED_NOTEBOOK: 'Notebook to save processed business cards.',
        NOT_SELECTED: 'Not Selected',
        NUMBER_OF_NOTES_TO_RETRIEVE: 'Number of Notes to retrieve',
        RETRIEVING_NOTEBOOK_LIST: 'Retrieving Notebook list...',
        RETRIEVING_BUSINESS_CARD_NOTE_LIST: 'Retrieving Note list...',
        RETRIEVING_BUSINESS_CARD_DETAIL: 'Extracting Businesscard Info...',
        MAKEING_BUSINESS_CARD_PROCESSED: 'Making Note processed...',
        LASTNAME: 'Lastname',
        FIRSTNAME: 'Firstname',
        EMAIL: 'Email',
        PHONE: 'Phone',
        MOBILE_PHONE: 'Mobile Phone',
        OTHER_PHONE: 'Other Phone',
        DEPARTMENT: 'Department',
        TITLE: 'Title',
        CREATING_ACCOUNT: 'Creating Account...',
        CREATING_CONTACT: 'Creating Contact...',
        UPDATING_SETTING: 'Updating Setting...',
        CLOSE: 'Close',
        LOOKUP_ACCOUNT: 'Lookup Existing Account',
        SEARCH: 'Search',
        VIEW: 'View',
        ACCOUNT_NAME: 'Account Name',
        SELECT: 'Select',
        CREATE_NEW_ACCOUNT: 'Create New Account',
        NEW_ACCOUNT_NAME: 'New Account Name',
        CANCEL: 'Cancel',
        CREATE: 'Create',
        NARROW_DOWN: 'Filter',
        LINK_NOTE_TO_ACCOUNT_WITH_E4S: 'Link Note to Account with Evernote for Salesforce',
        LINK_NOTE_TO_CONTACT_WITH_E4S: 'Link Note to Contact with Evernote for Salesforce'
    });
    $translateProvider.preferredLanguage(LANG);
    $translateProvider.useSanitizeValueStrategy('escaped');
})
.service('helper', function($log, RUNNING_MODE){
    this.log = function(data){
        if (RUNNING_MODE == "develop"){
            $log.log(data);
        }
    }
})
.service('myModal', function($modal){
    this.startInProgress = function(action){
        return $modal.open({
            templateUrl: "template/inProgress.html",
            controller: "inProgressCtl",
            resolve: {
                progress: function(){
                    return {
                        action: action,
                        messageList: [],
                        status: null
                    }
                }
            }
        });
    }
})
.service('evernote', function($http, $q, $log, $translate, myModal, CTL_SERVER_URL){
    var that = this;
    this.ctlServerUrl = CTL_SERVER_URL;
    this.token = null; // Will be set once configuration is retrieved from Salesforce Custom Setting.
    this.unsavedNotebook = null;
    this.savedNotebook = null;
    this.useEvernoteBusiness = null;
    this.maxNumOfNote = null;

    this.callout = function(action, httpVerb, path, body){
        var d = $q.defer();
        // Check if valid evernote token exists. If does not, output alerts.
        if (this.token == null){
            d.reject("Evernote Token does not exist.");
            return d.promise;
        }

        var noteStoreType = "standard";
        if (this.useEvernoteBusiness == true){
            noteStoreType = "business";
        }

        var modalInstance = myModal.startInProgress(action);
        $http({
            method: httpVerb || "GET",
            url: this.ctlServerUrl + path + "?evernoteToken=" + encodeURIComponent(this.token) + "&noteStoreType=" + encodeURIComponent(noteStoreType),
            responseType: 'json',
            data: body
        })
        .success(function(data, status, headers, config){
            modalInstance.close();
            d.resolve(data);
        })
        .error(function(data, status, headers, config){
            modalInstance.close();
            d.reject(data);
        });
        return d.promise;
    }

    this.getNotebookList = function(){
        var action = $translate.instant("RETRIEVING_NOTEBOOK_LIST");
        var path = "/api/evernote/notebookList";
        return this.callout(action, "GET", path, null);
    }

    this.getBusinessCardNoteList = function(notebookGuid){
        var action = $translate.instant("RETRIEVING_BUSINESS_CARD_NOTE_LIST");
        var path = "/api/evernote/notebook/" + encodeURIComponent(notebookGuid) + "/businessCardNoteList/" + encodeURIComponent(this.maxNumOfNote);
        return this.callout(action, "GET", path, null);
    }

    this.getPerson = function(noteGuid){
        var action = $translate.instant("RETRIEVING_BUSINESS_CARD_DETAIL");
        var path = "/api/evernote/note/" + encodeURIComponent(noteGuid) + "/person";
        return this.callout(action, "GET", path, null);
    }

    this.makeNoteSaved = function(noteGuid, noteTitle){
        var action = $translate.instant("MAKEING_BUSINESS_CARD_PROCESSED");
        var path = "/api/evernote/note/" + encodeURIComponent(noteGuid);
        var body = {
            noteTitle : noteTitle,
            savedNotebookGuid : this.savedNotebook.guid
        }
        return this.callout(action, "PUT",  path, body);
    }
})
.service('personDb', function($http, $q, $log, force, CANVAS_REQUEST, SALESFORCE_NAMESPACE, helper){
    force.setCanvasRequest(CANVAS_REQUEST);
    force.setNamespace(SALESFORCE_NAMESPACE);

    this.searchCompany = function(companyName){
        var searchKey = companyName.replace("会社", "").replace("株式", "").replace("有限", "").replace("合資", "").replace("(", "").replace(")", "").replace("（", "").replace("）", "").replace("株", "").replace("　", "").trim();
        var query = "select Id, Name, CreatedDate from Account where Name like '%" + searchKey + "%'";
        return force.query(query);
    }

    this.searchPerson = function(personEmail){
        var searchKey = personEmail.trim();
        var query = "select Id, Name, CreatedDate, Account.Id, Account.Name from Contact where Email = '" + searchKey + "'";
        return force.query(query);
    }

    this.createCompany = function(companyName){
        var account = {
            Name: companyName
        };
        return force.create("Account", account);
    }

    this.createPerson = function(person){
        var contact = {
            AccountId: person.AccountId,
            LastName: person.LastName,
            FirstName: person.FirstName,
            Email: person.Email,
            Phone: person.Phone,
            MobilePhone: person.MobilePhone,
            OtherPhone: person.OtherPhone,
            Department: person.Department,
            Title: person.Title
        }
        return force.create("Contact", contact);
    }

    this.getUserId = function(){
        return force.getUserId();
    }

    this.getToken = function(){
        return force.getToken();
    }

    this.getInstanceUrl = function(){
        return force.getInstanceUrl();
    }
})
.service('evernoteForSalesforce', function($http, $q, $log, force){
    this.createEvernoteNote = function(noteGuid, noteTitle){
        var evernoteNote = {
            Evernote__Evernote_NoteId__c: noteGuid,
            Evernote__Note_Title__c: noteTitle
        }
        return force.create("Evernote__Evernote_Note__c", evernoteNote);
    }

    this.createAccountNote = function(accountId, noteId){
        var accountNote = {
            Evernote__AccountId__c: accountId,
            Evernote__NoteId__c: noteId
        }
        return force.create("Evernote__Account_Note__c", accountNote);
    }

    this.createContactNote = function(contactId, noteId){
        var contactNote = {
            Evernote__ContactId__c: contactId,
            Evernote__NoteId__c: noteId
        }
        return force.create("Evernote__Contact_Note__c", contactNote);
    }
})
.service('zocardConfig', function($http, $q, $log, force){
    this.getConfig = function(){
        return force.apexrest('/zocard/zocard/getConfig', 'GET', null);
    }

    this.updateConfig = function(config){
        return force.apexrest('/zocard/zocard/updateConfig', 'POST', config);
    }

    this.deleteEvernoteToken = function(){
        return force.apexrest('/zocard/zocard/deleteEvernoteToken', 'DELETE', null);
    }
})
.controller('rootCtl', function($scope, LANG, personDb){
    $scope.root = {
        ui: null,
        lang: LANG,
        salesforce: {
            userId: personDb.getUserId(),
            token: personDb.getToken(),
            instanceUrl: personDb.getInstanceUrl(),
            getEncodedUserId: function(){
                return encodeURIComponent(this.userId);
            },
            getEncodedToken: function(){
                return encodeURIComponent(this.token);
            },
            getEncodedInstanceUrl: function(){
                return encodeURIComponent(this.instanceUrl);
            }
        },
        refresh: false
    }
})
.controller('workspaceCtl', function($scope, $q, $log, $modal, $translate, myModal, helper, evernote, personDb, evernoteForSalesforce){
    $scope.noteList = [];
    $scope.selectedNote = null;
    $scope.person;
    $scope.evernote = evernote;
    $scope.alertList = [];

    $scope.personFieldList = [
        {name:"LastName", label:$translate.instant("LASTNAME"), type:"text"},
        {name:"FirstName", label:$translate.instant("FIRSTNAME"), type:"text"},
        {name:"Email", label:$translate.instant("EMAIL"), type:"email"},
        {name:"Phone", label:$translate.instant("PHONE"), type:"tel"},
        {name:"MobilePhone", label:$translate.instant("MOBILE_PHONE"), type:"tel"},
        {name:"OtherPhone", label:$translate.instant("OTHER_PHONE"), type:"tel"},
        {name:"Department", label:$translate.instant("DEPARTMENT"), type:"text"},
        {name:"Title", label:$translate.instant("TITLE"), type:"text"}
    ];

    $scope.checkPersonFieldValue = function(fieldName, fieldValue){
        if (fieldName == 'Email'){
            $scope.setCorrespondingPersonByEmail(fieldValue);
        }
    }

    $scope.selectNote = function(note){
        $scope.selectedNote = note;
        evernote.getPerson(note.guid)
        .then(
            function(response){
                helper.log(response);
                $scope.person = response;
            },
            function(response){
                $log.error(response);
            }
        );
    }

    $scope.setAccount = function(candidateCompany){
        $scope.person.AccountId = candidateCompany.Id;
        $scope.person.AccountName = candidateCompany.Name;
    }

    $scope.openContactExistAlert = function(candidatePersonList){
        var modalInstance = $modal.open({
            templateUrl: "template/contactExistAlert.html",
            controller: "contactExistAlertCtl",
            resolve: {
                candidatePersonList: function(){
                    return candidatePersonList;
                },
                salesforceInstanceUrl: function(){
                    return $scope.root.salesforce.instanceUrl;
                }
            }
        });
    }

    $scope.openNewAccountForm = function(accountName){
        var modalInstance = $modal.open({
            templateUrl: "template/newAccountForm.html",
            controller: "newAccountFormCtl",
            resolve: {
                accountName: function(){
                    return accountName;
                }
            }
        });

        modalInstance.result.then(
            function(form){
                var modalInstance = myModal.startInProgress($translate.instant("CREATING_ACCOUNT"));
                personDb.createCompany(form.accountName)
                .then(
                    function(response){
                        helper.log(response);
                        modalInstance.close();
                        $scope.person.AccountId = response.id;
                        $scope.person.AccountName = form.accountName;
                    },
                    function(response){
                        modalInstance.addError(response);
                        $log.error(response);
                    }
                );
            }
        );
    }

    $scope.openLookupAccount = function(accountName){
        var modalInstance = $modal.open({
            templateUrl: "template/lookupAccount.html",
            controller: "lookupAccountCtl"
        });

        modalInstance.result.then(
            function(candidateAccount){
                helper.log(candidateAccount);
                $scope.person.AccountId = candidateAccount.Id;
                $scope.person.AccountName = candidateAccount.Name;
            }
        );
    }

    $scope.openCardImage = function(person){
        var modalInstance = $modal.open({
            templateUrl: "template/cardImage.html",
            controller: "cardImageCtl",
            resolve: {
                card: function(){
                    return person.Card;
                }
            }
        });
    }

    $scope.makeNoteSaved = function(noteGuid, noteTitle){
        evernote.makeNoteSaved(noteGuid, noteTitle)
        .then(
            function(response){
                helper.log(response);
                angular.forEach($scope.noteList, function(note, key){
                    if (note.guid == noteGuid){
                        $scope.noteList.splice(key, 1);
                    }
                });
                $scope.selectedNote = null;
                $scope.person = null;
            },
            function(response){
                $log.error(response);
            }
        );
    }

    $scope.linkNoteToAccountWithE4S = function(note, accountId){
        evernoteForSalesforce.createEvernoteNote(note.guid, note.title)
        .then(
            function(response){
                helper.log(response);
                return evernoteForSalesforce.createAccountNote(accountId, response.id);
            },
            function(response){
                return $q.reject(response);
            }
        )
        .then(
            function(response){
                helper.log(response);
            },
            function(response){
                $log.error(response);
            }
        )
    }

    $scope.linkNoteToContactWithE4S = function(note, contactId){
        evernoteForSalesforce.createEvernoteNote(note.guid, note.title)
        .then(
            function(response){
                helper.log(response);
                return evernoteForSalesforce.createContactNote(contactId, response.id);
            },
            function(response){
                return $q.reject(response);
            }
        )
        .then(
            function(response){
                helper.log(response);
            },
            function(response){
                $log.error(response);
            }
        )
    }

    $scope.savePerson = function(person, note){
        var modalInstance = myModal.startInProgress($translate.instant("CREATING_CONTACT"));
        personDb.createPerson(person)
        .then(
            function(response){
                helper.log(response);
                modalInstance.close();
                $scope.makeNoteSaved(note.guid, note.title);
                if (evernote.linkNoteToAccountWithE4S && person.AccountId != null){
                    $scope.linkNoteToAccountWithE4S(note, person.AccountId);
                }
                if (evernote.linkNoteToContactWithE4S && response.id != null){
                    $scope.linkNoteToContactWithE4S(note, response.id);
                }
            },
            function(response){
                modalInstance.addError(response);
                $log.error(response);
            }
        );
    }

    $scope.setCorrespondingPersonByEmail = function(email){
        $scope.candidatePersonList = [];
        if (email == null || email.trim() == ""){
            return;
        }

        personDb.searchPerson(email)
        .then(
            function(response){
                helper.log(response);
                $scope.candidatePersonList = response;
            },
            function(response){
                $log.error(response);
            }
        );
    }

    $scope.setCorrespondingCompanyByName = function(company){
        $scope.candidateCompanyList = [];
        if (company == null || company.trim() == ""){
            return;
        }

        personDb.searchCompany(company)
        .then(
            function(response){
                helper.log(response);
                $scope.candidateCompanyList = response;
                if (response.length == 1){
                    // We set this Account to person.Company.
                    $scope.person.AccountId = response[0].Id;
                    $scope.person.AccountName = response[0].Name;
                }
            },
            function(response){
                $log.error(response);
            }
        );
    }

    $scope.setBusinessCardNoteList = function(noteGuid){
        $scope.person = null;
        $scope.selectedNote = null;

        evernote.getBusinessCardNoteList(noteGuid)
        .then(
            function(response){
                helper.log(response);
                $scope.noteList = response;
            },
            function(response){
                $log.error(response);
            }
        );
    }

    $scope.$watch("root.refresh", function(newValue, oldValue){
        if ($scope.evernote.token != null){
            if ($scope.evernote.unsavedNotebook == null){
                var noteGuid = null;
            } else {
                var noteGuid = $scope.evernote.unsavedNotebook.guid;
            }
            $scope.setBusinessCardNoteList(noteGuid);
        }
    });

    $scope.$watch("evernote.unsavedNotebook.guid", function(newValue, oldValue){
        if (newValue == null){
            $scope.noteList = [];
            $scope.selectedNote = null;
            $scope.person = null;
            return;
        }
        if (newValue != oldValue && $scope.evernote.token != null){
            $scope.setBusinessCardNoteList(newValue);
        }
    });

    $scope.$watch("person.NoteGuid", function(newValue, oldValue){
        if (newValue != oldValue){
            if ($scope.person == null){
                return;
            }

            // Search for corresponding Account.
            $scope.setCorrespondingCompanyByName($scope.person.Company);

            // Search for corresponding Contact.
            $scope.setCorrespondingPersonByEmail($scope.person.Email);
        }
    });

    $scope.$watch("noteList.length", function(newValue, oldValue){
        if (newValue != oldValue && newValue != null && newValue != 0){
            $scope.selectNote($scope.noteList[0]);
        }
    });

    $scope.$watch("candidatePersonList", function(newValue, oldValue){
        if (newValue != oldValue && newValue != null && newValue.length > 0){
            $scope.openContactExistAlert(newValue);
        }
    })
})
.controller('configCtl', function($scope, $modal, $log, $translate, myModal, helper, evernote, personDb, zocardConfig){
    $scope.evernote = evernote;
    $scope.defaultMaxNumOfNote = 20;

    zocardConfig.getConfig()
    .then(
        function(response){
            helper.log(response);
            $scope.evernote.unsavedNotebook = {
                guid: response.config.unsavedNotebookGuid__c,
                name: response.config.unsavedNotebookName__c
            };
            $scope.evernote.savedNotebook = {
                guid: response.config.savedNotebookGuid__c,
                name: response.config.savedNotebookName__c
            };
            $scope.evernote.useEvernoteBusiness = response.config.useEvernoteBusiness__c || false;
            $scope.evernote.linkNoteToAccountWithE4S = response.config.linkNoteToAccountWithE4S__c || false;
            $scope.evernote.linkNoteToContactWithE4S = response.config.linkNoteToContactWithE4S__c || false;
            $scope.evernote.maxNumOfNote = response.config.maxNumOfNote__c || $scope.defaultMaxNumOfNote;
            $scope.evernote.isE4SInstalled = response.isE4SInstalled || false;

            // If token is expired, we don't set token.
            var now = new Date().getTime();
            if (response.config.tokenExpiration__c != null && response.config.tokenExpiration__c > now){
                $scope.evernote.token = response.config.token__c;
                $scope.evernote.tokenExpiration = response.config.tokenExpiration__c;
            }

            $scope.evernote.configId = response.config.Id || null;
        },
        function(response){
            $log.error(response);
        }
    );

    $scope.updateConfig = function(evernote){
        var modalInstance = myModal.startInProgress($translate.instant("UPDATING_SETTING"));
        var config = {
            config : {
                useEvernoteBusiness__c: evernote.useEvernoteBusiness,
                linkNoteToAccountWithE4S__c: evernote.linkNoteToAccountWithE4S,
                linkNoteToContactWithE4S__c: evernote.linkNoteToContactWithE4S,
                maxNumOfNote__c: evernote.maxNumOfNote
            }
        };
        if (evernote.unsavedNotebook != null){
            config.config.unsavedNotebookName__c = evernote.unsavedNotebook.name;
            config.config.unsavedNotebookGuid__c = evernote.unsavedNotebook.guid;
        }
        if (evernote.savedNotebook != null){
            config.config.savedNotebookName__c = evernote.savedNotebook.name;
            config.config.savedNotebookGuid__c = evernote.savedNotebook.guid;
        }
        if (evernote.configId != null){
            config.config.Id = evernote.configId;
        }
        zocardConfig.updateConfig(config)
        .then(
            function(response){
                helper.log(response);
                $scope.root.refresh = !$scope.root.refresh;
                modalInstance.close();
            },
            function(response){
                modalInstance.addError(response);
                $log.error(response);
            }
        );
    }

    $scope.deleteEvernoteToken = function(){
        $scope.evernote.token = null;
        $scope.evernote.tokenExpiration = null;
        $scope.evernote.unsavedNotebook = null;
        $scope.evernote.savedNotebook = null;
        zocardConfig.deleteEvernoteToken()
        .then(
            function(response){
                helper.log(response);
            },
            function(response){
                $log.error(response);
            }
        );
    }

    $scope.openNotebookList = function(targetNotebook){
        var modalInstance = $modal.open({
            templateUrl: "template/notebookList.html",
            controller: "notebookListCtl"
        });

        modalInstance.result.then(
            function(notebook){
                $scope.evernote[targetNotebook] = notebook;
            }
        );
    }
})
.controller('notebookListCtl', function($scope, $modalInstance, $log, helper, evernote){
    $scope.notebookList = [];
    evernote.getNotebookList()
    .then(
        function(response){
            helper.log(response);
            $scope.notebookList = response;
        },
        function(response){
            $log.error(response);
        }
    );
})
.controller('cardImageCtl', function($scope, $modalInstance, card){
    $scope.card = card;
})
.controller('inProgressCtl', function($scope, $modalInstance, progress){
    $scope.progress = progress;

    $modalInstance.addError = function(message){
        $scope.progress.status = 'error';
        $scope.progress.messageList.push(message);
    }
})
.controller('lookupAccountCtl', function($scope, $modalInstance, $log, $translate, helper, personDb){
    $scope.lookupAccount = function(searchKey){
        $scope.alertList = [];
        personDb.searchCompany(searchKey)
        .then(
            function(response){
                if (response.length == 0){
                    $scope.alertList.push({message:$translate.instant("NO_CORRESPONDING_ACCOUNT")});
                    return;
                }
                $scope.candidateAccountList = response;
            },
            function(response){
                $log.error(response);
            }
        );
    }
})
.controller('newAccountFormCtl', function($scope, $modalInstance, $log, accountName){
    $scope.form = {
        accountName: accountName
    }
})
.controller('contactExistAlertCtl', function($scope, $modalInstance, $log, candidatePersonList, salesforceInstanceUrl){
    $scope.candidatePersonList = candidatePersonList;
    $scope.salesforceInstanceUrl = salesforceInstanceUrl;
})
.animation(".note-list-item", [function(){
    return {
        leave: function(element, doneFn){
            jQuery(element).fadeOut(1000, doneFn);
        }
    }
}]);
