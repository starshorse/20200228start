angular.module('phoneDetail').
	component('phoneDetail', {
//		template: 'TBD: Detail view for <span>{$ctrl.phoneId}</span>',
		templateUrl: 'phone-detail/phone-detail.template.html',
		controller:['$http','$routeParams','Phone', 
			function PhoneDetailController($http, $routeParams, Phone ){
				var self = this;
				self.phoneId = $routeParams.phoneId; 
			    
				self.setImage = function setImage( imageUrl ){
					self.mainImageUrl = imageUrl; 
				};
	/*	
				$http.get('phones/' + $routeParams.phoneId + '.json').then( function( response ){
					self.phone = response.data; 
					self.setImage( self.phone.images[0] );
				})
	*/
				self.phone = Phone.get({ phoneId: $routeParams.phoneId }, function( phone ){
					self.setImage( phone.images[0] )
				})
			}]
	});	
