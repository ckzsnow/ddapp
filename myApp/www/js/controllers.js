angular.module('starter.controllers', [])
  .controller('AppCtrl', function ($scope, itzhao, $LocalStorage, $rootScope) {
		//$rootScope.hasLogin = false;
  })
  /*
   首页---homeCtrl
   */
  .controller('homeChosenCtrl', function ($rootScope, $scope, itzhao, $ionicSlideBoxDelegate, $ionicScrollDelegate, $LocalStorage,$course) {
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.$getByHandle('image-viewer').update();
    $scope.refreshChosenCourse = function() {
    	$rootScope.pageChosen = 1;
    	$rootScope.chosenCourse = new Array();
    	$course.getMoreChosenCourse($scope, 'refresh');
    }
    $scope.loadMoreChosenCourse = function () {
    	$course.getMoreChosenCourse($scope, 'scroll');
    }
    $scope.refreshChosenCourse();
    $scope.clickRecommend = function() {
    	if(!$rootScope.hasLogin) {
    		itzhao.alertTip("您还没有登陆，无法查看推荐课程信息！");
    	} else {
    		$rootScope.$state.transitionTo('app.home_recommend', {}, {
			    reload: true,
			    inherit: false,
			    notify: true
				});
    	}
    }
    $scope.clickLatest = function() {
    	$rootScope.$state.transitionTo('app.home_latest', {}, {
		    reload: true,
		    inherit: false,
		    notify: true
			});
    }
    $scope.clickCourse = function(index) {
    	$rootScope.courseInfoEntry = $rootScope.chosenCourse[index];
    	$rootScope.courseInfoEntrycourseId = $rootScope.courseInfoEntry.courseInfo.id;
    	if(!$rootScope.hasLogin || itzhao.check.isEmpty($rootScope.chosenCourse[index].courseInfo.isEnter) || !$rootScope.chosenCourse[index].courseInfo.isEnter) {
    		$rootScope.$state.go('app.courseInfo');
    	} else {
    		$rootScope.$state.go('app.coursePro');
    	}
    }
  })
  .controller('homeLatestCtrl', function ($rootScope, $scope, itzhao, $ionicSlideBoxDelegate, $ionicScrollDelegate, $LocalStorage,$course) {
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.$getByHandle('image-viewer').update();
    $scope.refreshLatestCourse = function() {
    	$rootScope.pageLatest = 1;
    	$rootScope.latestCourse = new Array();
    	$course.getMoreLatestCourse($scope, 'refresh');
    }
    $scope.loadMoreLatestCourse = function () {
    	$course.getMoreLatestCourse($scope, 'scroll');
    }
    $scope.refreshLatestCourse();
    $scope.clickRecommend = function() {
    	if(!$rootScope.hasLogin) {
    		itzhao.alertTip("您还没有登陆，无法查看推荐课程信息！");
    	} else {
    		$rootScope.$state.transitionTo('app.home_recommend', {}, {
			    reload: true,
			    inherit: false,
			    notify: true
				});
    	}
    }
    $scope.clickChosen = function() {
    	$rootScope.$state.transitionTo('app.home_chosen', {}, {
		    reload: true,
		    inherit: false,
		    notify: true
			});
    }
    $scope.clickCourse = function(index) {
    	$rootScope.courseInfoEntry = $rootScope.latestCourse[index];
    	$rootScope.courseInfoEntrycourseId = $rootScope.courseInfoEntry.courseInfo.id;
    	if(!$rootScope.hasLogin || itzhao.check.isEmpty($rootScope.latestCourse[index].courseInfo.isEnter) || !$rootScope.latestCourse[index].courseInfo.isEnter) {
    		$rootScope.$state.go('app.courseInfo');
    	} else {
    		$rootScope.$state.go('app.coursePro');
    	}
    }
  })
  .controller('homeRecommendCtrl', function ($rootScope, $scope, itzhao, $ionicSlideBoxDelegate, $ionicScrollDelegate, $LocalStorage,$course) {
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.$getByHandle('image-viewer').update();
    $scope.refreshRecommendCourse = function() {
    	if($rootScope.hasLogin) {
	    	$rootScope.pageRecommend = 1;
	    	$rootScope.recommendCourse = new Array();
	    	$course.getMoreRecommendCourse($scope, 'refresh');
    	} else {
    		$scope.$broadcast('scroll.refreshComplete');
    		itzhao.alertTip("您还没有登陆，无法获取推荐课程信息！");
    	}
    }
    $scope.loadMoreRecommendCourse = function () {
    	if($scope.hasLogin) $course.getMoreRecommendCourse($scope, 'scroll');
    }
    $scope.refreshRecommendCourse();
    $scope.clickChosen = function() {
    	$rootScope.$state.transitionTo('app.home_chosen', {}, {
		    reload: true,
		    inherit: false,
		    notify: true
			});
    }
    $scope.clickLatest = function() {
    	$rootScope.$state.transitionTo('app.home_latest', {}, {
		    reload: true,
		    inherit: false,
		    notify: true
			});
    }
    $scope.clickCourse = function(index) {
    	$rootScope.courseInfoEntry = $rootScope.recommendCourse[index];
    	$rootScope.courseInfoEntrycourseId = $rootScope.courseInfoEntry.courseInfo.id;
    	if(!$rootScope.hasLogin || itzhao.check.isEmpty($rootScope.recommendCourse[index].courseInfo.isEnter) || !$rootScope.recommendCourse[index].courseInfo.isEnter) {
    		$rootScope.$state.go('app.courseInfo');
    	} else {
    		$rootScope.$state.go('app.coursePro');
    	}
    }
  })
  .controller('loginCtrl', function ($rootScope, $scope, itzhao, $LocalStorage) {
    $scope.loginData = {};
    $scope.doLogin = function () {
      if (itzhao.check.isEmpty($scope.loginData.userId) || itzhao.check.isEmpty($scope.loginData.userPwd)) {
        itzhao.alertTip("用户名或密码不能为空");
      } else {
        itzhao.JQ("post", "/safety/userLogin",$scope.loginData, "show", function(data) {
          if (data.errorCode == "0000") {
            var userdata = {};
            userdata.userId = $scope.loginData.userId;
            userdata.userPwd = $scope.loginData.userPwd;
            $LocalStorage.setObject("andy-userInfo", userdata);
            itzhao.alertTip("登录成功！", function () {
              itzhao.userInfo.userId = $scope.loginData.userId;
              itzhao.userInfo.setUserInfo(itzhao, $rootScope);
              $rootScope.hasLogin = true;
              $rootScope.$state.transitionTo('app.home_chosen', {}, {
							    reload: true,
							    inherit: false,
							    notify: true
							});
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
  .controller("comquestionCtrl", function ($scope) {
		$scope.question1 = false;
		$scope.question2 = false;
		$scope.clickButton = function(id) {
			if(id == "question1") {
				$scope.question1 = !$scope.question1;
			} else if(id == "question2") {
				$scope.question2 = !$scope.question2;
			}
		}
  })
  .controller("bannerCtrl", function ($scope) {

  })
  .controller('TutorialCtrl', function($scope, $state, $ionicHistory,$rootScope) {

  window.localStorage['didTutorial'] = false;// For Test

  var startApp = function() {
    $ionicHistory.clearHistory();
    $rootScope.$state.go('app.home_chosen');
    window.localStorage['didTutorial'] = true;
  };

  if(window.localStorage['didTutorial'] === "true") {
    //console.log('Skip intro');
    // 向导页面只显示一次
    startApp();
  } else {
    /*setTimeout(function () {
      navigator.splashscreen.hide();
    }, 750);*/
  }

  // "立即体验"按钮Event
  $scope.gotoMain = function() {
    startApp();
  }

  $scope.slideHasChanged = function(index) {
  };
})

