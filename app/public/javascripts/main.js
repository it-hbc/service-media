/* ===================================================================
 * Philosophy - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'   // mailchimp url
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    // svg fallback
    if (!Modernizr.svg) {
        $(".header__logo img").attr("src", "images/logo.png");
    }


   /* Preloader
    * ----------------------------------------------------- */
    var clPreloader = function() {
        
        $("html").addClass('cl-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('cl-preload');
            $("html").addClass('cl-loaded');
        
        });
    };


   /* mediaelement
    * ------------------------------------------------------ */
    var clMediaElement = function() {

        $('audio').mediaelementplayer({
            pluginPath: 'https://cdnjs.com/libraries/mediaelement/',
            shimScriptAccess: 'always'
        });

    };


   /* FitVids
    ------------------------------------------------------ */ 
    var clFitVids = function() {
        $(".video-container").fitVids();
    };



   /* pretty print
    * -------------------------------------------------- */ 
    var clPrettyPrint = function() {
        $('pre').addClass('prettyprint');
        $( document ).ready(function() {
            prettyPrint();
        });
    };



   /* search
    * ------------------------------------------------------ */
    var clSearch = function() {
        
        var searchWrap = $('.header__search'),
            searchField = searchWrap.find('.search-field'),
            closeSearch = searchWrap.find('.header__overlay-close'),
            searchTrigger = $('.header__search-trigger'),
            siteBody = $('body');


        searchTrigger.on('click', function(e) {
            
            e.preventDefault();
            e.stopPropagation();
        
            var $this = $(this);
        
            siteBody.addClass('search-is-visible');
            setTimeout(function(){
                searchWrap.find('.search-field').focus();
            }, 100);
        
        });

        closeSearch.on('click', function(e) {

            var $this = $(this);
        
            e.stopPropagation(); 
        
            if(siteBody.hasClass('search-is-visible')){
                siteBody.removeClass('search-is-visible');
                setTimeout(function(){
                    searchWrap.find('.search-field').blur();
                }, 100);
            }
        });

        searchWrap.on('click',  function(e) {
            if( !$(e.target).is('.search-field') ) {
                closeSearch.trigger('click');
            }
        });
            
        searchField.on('click', function(e){
            e.stopPropagation();
        });
            
        searchField.attr({placeholder: 'Type Keywords', autocomplete: 'off'});
    
    };


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    var clMobileMenu = function() {

        var navWrap = $('.header__nav-wrap'),
            closeNavWrap = navWrap.find('.header__overlay-close'),
            menuToggle = $('.header__toggle-menu'),
            siteBody = $('body');
        
        menuToggle.on('click', function(e) {
            var $this = $(this);

            e.preventDefault();
            e.stopPropagation();
            siteBody.addClass('nav-wrap-is-visible');
        });

        closeNavWrap.on('click', function(e) {
            
            var $this = $(this);
            
            e.preventDefault();
            e.stopPropagation();
        
            if(siteBody.hasClass('nav-wrap-is-visible')) {
                siteBody.removeClass('nav-wrap-is-visible');
            }
        });

        // open (or close) submenu items in mobile view menu. 
        // close all the other open submenu items.
        $('.header__nav .has-children').children('a').on('click', function (e) {
            e.preventDefault();

            if ($(".close-mobile-menu").is(":visible") == true) {

                $(this).toggleClass('sub-menu-is-open')
                    .next('ul')
                    .slideToggle(200)
                    .end()
                    .parent('.has-children')
                    .siblings('.has-children')
                    .children('a')
                    .removeClass('sub-menu-is-open')
                    .next('ul')
                    .slideUp(200);

            }
        });

    };


   /* Masonry
    * ---------------------------------------------------- */ 
    var clMasonryFolio = function () {
        
        var containerBricks = $('.masonry');

        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                percentPosition: true,
                resize: true
            });
        });


        // layout Masonry after each image loads
        containerBricks.imagesLoaded().progress( function() {
            containerBricks.masonry('layout');
        });
    };


   /* slick slider
    * ------------------------------------------------------ */
    var clSlickSlider = function() {

        var $gallery = $('.slider__slides').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            pauseOnFocus: false,
            fade: true,
            cssEase: 'linear'
        });
        
        $('.slider__slide').on('click', function() {
            $gallery.slick('slickGoTo', parseInt($gallery.slick('slickCurrentSlide'))+1);
        });
    
    };


   /* Smooth Scrolling
    * ------------------------------------------------------ */
    var clSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
            
                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


   /* Placeholder Plugin Settings
    * ------------------------------------------------------ */
    var clPlaceholder = function() {
        $('input, textarea, select').placeholder();  
    };


   /* Alert Boxes
    * ------------------------------------------------------ */
    var clAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };


   /* Animate On Scroll
    * ------------------------------------------------------ */
    var clAOS = function() {
        
        AOS.init( {
            offset: -400,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 100,
            once: true,
            disable: 'mobile'
        });

    };


   /* AjaxChimp
    * ------------------------------------------------------ */
    var clAjaxChimp = function() {
        
        $('#mc-form').ajaxChimp({
            language: 'es',
            url: cfg.mailChimpURL
        });

        // Mailchimp translation
        //
        //  Defaults:
        //	 'submit': 'Submitting...',
        //  0: 'We have sent you a confirmation email',
        //  1: 'Please enter a value',
        //  2: 'An email address must contain a single @',
        //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
        //  4: 'The username portion of the email address is invalid (the portion before the @: )',
        //  5: 'This email address looks fake or invalid. Please enter a real email address'

        $.ajaxChimp.translations.es = {
            'submit': 'Submitting...',
            0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
            1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
            2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
        } 

    };


   /* Back to Top
    * ------------------------------------------------------ */
    var clBackToTop = function() {
        
        var pxShow      = 500,
            goTopButton = $(".go-top")

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                if(!goTopButton.hasClass('link-is-visible')) goTopButton.addClass('link-is-visible')
            } else {
                goTopButton.removeClass('link-is-visible')
            }
        });
    };


   /* Map
    * ------------------------------------------------------ */

    // add custom buttons for the zoom-in/zoom-out on the map
    var clCustomZoomControl = function(controlDiv, map) {
            
        // grap the zoom elements from the DOM and insert them in the map 
        var controlUIzoomIn= document.getElementById('map-zoom-in'),
                controlUIzoomOut= document.getElementById('map-zoom-out');

        controlDiv.appendChild(controlUIzoomIn);
        controlDiv.appendChild(controlUIzoomOut);

        // Setup the click event listeners and zoom-in or out according to the clicked element
        google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
            map.setZoom(map.getZoom()+1)
        });
        google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
            map.setZoom(map.getZoom()-1)
        });
            
    };

	var clGoogleMap = function() { 

        if (typeof google === 'object' && typeof google.maps === 'object') {

            // 37.422424, -122.085661

            var latitude = 37.422424,
                longitude = -122.085661,
                map_zoom = 14,
                main_color = '#0054a5',
                saturation_value = -30,
                brightness_value = 5,
                marker_url = null,
                winWidth = $(window).width();

            // show controls
            $("#map-zoom-in, #map-zoom-out").show();

            // marker url
            if ( winWidth > 480 ) {
                marker_url = 'images/icon-location@2x.png';
            } else {
                marker_url = 'images/icon-location.png';
            }

            // map style
            var style = [ 
                {
                    // set saturation for the labels on the map
                    elementType: "labels",
                    stylers: [
                        { saturation: saturation_value }
                    ]
                },  
                {	// poi stands for point of interest - don't show these lables on the map 
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [
                        {visibility: "off"}
                    ]
                },
                {
                    // don't show highways lables on the map
                    featureType: 'road.highway',
                    elementType: 'labels',
                    stylers: [
                        { visibility: "off" }
                    ]
                }, 
                { 	
                    // don't show local road lables on the map
                    featureType: "road.local",
                    elementType: "labels.icon",
                    stylers: [
                        { visibility: "off" } 
                    ] 
                },
                { 
                    // don't show arterial road lables on the map
                    featureType: "road.arterial",
                    elementType: "labels.icon",
                    stylers: [
                        { visibility: "off" }
                    ] 
                },
                {
                    // don't show road lables on the map
                    featureType: "road",
                    elementType: "geometry.stroke",
                    stylers: [
                        { visibility: "off" }
                    ]
                }, 
                // style different elements on the map
                { 
                    featureType: "transit", 
                    elementType: "geometry.fill", 
                    stylers: [
                        { hue: main_color },
                        { visibility: "on" }, 
                        { lightness: brightness_value }, 
                        { saturation: saturation_value }
                    ]
                }, 
                {
                    featureType: "poi",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: main_color },
                        { visibility: "on" }, 
                        { lightness: brightness_value }, 
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: "poi.government",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: main_color },
                        { visibility: "on" }, 
                        { lightness: brightness_value }, 
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: "poi.sport_complex",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: main_color },
                        { visibility: "on" }, 
                        { lightness: brightness_value }, 
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: "poi.attraction",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: main_color },
                        { visibility: "on" }, 
                        { lightness: brightness_value }, 
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: "poi.business",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: main_color },
                        { visibility: "on" }, 
                        { lightness: brightness_value }, 
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: "transit",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: main_color },
                        { visibility: "on" }, 
                        { lightness: brightness_value }, 
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: "transit.station",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: main_color },
                        { visibility: "on" }, 
                        { lightness: brightness_value }, 
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: "landscape",
                    stylers: [
                        { hue: main_color },
                        { visibility: "on" }, 
                        { lightness: brightness_value }, 
                        { saturation: saturation_value }
                    ]
                    
                },
                {
                    featureType: "road",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: main_color },
                        { visibility: "on" }, 
                        { lightness: brightness_value }, 
                        { saturation: saturation_value }
                    ]
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [
                        { hue: main_color },
                        { visibility: "on" }, 
                        { lightness: brightness_value }, 
                        { saturation: saturation_value }
                    ]
                }, 
                {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [
                        { hue: main_color },
                        { visibility: "on" }, 
                        { lightness: brightness_value }, 
                        { saturation: saturation_value }
                    ]
                }
            ];
                
            // map options
            var map_options = {

                center: new google.maps.LatLng(latitude, longitude),
                zoom: 14,
                panControl: false,
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                styles: style

                };

            // inizialize the map
            var map = new google.maps.Map(document.getElementById('map-container'), map_options);

            // add a custom marker to the map				
            var marker = new google.maps.Marker({

                    position: new google.maps.LatLng(latitude, longitude),
                    map: map,
                    visible: true,
                    icon: marker_url
                    
                });
            
            var zoomControlDiv = document.createElement('div');
            var zoomControl = new clCustomZoomControl(zoomControlDiv, map);

            // insert the zoom div on the top right of the map
            map.controls[google.maps.ControlPosition.TOP_RIGHT].push(zoomControlDiv);

        } 

    };


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {
        
        clPreloader();
        clMediaElement();
        clPrettyPrint();
        clSearch();
        clMobileMenu();
        // clMasonryFolio();
        clSlickSlider();
        clSmoothScroll();
        clPlaceholder();
        clAlertBoxes();
        clAOS();
        clAjaxChimp();
        clBackToTop();
        clGoogleMap();

    })();
        
})(jQuery);

