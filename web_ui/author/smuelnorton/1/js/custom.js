/*
$(document).ready(function(){

})
	The jQuery
	Add magic to the styles and markup. First, enable the toggle effect using toggle-nav class through the display-nav class to hide or display the navigation. Create an anonymous function and then call our toggleNavigation function.
	Now that the entire block element is displaying properly and we already have the off-page canvas, create the jQuery sliding effect. In my jQuery code below, I created a variable to take a reference of the current menu icon by using the code: $currIcon=$(this).find(“span.the-btn”)
Then, I change all the icons back in the compressed state (the plus icon). Next, using toggle Class, switch plus/minus icons on the previously stored element $currIcon.

*/
// Calling the function
$(function() {
    $('.toggle-nav').click(function() {
        toggleNavigation();
    });
});
 
// The toggleNav function itself
function toggleNavigation() {
    if ($('#container').hasClass('display-nav')) {
        // Close Nav
        $('#container').removeClass('display-nav');
    } else {
        // Open Nav
        $('#container').addClass('display-nav');
    }
}
// SLiding codes
$("#toggle > li > div").click(function () {
    if (false == $(this).next().is(':visible')) {
        $('#toggle ul').slideUp();
    }
    var $currIcon=$(this).find("span.the-btn");
    $("span.the-btn").not($currIcon).addClass('fa-plus').removeClass('fa-minus');
    $currIcon.toggleClass('fa-minus fa-plus');
    $(this).next().slideToggle();
    $("#toggle > li > div").removeClass("active");
    $(this).addClass('active');
});
