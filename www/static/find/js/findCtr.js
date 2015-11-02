angular.module('find.controllers', [])
	.controller("findFieldCtrl", function($scope, itzhao, $rootScope, $LocalStorage, $ionicModal, statement) {
		$rootScope.allField = statement.field;
		$scope.currentIndustryId = "";
		$scope.currentFieldId = "";
		$scope.stageInfo = {
			"1": {
				text: "求职面试",
				checked: false
			},
			"2": {
				text: "从业技能",
				checked: false
			},
			"3": {
				text: "行业经验",
				checked: false
			},
			"4": {
				text: "创业",
				checked: false
			}
		};
		$rootScope.selectedStageInfo = $LocalStorage.getObject("selected-stage-info");
		if (itzhao.check.isEmpty($rootScope.selectedStageInfo)) {
			$rootScope.selectedStageInfo = {}
		}
		$ionicModal.fromTemplateUrl('find-detail.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal
		})
		$scope.openModal = function(industryId, fieldId) {
			$scope.currentIndustryId = industryId;
			$scope.currentFieldId = fieldId;
			$scope.modal.show()
		}
		$scope.closeModal = function() {
			$scope.modal.hide();
			for (var val in $scope.stageInfo) {
				$scope.stageInfo[val].checked = false;
			}
			delete $rootScope.selectedCategoryInfo[$scope.currentIndustryId][$scope.currentFieldId];
			delete $rootScope.selectedStageInfo[$scope.currentFieldId];
			$LocalStorage.setObject("selected-category-info", $rootScope.selectedCategoryInfo);
			$LocalStorage.setObject("selected-stage-info", $rootScope.selectedStageInfo);
		};
		$scope.$on('$destroy', function() {
			$scope.modal.remove();
		});
		$scope.selectStage = function() {
			var hasSelected = false;
			var hasInit = false;
			var checkedCount = 0;
			for (var val in $scope.stageInfo) {
				if ($scope.stageInfo[val].checked) {
					if(!hasInit) {
						$rootScope.selectedStageInfo[$scope.currentFieldId] = {"name":[], "id":[]};
						hasInit = true;
					}
					checkedCount++;
					if(checkedCount >= 4) {
						itzhao.alertTip("课程方向最多只能选择三个！");
						return;
					}
					$rootScope.selectedStageInfo[$scope.currentFieldId].id.push(val);
					$rootScope.selectedStageInfo[$scope.currentFieldId].name.push($scope.stageInfo[val].text);
					hasSelected = true;
				}
			}
			if(!hasSelected) {
				itzhao.alertTip("请选择课程方向！");
			} else {
				$scope.modal.hide();
				for (var val in $scope.stageInfo) {
					$scope.stageInfo[val].checked = false;
				}
				$rootScope.selectedCategoryInfo[$scope.currentIndustryId][$scope.currentFieldId] = $rootScope.selectedStageInfo[$scope.currentFieldId].id;
				$LocalStorage.setObject("selected-category-info", $rootScope.selectedCategoryInfo);
				$LocalStorage.setObject("selected-stage-info", $rootScope.selectedStageInfo);
			}
		}
		$scope.searchCourse = function () {
			if(!$rootScope.hasLogin) {
				itzhao.alertTip("您还没有登陆，请先登陆！");
			} else {
				$rootScope.$state.transitionTo('app.home_recommend', {}, {
				    reload: true,
				    inherit: false,
				    notify: true
				});
			}
		}
	})
	.controller("findCtrl", function($scope, itzhao, $rootScope, $LocalStorage, statement) {
		$rootScope.allIndustry = statement.industry;
		$scope.nextPage = function() {
			var isEmpty = true;
			for (var val in $rootScope.selectedCategoryInfo) {
				isEmpty = false;
				break;
			}
			if (isEmpty) {
				itzhao.alertTip("请先选择行业大类！");
			} else {
				$rootScope.$state.go('app.findField');
			}
		}
		//$LocalStorage.setObject("selected-category-info", null);
		$rootScope.selectedCategoryInfo = $LocalStorage.getObject("selected-category-info");
		if (itzhao.check.isEmpty($rootScope.selectedCategoryInfo)) {
			$rootScope.selectedCategoryInfo = {}
		} else {
			for (var val in $rootScope.selectedCategoryInfo) {
				$rootScope.allIndustry[val - 1].selected = true;
			}
		}
		$scope.clickIndustry = function(index) {
			$rootScope.allIndustry[index].selected = !$rootScope.allIndustry[index].selected;
			if ($rootScope.allIndustry[index].selected) {
				if (!$rootScope.selectedCategoryInfo[index + 1]) {
					$rootScope.selectedCategoryInfo[index + 1] = {};
				}
			} else {
				if ($rootScope.selectedCategoryInfo[index + 1]) {
					delete $rootScope.selectedCategoryInfo[index + 1];
				}
			}
			$LocalStorage.setObject("selected-category-info", $rootScope.selectedCategoryInfo);
		}
	})