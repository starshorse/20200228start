'use strict';

angular.module('resourceAndRestApiApp')
    .controller('MainCtrl', function ($scope, Thing) {

      $scope.things = Thing.query();

      $scope.destroy = function (thing) {
        Thing.remove({id: thing.id}).$promise.then(function () {
          $scope.things = Thing.query();
        })
      };

      $scope.update = function (thing) {
        Thing.update({id: thing.id}, {status: !thing.status}).$promise.then(function () {
          $scope.things = Thing.query();
        })
      };

      $scope.create = function (form) {
        var thing = new Thing({
          name: $scope.name
        });
        thing.$save().then(function () {
          $scope.things = Thing.query();
        });
      }
    });
