$(document).ready(function() {
    $('#fullpage').fullpage({
        //options here
        autoScrolling: true,
        scrollHorizontally: true,
        navigation: true
    });

    //methods
    $.fn.fullpage.setAllowScrolling(true);
});