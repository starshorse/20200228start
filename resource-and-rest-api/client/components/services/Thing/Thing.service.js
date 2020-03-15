'use strict';

angular.module('resourceAndRestApiApp')
    .service('Thing', function ($resource) {
      return $resource('/api/things/:id', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      });
    });


