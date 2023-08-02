angular.
  module('phoneList').
  component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller:['$http','Phone',function PhoneListController($http, Phone) {
/*		
	  var self = this;
	  self.orderProp = 'age' 
      this.phones = [
        {
          name: 'Nexus S',
          snippet: 'Fast just got faster with Nexus S.',
          age: 1
        }, {
          name: 'Motorola XOOM™ with Wi-Fi',
          snippet: 'The Next, Next Generation tablet.',
          age: 2
        }, {
          name: 'MOTOROLA XOOM™',
          snippet: 'The Next, Next Generation tablet.',
          age: 3
        }
      ];

     this.orderProp = 'age';
	 var phones  ;
	(( async ()=>{ phones =  await $http.get('phones/phones.json');
	               self.phones = phones.data 
	})()) 	
	 $http.get('phones/phones.json').then(( response)=>{ self.phones = response.data } )				   
*/
	     this.phones = Phone.query()
		this.orderProp = 'age';
//     $scope.$apply() 	
	}]
  });