/*!
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery throttle / debounce: Sometimes, less is more!
//
// *Version: 1.1, Last updated: 3/7/2010*
//
// Project Home - http://benalman.com/projects/jquery-throttle-debounce-plugin/
// GitHub       - http://github.com/cowboy/jquery-throttle-debounce/
// Source       - http://github.com/cowboy/jquery-throttle-debounce/raw/master/jquery.ba-throttle-debounce.js
// (Minified)   - http://github.com/cowboy/jquery-throttle-debounce/raw/master/jquery.ba-throttle-debounce.min.js (0.7kb)
//
// About: License
//
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
//
// About: Examples
//
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
//
// Throttle - http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/
// Debounce - http://benalman.com/code/projects/jquery-throttle-debounce/examples/debounce/
//
// About: Support and Testing
//
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
//
// jQuery Versions - none, 1.3.2, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome 4-5, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-throttle-debounce/unit/
//
// About: Release History
//
// 1.1 - (3/7/2010) Fixed a bug in <jQuery.throttle> where trailing callbacks
//       executed later than they should. Reworked a fair amount of internal
//       logic as well.
// 1.0 - (3/6/2010) Initial release as a stand-alone project. Migrated over
//       from jquery-misc repo v0.4 to jquery-throttle repo v1.0, added the
//       no_trailing throttle parameter and debounce functionality.
//
// Topic: Note for non-jQuery users
//
// jQuery isn't actually required for this plugin, because nothing internal
// uses any jQuery methods or properties. jQuery is just used as a namespace
// under which these methods can exist.
//
// Since jQuery isn't actually required for this plugin, if jQuery doesn't exist
// when this plugin is loaded, the method described below will be created in
// the `Cowboy` namespace. Usage will be exactly the same, but instead of
// $.method() or jQuery.method(), you'll need to use Cowboy.method().

(function(window,undefined){
    '$:nomunge'; // Used by YUI compressor.

    // Since jQuery really isn't required for this plugin, use `jQuery` as the
    // namespace only if it already exists, otherwise use the `Cowboy` namespace,
    // creating it if necessary.
    var $ = window.jQuery || window.Cowboy || ( window.Cowboy = {} ),

        // Internal method reference.
        jq_throttle;

    // Method: jQuery.throttle
    //
    // Throttle execution of a function. Especially useful for rate limiting
    // execution of handlers on events like resize and scroll. If you want to
    // rate-limit execution of a function to a single time, see the
    // <jQuery.debounce> method.
    //
    // In this visualization, | is a throttled-function call and X is the actual
    // callback execution:
    //
    // > Throttled with `no_trailing` specified as false or unspecified:
    // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
    // > X    X    X    X    X    X        X    X    X    X    X    X
    // >
    // > Throttled with `no_trailing` specified as true:
    // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
    // > X    X    X    X    X             X    X    X    X    X
    //
    // Usage:
    //
    // > var throttled = jQuery.throttle( delay, [ no_trailing, ] callback );
    // >
    // > jQuery('selector').bind( 'someevent', throttled );
    // > jQuery('selector').unbind( 'someevent', throttled );
    //
    // This also works in jQuery 1.4+:
    //
    // > jQuery('selector').bind( 'someevent', jQuery.throttle( delay, [ no_trailing, ] callback ) );
    // > jQuery('selector').unbind( 'someevent', callback );
    //
    // Arguments:
    //
    //  delay - (Number) A zero-or-greater delay in milliseconds. For event
    //    callbacks, values around 100 or 250 (or even higher) are most useful.
    //  no_trailing - (Boolean) Optional, defaults to false. If no_trailing is
    //    true, callback will only execute every `delay` milliseconds while the
    //    throttled-function is being called. If no_trailing is false or
    //    unspecified, callback will be executed one final time after the last
    //    throttled-function call. (After the throttled-function has not been
    //    called for `delay` milliseconds, the internal counter is reset)
    //  callback - (Function) A function to be executed after delay milliseconds.
    //    The `this` context and all arguments are passed through, as-is, to
    //    `callback` when the throttled-function is executed.
    //
    // Returns:
    //
    //  (Function) A new, throttled, function.

    $.throttle = jq_throttle = function( delay, no_trailing, callback, debounce_mode ) {
        // After wrapper has stopped being called, this timeout ensures that
        // `callback` is executed at the proper times in `throttle` and `end`
        // debounce modes.
        var timeout_id,

            // Keep track of the last time `callback` was executed.
            last_exec = 0;

        // `no_trailing` defaults to falsy.
        if ( typeof no_trailing !== 'boolean' ) {
            debounce_mode = callback;
            callback = no_trailing;
            no_trailing = undefined;
        }

        // The `wrapper` function encapsulates all of the throttling / debouncing
        // functionality and when executed will limit the rate at which `callback`
        // is executed.
        function wrapper() {
            var that = this,
                elapsed = +new Date() - last_exec,
                args = arguments;

            // Execute `callback` and update the `last_exec` timestamp.
            function exec() {
                last_exec = +new Date();
                callback.apply( that, args );
            };

            // If `debounce_mode` is true (at_begin) this is used to clear the flag
            // to allow future `callback` executions.
            function clear() {
                timeout_id = undefined;
            };

            if ( debounce_mode && !timeout_id ) {
                // Since `wrapper` is being called for the first time and
                // `debounce_mode` is true (at_begin), execute `callback`.
                exec();
            }

            // Clear any existing timeout.
            timeout_id && clearTimeout( timeout_id );

            if ( debounce_mode === undefined && elapsed > delay ) {
                // In throttle mode, if `delay` time has been exceeded, execute
                // `callback`.
                exec();

            } else if ( no_trailing !== true ) {
                // In trailing throttle mode, since `delay` time has not been
                // exceeded, schedule `callback` to execute `delay` ms after most
                // recent execution.
                //
                // If `debounce_mode` is true (at_begin), schedule `clear` to execute
                // after `delay` ms.
                //
                // If `debounce_mode` is false (at end), schedule `callback` to
                // execute after `delay` ms.
                timeout_id = setTimeout( debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay );
            }
        };

        // Set the guid of `wrapper` function to the same of original callback, so
        // it can be removed in jQuery 1.4+ .unbind or .die by using the original
        // callback as a reference.
        if ( $.guid ) {
            wrapper.guid = callback.guid = callback.guid || $.guid++;
        }

        // Return the wrapper function.
        return wrapper;
    };

    // Method: jQuery.debounce
    //
    // Debounce execution of a function. Debouncing, unlike throttling,
    // guarantees that a function is only executed a single time, either at the
    // very beginning of a series of calls, or at the very end. If you want to
    // simply rate-limit execution of a function, see the <jQuery.throttle>
    // method.
    //
    // In this visualization, | is a debounced-function call and X is the actual
    // callback execution:
    //
    // > Debounced with `at_begin` specified as false or unspecified:
    // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
    // >                          X                                 X
    // >
    // > Debounced with `at_begin` specified as true:
    // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
    // > X                                 X
    //
    // Usage:
    //
    // > var debounced = jQuery.debounce( delay, [ at_begin, ] callback );
    // >
    // > jQuery('selector').bind( 'someevent', debounced );
    // > jQuery('selector').unbind( 'someevent', debounced );
    //
    // This also works in jQuery 1.4+:
    //
    // > jQuery('selector').bind( 'someevent', jQuery.debounce( delay, [ at_begin, ] callback ) );
    // > jQuery('selector').unbind( 'someevent', callback );
    //
    // Arguments:
    //
    //  delay - (Number) A zero-or-greater delay in milliseconds. For event
    //    callbacks, values around 100 or 250 (or even higher) are most useful.
    //  at_begin - (Boolean) Optional, defaults to false. If at_begin is false or
    //    unspecified, callback will only be executed `delay` milliseconds after
    //    the last debounced-function call. If at_begin is true, callback will be
    //    executed only at the first debounced-function call. (After the
    //    throttled-function has not been called for `delay` milliseconds, the
    //    internal counter is reset)
    //  callback - (Function) A function to be executed after delay milliseconds.
    //    The `this` context and all arguments are passed through, as-is, to
    //    `callback` when the debounced-function is executed.
    //
    // Returns:
    //
    //  (Function) A new, debounced, function.

    $.debounce = function( delay, at_begin, callback ) {
        return callback === undefined
            ? jq_throttle( delay, at_begin, false )
            : jq_throttle( delay, callback, at_begin !== false );
    };

})(this);
