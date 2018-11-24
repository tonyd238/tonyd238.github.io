$(document).ready(function(){

	if ($(window).width() <= 1024 ) {

	$("#mobile-nav").click(function(){
		$(".mobile-navigation").fadeIn(500);
		$(".mobile-navigation > *").fadeIn(500);
	});
	$(".close").click(function(){
		$(".mobile-navigation").fadeOut(500);
		$(".mobile-navigation > *").fadeOut(500);
		
});
};
});