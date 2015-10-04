/*
 * Copyright (c) 2015 Kazuki Nakajima
 * Released under MIT License
 * http://opensource.org/licenses/mit-license.php
 */

angular.module('canvastk4ng', [])
.service('force', function($http, $q){
    var that = this;

    this.apiVersion = 'v34.0';

    this.setCanvasRequest = function(canvasRequest){
        this.canvasRequest = canvasRequest;
    }

    this.setNamespace = function(namespace){
        this.namespace = namespace;
    }

    this.getInstanceUrl = function(){
        return this.canvasRequest.client.instanceUrl;
    }

    this.getToken = function(){
        return this.canvasRequest.client.oauthToken;
    }

    this.getUserId = function(){
        return this.canvasRequest.context.user.userId;
    }

    this.ajax = function(path, method, responseType){
        var d = $q.defer();

        Sfdc.canvas.client.ajax(
            path,
            {
                client: this.canvasRequest.client,
                method: method || 'GET',
                contentType: 'application/json',
                success: function(data){
                    if (data.statusText == 'OK'){
                        d.resolve(data.payload);
                    } else {
                        d.reject(data.payload);
                    }
                }
            }
        );

        return d.promise;   
    }

    this.apexrest = function(restResource, method, data){
        var d = $q.defer();

        // Delete unnecessary fields
        for (var f in data){
            if (f.substring(f.length - 3, f.length) == '__r'){
                delete data[f];
            }
            if (f == 'attributes'){
                delete data[f];
            }
            if (f == '$$hashKey'){
                delete data[f];
            }
        }

        Sfdc.canvas.client.ajax(
            "/services/proxy",
            {
                client: this.canvasRequest.client,
                method: method || 'GET',
                contentType: 'application/json',
                headers: {
                    "SalesforceProxy-Endpoint" : this.canvasRequest.client.instanceUrl + "/services/apexrest" + encodeURI(restResource),
                    "Authorization" : "OAuth "  + this.canvasRequest.client.oauthToken,
                    "Sforce-Call-Options" : "defaultNamespace=" + this.namespace,
                    "Accept" : "application/json"
                },
                data: JSON.stringify(data),
                success: function(response){
                    if (response.statusText == 'OK'){
                        d.resolve(response.payload);
                    } else {
                        d.reject(response.payload);
                    }
                }
            }
        );

        return d.promise;  
    }

    this.query = function(soql){
        var d = $q.defer();

        var url = '/services/data/v' + this.canvasRequest.context.environment.version.api + '/query?q=' + encodeURI(soql);
        Sfdc.canvas.client.ajax(
            url,
            {
                client: this.canvasRequest.client,
                method: 'GET',
                contentType: 'application/json',
                success: function(data){
                    if (data.status === 200){
                        d.resolve(data.payload.records);
                    } else {
                        d.reject(data.payload);
                    }
                }
            }
        );

        return d.promise;
    }

    this.retrieve = function(objectType, id, fields){
        var d = $q.defer();

        if (fields != null && fields.length > 0){
            var fieldsInCsv = '';
            angular.forEach(fields, function(field, key){
                fieldsInCsv += field + ',';
            })
            fieldInCsv = fieldInCsv.slice(0, fieldInCsv.length - 1);
            fieldsInCsvInUri = fieldsInCsv ? '?fields=' + fieldsInCsv : '';
        } else {
            fieldsInCsvInUri = '';
        }

        var url = '/services/data/v' + this.canvasRequest.context.environment.version.api + '/sobjects/' + objectType + '/' + id + fieldsInCsvInUri;
        Sfdc.canvas.client.ajax(
            url,
            {
                client: this.canvasRequest.client,
                method: 'GET',
                contentType: 'application/json',
                success: function(data){
                    if (data.status === 200){
                        d.resolve(data.payload);
                    } else {
                        d.reject(data.payload);
                    }
                }
            }
        );

        return d.promise;
    }

    this.create = function(objectType, origRecord){
        var d = $q.defer();

        var record = angular.copy(origRecord);

        // Delete unnecessary fields
        for (var f in record){
            if (f.substring(f.length - 3, f.length) == '__r'){
                delete record[f];
            }
            if (f == 'attributes'){
                delete record[f];
            }
            if (f == '$$hashKey'){
                delete record[f];
            }
        }

        this.describe(objectType)
        .then(
            function(desc){
                // Remove fields which are not createable
                angular.forEach(desc.fields, function(f, key){
                    if (!f.createable){
                        delete record[f.name];
                    }
                })

                var url = '/services/data/v' + that.canvasRequest.context.environment.version.api + '/sobjects/' + objectType + '/';
                Sfdc.canvas.client.ajax(
                    url,
                    {
                        client: that.canvasRequest.client,
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(record),
                        success: function(data){
                            if (data.status === 201){
                                d.resolve(data.payload);
                            } else {
                                d.reject(data.payload);
                            }
                        }
                    }
                );
            },
            function(data){
                d.reject(data.payload);
            }
        );

        return d.promise;
    }

    this.update = function(objectType, origRecord){
        var d = $q.defer();

        var record = angular.copy(origRecord);

        // Delete unnecessary fields
        for (var f in record){
            if (f.substring(f.length - 3, f.length) == '__r'){
                delete record[f];
            }
            if (f == 'attributes'){
                delete record[f];
            }
            if (f == '$$hashKey'){
                delete record[f];
            }
        }

        this.describe(objectType)
        .then(
            function(desc){
                // Remove fields which are not updateable
                angular.forEach(desc.fields, function(f, key){
                    if (!f.updateable){
                        delete record[f.name];
                    }
                })
                var url = '/services/data/v' + that.canvasRequest.context.environment.version.api + '/sobjects/' + objectType + '/' + origRecord.Id;
                Sfdc.canvas.client.ajax(
                    url,
                    {
                        client: that.canvasRequest.client,
                        method: 'PATCH',
                        contentType: 'application/json',
                        data: JSON.stringify(record),
                        success: function(data){
                            if (data.status === 204){
                                d.resolve(data.payload);
                            } else {
                                d.reject(data.payload);
                            }
                        }
                    }
                );
            },
            function(data){
                d.reject(payload);
            }
        );

        return d.promise;
    }

    this.upsert = function(objectType, extIdField, extId, origRecord){
        var d = $q.defer();

        var record = angular.copy(origRecord);

        // Delete unnecessary fields
        for (var f in record){
            if (f.substring(f.length - 3, f.length) == '__r'){
                delete record[f];
            }
            if (f == 'attributes'){
                delete record[f];
            }
            if (f == '$$hashKey'){
                delete record[f];
            }
        }

        this.describe(objectType)
        .then(
            function(desc){
                // Remove fields which are not createable or updateable
                angular.forEach(desc.fields, function(f, key){
                    if (!f.createable || !f.updateable){
                        delete record[f.name];
                    }
                })
                var url = '/services/data/v' + that.canvasRequest.context.environment.version.api + '/sobjects/' + objectType + '/' + extIdField + '/' + extId;
                Sfdc.canvas.client.ajax(
                    url,
                    {
                        client: that.canvasRequest.client,
                        method: 'PATCH',
                        contentType: 'application/json',
                        data: JSON.stringify(record),
                        success: function(data){
                            if (data.status === 204){
                                d.resolve(data.payload);
                            } else {
                                d.reject(data.payload);
                            }
                        }
                    }
                );
            },
            function(data){
                d.reject(data.payload);
            }
        );

        return d.promise;
    }

    this.delete = function(objectType, id){
        var d = $q.defer();

        var url = '/services/data/v' + this.canvasRequest.context.environment.version.api + '/sobjects/' + objectType + '/' + id;
        Sfdc.canvas.client.ajax(
            url,
            {
                client: this.canvasRequest.client,
                method: 'DELETE',
                contentType: 'application/json',
                success: function(data){
                    if (data.status === 204){
                        d.resolve();
                    } else {
                        d.reject(data.payload);
                    }
                }
            }
        );

        return d.promise;
    }

    this.describe = function(objectType){
        var d = $q.defer();

        var url = '/services/data/v' + this.canvasRequest.context.environment.version.api + '/sobjects/' + objectType + '/describe/';
        Sfdc.canvas.client.ajax(
            url,
            {
                client: this.canvasRequest.client,
                method: 'GET',
                contentType: 'application/json',
                success: function(data){
                    if (data.status === 200){
                        d.resolve(data.payload);
                    } else {
                        d.reject(data.payload);
                    }
                }
            }
        );

        return d.promise;
    }
});
