angular.module('starter.controllers', [])
  .controller('AppCtrl', function ($scope, itzhao, $LocalStorage, $rootScope) {

  })
  /*
   首页---homeCtrl
   */
  .controller('homeCtrl', function ($rootScope, $scope, itzhao, $ionicSlideBoxDelegate, $ionicScrollDelegate, $LocalStorage,$course,$timeout) {
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.$getByHandle('image-viewer').update();
    $scope.refreshChosenCourse = function() {
    	$rootScope.pageChosen = 1;
    	$course.getMoreChosenCourse($scope, 'refresh');
    }
    $scope.refreshLatestCourse = function() {
    	$rootScope.pageLatest = 1;
    	$course.getMoreLatestCourse($scope, 'refresh');
    }
    $scope.refreshRecommendCourse = function() {
    	$rootScope.pageRecommend = 1;
    	$course.getMoreRecommendCourse($scope, 'refresh');
    }
    $scope.loadMoreChosenCourse = function () {
    	$course.getMoreChosenCourse($scope, 'scroll');
    }
    $scope.loadMoreLatestCourse = function () {
    	$course.getMoreLatestCourse($scope, 'scroll');
    }
    $scope.loadMoreRecommendCourse = function () {
    	$course.getMoreRecommendCourse($scope, 'scroll');
    }
    $scope.refreshChosenCourse();
  })
  .controller('loginCtrl', function ($rootScope, $scope, itzhao, $LocalStorage) {
    $scope.loginData = {};
    $scope.doLogin = function () {
      if (itzhao.check.isEmpty($scope.loginData.userId) || itzhao.check.isEmpty($scope.loginData.userPwd)) {
        itzhao.alertTip("用户名或密码不能为空");
      } else {
        itzhao.JQ("post", "/safety/userLogin",$scope.loginData, function(data) {
          if (data.errorCode == "0000") {
            var userdata = {};
            userdata.userId = $scope.loginData.userId;
            userdata.userPwd = $scope.loginData.userPwd;
            $LocalStorage.setObject("andy-userInfo", userdata);

            itzhao.alertTip("登录成功！", function () {
              itzhao.userInfo.userId = $scope.loginData.userId;
              itzhao.userInfo.setUserInfo(itzhao, $rootScope);
              $rootScope.$state.go('app.home');
            })
          } else {
            itzhao.alertTip(data.errorMsg);
          }
        })
      }
    }
  })
  .controller('registerCtrl', function ($rootScope, $scope, itzhao) {
    $scope.registerData = {};
    $scope.getCode = function () {
      if (itzhao.check.isEmpty($scope.registerData.userId)) {
        itzhao.alertTip("请先输入手机号！");
      } else {
        itzhao.JQ("post", "/safety/sendVerifyCode", $scope.registerData, function (data) {
          if (data.errorCode == "0000") {
            itzhao.alertTip("验证码发送成功!");
          } else {
            itzhao.alertTip(data.errorMsg);
          }
        })
      }
    }
    $scope.doRegister = function () {
      if (itzhao.check.isEmpty($scope.registerData.userId) || itzhao.check.isEmpty($scope.registerData.userPwd) || itzhao.check.isEmpty($scope.registerData.userPwd2)) {
        itzhao.alertTip("手机号或密码不能为空");
      } else if ($scope.doRegister.userPwd != $scope.doRegister.userPwd2) {
        itzhao.alertTip("2次密码不一致！");
      } else {
        itzhao.JQ("post", "/safety/userRegister", $scope.registerData, function (data) {
          if (data.errorCode == "0000") {
            itzhao.alertTip("注册成功，请登录！", function () {
              $rootScope.$state.go('app.login');
            });
          } else {
            itzhao.alertTip(data.errorMsg);
          }
        })
      }
    }
  })
  .controller("bannerCtrl", function ($scope) {

  })

