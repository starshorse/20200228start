app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        template:'<h1>Root(/)</h1>',
    })
    .when('/registeration',{
        controller:'myNgFrm',
        templateUrl:'./views/registeration.html', 
    })
    .when('/clientSubmit/:id/:action',{
        controller:'ctlTabQtSave',
        templateUrl:'../ClientSub/tempSave.html',
    })
    .when('/clientSubmit',{
        controller:'ctlTabQtSave',
        templateUrl:'../ClientSub/tempSave.html',
    })
    .when('/clientSubmit/:id',{
        controller:'ctlTabQtSave',
        templateUrl:'../ClientSub/tempSave.html',
    })
    .otherwise({
            template:'<h1>Default </h1>',
        })
})
.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
  }]);


