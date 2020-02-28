
// routing controllers..
var routeCtrls = angular.module('myNg.controllers',[]);
routeCtrls.controller('controller1',['$scope',function($scope){
    $scope.name = 'RICHARD CHOI'; 
}]);
routeCtrls.controller('controller2',['$scope',function($scope){}]);

// angular.module('myNg.controllers',[]).controller("myNgMsg",['$scope','$location', function($scope){
app.controller('myNgMsg',['$scope', function($scope){
        $scope.message =" Hello World!"; 
        var linkT = 0; 
        arrLinks =[
            "basic_01.html",
            "basic_02.html"
        ];
        $scope.myLinks = $scope.myLinksName = arrLinks[linkT];
    
        $scope.toggleAB = function(){
              linkT = (linkT+1) % 2; 
              $scope.myLinks = $scope.myLinksName = arrLinks[linkT];          
        };
        $scope.getLocation= function(){
       //     console.dir( $location);
        }
    
    }]);
 app.controller('myNgList',['$scope', function($scope){
   $scope.posts =[
       { username:'RICHARD', body:'TBTECH nology'},
       { username:'Sang', body:'ABOVE'},
       { username:'Soo', body:'SangMoon'}
   ];
   $scope.addpost = function(){
       $scope.posts.unshift({
           username:'bob', body: $scope.postBody 
       })
   }
}]);

