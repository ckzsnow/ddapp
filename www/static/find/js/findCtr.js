/**
 * Created by itzhaocn on 2015/10/19.
 */
angular.module('find.controllers', [])
  .controller("findFieldCtrl",function($scope,itzhao,$rootScope,$ionicModal){
    $scope.testdata = [
      { text: "细分一",checked: false},
      { text: "细分二", checked: false },
      { text: "细分三", checked: false }
    ];
    $scope.testChooseArr=[];
    $ionicModal.fromTemplateUrl('find-detail.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal
    })
    $scope.openModal = function () {
      $scope.modal.show()
    }
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    $scope.changeCustomerInfo=function(){
      for(i in  $scope.testdata){
        if($scope.testdata[i].checked){
          $scope.testChooseArr.push($scope.testdata[i].text);
        }
      }
      $scope.modal.hide();
    }
  })

