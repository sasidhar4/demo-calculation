var app = angular.module("calculator", []); 
app.controller("myCtrl", function($scope, $http) {
     
    $scope.number1 = 0;
  $scope.number2 = 0;  
  $scope.validerr =false;
  $scope.validerr1 =false;
  $scope.validateNumber1 = function(val){
    // console.log(val,'val')
    if(val <= 0 || typeof(val) != 'number'){
      $scope.validerr =true;
      $scope.validsuc=false;

    }else{
      $scope.validerr =false;
      $scope.validsuc=true;

    }
  }
  $scope.validateNumber2 = function(val){
    // console.log(val,'val')
    if(val <= 0 || typeof(val) != 'number'){
      $scope.validerr1 =true;
      $scope.validsuc1=false;

    }else{
      $scope.validerr1 =false;
      $scope.validsuc1=true;


    }
  }
  $scope.saveData =function(){
      // console.log($scope.result)

      $http({
        method: 'POST',
        url: '/saveData',
        data:{
            number1:$scope.number1,
            number2:$scope.number2,
            result:$scope.result,
        }
      }).then(function (response) {
        $scope.msg=response.message
        $scope.resultList=response.data.data;
        }, function (response) {
            $scope.msg=response.message;
        });
  }
  $scope.getData = function(id){
    $http({
        method: 'Get',
        url: '/getData',
        params:{
            id:id
        }
      }).then(function (response) {
        $scope.msg=response.message
        $scope.listData=response.data.data;
        }, function (response) {
            $scope.msg=response.message;
        });
  }

});

app.directive('clicker', function(){

    var link = function(scope){
        scope.showMessage = function(){
          //alert('you clicked the directive!');
            // console.log(scope.number1);
            // console.log(scope.number2);
        scope.result=scope.number1*scope.number2
            
        };
    };
  
    return{
      link: link,
      template: "<button class='btn btn-primary' ng-disabled='!validsuc1 || !validsuc' ng-click='showMessage()'>Calculate</button>"
    };
  
  });