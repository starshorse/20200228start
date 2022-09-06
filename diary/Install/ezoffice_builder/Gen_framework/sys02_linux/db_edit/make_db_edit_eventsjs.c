#include <stdio.h>

char *code = " \
angular.module('myDbEditEvents',[])\n\
.controller('myDbEditEventsCtrl',['$scope', function( $scope ){\n\
	$scope.spread.bind( $.wijmo.wijspread.Events.ActiveSheetChanging, ( sender, args )=>{\n\
        	const sheet0 = $scope.spread.getSheet(0) \n\
		    sheet0.bindColumns( $scope.headInfos )  \n\
	})\n\
}])\n\
.directive('myEvents', function(){\n\
	return {\n\
		restrict: 'E',\n\
		controller:'myDbEditEventsCtrl' \n\
	}\n\
})\n\
" ;
int main( int argc, char ** argv ){
   FILE *pFile = NULL ;
   pFile = fopen("events.js", "w");
   fputs( code, pFile );
   fclose( pFile );
   return 0; 
}
