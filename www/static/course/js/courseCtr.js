/**
 * Created by itzhaocn on 2015/10/19.
 */
angular.module('course.controllers', [])
  .controller("courseInfoCtrl",function($scope,itzhao,$rootScope){
	$scope.enterCourse = function(courseId) {
		if(!$rootScope.hasLogin) {
    		itzhao.alertTip("您还没有登陆，请先登录！");
    	} else {
    		alert("报名！")
		}
	}
  })
  .controller("courseProduceCtrl",function($scope,$ionicScrollDelegate,$ionicSlideBoxDelegate,itzhao,$rootScope){
    $ionicScrollDelegate.$getByHandle('talk').scrollBottom();
    $scope.scrollTalkToTop=function(){
      $ionicScrollDelegate.$getByHandle('talk').scrollTop();
    }
    $scope.scrollTalkToBottom=function(){
      $ionicScrollDelegate.$getByHandle('talk').scrollBottom();
    }
    var socket = new WebSocket('ws://139.196.23.131:7070/ddcb/websocket?courseId=' + $rootScope.courseInfoEntrycourseId + '&userId=' + itzhao.userInfo.userId);
    socket.onopen = function(event) {
      // 发送一个初始化消息
      //socket.send('I am the client and I\'m listening!');
      //console.log("begin socket!")
      // 监听消息
      socket.onmessage = function(event) {
        //console.log('Client received a message',event);
        var photo = itzhao.check.isEmpty(event.data.userPhoto) ? "img/persion.png" : "http://139.196.23.131:7070/ddcb/" + event.data.userPhoto;
	    var str="<div class='talk-col'><div class='talk-left'><img src='img/right.png'/> <p>"+$scope.sendData+"</p></div><img src='"+photo+"'/></div>";
	    $("div[compent='talk-unit']").append(str);
      };

      // 监听Socket的关闭
      socket.onclose = function(event) {
        console.log('Client notified socket has closed',event);
      };
      // 关闭Socket....
      //socket.close()
    };
    $scope.sendMessage=function(){
      if(itzhao.check.isEmpty($scope.sendData)) {
      	itzhao.alertTip("不能发送空信息！");
      } else {
	      $ionicScrollDelegate.$getByHandle('talk').scrollBottom();
	      var photo = itzhao.check.isEmpty($rootScope.userComm.userPhoto) ? "img/person.png" : "http://139.196.23.131:7070/ddcb/" + $rootScope.userComm.userPhoto;
	      var str="<div class='talk-col'><div class='talk-left'><img src='img/right.png'/> <p>"+$scope.sendData+"</p></div><img src='"+photo+"'/></div>";
	      $("div[compent='talk-unit']").append(str);
      }
    }
  })
