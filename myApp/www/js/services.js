angular.module('starter.services', [])
  .factory('itzhao', function ($http, ApiEndpoint, $ionicLoading, $ionicPopup) {
    var loadingShow = function () {
      $ionicLoading.show({
        template: '加载中...',
        duration: 10000
      });
    };
    var loadingHide = function () {
      $ionicLoading.hide();
    };
    return {
      alertTip: function (data,callback,tip) {
        var tips = this.check.isEmpty(tip) ? "豆兵提示" : tip;
        var alertPopup = $ionicPopup.alert({
          title: tips,
          template: data
        });
        alertPopup.then(function(res) {
          if(callback) callback();
          console.log('Thank you for not eating my delicious ice cream cone');
        });
      },
      get: function (url, callBack, errback) {
        console.log("begin to load" + url);
        loadingShow();
        $http.get(ApiEndpoint.url + url)
          .success(function (data) {
            loadingHide();
            callBack(data);
            console.log('Got some data: ', data);
          }).error(function (data, status, headers, config) {
            loadingHide();
            if (errback) {
              errback(data);
            } else {
              if (data.error) {
                $ionicPopup.alert({
                  title: "itzhao提示",
                  template: data.error
                });
              } else {
                $ionicPopup.alert({
                  title: "itzhao提示",
                  template: "服务器异常，请稍后再试！错误状态" + data
                });
              }
            }
          })
      },
      NG: function (type,url,data,callBack,errback) {
        console.log("begin to load" + url);
        loadingShow();
        $http({
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          method: type,
          data: $.param(data),
          url: ApiEndpoint.url + url,
          responseType: 'json'
        }).success(function (data){
          loadingHide();
          callBack(data);
          console.log('Got some data: ', data);
        }).error(function (data, status, headers, config) {
          loadingHide();
          errback(data)||(function(data){
            if (errback) {
              errback(data);
            } else {
              if (data.error) {
                $ionicPopup.alert({
                  title: "豆兵提示",
                  template: data.error
                });
              } else {
                $ionicPopup.alert({
                  title: "豆兵提示",
                  template: "服务器异常，请稍后再试！错误状态" + data
                });
              }
            }
          })()
        })
      },
      JQ: function (type, url, data, isShowLoading, callBack, errback) {
        console.log("begin to load and data" + url + "--data--" + JSON.stringify(data));
        if(isShowLoading) loadingShow();
        var config = {withCredential: true};
        $.ajax({
          contentType: 'application/x-www-form-urlencoded',
          method: type,
          data: $.param(data),
          url: ApiEndpoint.url + url,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          dataType: 'json'
        }).success(function (data) {
          if(isShowLoading) loadingHide();
          callBack(data);
          console.log('Got some data: ', data);
        }).error(function (data, status, headers, config) {
          //alert("交互失败"+JSON.stringify(data))
          if(isShowLoading) loadingHide();
          errback(data)||(function(data){
            if (errback) {
              errback(data);
            } else {
              if (data.error) {
                $ionicPopup.alert({
                  title: "豆兵提示",
                  template: data.error
                });
              } else {
                $ionicPopup.alert({
                  title: "豆兵提示",
                  template: "服务器异常，请稍后再试！错误状态" + data
                });
              }
            }
          })()
        })
      },
      http: function (url, data, callBack, errback) {
        var methodType = this.check.isEmpty(data.methodType) ? "post" : data.methodType;
        loadingShow();
        $http({
          method: methodType,
          data: $.param(data),
          url: ApiEndpoint.url + url,
          responseType: 'json'
        }).success(function (data) {
          loadingHide();
          callBack(data);
          console.log('Got some data: ', data);
        }).error(function (data, status, headers, config) {
          alert("httperror");
          alert();
          loadingHide();
          if (this.check.isEmpty(errback)) {
            if (data.error) {
              this.alertTip(data.error)
            } else {
              this.alertTip("服务器异常，请稍后再试！错误状态" + data);
            }
          } else {
            errback(data)
          }
        })
      },
      userInfo: {
        userId:"",
        otherInfo:{},
        addCourserData:{},
        setUserInfo:function(itzhao,$rootScope){
          //$rootScope.userComm={"userId":"111","userName":"1","userPhoto":"1","userSex":0,"industryId":1,"industryName":"金融","companyName":"2","companyPosition":"3","workYearId":1,"workYear":"1年","provinceId":"100100","provinceName":"未知","cityId":"100101","cityName":"未知","areaId":"100102","areaName":"未知","resume":"11","createTime":1444376372000};
          //itzhao.userInfo.otherInfo={"userId":"111","userName":"1","userPhoto":"1","userSex":0,"industryId":1,"industryName":"金融","companyName":"2","companyPosition":"3","workYearId":1,"workYear":"1年","provinceId":"100100","provinceName":"未知","cityId":"100101","cityName":"未知","areaId":"100102","areaName":"未知","resume":"11","createTime":1444376372000};
          itzhao.JQ("get","/userProfile/getUserProfile?userId="+itzhao.userInfo.userId,{},"show",function(data){
            if(data.result){
              itzhao.userInfo.otherInfo=data.result;
              $rootScope.userComm=data.result;
            }else{

            }
          })
        }
      },
      produceSeachInfo: {},
      customerInfo: {},
      loading: {
        show: loadingShow(),
        hide: loadingHide()
      },
      check: {
        isEmpty: function (obj) {
          if (obj == null || obj == undefined || ("" + obj) == "") {
            return true;
          }
          return false;
        },
        isPhone: function (str) {
          var regu = /^(((\(\d{2,3}\))|(\d{3}\-))?1[0-9]\d{9})?$/;
          return regu.test(str);
        },
        isInteger: function (str) {
          var regu = /^[0-9]*[1-9][0-9]*$/;
          return regu.test(str);
        },
        isNumber: function (str) {
          var regu = /^[0-9][0-9]*$/;
          return regu.test(str);
        },
        isMoney: function (str) {
          var regu = /^[0-9]*(\.[0-9]{1,2})?$/;
          return regu.test(str);
        },
        isMobile: function (str) {
          var regu = /^(13[4-9]|15[0-2]|15[7-9]|18(7|8|2|3|4)|147)\d{8}$/;
          return regu.test(str);
        },
        isMobilePrefix: function (str) {
          var regu = /^(13[4-9]|15[0-2]|15[7-9]|18(7|8|2|3|4)|147)/;
          return regu.test(str);
        },
        isTelecom: function (str) {
          var regu = /^(133|153|180|181|189)\d{8}$/;
          return regu.test(str);
        },
        isTelecomPrefix: function (str) {
          var regu = /^(133|153|180|181|189)/;
          return regu.test(str);
        },
        isUnicom: function (str) {
          var regu = /^(13[0-2]|15(5|6)|185|186|145)\d{8}$/;
          return regu.test(str);
        },
        isUnicomPrefix: function (str) {
          var regu = /^(13[0-2]|15(5|6)|185|186|145)/;
          return regu.test(str);
        },
        isChineseName: function (str) {
          var temp = JK.convert.trim(str);
          //如果是中文，且名称是2~4位，则为正式的名称
          if (("" + temp).length > 1 && ("" + temp).length < 5 && JK.check.isChinese(temp)) {
            return true;
          }
          return false;
        },
        isChinese: function (str) {
          var temp = JK.convert.trim(str);
          if (JK.check.isEmpty(temp)) return false;
          for (var i = 0; i < temp.length; i++) {
            var tempChar = temp[i];
            if (escape(tempChar).indexOf("%u") < 0) return false;
          }
          return true;
        },
        isIdNum: function (card) {
          // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
          var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          return reg.test(card);
        },
        isPC: function () {
          var sUserAgent = navigator.userAgent.toLowerCase();
          var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
          var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
          var bIsMidp = sUserAgent.match(/midp/i) == "midp";
          var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
          var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
          var bIsAndroid = sUserAgent.match(/android/i) == "android";
          var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
          var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
          if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
            return true;
          } else {
            return false;
          }
        },
        isEmail: function (str) {
          var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
          return myreg.test(str);
        }
      }
    };
  }).factory('jpushService', ['$http', '$window', function ($http, $window) {
    var jpushServiceFactory = {};
    //var jpushapi=$window.plugins.jPushPlugin;
    //启动极光推送
    var _init = function () {
      $window.plugins.jPushPlugin.init();
      $window.plugins.jPushPlugin.setDebugMode(true);
    }
    //停止极光推送
    var _stopPush = function () {
      $window.plugins.jPushPlugin.stopPush();
    }
    //重启极光推送
    var _resumePush = function () {
      $window.plugins.jPushPlugin.resumePush();
    }
    //设置标签和别名
    var _setTagsWithAlias = function (tags, alias) {
      $window.plugins.jPushPlugin.setTagsWithAlias(tags, alias);
    }
    //设置标签
    var _setTags = function (tags) {
      $window.plugins.jPushPlugin.setTags(tags);
    }
    //设置别名
    var _setAlias = function (alias) {
      $window.plugins.jPushPlugin.setAlias(alias);
    }
    jpushServiceFactory.init = _init;
    jpushServiceFactory.stopPush = _stopPush;
    jpushServiceFactory.resumePush = _resumePush;
    jpushServiceFactory.setTagsWithAlias = _setTagsWithAlias;
    jpushServiceFactory.setTags = _setTags;
    jpushServiceFactory.setAlias = _setAlias;
    return jpushServiceFactory;
  }]).factory("$LocalStorage", ["$window", function ($window) {
    return {
      set: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    }
  }]).factory("statement", function (){
      return{
        province:[{"id":1,"provinceId":"110000","province":"北京市"},{"id":2,"provinceId":"120000","province":"天津市"},{"id":3,"provinceId":"130000","province":"河北省"},{"id":4,"provinceId":"140000","province":"山西省"},{"id":5,"provinceId":"150000","province":"内蒙古自治区"},{"id":6,"provinceId":"210000","province":"辽宁省"},{"id":7,"provinceId":"220000","province":"吉林省"},{"id":8,"provinceId":"230000","province":"黑龙江省"},{"id":9,"provinceId":"310000","province":"上海市"},{"id":10,"provinceId":"320000","province":"江苏省"},{"id":11,"provinceId":"330000","province":"浙江省"},{"id":12,"provinceId":"340000","province":"安徽省"},{"id":13,"provinceId":"350000","province":"福建省"},{"id":14,"provinceId":"360000","province":"江西省"},{"id":15,"provinceId":"370000","province":"山东省"},{"id":16,"provinceId":"410000","province":"河南省"},{"id":17,"provinceId":"420000","province":"湖北省"},{"id":18,"provinceId":"430000","province":"湖南省"},{"id":19,"provinceId":"440000","province":"广东省"},{"id":20,"provinceId":"450000","province":"广西壮族自治区"},{"id":21,"provinceId":"460000","province":"海南省"},{"id":22,"provinceId":"500000","province":"重庆市"},{"id":23,"provinceId":"510000","province":"四川省"},{"id":24,"provinceId":"520000","province":"贵州省"},{"id":25,"provinceId":"530000","province":"云南省"},{"id":26,"provinceId":"540000","province":"西藏自治区"},{"id":27,"provinceId":"610000","province":"陕西省"},{"id":28,"provinceId":"620000","province":"甘肃省"},{"id":29,"provinceId":"630000","province":"青海省"},{"id":30,"provinceId":"640000","province":"宁夏回族自治区"},{"id":31,"provinceId":"650000","province":"新疆维吾尔自治区"},{"id":32,"provinceId":"710000","province":"台湾省"},{"id":33,"provinceId":"810000","province":"香港特别行政区"},{"id":34,"provinceId":"820000","province":"澳门特别行政区"}],
        workYear:[{"id":1,"name":"1年","createTime":1444314708000},{"id":2,"name":"2年","createTime":1444314716000},{"id":3,"name":"3年","createTime":1444314726000},{"id":4,"name":"4年","createTime":1444314739000},{"id":5,"name":"5年","createTime":1444314753000},{"id":6,"name":"6年","createTime":1444314764000},{"id":7,"name":"7年","createTime":1444314773000},{"id":8,"name":"8年","createTime":1444314782000},{"id":9,"name":"9年","createTime":1444314791000},{"id":10,"name":"10年","createTime":1444314800000},{"id":11,"name":"10~15年","createTime":1444314816000},{"id":12,"name":"15年以上","createTime":1444314826000}],
        industry:[{"id":1,"name":"金融","icon":"img/industry/jinrong.png","createTime":1444277145000},{"id":2,"name":"咨询","icon":"img/industry/zixun.png","createTime":1444277147000},{"id":3,"name":"法律","icon":"img/industry/falv.png","createTime":1444277150000},{"id":4,"name":"财务","icon":"img/industry/caiwu.png","createTime":1444277153000},{"id":5,"name":"互联网","icon":"img/industry/hulianwang.png","createTime":1444277155000},{"id":6,"name":"教育","icon":"img/industry/jiaoyu.png","createTime":1444277158000},{"id":7,"name":"IT","icon":"img/industry/it.png","createTime":1444277161000},{"id":8,"name":"地产","icon":"img/industry/dichan.png","createTime":1444277163000},{"id":9,"name":"医疗健康","icon":"img/industry/yiliaojiankang.png","createTime":1444277165000}],
        field:{"1":[{"id":1,"industryId":1,"name":"投资银行","icon":"img/field/touziyinhang.png","createTime":1444277202000},{"id":2,"industryId":1,"name":"商业银行","icon":"img/field/shangyeyinhang.png","createTime":1444277286000},{"id":3,"industryId":1,"name":"基金","icon":"img/field/jijin.png","createTime":1444277289000},{"id":4,"industryId":1,"name":"保险","icon":"img/field/baoxian.png","createTime":1444277292000},{"id":5,"industryId":1,"name":"证券","icon":"img/field/zhengquan.png","createTime":1444277295000},{"id":6,"industryId":1,"name":"担保","icon":"img/field/danbao.png","createTime":1444277297000},{"id":7,"industryId":1,"name":"信托","icon":"img/field/xintuo.png","createTime":1444277300000},{"id":8,"industryId":1,"name":"财务顾问","icon":"img/field/caiwuguwen.png","createTime":1444277302000},{"id":9,"industryId":1,"name":"典当","icon":"img/field/diandang.png","createTime":1444277305000},{"id":10,"industryId":1,"name":"期货","icon":"img/field/qihuo.png","createTime":1444277307000}],"2":[{"id":11,"industryId":2,"name":"管理咨询","icon":"img/field/guanlizixun.png","createTime":1444277813000},{"id":12,"industryId":2,"name":"市场调查","icon":"img/field/shichangdiaocha.png","createTime":1444277815000},{"id":13,"industryId":2,"name":"人力资源","icon":"img/field/renliziyuan.png","createTime":1444277817000},{"id":14,"industryId":2,"name":"营销服务","icon":"img/field/yingxiaofuwu.png","createTime":1444277820000},{"id":15,"industryId":2,"name":"IT服务","icon":"img/field/itfuwu.png","createTime":1444277822000},{"id":16,"industryId":2,"name":"工程咨询","icon":"img/field/gongchengzixun.png","createTime":1444277825000}],"3":[{"id":17,"industryId":3,"name":"法律","icon":"img/field/falv.png","createTime":1444277834000}],"4":[{"id":18,"industryId":4,"name":"公司财务","icon":"img/field/gongsicaiwu.png","createTime":1444277836000}],"5":[{"id":19,"industryId":5,"name":"社交","icon":"img/field/shejiao.png","createTime":1444277838000},{"id":20,"industryId":5,"name":"金融","icon":"img/field/jinrong.png","createTime":1444277841000},{"id":21,"industryId":5,"name":"电子商务","icon":"img/field/dianzishangwu.png","createTime":1444277843000},{"id":22,"industryId":5,"name":"医疗","icon":"img/field/yiliao.png","createTime":1444277845000},{"id":23,"industryId":5,"name":"广告","icon":"img/field/guanggao.png","createTime":1444277847000},{"id":24,"industryId":5,"name":"影音娱乐","icon":"img/field/yingyinyule.png","createTime":1444277849000},{"id":25,"industryId":5,"name":"传媒","icon":"img/field/chuanmei.png","createTime":1444277854000},{"id":26,"industryId":5,"name":"智能硬件","icon":"img/field/zhinengyingjian.png","createTime":1444277856000},{"id":27,"industryId":5,"name":"企业服务","icon":"img/field/qiyefuwu.png","createTime":1444277862000},{"id":28,"industryId":5,"name":"教育","icon":"img/field/jiaoyu.png","createTime":1444277864000},{"id":29,"industryId":5,"name":"旅游","icon":"img/field/lvyou.png","createTime":1444277866000},{"id":30,"industryId":5,"name":"汽车","icon":"img/field/qiche.png","createTime":1444277868000},{"id":31,"industryId":5,"name":"游戏","icon":"img/field/youxi.png","createTime":1444277871000},{"id":32,"industryId":5,"name":"招聘","icon":"img/field/zhaopin.png","createTime":1444277875000},{"id":33,"industryId":5,"name":"大数据","icon":"img/field/dashuju.png","createTime":1444277877000},{"id":34,"industryId":5,"name":"餐饮","icon":"img/field/canyin.png","createTime":1444277880000},{"id":35,"industryId":5,"name":"O2O","icon":"img/field/o2o.png","createTime":1444277882000},{"id":36,"industryId":5,"name":"文化体育","icon":"img/field/wenhuatiyu.png","createTime":1444277884000},{"id":37,"industryId":5,"name":"信息技术","icon":"img/field/xinxijishu.png","createTime":1444277887000},{"id":38,"industryId":5,"name":"工具服务","icon":"img/field/gongjufuwu.png","createTime":1444277890000},{"id":39,"industryId":5,"name":"物流","icon":"img/field/wuliu.png","createTime":1444277894000}],"6":[{"id":40,"industryId":6,"name":"语言培训","icon":"img/field/yuyanpeixun.png","createTime":1444277896000},{"id":41,"industryId":6,"name":"职业培训","icon":"img/field/zhiyepeixun.png","createTime":1444277899000},{"id":42,"industryId":6,"name":"留学","icon":"img/field/liuxue.png","createTime":1444277901000},{"id":43,"industryId":6,"name":"中小学课程","icon":"img/field/zhongxiaoxuekecheng.png","createTime":1444277920000},{"id":44,"industryId":6,"name":"IT培训","icon":"img/field/itpeixun.png","createTime":1444277923000},{"id":45,"industryId":6,"name":"院校","icon":"img/field/yuanxiao.png","createTime":1444277927000}],"7":[{"id":46,"industryId":7,"name":"软件","icon":"img/field/ruanjian.png","createTime":1444277929000},{"id":47,"industryId":7,"name":"硬件","icon":"img/field/yingjian.png","createTime":1444277931000},{"id":48,"industryId":7,"name":"半导体/集成电路","icon":"img/field/bandaoti.png","createTime":1444277933000},{"id":49,"industryId":7,"name":"电子技术","icon":"img/field/dianzijishu.png","createTime":1444277935000},{"id":50,"industryId":7,"name":"通讯","icon":"img/field/tongxun.png","createTime":1444277938000}],"8":[{"id":51,"industryId":8,"name":"房地产","icon":"img/field/fangdichan.png","createTime":1444277940000},{"id":52,"industryId":8,"name":"建筑","icon":"img/field/jianzhu.png","createTime":1444277943000},{"id":53,"industryId":8,"name":"建材","icon":"img/field/jiancai.png","createTime":1444277958000},{"id":54,"industryId":8,"name":"物业","icon":"img/field/wuye.png","createTime":1444277960000}],"9":[{"id":55,"industryId":9,"name":"医疗","icon":"img/field/yiliao.png","createTime":1444277962000},{"id":56,"industryId":9,"name":"生物制药","icon":"img/field/shengwuzhiyao.png","createTime":1444277964000},{"id":57,"industryId":9,"name":"医疗设备","icon":"img/field/yiliaoshebei.png","createTime":1444277966000}]},
        stage:[{"id":1,"name":"求职面试","icon":"/appfile/icons/stage/","createTime":1444280451000},{"id":2,"name":"从业技能","icon":"/appfile/icons/stage/","createTime":1444280469000},{"id":4,"name":"创业","icon":"/appfile/icons/stage/","createTime":1444283396000},{"id":3,"name":"行业经验","icon":"/appfile/icons/stage/","createTime":1444283518000}],
      }
  }).factory("$course", function (itzhao, $rootScope, $LocalStorage, $timeout) {
    $rootScope.pageChosen = 1;
    $rootScope.pageLatest = 1;
    $rootScope.pageRecommend = 1;
    $rootScope.chosenScrollLoadMore = false;
    $rootScope.latestScrollLoadMore = false;
    $rootScope.recommendScrollLoadMore = false;
    $rootScope.initChosenData = true;
    $rootScope.initLatestData = true;
    $rootScope.initRecommendData = true;    
    $rootScope.amountPerPage = 5;
    
    $rootScope.pageMyOrder = 1;
    $rootScope.pageMyOrderFinish = 1;
    $rootScope.myOrderScrollLoadMore = false;
    $rootScope.myOrderFinishScrollLoadMore = false;
    $rootScope.initMyOrderData = true;
    $rootScope.initMyOrderFinishData = true;
    $rootScope.myOrderCourse = new Array();
    $rootScope.myOrderFinishCourse = new Array();
    
    $rootScope.pageMyOpen = 1;
    $rootScope.myOpenScrollLoadMore = false;
    $rootScope.initMyOpenData = true;
    $rootScope.myOpenCourse = new Array();
    
    $rootScope.chosenCourse = new Array();
    $rootScope.latestCourse = new Array();
    $rootScope.recommedCourse = new Array();
    return {
    	getMyOpenCourse: function ($scope, type) {
      	itzhao.JQ("get",'/userCourse/getPublishCourse?page=' + $rootScope.pageMyOpen + '&amountPerPage=' + $rootScope.amountPerPage,{}, null, function (data) {
          if(data.errorCode=="6000") {
            if (!itzhao.check.isEmpty(data.resultList)) {
            	if(type=="refresh") {
            		$rootScope.myOpenCourse = [];
            		$rootScope.pageMyOpen = 1 ;
            	} else {
            		$rootScope.pageMyOpen++;
            	}
            	$rootScope.myOpenCourse = $rootScope.myOpenCourse.concat(data.resultList);
              //alert($rootScope.chosenCourse);
            }
            if(type=="refresh") {
            	if(!itzhao.check.isEmpty(data.resultList) && data.resultList.length>=$rootScope.amountPerPage) {
            		$rootScope.pageMyOpen++;
            		$rootScope.myOpenScrollLoadMore = true;
            	}
            	if($rootScope.initMyOpenData) {
            		$rootScope.initMyOpenData = false;
            	}
            }
          } else if(data.errorCode=="6002") {
          	$rootScope.myOpenScrollLoadMore = false;
          	if(type=='refresh') {
          		$rootScope.myOpenCourse = [];
          		$rootScope.pageMyOpen = 1 ;
          	}
          } else {
          	$rootScope.myOpenScrollLoadMore = false;
          	itzhao.alertTip(data.errorMsg);
          }
          if(type=='refresh') {
          	$scope.$broadcast('scroll.refreshComplete');
          	if($rootScope.initMyOpenData) {
            	$rootScope.initMyOpenData = false;
            }
          } else {
			    	$scope.$broadcast('scroll.infiniteScrollComplete');
			    }
        }, function (data) {
        	$rootScope.myOpenScrollLoadMore = false;
        	if(type=='refresh') {
          	$scope.$broadcast('scroll.refreshComplete');
          	if($rootScope.initMyOpenData) {
            	$rootScope.initMyOpenData = false;
            }
          } else {
          	$scope.$broadcast('scroll.infiniteScrollComplete');
          }
          itzhao.alertTip(data.errorMsg);
        });
      },
    	getMyOrderFinishCourse: function ($scope, type) {
      	itzhao.JQ("get",'/userCourse/getFinishedSubscribeCourse?page=' + $rootScope.pageMyOrderFinish + '&amountPerPage=' + $rootScope.amountPerPage,{}, null, function (data) {
          if(data.errorCode=="6000") {
            if (!itzhao.check.isEmpty(data.resultList)) {
            	if(type=="refresh") {
            		$rootScope.myOrderFinishCourse = [];
            		$rootScope.pageMyOrderFinish = 1 ;
            	} else {
            		$rootScope.pageMyOrderFinish++;
            	}
            	$rootScope.myOrderFinishCourse = $rootScope.myOrderFinishCourse.concat(data.resultList);
              //alert($rootScope.chosenCourse);
            }
            if(type=="refresh") {
            	if(!itzhao.check.isEmpty(data.resultList) && data.resultList.length>=$rootScope.amountPerPage) {
            		$rootScope.pageMyOrderFinish++;
            		$rootScope.myOrderFinishScrollLoadMore = true;
            	}
            	if($rootScope.initMyOrderFinishData) {
            		$rootScope.initMyOrderFinishData = false;
            	}
            }
          } else if(data.errorCode=="6002") {
          	$rootScope.myOrderFinishScrollLoadMore = false;
          	if(type=='refresh') {
          		$rootScope.myOrderFinishCourse = [];
          		$rootScope.pageMyOrderFinish = 1 ;
          	}
          } else {
          	$rootScope.myOrderFinishScrollLoadMore = false;
          	itzhao.alertTip(data.errorMsg);
          }
          if(type=='refresh') {
          	$scope.$broadcast('scroll.refreshComplete');
          	if($rootScope.initMyOrderFinishData) {
            	$rootScope.initMyOrderFinishData = false;
            }
          } else {
			    	$scope.$broadcast('scroll.infiniteScrollComplete');
			    }
        }, function (data) {
        	$rootScope.myOrderFinishScrollLoadMore = false;
        	if(type=='refresh') {
          	$scope.$broadcast('scroll.refreshComplete');
          	if($rootScope.initMyOrderFinishData) {
            	$rootScope.initMyOrderFinishData = false;
            }
          } else {
          	$scope.$broadcast('scroll.infiniteScrollComplete');
          }
          itzhao.alertTip(data.errorMsg);
        });
      },
    	getMyOrderCourse: function ($scope, type) {
      	itzhao.JQ("get",'/userCourse/getOngoingSubscribeCourse?page=' + $rootScope.pageMyOrder + '&amountPerPage=' + $rootScope.amountPerPage,{}, null, function (data) {
          if(data.errorCode=="6000") {
            if (!itzhao.check.isEmpty(data.resultList)) {
            	if(type=="refresh") {
            		$rootScope.myOrderCourse = [];
            		$rootScope.pageMyOrder = 1;
            	} else {
            		$rootScope.pageMyOrder++;
            	}
            	$rootScope.myOrderCourse = $rootScope.myOrderCourse.concat(data.resultList);
              //alert($rootScope.chosenCourse);
            }
            if(type=="refresh") {
            	if(!itzhao.check.isEmpty(data.resultList) && data.resultList.length>=$rootScope.amountPerPage) {
            		$rootScope.pageMyOrder++;
            		$rootScope.myOrderScrollLoadMore = true;
            	}
            	if($rootScope.initMyOrderData) {
            		$rootScope.initMyOrderData = false;
            	}
            }
          } else if(data.errorCode=="6002") {
          	$rootScope.myOrderScrollLoadMore = false;
          	if(type=='refresh') {
          		$rootScope.myOrderCourse = [];
          		$rootScope.pageMyOrder = 1;
          	}
          } else {
          	$rootScope.myOrderScrollLoadMore = false;
          	itzhao.alertTip(data.errorMsg);
          }
          if(type=='refresh') {
          	$scope.$broadcast('scroll.refreshComplete');
          	if($rootScope.initMyOrderData) {
            	$rootScope.initMyOrderData = false;
            }
          } else {
			    	$scope.$broadcast('scroll.infiniteScrollComplete');
			    }
        }, function (data) {
        	$rootScope.myOrderScrollLoadMore = false;
        	if(type=='refresh') {
          	$scope.$broadcast('scroll.refreshComplete');
          	if($rootScope.initMyOrderData) {
            	$rootScope.initMyOrderData = false;
            }
          } else {
          	$scope.$broadcast('scroll.infiniteScrollComplete');
          }
          itzhao.alertTip(data.errorMsg);
        });
      },
      getMoreChosenCourse: function ($scope, type) {
      	itzhao.JQ("get",'/course/getCarefullyChosenCourse?page=' + $rootScope.pageChosen + '&amountPerPage=' + $rootScope.amountPerPage,{}, null, function (data) {
          if(data.errorCode=="2000") {
            if (!itzhao.check.isEmpty(data.resultList)) {
            	if(type=="refresh") {
            		$rootScope.chosenCourse = [];
            		$rootScope.pageChosen = 1; 
            	} else {
            		$rootScope.pageChosen++;
            	}
            	$rootScope.chosenCourse = $rootScope.chosenCourse.concat(data.resultList);
              //alert($rootScope.chosenCourse);
            }
            if(type=="refresh") {
            	if(!itzhao.check.isEmpty(data.resultList) && data.resultList.length>=$rootScope.amountPerPage) {
            		$rootScope.pageChosen++;
            		$rootScope.chosenScrollLoadMore = true;
            	}
            	if($rootScope.initChosenData) {
            		$rootScope.initChosenData = false;
            	}
            }
          } else if(data.errorCode=="2001") {
          	$rootScope.chosenScrollLoadMore = false;
          	if(type=='refresh') {
          		$rootScope.chosenCourse = [];
          		$rootScope.pageChosen = 1; 
          	}
          } else {
          	$rootScope.chosenScrollLoadMore = false;
          	itzhao.alertTip(data.errorMsg);
          }
          if(type=='refresh') {
          	$scope.$broadcast('scroll.refreshComplete');
          	if($rootScope.initChosenData) {
            	$rootScope.initChosenData = false;
            }
          } else {
			    	$scope.$broadcast('scroll.infiniteScrollComplete');
			    }
        }, function (data) {
        	$rootScope.chosenScrollLoadMore = false;
        	if(type=='refresh') {
          	$scope.$broadcast('scroll.refreshComplete');
          	if($rootScope.initChosenData) {
            	$rootScope.initChosenData = false;
            }
          } else {
          	$scope.$broadcast('scroll.infiniteScrollComplete');
          }
          itzhao.alertTip(data.errorMsg);
        });
      },
      getMoreLatestCourse: function ($scope, type) {
      	itzhao.JQ("get",'/course/getLatestCourse?page=' + $rootScope.pageLatest + '&amountPerPage=' + $rootScope.amountPerPage,{}, null, function (data) {
          if(data.errorCode=="2000"){
            if (!itzhao.check.isEmpty(data.resultList)) {
            	if(type=="refresh") {
            		$rootScope.latestCourse = [];
            		$rootScope.pageLatest = 1; 
            	} else {
            		$rootScope.pageLatest++;
            	}
            	$rootScope.latestCourse = $rootScope.latestCourse.concat(data.resultList);
              //alert($rootScope.latestCourse);
            }
            if(type=="refresh") {
            	if(!itzhao.check.isEmpty(data.resultList) && data.resultList.length>=$rootScope.amountPerPage) {
            		$rootScope.pageLatest++;
            		$rootScope.latestScrollLoadMore = true;
            	}
            	if($rootScope.initLatestData) {
            		$rootScope.initLatestData = false;
            	}
            }
          } else if(data.errorCode=="2001") {
          	$rootScope.latestScrollLoadMore = false;
          	if(type=='refresh') {
          		$rootScope.latestCourse = [];
          		$rootScope.pageLatest = 1;
          	}
          } else {
          	$rootScope.latestScrollLoadMore = false;
          	itzhao.alertTip(data.errorMsg);
          }
          if(type=='refresh') {
           	$scope.$broadcast('scroll.refreshComplete');
           	if($rootScope.initLatestData) {
            	$rootScope.initLatestData = false;
            }
          } else {
			     	$scope.$broadcast('scroll.infiniteScrollComplete');
			    }
        }, function (data) {
        	$rootScope.latestScrollLoadMore = false;
        	if(type=='refresh') {
           	$scope.$broadcast('scroll.refreshComplete');
           	if($rootScope.initLatestData) {
            	$rootScope.initLatestData = false;
            }
          } else {
			     	$scope.$broadcast('scroll.infiniteScrollComplete');
			    } 
          itzhao.alertTip(data.errorMsg);
        });
      },
      getMoreRecommendCourse: function ($scope, type) {
      	itzhao.JQ("get",'/course/getRecommendCourse?page=' + $rootScope.pageRecommend + '&amountPerPage=' + $rootScope.amountPerPage,{},null,function (data) {
          if(data.errorCode=="2000"){
            if (!itzhao.check.isEmpty(data.resultList)) {
            	if(type=="refresh") {
            		$rootScope.recommedCourse = [];
            		$rootScope.pageRecommend = 1; 
            	} else {
            		$rootScope.pageRecommend++;
            	}
            	$rootScope.recommedCourse = $rootScope.recommedCourse.concat(data.resultList);
              //alert($rootScope.recommedCourse);
            } 
            if(type=="refresh") {
            	if(!itzhao.check.isEmpty(data.resultList) && data.resultList.length>=$rootScope.amountPerPage) {
            		$rootScope.pageRecommend++;
            		$rootScope.recommendScrollLoadMore = true;
            	}
            	if($rootScope.initRecommendData) {
            		$rootScope.initRecommendData = false;
            	}
            }
          } else if(data.errorCode=="2001") {
          	$rootScope.recommendScrollLoadMore = false;
          	if(type=='refresh') {
          		$rootScope.recommedCourse = [];
          		$rootScope.pageRecommend = 1; 
          	}
          } else {
          	$rootScope.recommendScrollLoadMore = false;
          	itzhao.alertTip(data.errorMsg);
          }
          if(type=='refresh') {
           	$scope.$broadcast('scroll.refreshComplete');
           	if($rootScope.initRecommendData) {
            	$rootScope.initRecommendData = false;
            }
          } else {
			     	$scope.$broadcast('scroll.infiniteScrollComplete');
			    }
        }, function (data) {
        	$rootScope.recommendScrollLoadMore = false;
        	if(type=='refresh') {
          	$scope.$broadcast('scroll.refreshComplete');
          	if($rootScope.initRecommendData) {
            	$rootScope.initRecommendData = false;
            }
          } else {
			     	$scope.$broadcast('scroll.infiniteScrollComplete');
			    } 
          itzhao.alertTip(data.errorMsg);
        });
      }
    }
  });
