$(document).ready(function(){

	$('.slider-1').slick({
		slidesToShow:2,
		autoplay:false,
		arrows:true,
		slidesToScroll:2,
		prevArrow: '<div class="slick-arrow-l-1"></div>',
		nextArrow: '<div class="slick-arrow-r-1"></div>'
	});
	$('.comment-slider').slick({
		slidesToShow:1,
		arrows:true,
		prevArrow: '<div class="previous"></div>',
		nextArrow:'<div class="next"></div>'
	});

	$('.go_to').click( function(){
	var scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
	    $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 1100);
        }
	    return false;
    });

  	$('body').append('<a href="#" id="go-top" title="Вверх"></a>');
	$(function() {
	 	$.fn.scrollToTop = function() {
	  	$(this).hide().removeAttr("href");
	  	if ($(window).scrollTop() >= "250") $(this).fadeIn("slow")
	  	var scrollDiv = $(this);
	  	$(window).scroll(function() {
	   	if ($(window).scrollTop() <= "250") $(scrollDiv).fadeOut("slow")
	   	else $(scrollDiv).fadeIn("slow")
	  	});
	  	$(this).click(function() {
	   	$("html, body").animate({scrollTop: 0}, "slow")
	  	})
	 	}
	});

		$(function() {
		 $("#go-top").scrollToTop();
	});
});