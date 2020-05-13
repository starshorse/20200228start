angular.module('controllerAsExample',[])
.controller('SettingsController1',['$scope',function($scope){
//    $scope.settings.name = 'RICHARD-CHOI';
      $scope.settings.contacts = [
      ];
      $scope.settings.addContact = function(){
         $scope.settings.contacts.push({
            'name': $scope.settings.name,
            'type' : 1,
            'value' : 'xxx@naver.com',
         });
      };
      $scope.settings.clearContact = function( contact ){
           contact.type = 0;
           contact.value = "";
      };
      $scope.settings.removeContact = function( contact ){
            $scope.settings.contacts.splice( contact, 1);
      }
}]);