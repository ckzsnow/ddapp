/**
 * Created by itzhaocn on 2015/10/19.
 */
angular.module('person.controllers', [])
  .controller("personAgeCtrl",function($scope,itzhao,$rootScope){

  })
  .controller("myInfoCtrl",function($scope,itzhao,$rootScope){
    alert(JSON.stringify($rootScope.userComm));
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
      itzhao.JQ("post","/userProfile/updateUserProfile",$scope.userInfoUp,function(data){
        itzhao.userInfo.setUserInfo(itzhao,$rootScope);
        $rootScope.$state.go('app.myinfo');
      })
    }
  })
  .controller("setPwdCtrl",function($scope,itzhao){
      $scope.pwdSetData={};
      $scope.upPwd=function(){
        if(itzhao.check.isEmpty($scope.pwdSetData.userOldPwd)||itzhao.check.isEmpty($scope.pwdSetData.userNewPwd)||itzhao.check.isEmpty($scope.pwdSetData.userNewPwd2)){
          itzhao.alertTip("输入项不能为空");
        }else if($scope.pwdSetData.userNewPwd!=$scope.pwdSetData.userNewPwd2){
          itzhao.alertTip("2次密码不一致");
        }else{
          itzhao.JQ("post","/safety/userChangePwd",function(data){
            $rootScope.$state.go('app.setting');
          })
        }
      }
  })
  .controller("setPhoneCtrl",function($scope,itzhao){
    $scope.phoneSetData={};
    $scope.getUpCode=function(){
      if(itzhao.check.isEmpty($scope.phoneSetData.newUserId)){
        itzhao.alertTip("请输入新的手机号");
      }else {
        itzhao.JQ("post","/safety/sendVerifyCode",$scope.getUpCode,function(data){
          if(data.errorCode=="0000") {
            itzhao.alertTip("验证码发送成功！");
          }else{
            itzhao.alertTip(data.errorMsg);
          }
        })
      }
    }
    $scope.upPwd=function(){
      if(itzhao.check.isEmpty($scope.phoneSetData.userVerifyCode)||itzhao.check.isEmpty($scope.phoneSetData.newUserId)){
        itzhao.alertTip("输入项不能为空");
      }else if($scope.phoneSetData.userNewPwd!=$scope.pwdSetData.userNewPwd2){
        itzhao.alertTip("2次密码不一致");
      }else{
        itzhao.JQ("post","/safety/userChangeUserId",$scope.phoneSetData,function(data){
          $rootScope.$state.go('app.setting');
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
    $scope.m = {sex:$scope.userComm.userSex,industry_id:1,city_id:1};
    $scope.doChangeInfo=function(){
      //$scope.userInfoUp.sex=$scope.m.sex;//性别
      itzhao.JQ("post","/userProfile/updateUserProfile",$scope.userInfoUp,function(data){
        itzhao.userInfo.setUserInfo(itzhao,$rootScope);
      //  调用名片上传接口了
      })
    }
  })
  .controller("addCourseCtrl",function($scope,itzhao){
    $scope.addCourseData={};
    $scope.addCourseData.industryId="";
    $scope.addCourseData.field_id="";
    $scope.addCourseData.stage_id="";
    $scope.industry=statement.industry;//行业id
    $scope.field={};
    itzhao.JQ("get","/courseCategoryInfo/getAllStage",{},function(data){
      if(data.errorCode="3000"){
        $scope.stage=data.resultList;
      }else{
        itzhao.alertTip(data.errorMsg)
      }
    });
    $scope.getField=function(){
      itzhao.JQ("get","/courseCategoryInfo/getFieldByIndustryId?industryId"+$scope.addCourseData.industryId,{},function(data){
          if(data.errorCode="3000"){
            $scope.field=data.resultList;
          }else{
            itzhao.alertTip(data.errorMsg)
          }
      })
    };
    $scope.addCourse=function(){
      itzhao.JQ("post","/course/addCourse",$scope.addCourseData,function(data){
        if(data.errorCode=="2000"){
        //跳转到个人信息填写页面
        }else{
          itzhao.alertTip(data.errorMsg)
        }
      })
    }
  })
  .controller("resumeCtrl",function($scope,itzhao){
     $scope.upData={};
     $scope.upData.user_id=itzhao.userInfo.userId;
    $scope.updataResume=function(){
      itzhao.JQ("post","/userProfile/updateUserProfile",$scope.upData,function(data){
          if(data.errorCode=="1000"){
            itzhao.alertTip("提交申请成功！");
              $rootScope.$state.go("app.home");
          }else{
            itzhao.alertTip(data.errorMsg)
          }
      })
    }
  })
