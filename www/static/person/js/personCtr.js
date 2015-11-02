/**
 * Created by itzhaocn on 2015/10/19.
 */
angular.module('person.controllers', ["ionic-timepicker", "ionic-datepicker"])
  .controller("personAgeCtrl",function($scope,itzhao,$rootScope){
  	if($rootScope.hasLogin) {
  		$scope.uiSref = "app.myinfo";
  	} else {
  		$scope.uiSref = "app.login";
  	}
  	$scope.myOpenCourseOrder = function() {
  		if($rootScope.hasLogin) {
  			$rootScope.$state.go('app.myorder');
  		} else {
  			itzhao.alertTip("您还没有登陆，请先登陆！");
  		}
  	}
  	$scope.applyCourse = function() {
  		if($rootScope.hasLogin) {
  			$rootScope.$state.go('app.personEntry');
  		} else {
  			itzhao.alertTip("您还没有登陆，请先登陆！");
  		}
  	}
  	$scope.myTeachCourse = function() {
  		if($rootScope.hasLogin) {
  			$rootScope.$state.go('app.myopen');
  		} else {
  			itzhao.alertTip("您还没有登陆，请先登陆！");
  		}
  	}
  	$scope.setting = function() {
  		if(!$rootScope.hasLogin) {
  			itzhao.alertTip("您还没有登陆，请先登陆！");
  		} else {
  			$rootScope.$state.go('app.setting');
  		}
  	}
  })
  .controller("myInfoCtrl",function($scope,itzhao,$rootScope){
    //alert(JSON.stringify($rootScope.userComm));
  })
  .controller("myInfoSetCtrl",function($scope,itzhao,$rootScope,statement){
    $scope.userInfoUp={};
    $scope.userInfoUp.user_id="15618555637";//用户id
    $scope.userInfoUp.nick_name=$rootScope.userComm.nickName;//昵称
    $scope.userInfoUp.name=$rootScope.userComm.userName;//姓名
    $scope.userInfoUp.industry_id=$rootScope.userComm.industryId;//行业id
    $scope.userInfoUp.work_year_id=$rootScope.userComm.workYearId;
    $scope.userInfoUp.company=$rootScope.userComm.companyName;//公司名称
    $scope.userInfoUp.position=$rootScope.userComm.companyPosition;//公司职位
    $scope.userInfoUp.province_id=$rootScope.userComm.provinceId;//省份id
    $scope.userInfoUp.sex=$scope.userComm.userSex;
    $scope.sex = [
      {name:'男', id:0},
      {name:'女', id:1}
    ];
    $scope.year=statement.workYear;
    $scope.province=statement.province;
    $scope.industry=statement.industry;
    //userSex
    $scope.m = {sex:$scope.userComm.userSex,industry_id:1,city_id:1};
    $scope.doChangeInfo=function(){
      //$scope.userInfoUp.sex=$scope.m.sex;//性别
      itzhao.JQ("post","/userProfile/updateUserProfile",$scope.userInfoUp,"show", function(data){
        itzhao.userInfo.setUserInfo(itzhao,$rootScope);
        $rootScope.$state.go('app.myinfo');
      })
    }
  })
  .controller("setPwdCtrl",function($scope,itzhao,$rootScope){
      $scope.pwdSetData={};
      $scope.upPwd=function(){
        if(itzhao.check.isEmpty($scope.pwdSetData.userOldPwd)||itzhao.check.isEmpty($scope.pwdSetData.userNewPwd)||itzhao.check.isEmpty($scope.pwdSetData.userNewPwd2)){
          itzhao.alertTip("输入项不能为空");
        }else if($scope.pwdSetData.userNewPwd!=$scope.pwdSetData.userNewPwd2){
          itzhao.alertTip("2次密码不一致");
        }else{
          itzhao.JQ("post","/safety/userChangePwd",$scope.pwdSetData, "show", function(data){
          	if(data.errorCode=="0000") {
          		itzhao.alertTip("密码修改成功！");
          		$rootScope.$state.go('app.setting');
          	}else{
            	itzhao.alertTip(data.errorMsg);
          	}
          })
        }
      }
  })
  .controller("setNewPwdCtrl",function($scope,itzhao,$rootScope){
      $scope.pwdSetData={};
      $scope.resetPwd=function(){
        if(itzhao.check.isEmpty($scope.pwdSetData.userId)||itzhao.check.isEmpty($scope.pwdSetData.userVerifyCode)||itzhao.check.isEmpty($scope.pwdSetData.userPwd)){
          itzhao.alertTip("输入项不能为空!");
        } else {
          itzhao.JQ("post","/safety/resetPwd",$scope.pwdSetData, "show", function(data){
          	if(data.errorCode=="0000") {
          		itzhao.alertTip("密码修改成功！");
          		$rootScope.$state.go('app.login');
          	}else{
            	itzhao.alertTip(data.errorMsg);
          	}
          })
        }
      }
      $scope.getUpCode=function(){
	      if(itzhao.check.isEmpty($scope.pwdSetData.userId)){
	        itzhao.alertTip("请输入手机号!");
	      }else {
	        itzhao.JQ("post","/safety/sendVerifyCode",$scope.pwdSetData,"show",function(data){
	          if(data.errorCode=="0000") {
	            itzhao.alertTip("验证码发送成功！");
	          }else{
	            itzhao.alertTip(data.errorMsg);
	          }
	        })
	      }
      }
  })
  .controller("setPhoneCtrl",function($scope,itzhao, $rootScope){
    $scope.phoneSetData={};
    $scope.getUpCode=function(){
      if(itzhao.check.isEmpty($scope.phoneSetData.userId)){
        itzhao.alertTip("请输入新的手机号");
      }else {
        itzhao.JQ("post","/safety/sendVerifyCode",$scope.phoneSetData,"show",function(data){
          if(data.errorCode=="0000") {
            itzhao.alertTip("验证码发送成功！");
          }else{
            itzhao.alertTip(data.errorMsg);
          }
        })
      }
    }
    $scope.upPhone=function(){
      if(itzhao.check.isEmpty($scope.phoneSetData.userId)||itzhao.check.isEmpty($scope.phoneSetData.userVerifyCode)){
        itzhao.alertTip("输入项不能为空");
      }else{
        itzhao.JQ("post","/safety/userChangeUserId",$scope.phoneSetData,"show",function(data){
          if(data.errorCode=="0000") {
            $rootScope.hasLogin = false;
          	$rootScope.$state.go('app.login');
          	itzhao.alertTip("手机号码修改成功！");
          }else{
            itzhao.alertTip(data.errorMsg);
          }
        })
      }
    }
  })
  .controller("visitCardSetCtrl",function($scope,itzhao,$rootScope,statement){
    $scope.userInfoUp={};
    $scope.userInfoUp.user_id="15618555637";//用户id
    $scope.userInfoUp.name=$rootScope.userComm.userName;//姓名
    $scope.userInfoUp.industry_id=$rootScope.userComm.industryId;//行业id
    $scope.userInfoUp.work_year_id=$rootScope.userComm.workYearId;
    $scope.userInfoUp.company=$rootScope.userComm.companyName;//公司名称
    $scope.userInfoUp.position=$rootScope.userComm.companyPosition;//公司职位
    $scope.userInfoUp.province_id=$rootScope.userComm.provinceId;//省份id
    $scope.userInfoUp.sex=$scope.userComm.userSex;
    $scope.sex = [
      {name:'男', id:0},
      {name:'女', id:1}
    ];
    $scope.year=statement.workYear;
    $scope.province=statement.province;
    $scope.industry=statement.industry;
    //userSex
    $scope.m = {sex:$scope.userComm.userSex,industry_id:$scope.userInfoUp.industry_id,city_id:1};
    $scope.uploadCard=function(){
    	alert("未完成");
    	return;
      itzhao.JQ("post","/userProfile/updateUserProfile",$scope.userInfoUp,function(data){
        itzhao.userInfo.setUserInfo(itzhao,$rootScope);
        //调用名片上传接口了
      })
    }
    $scope.checkInfo = function() {
    	if(itzhao.check.isEmpty($scope.userInfoUp.name)) {
    		itzhao.alertTip("姓名不能为空！");
    	} else if(itzhao.check.isEmpty($scope.userInfoUp.industry_id)){
    		itzhao.alertTip("行业不能为空！");
    	} else if(itzhao.check.isEmpty($scope.userInfoUp.sex)){
    		itzhao.alertTip("性别不能为空！");
    	} else if(itzhao.check.isEmpty($scope.userInfoUp.company)){
    		itzhao.alertTip("任职机构不能为空！");
    	} else if(itzhao.check.isEmpty($scope.userInfoUp.position)){
    		itzhao.alertTip("职位不能为空！");
    	} else if(itzhao.check.isEmpty($scope.userInfoUp.work_year_id)){
    		itzhao.alertTip("工作年限不能为空！");
    	} else if(itzhao.check.isEmpty($scope.userInfoUp.province_id)){
    		itzhao.alertTip("所在城市不能为空！");
    	} else {
    		$rootScope.$state.go('app.personEntry2');
    	}
    }
  })
  .controller("addCourseCtrl",function($scope,itzhao, statement, $rootScope, $filter,$LocalStorage){
    $scope.addCourseData={};
    $scope.addCourseData.industry_id="";
    $scope.addCourseData.field_id="";
    $scope.addCourseData.stage_id="";
    $scope.industry = statement.industry;//行业id
    $scope.fieldTmp = {};
    $scope.stage = statement.stage;
    $scope.selectedTime = "19:30";
    $scope.getField=function(){
      $scope.fieldTmp = statement.field[$scope.addCourseData.industry_id];
    };
    $scope.checkInfo = function() {
    	if(itzhao.check.isEmpty($scope.addCourseData.industry_id)) {
    		itzhao.alertTip("课程所属行业大类没有选择！");
    	} else if(itzhao.check.isEmpty($scope.addCourseData.field_id)) {
    		itzhao.alertTip("课程所属行业细分没有选择！");
    	} else if(itzhao.check.isEmpty($scope.addCourseData.stage_id)) {
    		itzhao.alertTip("课程所属方向没有选择！");
    	} else if(itzhao.check.isEmpty($scope.addCourseData.name)) {
    		itzhao.alertTip("课程名称没有填写！");
    	} else if(itzhao.check.isEmpty($scope.addCourseData.brief)) {
    		itzhao.alertTip("课程介绍没有填写！");
    	} else if(itzhao.check.isEmpty($scope.addCourseData.details)) {
    		itzhao.alertTip("课程详情没有填写！");    	
    	} else {
    		$LocalStorage.setObject("apply-course-info", $scope.addCourseData);
    		$rootScope.$state.go('app.personEntry3');
    	}
    }
    $scope.fieldClick = function() {
      if($scope.addCourseData.industry_id == "") {
      	itzhao.alertTip("请先选择课程所属行业大类！");
      } 
    }
    $scope.timePickerObject12Hour = {
	  inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
	  step: 5,  //Optional
	  format: 24,  //Optional
	  titleLabel: '请选择上课时间',  //Optional
	  setLabel: '设定',  //Optional
	  closeLabel: '取消',  //Optional
	  setButtonType: 'button-positive',  //Optional
	  closeButtonType: 'button-stable',  //Optional
	  callback: function (val) {    //Mandatory
	    timePicker12Callback(val);
	  }
	};
	$scope.datepickerObject = {
      titleLabel: '请选择上课日期',  //Optional
      todayLabel: '今天',  //Optional
      closeLabel: '取消',  //Optional
      setLabel: '设定',  //Optional
      setButtonType : 'button-positive',  //Optional
      todayButtonType : 'button-positive',  //Optional
      closeButtonType : 'button-stable',  //Optional
      inputDate: new Date(),    //Optional
      mondayFirst: true,    //Optional
      //disabledDates: disabledDates, //Optional
      weekDaysList: ["周日","周一","周二","周三","周四","周五","周六"],   //Optional
      monthList: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"], //Optional
      templateType: 'popup', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2),   //Optional
      to: new Date(2018, 8, 25),    //Optional
      callback: function (val) {    //Mandatory
        datePickerCallback(val);
      }
    };
    $scope.selectedDate = $filter('date')($scope.datepickerObject.inputDate, 'yyyy-MM-dd');
    $scope.addCourseData.school_time=$scope.selectedDate+" "+$scope.selectedTime+":00";
    function datePickerCallback(val) {
      if (typeof(val) === 'undefined') {
      } else {
        $scope.datepickerObject.inputDate = val;
        $scope.addCourseData.schoolTime=$scope.selectedDate+" "+$scope.selectedTime+"00";
      }
    }
	function timePicker12Callback(val) {
      if (typeof (val) === 'undefined') {
      } else {
        $scope.timePickerObject12Hour.inputEpochTime = val;
        var selectedTime = new Date(val * 1000);
        $scope.selectedTime = selectedTime.getUTCHours() + ':' + (selectedTime.getUTCMinutes() < 10 ? "0" + selectedTime.getUTCMinutes() : selectedTime.getUTCMinutes()); 
        $scope.addCourseData.school_time=$scope.selectedDate+" "+$scope.selectedTime+"00";
      }
    }
  })
  .controller("addCourseFinalCtrl",function($scope,itzhao, $LocalStorage,$rootScope){
    $scope.addCourseData = $LocalStorage.getObject("apply-course-info");
    $scope.addCourse=function() {
    	if(itzhao.check.isEmpty($scope.addCourseData.resume)) {
    		itzhao.alertTip("个人介绍没有填写！");
    	} else {
	      itzhao.JQ("post","/course/addCourse",$scope.addCourseData,"show",function(data){
	        if(data.errorCode=="2000"){
	          $rootScope.$state.go('app.person');
	        }else{
	          itzhao.alertTip(data.errorMsg);
	        }
	      })
    	}
    }
  })
  .controller("logoutCtrl",function($scope,itzhao,$rootScope){
  	$scope.logout = function() {
	     $scope.data={};
	     itzhao.JQ("post","/safety/userLogout",$scope.data,"show", function(data){
	      if(data.errorCode=="0000") {
	        itzhao.alertTip("退出成功！");
	        $rootScope.hasLogin = false;
	        $rootScope.$state.go("app.home_chosen");
	      } else {
	      	itzhao.alertTip(data.errorMsg);
	      }
	     })
    }
  })
  .controller('myOrderCtrl', function ($rootScope, $scope, itzhao, $ionicScrollDelegate, $LocalStorage,$course) {
    $scope.refreshMyOrderCourse = function() {
    	$rootScope.pageMyOrder = 1;
    	$course.getMyOrderCourse($scope, 'refresh');
    }
    $scope.loadMoreMyOrderCourse = function () {
    	$course.getMyOrderCourse($scope, 'scroll');
    }
    $scope.refreshMyOrderCourse();
    $scope.enterCourse = function(index) {
    	$rootScope.courseInfoEntry = $rootScope.myOrderCourse[index];
    	$rootScope.courseInfoEntrycourseId = $rootScope.courseInfoEntry.courseInfo.id;
    	$rootScope.$state.go('app.coursePro');
    }
  })
  .controller('myOrderFinishCtrl', function ($rootScope, $scope, itzhao, $ionicScrollDelegate, $LocalStorage,$course) {
    $scope.refreshMyOrderFinishCourse = function() {
    	$rootScope.pageMyOrderFinish = 1;
    	$course.getMyOrderFinishCourse($scope, 'refresh');
    }
    $scope.loadMoreMyOrderFinishCourse = function () {
    	$course.getMyOrderFinishCourse($scope, 'scroll');
    }
    $scope.refreshMyOrderFinishCourse();
  })
  .controller('myOpenCtrl', function ($rootScope, $scope, itzhao, $ionicScrollDelegate, $LocalStorage,$course) {
    $scope.refreshMyOpenCourse = function() {
    	$rootScope.pageMyOpen = 1;
    	$course.getMyOpenCourse($scope, 'refresh');
    }
    $scope.loadMoreMyOpenCourse = function () {
    	$course.getMyOpenCourse($scope, 'scroll');
    }
    $scope.refreshMyOpenCourse();
    $scope.enterCourse = function(index) {
    	$rootScope.courseInfoEntry = $rootScope.myOpenCourse[index];
    	$rootScope.courseInfoEntrycourseId = $rootScope.courseInfoEntry.courseInfo.id;
    	$rootScope.$state.go('app.coursePro');
    }
  })
  .controller('myOpenLatestCtrl', function ($rootScope, $scope, itzhao, $ionicScrollDelegate, $LocalStorage,$course) {
    
  })
