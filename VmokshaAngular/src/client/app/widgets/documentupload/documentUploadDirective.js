/*
*Author : 
*Date Created: 
*Description: Angularjs  directive for capturing event after adding file. 
*
Example : <input class="button" type="file" accept='image/*' ng-model="vm.gallery" ng-change="vm.uploadImage()" id="projectFile"
                               multiple file-feed entity="GalleryImage" maxinput="5" filetype="image" maxfilesize="5000" />
*/
'use strict';
angular.module('app.widgets').directive('fileFeed', ['$rootScope',function ($rootScope) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attributes, controller) {
            element.bind("change", function (changeEvent) {
                var files = [];
                var isValidRequest = true;
                //Checking number of files selected is falling within max allowed no. of files
                if (attributes.maxinput && element[0].files.length <= attributes.maxinput) {
                    //Looping through each file
                    for (var i = 0; i < element[0].files.length; i++) {
                        //Checking whether selected file size is falling within max allowed file size
                        if (element[0].files[i].size <= attributes.maxfilesize) {
                            //Checking whether selected file type is similar to the given accepted filetype attribute
                            if (element[0].files[i].type.match(attributes.filetype)) {
                                files.push(element[0].files[i]);
                            }
                            else {
                                isValidRequest = false;
                                $('#' + element[0].id).val('');
                                $rootScope.$emit('fileAdded_Error_' + attributes.entity, 'InvalidFileType', attributes.filetype);
                                break;
                            }
                        }
                        else {
                            isValidRequest = false;
                            $('#' + element[0].id).val('');
                            $rootScope.$emit('fileAdded_Error_' + attributes.entity, 'FileSizeExceed', (attributes.maxfilesize / 1024));
                            break;
                        }                       
                    }
                    if (isValidRequest)
                        $rootScope.$emit('fileAdded_' + attributes.entity, files);
                }
                else {
                    $('#' + element[0].id).val('');
                    $rootScope.$emit('fileAdded_Error_' + attributes.entity, 'MaxLimitReached', attributes.maxinput);
                }
            });
        }
    };
}]);