if ( !_include ) var _include= {};
(function() {
	console.dir(123)
	var container= document.getElementById('container'),
		header= document.getElementById('head-area'),
		content= _include.header;
	if( typeof content !== 'undefined' ) {
		header.innerHTML= content;
		return;
	} else {
		var content="";
		content += "<div class=\"top-area\">";
		content += "	<a href=\"\/\" id=\"logo-link\" >";
		content += "		<div class=\"logo-area\">";
		content += "			<div class=\"logo\">";
		content += "			";
		content += "			<\/div>";
		content += "		<\/div>";
		content += "	<\/a>";
		content += "	<div id=\"menu-cont-area\" class=\"head-part\">";
		content += "		<ul id=\"menu-cont\">";
		content += "			<li id=\"menu-main\" class=\"list0\" data-category=\"main\" data-url=\"_sub\/_main\/main\">홈<\/li>";
		content += "			<li id=\"menu-about\" class=\"list1\" data-category=\"about\" data-url=\"_sub\/_about\/about\">소개<\/li>";
		content += "			<li id=\"menu-diet\" class=\"list2\" data-category=\"diet\" data-url=\"_sub\/_diet\/diet\">다이어트<\/li>";
		content += "			<li id=\"menu-traffic\" class=\"list3\" data-category=\"traffic\" data-url=\"_sub\/_traffic\/traffic\">교통사고<\/li>";
		content += "			<li id=\"menu-pain\" class=\"list4\" data-category=\"pain\" data-url=\"_sub\/_pain\/pain\">통증진료<\/li>";
		content += "			<!-- <li id=\"menu-book\" class=\"list5\" data-category=\"book\" data-url=\"_sub\/_book\/book\">예약하기<\/li> -->";
		content += "			<li id=\"menu-book\" class=\"list5\">";
		content += "				<a href=\"https:\/\/booking.naver.com\/booking\/13\/bizes\/180847\" target=\"_blank\">";
		content += "				예약하기<\/a>";
		content += "			<\/li>";
		content += "		<\/ul>";
		content += "	<\/div>";
		content += "	<div id=\"menu-area\" class=\"head-part\">";
		content += "		<ul id=\"menu-icon\">";
		content += "			<li class=\"line line1\"><\/li>";
		content += "			<li class=\"line line2\"><\/li>";
		content += "			<li class=\"line line3\"><\/li>";
		content += "		<\/ul>";
		content += "	<\/div>";
		content += "<\/div>";

		_include.header= content;

		/*content= _include.header= 
		"<div class='in-width'>\
	    	<div class='top-area'>\
	    		<a href='/' id='logo-link' >\
	    			<div id='logo-area'>\
	    				<div id='logo'>\
	    				\
	    				</div>\
	    			</div>\
	    		</a>\
	    		<div id='menu-cont-area' class='head-part'>\
	    			<ul id='menu-cont'>\
	    				<li class='list1' data-target='section01'>SALE</li>\
	    			</ul>\
	    		</div>\
	    		<div id='menu-area' class='head-part'>\
	    			<ul id='menu-icon'>\
	    				<li class='line line1'></li>\
	    				<li class='line line2'></li>\
	    				<li class='line line3'></li>\
	    			</ul>\
	    		</div>\
	    	</div>\
		</div>";*/
		header.innerHTML= content;
	}
}());
