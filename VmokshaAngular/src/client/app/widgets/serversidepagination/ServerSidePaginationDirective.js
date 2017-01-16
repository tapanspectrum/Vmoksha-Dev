/* Description: The ServerSidePagination Directive deals with calling pagination apis on click of pagination grid and maintaining pagewise results.
 * Author:  AvinashK
 * Created On: 23/09/2016
 * Modified For: 
 * Modified On:
 * Modified By:
 * */

'use strict';
angular.module('app.widgets').directive('serversidePagination', ['$window', 'ServerSidePaginationService', '$location', '$rootScope', '$timeout', function ($window, ServerSidePaginationService, $location, $rootScope, $timeout) {
return {
        restict: 'E',
        replace : true, //-> this will not work in this case.
        scope: {
           totalPages: "=", 
           currentPage: "=",          
           totalRecords:"=",
           currentRecords:"=",
           hidePagination:"@",
           url: "=",
           loadMoreOption: "=",
           infinteScrollOption: "=",
           lookupView: "@"
           
        },
        templateUrl: "app/widgets/serversidepagination/ServerSidePagination.html", 
        link: function (scope, element, attrs) {
            scope.pages = [];
            if (scope.url) {
                var newURL = scope.url;
            }
            else {
                var newURL = attrs.url;
            }
            scope.LookupView = false;
            if (scope.lookupView) {
                scope.LookupView = true;
            }
            //the number of pages shown at any point in time is set to 5 
            //'scope.pageindex' is the starting index of each page array
            scope.pageindex = 1;

            scope.$watch('totalPages', function () {
                createPageArray(scope.pages, scope.pageindex, scope.totalPages);
                
            });
            //function called to load the next set of records on click of the next icon
            scope.gotoNextPage = function (p) {
                //we are incrementing the page index by 5 and creating the next set of pages
                scope.pageindex = scope.pageindex + 5;
                if (scope.pageindex > scope.totalPages) {
                    scope.pageindex = scope.totalPages;
                }
                createPageArray(scope.pages, scope.pageindex, scope.totalPages);
                //by default records corresponding the first page number of any page array will be shown
                ServerSidePaginationService.navigate(scope.pageindex, newURL)

            };
            //function called to load the previous set of records on click of the previous icon
            scope.gotoPreviousPage = function (p) {
                scope.pageindex = scope.pageindex - 5;
                if (scope.pageindex < 1) {
                    scope.pageindex = 1
                }
                createPageArray(scope.pages, scope.pageindex, scope.totalPages);
                ServerSidePaginationService.navigate(scope.pageindex, newURL)

            };
            //function called to load current records on click of any page number
            scope.gotoPage = function (p) {
                ServerSidePaginationService.navigate(p, newURL)

            };
            //Swathi(14-Oct-15): The below event is fired when search is clicked to set pages array and page index
            $rootScope.$on('ResetServerSidePagination', function (i, args) {
                scope.pages = [];
                scope.pageindex = 1;
            });
            //ends
        }
    };

    //function called to create the page array  
    function createPageArray(pages, pageindex, totalPages) {
        var i;
        pages.length = 0;
        //the number of pages shown is set to 5 
        //that is every time 5 pages will be shown
        //on click of the next/previous icons the next/previous sets of pages will be shown
        //Ranjan- Fixed issue for Pagination is not showing the previous pages on click of last page
        //if its the last page, showing the previous four pages.
        if (pageindex == totalPages) {
            for (i = pageindex - 4; i <= totalPages; i++) {
                if(i > 0)
                pages.push(i);
            }
        }
        else if (totalPages - pageindex < 4) {
            for (i = pageindex - 3; i <= totalPages; i++) {
                if (i > 0)
                    pages.push(i);
            }
        }
        else {
            for (i = pageindex; i < pageindex + 5; i++) {
                //once pageindex is equal to the total number of pages,come out of the loop
                if (i <= totalPages) {
                    pages.push(i);
                }
                else {
                    break;
                }
            }
        }
        
    }
        
}]);