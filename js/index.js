$(document).ready(function () {
    $('body').removeClass('preload');
    var touchmoved = false,
        compare_counter = 0,
        favorite_counter = 0;

    $('.menu-wrapper').PopupSlider({
        effect: 'left',
        button: '.nav-trigger',
        closeButton: false,
        container: '.header',
        breakpoint: 1025,
        onMenuOpen: false,
        onMenuClose: false
    });
    $('.search select').select2({
        minimumResultsForSearch: -1,
        dropdownParent: $('.search')
    });
    $('.inner-tabs select').select2({
        minimumResultsForSearch: -1
    });
    $('.level-1-title').on('click touchend', function () {
        if (touchmoved !== true) {
            $(this).find('.level-1').addClass('active');
            return false;
        }
    }).on('touchmove', function () {
        touchmoved = true;
    }).on('touchstart', function () {
        touchmoved = false;
    });
    $('.level-1').each(function () {
        $(this).find('.back').on('click touchend', function () {
            if (touchmoved !== true) {
                $(this).parent().removeClass('active');
                return false;
            }
        }).on('touchmove', function () {
            touchmoved = true;
        }).on('touchstart', function () {
            touchmoved = false;
        });
    });
    $('.tabs,.inner-tabs').each(function () {
        var tabContainers = $(this).children('div'),
            listItem = $(this).find('>.tab-list>li');
        tabContainers.hide().filter(':first').show();
        $(this).find('>.tab-list a').click(function () {
            tabContainers.hide();
            tabContainers.filter(this.hash).show();
            $(listItem).removeClass('active');
            $(this).parent('li').addClass('active');
            return false;
        }).filter(':first').click();
    });
    $('[id*="filter-"]').each(function () {
        $(this).find('.reset').on('click touchend', function () {
            $(this).parents('[id*="filter-"]').find('select').select2("val", '0');
            $(this).parents('[id*="filter-"]').find('input').val('');
        });
    })
    $('#reset').click(function () {

    });
    $(document).on('focus', '[id*="filter-"] input', function () {
        $('[id*="filter-"] input').ForceNumericOnly();
    });

    $(document).on('click touchend', '.item-compare', function () {
        if (touchmoved !== true) {
            if (!$(this).parent().parent().hasClass('compared')) {
                $(this).parent().parent().addClass('compared');
                $(this).find('span').text('В сравнении');
                compare_counter++;
                if (compare_counter > 0) {
                    $('#comparison .counter').removeClass('hidden').text(compare_counter);
                }
            }
        }
    }).on('touchmove', function () {
        touchmoved = true;
    }).on('touchstart', function () {
        touchmoved = false;
    });

    $(document).on('click touchend', '.item-favorite', function () {
        if (touchmoved !== true) {
            if (!$(this).parent().parent().hasClass('in-favorite')) {
                $(this).parent().parent().addClass('in-favorite');
                $(this).find('span').text('В избранном');
                favorite_counter++;
                if (favorite_counter > 0) {
                    $('#favorites .counter').removeClass('hidden').text(favorite_counter);
                }
            }
        }
    }).on('touchmove', function () {
        touchmoved = true;
    }).on('touchstart', function () {
        touchmoved = false;
    });

    jQuery.fn.ForceNumericOnly =
        function () {
            let ua = navigator.userAgent.toLowerCase();
            let isAndroid = ua.indexOf("android") > -1;
            return this.each(function () {
                if (isAndroid) {
                    $(this).attr('type', 'number');
                } else {
                    var regex = /([0-9])/g;
                    $(this).on('keydown keypress', function (e) {
                        if (!(e.key.match(regex) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Delete")) {
                            e.preventDefault();
                        }
                    });
                }
            });
        };
    $('#phone').mask("+38(099)999-99-99");
});

function recallSubmit() {
    $.fancybox.close();
    $.fancybox.open('Спасибо! Мы вам перезвоним!');
}

function letterSpam() {
    $.fancybox.open('Вы успешно подписаны на рассылку!');
    setTimeout(function () {
        $.fancybox.close();
    }, 2000);
}