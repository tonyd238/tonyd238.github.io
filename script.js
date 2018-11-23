$(document).ready(function(){

	if ($(window).width() <= 1024 ) {

	$("#mobile-nav").click(function(){
		$(".mobile-navigation").animate({opacity:1},500);
		$(".mobile-navigation").css('display','block');
		$(".mobile-navigation > *").css('display','block');
		$(".contacts-block").css('display','flex');	
	});
	$(".close").click(function(){
		$(".mobile-navigation").animate({opacity:0},500);
		$(".mobile-navigation").css('display','none');
		$(".mobile-navigation > *").css('display','none');
		$(".contacts-block").css('display','none');	
		$(".header").css('display','none');
	});
}
});