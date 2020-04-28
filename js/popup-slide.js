(function ($) {
    $.fn.PopupSlider = function (options) {
        options = $.extend({
            effect: 'left',
            buttonToggle: false,
            button: false,
            closeButton: false,
            container: 'body',
            breakpoint: false,
            lockScroll: true,
            headerFixed: false,
            onMenuOpen: false,
            onMenuClose: false
        }, options);

        //check device
        var userAgent = window.navigator.userAgent.toLowerCase(),
            ios = /iphone|ipod|ipad/.test( userAgent );

        //check touch device
        var supportsTouch = ('ontouchstart' in document.documentElement);

        //generate ID
        function iD() {
            return '_' + Math.random().toString(36).substr(2,4);
        }

        var layerId = 'layer' + iD();

        //render components
        addBackLayer(options.container, layerId);
        addCloseButton();

        //init selectors
        var __this = $(this),
            button = $(options.button),
            closeButton = $(options.container).find(options.closeButton).length ? $(options.container).find('>' + options.closeButton)[0] : document.querySelectorAll('.close-popup')[0],
            backLayer = $(options.container).find('>.back-layer').length ? $(options.container).find('>.back-layer') : $('#'+layerId),
            selectors;

            if(options.buttonToggle){
                selectors = $(__this).add(button).add(backLayer);
            }else {
                selectors = $(__this).add(button).add(closeButton).add(backLayer);
            }

        if(!options.button){
            console.error($(__this).attr("class") + ' ==> Set BUTTON selector as ".button"')
        }

        //responsive options
        options.breakpoint ? breakpoint() : ($(__this).addClass('popup-slider menu-' + options.effect) && popupTrigger());

        // if (!supportsTouch) {
            $(window).on("resize", function () {
                if (options.breakpoint) {
                    $(document).off("click touchend", options.button);
                    breakpoint();
                }
            });
        // }

        //close-button actions
        $(closeButton).add(backLayer).on("click", function () {
            menuClose();
        });

        //functions
        function checkScrollBars(){
            var body = $('body');
            var normalw = 0;
            var scrollw = 0;
            if(body.prop('scrollHeight') > body.height()){
                normalw = window.innerWidth;
                scrollw = normalw - body.width();
                $(body).css({'margin-right':scrollw+'px', 'overflow': 'hidden'});
            }
        }

        function breakpoint() {
            if($('html').width() < options.breakpoint){
                $(__this).addClass('popup-slider menu-' + options.effect);
                popupTrigger();
            } else {
                menuClose();
                $(__this).removeClass('popup-slider menu-' + options.effect);
            }
        }

        function addBackLayer(container,uniqueId) {
            var layer = document.createElement('div');
            layer.className = 'back-layer';

            if(!$(container).find('>.back-layer').length){
                $(layer).prependTo(container);
                layer.id = uniqueId;
            }
        }

        function addCloseButton() {
            var checkCloseButton = $(options.container).find('>.close-popup').length;
            if(!checkCloseButton && !options.closeButton && !options.buttonToggle){
                var element = document.createElement('div');
                element.className = 'close-popup';
                $(element).prependTo(options.container);
            }
        }

        function menuOpen(){
            $(selectors).addClass('menu-open');
            if(ios){hideScroll();}
            if(options.lockScroll){checkScrollBars();}
            if(options.onMenuOpen){options.onMenuOpen();}
        }

        function menuClose(){
            $(selectors).removeClass('menu-open');
            if(ios){unhideScroll();}
            if(options.lockScroll){$('body').css({'overflow':'auto','margin-right':0});}
            if(options.onMenuClose){options.onMenuClose();}
        }

        function popupTrigger() {
            $(document).off("click touchend", options.button);
            $(document).on("click touchend", options.button, function(e){
                if( ios && (e.type) == 'touchend') {
                    e.stopPropagation();
                    e.preventDefault();
                    !$(this).hasClass('menu-open') ? menuOpen() : menuClose();
                } else if((e.type) == 'click'){
                    e.stopPropagation();
                    e.preventDefault();
                    !$(this).hasClass('menu-open') ? menuOpen() : menuClose();
                }
            });
        }

        function hideScroll() {
            var scrollTop = window.pageYOffset;
            $('body').attr('data-scroll', scrollTop);
            $('body').css({'position': 'fixed', 'top': -scrollTop + 'px'});
            if (options.headerFixed) {
                $('header').css({'position': 'absolute', 'top': scrollTop + 'px'});
            }
        }

        function unhideScroll() {
            var scrollTop = $('body').attr('data-scroll');
            $('body').css({'position': 'initial', 'top': 'initial'});
            if (options.headerFixed) {
                $('header').css({'position': '', 'top': '0'});
            }
            $(window).scrollTop(scrollTop);
        }
    };
})(jQuery);
