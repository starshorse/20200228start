$( function(){
	$('.toggle-nav').click(function(){
		toggleNavigation();
	});
})
function toggleNavigation(){
	if($('#container').hasClass('display-nav')){
		$('#container').removeClass('display-nav');
	}else{
		$('#container').addClass('display-nav'); 
	}
}
