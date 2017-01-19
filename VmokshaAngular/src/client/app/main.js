

/**************************main.js***************************/

(function ($) {

    $(window).load(function () {

        new WOW().init();
        // INITIALIZE ANIMSITION
        if ($(".animsition").length) {
            $(".animsition").animsition({
                inClass: 'fade-in-up-sm',
                outClass: 'fade-out-up-sm',
                inDuration: 1100,
                outDuration: 800,
                linkElement: '.animsition-link',
                loading: true,
                loadingParentElement: 'body',
                unSupportCss: ['animation-duration',
                                          '-webkit-animation-duration',
                                          '-o-animation-duration'
                ],
                overlay: false,
                overlayClass: 'animsition-overlay-slie',
                overlayParentElement: 'body'
            });
        }

 
    });
})(jQuery);

// Slider
function openNav() {
    document.getElementById("signupSidenav").style.width = "350px";
    document.getElementById("overlay").style.background = "#000";
    document.getElementById("overlay").style.opacity = "0.1";
}

function closeNav() {
    document.getElementById("signupSidenav").style.width = "0";
    document.getElementById("overlay").style.background = "inherit";
    document.getElementById("overlay").style.opacity = "1";
}
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
$('#menu-segment li a').on('click', function(){
    $('li a.current').removeClass('current');
    $(this).addClass('current');
});