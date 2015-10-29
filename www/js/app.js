// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.controllers','starter.services','Routing','course.controllers','person.controllers',"find.controllers"])
    .constant('ApiEndpoint', {
        //url: 'http://182.92.73.68:3000'
        //url: 'http://139.196.23.131:7070/ddcb/'
        url: 'http://127.0.0.7:8080/ddcb/'
        //url: 'https://139.196.23.131:8443/ddcb'
    })
    .run(function ($ionicPlatform,$rootScope,$state) {
        $rootScope.$state = $state;
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            if (window.hello) {
                console.log('hello plugin loaded.');
            }
            //$window.plugins.jPushPlugin.setTags(tags);
            //$window.plugins.jPushPlugin.setTags("15618555638");
            //window.plugins.jPushPlugin.setTags("15618555638");
        });
    })
    .config(function ($stateProvider, $urlRouterProvider, routerProvider,$ionicConfigProvider) {
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');
        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('left');
        $stateProvider
            .state('app', {
                url: "/app",
                //abstract: true,
                controller: 'AppCtrl',
                templateUrl: "templates/menu.html"
            })
            .state('app.home_chosen', {
                url: "/home_chosen",
                //cache:'false',
                views: {
                    'menuContent': {
                        templateUrl: "templates/home_chosen.html",
                        controller: 'homeChosenCtrl'
                    }
                }
            })
            .state('app.home_latest', {
                url: "/home_latest",
                //cache:'false',
                views: {
                    'menuContent': {
                        templateUrl: "templates/home_latest.html",
                        controller: 'homeLatestCtrl'
                    }
                }
            })
            .state('app.home_recommend', {
                url: "/home_recommend",
                //cache:'false',
                views: {
                    'menuContent': {
                        templateUrl: "templates/home_recommend.html",
                        controller: 'homeRecommendCtrl'
                    }
                }
            }).state('app.login', {
            url: "/login",
            views: {
              'menuContent': {
                templateUrl: "templates/login.html",
                controller: 'loginCtrl'
              }
            }
          }).state('app.coursePro', {
            url: "/courseProduce",
            views: {
              'menuContent': {
                templateUrl: "static/course/courseproduce.html",
                controller: 'courseInfoCtrl'
              }
            }
          });
        routerProvider.setCollectionUrl('js/routeCollection.json');
        $urlRouterProvider.otherwise('/app/home_chosen');
    }).controller('MainController', function ($scope, router) {
        $scope.reload = function () {
            router.setUpRoutes();
        };
    })
angular.module('Routing', ['ui.router'])
    .provider('router', function ($stateProvider) {
        var urlCollection;
        this.$get = function ($http, $state) {
            return {
                setUpRoutes: function () {
                    $http.get(urlCollection).success(function (collection) {
                        for (var routeName in collection) {
                            if (!$state.get(routeName)) {
                                $stateProvider.state(routeName, collection[routeName]);
                            }
                        }
                    });
                }
            }
        };
        this.setCollectionUrl = function (url) {
            urlCollection = url;
        }
    })
    .run(function (router) {
        router.setUpRoutes();
    });
