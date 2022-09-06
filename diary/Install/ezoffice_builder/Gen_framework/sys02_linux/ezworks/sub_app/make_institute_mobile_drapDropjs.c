#include <stdio.h>
char *code = " \
angular.module('myDrapDrop',[])\n\
.directive('dragItem', function(){\n\
	return{\n\
		restrict: 'A',\n\
		link:function( scope, elem, attr, controller){\n\
			elem.bind('dragstart', function(evt){\n\
				var id = elem.attr('id') \n\
                evt.originalEvent.dataTransfer.setData('text', id )\n\
			})\n\
		}\n\
	}\n\
})\n\
.directive('dropItem',function(){\n\
	return{\n\
		restrict:'A',\n\
		link: function( scope, elem, attr, controller){\n\
			elem.bind('dragover', function(evt){\n\
				if( evt.preventDefault){\n\
					evt.preventDefault()\n\
				}\n\
				if(evt.stopPropagation){\n\
					evt.stopPropagation()\n\
				}\n\
				evt.originalEvent.dataTransfer.dropEffect='move'\n\
				return false\n\
			})\n\
            elem.bind('drop',function(evt){\n\
				evt.preventDefault()\n\
				var data = evt.originalEvent.dataTransfer.getData('text')\n\
				elem[0].appendChild( document.getElementById(data))\n\
			})\n\
		}\n\
	}\n\
})\n\
";
int main(int argc, char** argv ){
	FILE *pfile = NULL;
	pfile = fopen("drapDrop.js","w");
	fputs(code,pfile);
	fclose(pfile);
	return 0; 
}
