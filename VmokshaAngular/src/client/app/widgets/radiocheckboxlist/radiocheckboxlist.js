/*
*Author : 
*Date Created: 
*Description: Angularjs  directive for check box and radio. 
*
*/
'use strict';
angular.module('app.widgets').directive('vmRadioCheckbox', ['$timeout', '$rootScope', '_', 'store', function ($timeout, $rootScope, _, store) {
    return {
        restict: 'E',
        scope: {
            ngSelectModel: '=',     //Defines the type of value
            controlId: '@',         //Defines the unique id
            inputType: '@',         //Defines the input type--'radio' 'checkbox'
            isMultiple: '@',        //Defines multiple for checkbox type-- 'true', 'false'
            buttonAlignment: '@',  //Defines the button allignment-- 'vertical', 'horizontal'
            //sourceUrl: '@',       //Defines the source url to get data
            sourceCollection: '@',  //Defines the data object
            defaultValue: '@',        //Defines the default value-- in case of checkbox, we can pass comma seperated Codes,
            isDisabled : '@'        //Defines if its disabled
        },
        controller: ['$scope', '$http', function ($scope, $http) {
            $scope.items = [];
            //if ($scope.sourceUrl != undefined) {
            //    //set the url
            //    var urlPath = $scope.sourceUrl;
            //    //to get all data from urlPath
            //    return $http({ method: 'GET', url: urlPath }).
            //        success(function (data, status, headers, config) {
            //            //create a variable JSONObj
            //            var JSONObj = {};
            //            JSONObj = typeof data[$scope.sourceObj] == "string" ? JSON.parse(data[$scope.sourceObj]) : data[$scope.sourceObj];
            //            //filter JSONObj to get data with Status = true
            //            var ActiveObj = _.filter(JSONObj, function (item) {
            //                return item.Status == true;
            //            });
            //            //enable/disable ddl on page load - ends
            //            return $scope.items = ActiveObj;

            //        })
            //    //is there any error in retrieving data
            //    error(function (data, status, headers, config) {
            //        console.log("error retrieving " + $scope.masterName + " details");
            //    });
            //}

            if ($scope.sourceCollection) {
                return $scope.items = JSON.parse($scope.sourceCollection);
            }

        }],
        //template for checkbox directive
        templateUrl: $rootScope.vmuisettings.AbsoluteWebUrl + 'app/widgets/radiocheckboxlist/radiocheckboxlist.html',

        link: function ($scope, element, attrs, controller) {
            if ($scope.isDisabled == "true") {
                $timeout(function () {
                    angular.forEach($scope.items, function (item) {
                        angular.element('#checkbox_' + $scope.controlId + '_' + item.Code).attr('disabled', 'disabled');
                        angular.element('#checkbox_' + $scope.controlId + '_' + item.Code).next().addClass('disabled');
                    });
                }, 200);
            }
            else {
                $timeout(function () {
                    angular.forEach($scope.items, function (item) {
                        angular.element('#checkbox_' + $scope.controlId + '_' + item.Code).removeAttr('disabled', 'disabled');
                        angular.element('#checkbox_' + $scope.controlId + '_' + item.Code).next().removeClass('disabled');
                    });
                }, 200);
            }
            //For CheckBox
            if ($scope.inputType == 'checkbox') {
                //$('input:visible:enabled:first').focus();
                //Select the default value on load
                if ($scope.defaultValue) {
                    var defaultcode = $scope.defaultValue.split(',');
                    $scope.ngSelectModel = [];
                    _.each(defaultcode, function (obj) {
                        $timeout(function () {
                            $('#checkbox_' + $scope.controlId + '_' + obj).prop("checked", true);
                            $scope.ngSelectModel.push(obj);
                        }, 200);
                    });
                }
                element.click(function () {
                    $scope.ngSelectModel = [];
                    //if multiple select is diasbled
                    if ($scope.isMultiple != "true" && $scope.isMultiple != undefined) {
                        $scope.ngSelectModel = null;
                        //on change event making the older checked data as false
                        $('input[type="checkbox"][name=' + "'" + $scope.controlId + "'" + ']').on('change', function (e) {
                            if (this.name === $scope.controlId) {
                                //clearing the check box on click of another option
                                $('input[type=checkbox][name=' + "'" + $scope.controlId + "'" + ']:checked').not(this).prop('checked', false);
                                //saving the selected value to the scope variable
                                $scope.ngSelectModel = $("#div_checkbox_" + $scope.controlId + " input[type='checkbox']:checked").val();
                            }
                        });
                    }
                    else {
                        if ($('input[type=checkbox][name=' + "'" + $scope.controlId + "'" + ']:checked').length > 0) {
                            $('input[type=checkbox][name=' + "'" + $scope.controlId + "'" + ']:checked').each(function () {
                                //push the checked data to array
                                $scope.ngSelectModel.push($(this).val());
                                $rootScope.$broadcast($scope.controlId + '_ChangeCheckboxEvent', $scope.ngSelectModel);
                            });
                        }
                        else {
                            $scope.ngSelectModel = null;
                        }


                    }
                });
                $scope.checkboxchange = function (data, datamodel) {
                    if (datamodel) {
                        $rootScope.$broadcast($scope.controlId + '_ChangeCheckboxEvent', data);
                    }
                    else {
                        $rootScope.$broadcast($scope.controlId + '_ChangeCheckboxEvent', null);
                    }
                }
               
            }
            //For Radio button
            else {
                if ($scope.defaultValue) {
                    $timeout(function () {
                        $('#radio_' + $scope.controlId + '_' + $scope.defaultValue).prop("checked", true);
                        $scope.ngSelectModel = $scope.defaultValue;
                    }, 200);

                }
                $scope.selecteditem = function (data) {
                    $scope.ngSelectModel = data.Code;
                    console.log("ngModel : " + $scope.ngSelectModel);
                    $rootScope.$broadcast($scope.controlId + '_ChangeRadioEvent', $scope.ngSelectModel);
                }
                
            }

            //To clear the checkbox value
            $rootScope.$on('clear_checkbox', function (e, i) {
                if (i == $scope.controlId) {
                    $timeout(function () {
                        $scope.ngSelectModel = null;
                        //clearing the check box 
                        $('input[type=checkbox][name=' + "'" + $scope.controlId + "'" + ']:checked').not(this).prop('checked', false);
                    }, 0);
                }
            });

            //To clear the radio value
            $rootScope.$on('clear_radio', function (e, i) {
                if (i == $scope.controlId) {
                    $timeout(function () {
                        $scope.ngSelectModel = null;
                        //clearing the radio box 
                        $('input[type=radio][name=' + "'" + $scope.controlId + "'" + ']:checked').not(this).prop('checked', false);
                    }, 0);
                }
            });
        }
    };
}]);