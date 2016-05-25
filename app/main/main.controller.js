'use strict';

angular.module('apiApp')
    .controller('MainCtrl', function ($scope, $location, $http, $mdDialog, $filter) {
        //Save the interactions in a variable in scope
        $http.get('app/components/frontend_data/interactions.json').success(function (data){
            $scope.interactions = data;
        });
        //Save the users in a variable in scope
        $http.get('app/components/frontend_data/users.json').success(function (data){
            $scope.users = data;
            //console.log($scope.users);
        });
        //Save the brands in a variable in scope
        $http.get('app/components/frontend_data/brands.json').success(function (data){
            $scope.brands = data;
            userInt($scope.interactions, $scope.users);
        });

        var userInt = function(_interactions, _users){
            //Really not good logic, but should be fixed in backend, since I don't have it.
            angular.forEach(_interactions, function(interaction, key) {
                angular.forEach(_users, function(user, key) {
                    if(interaction.user == user.id){
                        if(user.interactions == undefined){
                            user.interactions = [];
                        }
                        user.interactions.push(interaction);
                    }
                });
            });
        }

        $scope.showDialog = function($event, brand_selected){
            angular.forEach($scope.interactions, function(interaction, key) {
                if(interaction.brand == brand_selected.id){
                    if(brand_selected.interactions == undefined){
                        brand_selected.interactions = [];
                    }
                    interaction.user_content = $filter('filter')($scope.users, function (d) {return d.id === interaction.user;})[0];
                    brand_selected.interactions.push(interaction);
                }
            });
            brand_selected.totalInt = brand_selected.interactions.length;
            $scope.brand_selected = brand_selected;
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                templateUrl: 'app/main/dialog/dialog.html',
                controller: 'DialogCtrl',
                windowClass: 'detailView',
                clickOutsideToClose:true,
                scope: $scope,
                preserveScope: true
            }).then(function(answer) {
                // Noop
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        }

        $scope.showUser = function($event, user_selected){
            angular.forEach($scope.interactions, function(interaction, key) {
                if(interaction.user == user_selected.id){
                    if(user_selected.interactions == undefined){
                        user_selected.interactions = [];
                    }
                    interaction.brand_content = $filter('filter')($scope.brands, function (d) {return d.id === interaction.brand;})[0];
                    user_selected.interactions.push(interaction);
                }
            });
            user_selected.totalInt = user_selected.interactions.length;
            $scope.user_selected = user_selected;
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                templateUrl: 'app/main/dialogUser/dialogUser.html',
                controller: 'DialogUserCtrl',
                windowClass: 'detailView',
                clickOutsideToClose:true,
                scope: $scope,
                preserveScope: true
            }).then(function(answer) {
                // Noop
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        }

        $scope.closeDialog = function() {
            $mdDialog.hide();
        };

    });
