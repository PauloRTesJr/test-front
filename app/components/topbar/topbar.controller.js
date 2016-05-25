'use strict';

angular.module('apiApp')
    .controller('TopBarCtrl', function ($mdSidenav, $mdDialog, $scope, $location) {

        $scope.openSidebar = function(){
            $mdSidenav('left').toggle();
        }
   
    });