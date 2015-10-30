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
  .controller("findCtrl",function($scope,itzhao,$rootScope,$ionicModal,$LocalStorage,itzhao,statement){
    $scope.nextPage = function() {
    	 $rootScope.$state.go('app.findField');
    }
    $rootScope.selectedCategoryInfo = $LocalStorage.getObject("selected-category-info");
    if(itzhao.check.isEmpty($rootScope.selectedCategoryInfo)) {
    	$rootScope.selectedCategoryInfo = [{"industryId":"1", "field":[{"fieldId":"1", "stageId":[1,2,3]}]}];
    }
    $scope.industryImg = statement.industry;
    $scope.clickIndustry = function(index) {
    	$scope.industryImg[index].selected = !$scope.industryImg[index].selected;
    	
    }
  })

