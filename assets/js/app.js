(function ($) {
  "use strict";

  /*-------------------------------------
    On Scroll
    -------------------------------------*/

  $(window).on("scroll", function () {
    // Back Top Button
    if ($(window).scrollTop() > 500) {
      $(".scrollup").addClass("back-top");
    } else {
      $(".scrollup").removeClass("back-top");
    }
    // Sticky Header
    if ($("body").hasClass("sticky-header")) {
      var stickyPlaceHolder = $("#rt-sticky-placeholder"),
        menu = $("#header-menu"),
        menuH = menu.outerHeight(),
        topHeaderH = $("#header-topbar").outerHeight() || 0,
        middleHeaderH = $("#header-middlebar").outerHeight() || 0,
        targrtScroll = topHeaderH + middleHeaderH;
      if ($(window).scrollTop() > targrtScroll) {
        menu.addClass("rt-sticky");
        stickyPlaceHolder.height(menuH);
      } else {
        menu.removeClass("rt-sticky");
        stickyPlaceHolder.height(0);
      }
    }

    // Sinlge Listing nav sticky
    /* var scrolltop = $(window).scrollTop(),
            el_offset = $('.one-page-heading').offset().top,
            nav_top_height = el_offset - scrolltop;

        console.log(nav_top_height);

        if ($(window).scrollTop() >= nav_top_height) {
            $('.one-page-heading').css({position: "fixed", top: "77px", left: "0", right: "0"});
        } else {
            $('.one-page-heading').css({position: "relative", top: "0px"});
        }*/
  });

  /*-------------------------------------
    Page Preloader
    -------------------------------------*/
  $("#preloader").fadeOut("slow", function () {
    $(this).remove();
  });

  /*-------------------------------------
      Sidebar Toggle Menu
    -------------------------------------*/
  $(".menu-content").on("click", ".header-nav-item .menu-link", function (e) {
    if ($(this).parents("body").hasClass("mobile-menu-wrapper")) {
      var animationSpeed = 0,
        subMenuSelector = ".sub-menu",
        $this = $(this),
        checkElement = $this.next();
      if (checkElement.is(subMenuSelector) && checkElement.is(":visible")) {
        checkElement.slideUp(animationSpeed, function () {
          checkElement.removeClass("menu-open");
        });
        checkElement.parent(".header-nav-item").removeClass("active");
      } else if (
        checkElement.is(subMenuSelector) &&
        !checkElement.is(":visible")
      ) {
        var parent = $this.parents("ul").first();
        var ul = parent.find("ul:visible").slideUp(animationSpeed);
        ul.removeClass("menu-open");
        var parent_li = $this.parent("li");
        checkElement.slideDown(animationSpeed, function () {
          checkElement.addClass("menu-open");
          parent.find(".header-nav-item.active").removeClass("active");
          parent_li.addClass("active");
        });
      }
      if (checkElement.is(subMenuSelector)) {
        e.preventDefault();
      }
    } else {
      if ($(this).attr("href") === "#") {
        e.preventDefault();
      }
    }
  });

  /*-------------------------------------
    Mobile Menu Class Add
    --------------------------------------*/
  $(".mobile-menu-toggle").on("click", function () {
    if ($("#wrapper").hasClass("mobile-menu-expand")) {
      $("#wrapper").removeClass("mobile-menu-expand");
    } else {
      $("#wrapper").addClass("mobile-menu-expand");
    }
  });

  function mobile_nav_class() {
    var mq = window.matchMedia("(max-width: 991px)");
    if (mq.matches) {
      $("body").addClass("mobile-menu-wrapper");
    } else {
      $("body").removeClass("mobile-menu-wrapper");
    }
  }

  $(window).resize(function () {
    mobile_nav_class();
  });
  mobile_nav_class();

  /*-------------------------------------
    Advanced Search Revel
    -------------------------------------*/

  $(".advanced-btn").on("click", function () {
    $(this).toggleClass("collapsed");
    $("#advanced-search").toggleClass("show");
  });

  /*-------------------------------------
    Share Icon reveled
    -------------------------------------*/
  $("#share-btn").on("click", function () {
    $(this).siblings(".share-icon").toggleClass("open");
  });

  /*--------------------------------------
        Phone Number Show/Hide
    --------------------------------------*/
  $(".homefind-phone-reveal").on("click", function () {
    if ($(this).hasClass("not-revealed")) {
      $(this).removeClass("not-revealed").addClass("revealed");
      var phone = $(this).data("phone");
      $(this).find("span").text(phone);
    }
    return false;
  });

  /*-------------------------------------
    Section background image
    -------------------------------------*/
  $("[data-bg-image]").each(function () {
    var img = $(this).data("bg-image");
    $(this).css({
      backgroundImage: "url(" + img + ")",
    });
  });

  /*--------------------------------------
    Isotope initialization
    --------------------------------------*/
  var $container = $(".isotope-wrap");
  if ($container.length > 0) {
    var $isotope;
    var blogGallerIso = $(".featuredContainer", $container).imagesLoaded(
      function () {
        $isotope = $(".featuredContainer", $container).isotope({
          filter: "*",
          transitionDuration: "1s",
          hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)",
          },
          visibleStyle: {
            transform: "scale(1)",
            opacity: 1,
          },
        });
      }
    );
    $container.find(".isotope-classes-tab").on("click", "a", function () {
      var $this = $(this);
      $this.parent(".isotope-classes-tab").find("a").removeClass("current");
      $this.addClass("current");
      var selector = $this.attr("data-filter");
      $isotope.isotope({
        filter: selector,
      });
      return false;
    });
  }

  /*-------------------------------------
        Masonry
    -------------------------------------*/
  var galleryIsoContainer = $("#no-equal-gallery");
  if (galleryIsoContainer.length) {
    var blogGallerIso = galleryIsoContainer.imagesLoaded(function () {
      blogGallerIso.isotope({
        itemSelector: ".no-equal-item",
        masonry: {
          columnWidth: ".no-equal-item",
          horizontalOrder: true,
        },
      });
    });
  }

  /*-------------------------------------
    Quantity Holder
    -------------------------------------*/
  $("#quantity-holder")
    .on("click", ".quantity-plus", function () {
      var $holder = $(this).parents(".quantity-holder");
      var $target = $holder.find("input.quantity-input");
      var $quantity = parseInt($target.val(), 10);
      if ($.isNumeric($quantity) && $quantity > 0) {
        $quantity = $quantity + 1;
        $target.val($quantity);
      } else {
        $target.val($quantity);
      }
    })
    .on("click", ".quantity-minus", function () {
      var $holder = $(this).parents(".quantity-holder");
      var $target = $holder.find("input.quantity-input");
      var $quantity = parseInt($target.val(), 10);
      if ($.isNumeric($quantity) && $quantity >= 2) {
        $quantity = $quantity - 1;
        $target.val($quantity);
      } else {
        $target.val(1);
      }
    });

  /*-------------------------------------
        Product View
    -------------------------------------*/
  $(".product-view-trigger").on("click", function (e) {
    var self = $(this),
      data = self.attr("data-type"),
      target = $("#product-view");
    self.parents(".layout-switcher").find("li.active").removeClass("active");
    self.parent("li").addClass("active");
    target
      .children(".row")
      .find(">div")
      .animate(
        {
          opacity: 0,
        },
        200,
        function () {
          if (data === "product-box-grid") {
            target.removeClass("product-box-list");
            target.addClass("product-box-grid");
          } else if (data === "product-box-list") {
            target.removeClass("product-box-grid");
            target.addClass("product-box-list");
          }
          target.children(".row").find(">div").animate(
            {
              opacity: 1,
            },
            100
          );
        }
      );
    e.preventDefault();
    return false;
  });

  /*-------------------------------------
        ElevateZoom
    -------------------------------------*/
  $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
    elevateZoom();
  });

  function elevateZoom() {
    if ($.fn.elevateZoom !== undefined) {
      $(".zoom_01").elevateZoom({
        zoomType: "inner",
        cursor: "crosshair",
        zoomWindowFadeIn: 500,
        zoomWindowFadeOut: 200,
      });
    }
  }

  elevateZoom();

  /*-------------------------------------
    Countdown activation code
    -------------------------------------*/
  var eventCounter = $(".countdown");
  if (eventCounter.length) {
    eventCounter.countdown("2020/10/01", function (e) {
      $(this).html(
        e.strftime(
          "<div class='countdown-section'><div><div class='countdown-number'>%D</div> <div class='countdown-unit'>Day%!D</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%H</div> <div class='countdown-unit'>Hour%!H</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%M</div> <div class='countdown-unit'>Mins</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%S</div> <div class='countdown-unit'>Secs</div> </div></div>"
        )
      );
    });
  }

  /*-------------------------------------
        Tooltip
    -------------------------------------*/
  $(function () {
    $('[data-toggle="tooltip"]').tooltip({
      delay: { show: 400, hide: 300 },
    });
  });

  /*-------------------------------------
        Slick Carousel
    -------------------------------------*/
  $(".slick-carousel").slick();

  /*-------------------------------------
        Select2 activation code
    -------------------------------------*/
  if ($("select.select2").length) {
    $("select.select2").select2({
      theme: "classic",
      dropdownAutoWidth: true,
      width: "100%",
    });
  }

  /*-------------------------------------
    Price range slider
    -------------------------------------*/
  if ($.fn.ionRangeSlider !== undefined) {
    $(".ion-rangeslider").ionRangeSlider({
      type: "double",
      min: 0,
      max: 500000,
      prefix: "$",
      drag_interval: true,
      min_interval: null,
      max_interval: null,
    });
    $(".ion-rangeslider2").ionRangeSlider({
      type: "double",
      min: 0,
      max: 5000,
      prefix: "",
      drag_interval: true,
      min_interval: null,
      max_interval: null,
    });
  }

  /*-------------------------------------
    Video Popup
    -------------------------------------*/
  var yPopup = $(".popup-youtube");
  if (yPopup.length) {
    yPopup.magnificPopup({
      type: "iframe",
      mainClass: "mfp-zoom-in",
      removalDelay: 260,
    });
  }

  /*-------------------------------------
    YT Player
    -------------------------------------*/
  $("#yt-player").YTPlayer();

  /*-------------------------------------
        Google Map
    -------------------------------------*/
  if ($("#googleMap").length) {
    window.onload = function () {
      var styles = [
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#b7d0ea",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [
            {
              color: "#c2c2aa",
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [
            {
              color: "#b6d1b0",
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#6b9a76",
            },
          ],
        },
      ];
      var options = {
        mapTypeControlOptions: {
          mapTypeIds: ["Styled"],
        },
        center: new google.maps.LatLng(-37.81618, 144.95692),
        zoom: 10,
        disableDefaultUI: true,
        mapTypeId: "Styled",
      };
      var div = document.getElementById("googleMap");
      var map = new google.maps.Map(div, options);
      var styledMapType = new google.maps.StyledMapType(styles, {
        name: "Styled",
      });
      map.mapTypes.set("Styled", styledMapType);

      var marker = new google.maps.Marker({
        position: map.getCenter(),
        animation: google.maps.Animation.BOUNCE,
        icon: "media/map-marker.png",
        map: map,
      });
    };
  }

  /*-------------------------------------
        ElevateZoom
    -------------------------------------*/
  $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
    elevateZoom();
  });

  function elevateZoom() {
    if ($.fn.elevateZoom !== undefined) {
      $(".zoom_01").elevateZoom({
        zoomType: "inner",
        cursor: "crosshair",
        zoomWindowFadeIn: 500,
        zoomWindowFadeOut: 200,
      });
    }
  }

  elevateZoom();
  /*-------------------------------------
        ElevateZoom
    -------------------------------------*/
  $("#one-page-nav").onePageNav({
    currentClass: "current",
    changeHash: false,
    scrollSpeed: 750,
    scrollThreshold: 0.5,
    filter: "",
    easing: "swing",
  });

  /*-------------------------------------
        Sal Init
    -------------------------------------*/
  sal({
    threshold: 0.05,
    once: true,
  });

  if ($(window).outerWidth() < 1025) {
    var scrollAnimations = sal();
    scrollAnimations.disable();
  }

  // Owl Carousel
  let hasOwlCarousel = $(".rt-owl-carousel");
  if (hasOwlCarousel.length) {
    $(".rt-owl-carousel").each(function () {
      var owlCarousel = $(this),
        loop = owlCarousel.data("loop"),
        items = owlCarousel.data("items"),
        margin = owlCarousel.data("margin"),
        autoplay = owlCarousel.data("autoplay"),
        autoplayTimeout = owlCarousel.data("autoplay-timeout"),
        smartSpeed = owlCarousel.data("smart-speed"),
        dots = owlCarousel.data("dots"),
        nav = owlCarousel.data("nav"),
        navSpeed = owlCarousel.data("nav-speed"),
        xsDevice = owlCarousel.data("mobile-device"),
        xsDeviceNav = owlCarousel.data("mobile-device-nav"),
        xsDeviceDots = owlCarousel.data("mobile-device-dots"),
        smDevice = owlCarousel.data("sm-device"),
        smDeviceNav = owlCarousel.data("sm-device-nav"),
        smDeviceDots = owlCarousel.data("sm-device-dots"),
        smDevice2 = owlCarousel.data("sm-device2"),
        smDevice2Nav = owlCarousel.data("sm-device2-nav"),
        smDevice2Dots = owlCarousel.data("sm-device2-dots"),
        mdDevice = owlCarousel.data("md-device"),
        mdDeviceNav = owlCarousel.data("md-device-nav"),
        mdDeviceDots = owlCarousel.data("md-device-dots"),
        lgDevice = owlCarousel.data("lg-device"),
        lgDeviceNav = owlCarousel.data("lg-device-nav"),
        lgDeviceDots = owlCarousel.data("lg-device-dots"),
        centerMode = owlCarousel.data("center-mode"),
        HoverPause = owlCarousel.data("hoverpause");

      owlCarousel.owlCarousel({
        loop: loop ? true : false,
        items: items ? items : 4,
        lazyLoad: true,
        center: centerMode ? true : false,
        autoplayHoverPause: HoverPause ? true : false,
        margin: margin ? margin : 0,
        autoplay: autoplay ? true : false,
        autoplayTimeout: autoplayTimeout ? autoplayTimeout : 1000,
        smartSpeed: smartSpeed ? smartSpeed : 250,
        dots: dots ? true : false,
        nav: nav ? true : false,
        navText: [
          '<i class="fas fa-chevron-left"></i>',
          '<i class="fas fa-chevron-right"></i>',
        ],
        navSpeed: navSpeed ? true : false,
        responsiveClass: true,
        responsive: {
          0: {
            items: xsDevice ? xsDevice : 1,
            nav: xsDeviceNav ? true : false,
            dots: xsDeviceDots ? true : false,
            center: false,
          },
          576: {
            items: smDevice2 ? smDevice2 : 2,
            nav: smDevice2Nav ? true : false,
            dots: smDevice2Dots ? true : false,
            center: false,
          },
          768: {
            items: smDevice ? smDevice : 3,
            nav: smDeviceNav ? true : false,
            dots: smDeviceDots ? true : false,
            center: false,
          },
          992: {
            items: mdDevice ? mdDevice : 4,
            nav: mdDeviceNav ? true : false,
            dots: mdDeviceDots ? true : false,
          },
          1200: {
            items: lgDevice ? lgDevice : 4,
            nav: lgDeviceNav ? true : false,
            dots: lgDeviceDots ? true : false,
          },
        },
      });
    });
  }

  $(".products-slick-active").slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    prevArrow:
      '<button type="button" class="slider-prev slider-arrow"><i class="fas fa-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="slider-next slider-arrow"><i class="fas fa-angle-right"></i></button>',
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });

  $(".categories-slick-active").slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    prevArrow:
      '<button type="button" class="slider-prev slider-arrow"><i class="fas fa-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="slider-next slider-arrow"><i class="fas fa-angle-right"></i></button>',
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });

  $(".brand-active").slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    prevArrow:
      '<button type="button" class="slider-prev slider-arrow"><i class="fas fa-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="slider-next slider-arrow"><i class="fas fa-angle-right"></i></button>',
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });

  /*--------------------------------------
main-slider
--------------------------------------*/
  const testimonialSlider = $(".testi-active");
  const featuredSlider = $(".featured-active");

  if (testimonialSlider.length) {
    $(".testi-active")
      .slick({
        arrows: true,
        dots: false,
        infinite: true,
        speed: 150,
        fade: true,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 4000,
        pauseOnDotsHover: true,
        mobileFirst: true,
        prevArrow:
          '<button type="button" class="slider-prev slider-arrow"><i class="fas fa-angle-left"></i></button>',
        nextArrow:
          '<button type="button" class="slider-next slider-arrow"><i class="fas fa-angle-right"></i></button>',
      })
      .slickAnimation();
  }

  if (featuredSlider.length) {
    $(".featured-active")
      .slick({
        arrows: true,
        dots: false,
        infinite: true,
        speed: 150,
        fade: false,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 4000,
        pauseOnDotsHover: true,
        mobileFirst: true,
        prevArrow:
          '<button type="button" class="slider-prev slider-arrow"><i class="fas fa-angle-left"></i></button>',
        nextArrow:
          '<button type="button" class="slider-next slider-arrow"><i class="fas fa-angle-right"></i></button>',
      })
      .slickAnimation();
  }

  // Parallax
  $(".parallaxie").parallaxie({
    speed: 0.9,
    offset: 0,
  });

  //   WoW Js
  new WOW().init();
})(jQuery);
