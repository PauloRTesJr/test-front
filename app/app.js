var apiApp = angular.module('apiApp', ['ngMaterial','ui.router']);

apiApp.config(function($locationProvider, $stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl',
            resolve: {
                app: function ($q, $timeout) {
                    var defer = $q.defer();
                    $timeout(function () {
                        defer.resolve();
                    }, 500);
                    return defer.promise;
                }
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller: 'LoginCtrl'
        });
	})
    .run(['$rootScope', '$state',function($rootScope, $state){

        $rootScope.$on('$stateChangeStart',function(){
            $rootScope.stateIsLoading = true;
        });

        $rootScope.$on('$stateChangeSuccess',function(){
            $rootScope.stateIsLoading = false;
        });

    }]);
