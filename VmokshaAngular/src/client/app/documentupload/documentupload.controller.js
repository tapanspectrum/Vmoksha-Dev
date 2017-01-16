/* Description: The Document Controller deals with maintaining functionality related to Document -- Adding/Cancelling/Uploading is done here
 * Author:  
 * Created On: 
 * Modified For: Removed unnecessary codes
 * Modified On: 20-10-2016
 * Modified By: Avinash
 * */

(function () {
    'use strict';

    angular
        .module('app.documentupload')
        .controller('Document', Document);


    /* @ngInject */
    function Document($state, routerHelper, logger, common, config, _, $sce, $rootScope, $scope, $timeout, $document, store, $log, toastr, Upload) {
        // Global Variable Declaration
        var vm = this;
        var loggedonuserinfo = store.get('loggedonuser');
        vm.requestIndex = 0;

        //Function to upload files for project module
        $scope.uploadRequest = function (fileArray) {
            if (fileArray.length > 0) {
                _.each(fileArray, function (item) {
                    _.each(item.files, function (singleFile) { 
                        vm.awsS3DocumentUpload(singleFile, item.request);
                    });                   
                });
            }
        }

        //Function to upload Single file
        $scope.uploadSingleRequest = function (resObj, metaData) {
            var file = resObj.files.file[0];
            //Removing all special characters except '.'
            var fileName = resObj.files.file[0].name.replace(/[^A-Z0-9.]+/ig, "_");
            //Forming aws configuration object
            AWS.config.accessKeyId = pph_config.AWS_AccessKeyId;
            AWS.config.secretAccessKey = pph_config.AWS_SecretAccessKey;
            AWS.config.region = pph_config.AWS_BucketRegion;
            var bucket = new AWS.S3({ params: { Bucket: pph_config.ExcelUpload_AWSBucketName } });
            //Forming params object to upload into aws s3 bucket
            var params = { Key: fileName, ContentType: file.type, Body: file, ACL: 'public-read', Metadata: { 'custom-header': JSON.stringify(metaData) } };
            bucket.putObject(params, function (err, data) {
                vm.requestIndex++;
                //If document upload get failed
                if (err) {
                    $rootScope.$broadcast('DocumentUpload_Status', false, vm.requestIndex, "ImportDocument");
                }
                    // document upload done successfully
                else {
                    $rootScope.$broadcast('DocumentUpload_Status', true, vm.requestIndex, "ImportDocument");
                }
            });
                      
        }

        //Function to create storage id
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
               s4() + '-' + s4() + s4() + s4()
        }

        //Function to upload files by calling dot net api
        vm.uploadDocument = function (file, args) {
           var requestParams = { 'request': JSON.stringify(args) };
           var UploadData = Upload.upload({
                url: pph_config.ApiUrl + 'aws/Upload',
                method: 'POST',
                fields: requestParams,
                file: file,
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
           }).success(function (data, status, headers, config) {
                vm.requestIndex++;
                $rootScope.$broadcast('DocumentUpload_Status', data, vm.requestIndex);
                if (data.Success) {
                    //toastr.success('Document Upload Success');
                    $log.info('Success: Document Upload');
                }
                else {
                    //toastr.error('Document Upload Failure');
                    $log.error('Error: Document Upload');
                }
            }).error(function (data, status, headers, config) {
                console.log('file ' + config.file.name + 'upload failed. Response: ' + data);
                $scope.filesadded = [];
            }).progress(function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }

        //Function to upload files by using aws sdk upload method
        vm.awsS3DocumentUpload = function (file, requestParameter) {
            //Removing all special characters except '.'
            var fileName = file.name.replace(/[^A-Z0-9.]+/ig, "_");
            //Forming aws configuration object
            AWS.config.accessKeyId = pph_config.AWS_AccessKeyId;
            AWS.config.secretAccessKey = pph_config.AWS_SecretAccessKey;
            AWS.config.region = pph_config.AWS_BucketRegion;
            var bucket = new AWS.S3({ params: { Bucket: pph_config.AWS_BucketName } });
            //To be unique inside bucket
            var StorageId = guid() + '-' + requestParameter.RequestCode.toLowerCase() ;
            //Forming request parameter for Metadata
            var metaData = {};
            metaData.DocumentTypeCode = requestParameter.DocumentTypeCode;
            metaData.JSON = JSON.stringify({ "AWSFileUrl": pph_config.AWS_Url + pph_config.AWS_BucketName + '/' + StorageId + '/' + fileName });
            metaData.FileName = fileName;
            metaData.RequestType = requestParameter.RequestType;
            metaData.ContentType= file.type;
            metaData.RequestCode = requestParameter.RequestCode;
            metaData.StorageId = StorageId;
            metaData.ApiUrl = pph_config.ApiUrl + "documents";
            //Forming params object to upload into aws s3 bucket
            var params = { Key: StorageId + "/" + fileName, ContentType: file.type, Body: file, ACL: 'public-read', Metadata: { 'custom-header': JSON.stringify(metaData)}};
            bucket.putObject(params, function (err, data) {
                vm.requestIndex++;
                //If document upload get failed
                if (err) {
                    $rootScope.$broadcast('DocumentUpload_Status', false, vm.requestIndex ,data);
                }
                // document upload done successfully
                else {
                    $rootScope.$broadcast('DocumentUpload_Status', true, vm.requestIndex, data);
                }
            });           
        }

        //Function to get aws file by using aws sdk get object method
        vm.awsS3GetDocument = function (requestParameter) {
            var bucketname = "purplehome.server.dev";
            var key = "27cd7dae-5d27-e0c5-c4b2-83be92426822-akvmuhjghyfjhj/2.jpg";
            AWS.config.accessKeyId = pph_config.AWS_AccessKeyId;
            AWS.config.secretAccessKey = pph_config.AWS_SecretAccessKey;
            AWS.config.region = pph_config.AWS_BucketRegion;
            var bucket = new AWS.S3({ params: { Bucket: pph_config.AWS_BucketName } });
            bucket.getObject({ Bucket: bucketname, Key: key }, function (err, data) {
                if (err) {
                    console.log("Error getting object " + key + " from bucket " + bucketname +
                        ". Make sure they exist and your bucket is in the same region as this function.");
                    context.fail("Error getting file: " + err)
                } else {
                    console.log(JSON.stringify(data));
                }
            });
        }
    }
})();
