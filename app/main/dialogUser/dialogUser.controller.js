'use strict';

angular.module('apiApp')
    .controller('DialogUserCtrl', function ($mdDialog, $scope) {

        $scope.closeDialog = function() {
            $mdDialog.hide();
        };
    });
