/* Description: The ServerSidePagination Service deals with calling pagination apis for elastic search.
 * Author:  Ranjan
 * Created On: 16/11/2016
 * Modified For: 
 * Modified On: 
 * Modified By:
 * */

'use strict';
angular
    .module('app.core')
    .factory('PaginationElasticSearchService', ['$http', '$q', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$rootScope', 'vmuisettings', function ($http, $q, DTOptionsBuilder, DTColumnDefBuilder, $rootScope, vmuisettings) {
    var paginationServiceParams = { 
        ssp_pages: [],
        paging: {
            ssp_info: {
                totalItems: 0,
                totalPages: 1,
                currentPage: 1,
                page: 1,
                limit: 10,
                from: 0,
                where_condition: "",
                skippedcount:0,
                currentUrl:"",
                httpMethod:'GET',
                loadMoreOption:false,
                infinteScrollOption:false,
            }
        },
        tableParams: {
            dtOptions: [],
            dtColumnDefs: []
        }
    };

    var consolidatedData = [];


    return {
        initializeTable: function (dtOptions, dtcolumndefs, limit, loadMoreOption, infinteScrollOption) {
            //If page limit is not undefined, then replace paginationServiceParams.paging.ssp_info.limit to given limit value
            (limit) ? (paginationServiceParams.paging.ssp_info.limit = limit) : "" ;
            (loadMoreOption) ? (paginationServiceParams.paging.ssp_info.loadMoreOption = loadMoreOption) : "" ;
            (infinteScrollOption) ? (paginationServiceParams.paging.ssp_info.infinteScrollOption = infinteScrollOption) : "" ;
            consolidatedData = [];//Added by avinash
                paginationServiceParams.tableParams.dtOptions = DTOptionsBuilder.newOptions().withOption('responsive', true)

         .withOption('bDestroy', true).withBootstrap().withDisplayLength(paginationServiceParams.paging.ssp_info.limit).withDOM('<"H"<>r><"table-scrollable"t><>').withBootstrapOptions({
             TableTools: {
                 classes: {
                     container: 'btn-group',
                     buttons: {
                         normal: 'btn btn-danger'
                     }
                 }
             }
         });
               
            var sortableColumns = [];
            var columnNos = angular.element(angular.element('#' + dtOptions.TableName)[0]).find('thead').find('tr').children().length;
            for (var i = 0; i < columnNos; i++) {
                if (dtcolumndefs.length > 0) {
                    if (dtcolumndefs.indexOf(i) == -1) {
                        sortableColumns.push(DTColumnDefBuilder.newColumnDef(i).notSortable());
                    }
                }
                else {
                    sortableColumns.push(DTColumnDefBuilder.newColumnDef(i).notSortable());
                }
            }
            if (columnNos == 0 && dtOptions.notsortableColumns) {
                var initialsort = [];
                for (var i = 0; i < dtOptions.notsortableColumns.length; i++) {
                    initialsort.push(DTColumnDefBuilder.newColumnDef(dtOptions.notsortableColumns[i]).notSortable());
                }
                paginationServiceParams.tableParams.dtColumnDefs = initialsort;
            }
            else {
                paginationServiceParams.tableParams.dtColumnDefs = sortableColumns;
            }

        },
        attachServerSidePagination: function (params) { 
        	this.clear();
            paginationServiceParams.paging.ssp_info.httpMethod= params.httpMethod==undefined? paginationServiceParams.paging.ssp_info.httpMethod:params.httpMethod;            
            
            
            if (params.data) {
                //var request= {};
                paginationServiceParams.paging.ssp_info.where_condition = params.data;
            }
            else {
                paginationServiceParams.paging.ssp_info.where_condition = '';
            }
            if (params.entity) {
                paginationServiceParams.paging.ssp_info.entity = params.entity;
            }
            else {
                paginationServiceParams.paging.ssp_info.entity = null;
            }
            this.navigate(1, params.Url,params.paginationServiceParams);
        },
        navigate: function (pageNumber, serversideUrl,params) { 
            var dfd = $q.defer();

            if (pageNumber > paginationServiceParams.paging.ssp_info.totalPages) {
                return dfd.reject({ error: "page number out of range" });
            }

            if (paginationServiceParams.ssp_pages[pageNumber]) {
                //When result is already loaded, publish pagination grid click event
                $rootScope.$emit('ElasticSearchpaginationGrid_Click_' + paginationServiceParams.paging.ssp_info.entity);
                paginationServiceParams.paging.ssp_info.currentPage = pageNumber;
                dfd.resolve();
            } else {
                return this.load(pageNumber, serversideUrl,params);
            }

            return dfd.promise;
        },
        load: function (pageNumber, serversideUrl, params) {
            $rootScope.$broadcast('elasticsearchpagination_AddLoadingProgress_' + paginationServiceParams.paging.ssp_info.entity, null);
            if (pageNumber == 1) {
                paginationServiceParams.paging.ssp_info.where_condition.from = (paginationServiceParams.paging.ssp_info.from).toString();
            }
            else {
                paginationServiceParams.paging.ssp_info.where_condition.from = ((pageNumber * paginationServiceParams.paging.ssp_info.limit) - paginationServiceParams.paging.ssp_info.limit).toString();
            }
            var deferred = $q.defer(); //promise
            $http({
                method: "POST",
                url: "https://search-purplehomes-lnxqlrs65vmcnafn4fhp536koi.ap-southeast-1.es.amazonaws.com/" + serversideUrl,
                data: paginationServiceParams.paging.ssp_info.where_condition,
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                    
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

            return deferred.promise.then(
                        function (result) { 
                            var newPage = { 
                                number: paginationServiceParams.paging.ssp_info.limit,
                                result: []
                            };
                            paginationServiceParams.ssp_pages[pageNumber] = newPage;
                            paginationServiceParams.paging.ssp_info.currentPage = pageNumber;
                            paginationServiceParams.paging.ssp_info.totalPages = ((result.hits.total % paginationServiceParams.paging.ssp_info.limit) == 0) ? parseInt(result.hits.total / paginationServiceParams.paging.ssp_info.limit) : (parseInt(result.hits.total / paginationServiceParams.paging.ssp_info.limit) + 1);
                            paginationServiceParams.paging.ssp_info.totalItems = result.hits.total;
                            paginationServiceParams.paging.ssp_info.currentUrl = serversideUrl;
                            if (result.hits.hits.length > 0) {
                                var ElasticSearchRecords = [];
                                result.hits.hits.forEach(function (data) {
                                    var item = data["_source"];
                                    ElasticSearchRecords.push(item);
                                });
                                result.Records = ElasticSearchRecords;

                                /*Added by Venkatesh, for load more feature*/
                                if(paginationServiceParams.paging.ssp_info.loadMoreOption==true || paginationServiceParams.paging.ssp_info.infinteScrollOption==true)
                                {
                                    consolidatedData = consolidatedData.concat(result.Records);
                                    result.Records = consolidatedData;
                                }
                                /*End of load more feature*/
	                                                        
                                if (result.Records != null) {
                                    result.Records.forEach(function (data) {
                                    newPage.result.push(data);
                                });}
                               
                                $rootScope.$emit('elasticsearchpagination_Result_' + paginationServiceParams.paging.ssp_info.entity, paginationServiceParams.paging.ssp_info);
                            }
                            else {
                                $rootScope.$emit('elasticsearchpagination_Result_Error_' + paginationServiceParams.paging.ssp_info.entity, result, paginationServiceParams.paging.ssp_info);
                            }
                            $rootScope.$broadcast('elasticsearchpagination_RemoveLoadingProgress_' + paginationServiceParams.paging.ssp_info.entity, null);
                            return result.$promise;
                        }, function (result) {
                            return $q.reject(result);
                        });
        },
            clear: function () {                        
            paginationServiceParams.ssp_pages.length = 0;
            paginationServiceParams.paging.ssp_info.totalItems = 0;
            paginationServiceParams.paging.ssp_info.currentPage = 0;
            paginationServiceParams.paging.ssp_info.totalPages = 1;
        },
        paginationServiceParams: function () { return paginationServiceParams; },
        initialize: function () {
            paginationServiceParams.paging.ssp_info.currentPage = 1;
        }
    }
} ]);


