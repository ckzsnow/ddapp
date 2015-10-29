/**
 * Created by itzhaocn on 2015/10/19.
 */
angular.module('course.controllers', [])
  .controller('courseLastCtrl', function ($rootScope, $scope, itzhao, $ionicSlideBoxDelegate, $LocalStorage,$course) {
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.$getByHandle('image-viewer').update();
    $scope.loadMore = function () {
      if($rootScope.MoreDataloading2){
        $course.getMoreCarefullyChosenCourse();
      }else{
        $scope.noMoreDataloading=!$rootScope.MoreDataloading2
      };
      $scope.$broadcast('scroll.infiniteScrollComplete');
    };
  })
  .controller("courseProCtrl",function($scope){

  })
  .controller("courseInfoCtrl",function($scope,$ionicScrollDelegate,$ionicSlideBoxDelegate,itzhao){
    $scope.scrollTalkToTop=function(){
      $ionicScrollDelegate.$getByHandle('talk').scrollTop();
    }
    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.$getByHandle('image-course').next();
    };
    $scope.preSlide = function() {
      $ionicSlideBoxDelegate.$getByHandle('image-course').previous();
    };
    $scope.slideHasChanged=function($index){
      getIndex();
    }
    $scope.currentIndex=1;
    function getIndex(){
      //$scope.currentIndex=$ionicSlideBoxDelegate.$getByHandle('image-course').currentIndex();
      $scope.currentIndex=$ionicSlideBoxDelegate.$getByHandle('image-course').currentIndex()+1;
      alert($scope.currentIndex)
    }

    // 创建一个Socket实例
    var socket = new WebSocket('ws://139.196.23.131:7070/ddcb/websocket?courseId=2&userId=333&userName=weizhao&userPhoto=/views/p2.jpg');

// 打开Socket
    socket.onopen = function(event) {
      // 发送一个初始化消息
      //socket.send('I am the client and I\'m listening!');
      console.log("begin socket!")
      // 监听消息
      socket.onmessage = function(event) {
        console.log('Client received a message',event);
      };

      // 监听Socket的关闭
      socket.onclose = function(event) {
        console.log('Client notified socket has closed',event);
      };
      // 关闭Socket....
      //socket.close()
    };
    $scope.sendMessage=function(){
      var str="<div class='talk-col'><div class='talk-left'><img src='img/right.png'/> <p>"+$scope.sendData+"</p></div><img src='img/person.jpg'/></div>";
      $("div[compent='talk-unit']").prepend(str);
      //if(!itzhao.check.isEmpty($scope.sendData)){
      //  alert($scope.sendData);
      //  socket.send($scope.sendData);
      //}
    }
  })
