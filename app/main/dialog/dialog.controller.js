'use strict';

angular.module('apiApp')
    .controller('DialogCtrl', function ($mdDialog, $scope) {

        $scope.closeDialog = function() {
            $mdDialog.hide();
        };
    });
