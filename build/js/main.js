"use strict";
/* Form validation */

$(".contact-form").validate({
  rules: {
    email: {
      required: true,
      email: true
    }
  },
  //end rules
  messages: {
    email: {
      required: "Please supply an e-mail address.",
      email: "This is not a valid email address."
    }
  }
}); // end validate

/* Sticky navigation */

var waypoint = new Waypoint({
  element: document.getElementById("features"),
  handler: function handler(direction) {
    if (direction == "down") {
      $("nav").addClass("sticky");
    } else {
      $("nav").removeClass("sticky");
    }
  },
  offset: 60
});
/* Animations on scroll */

$(".js--wp-1").waypoint(function (direction) {
  $(".js--wp-1").addClass("animated fadeIn");
}, {
  offset: "50%"
});
$(".js--wp-2").waypoint(function (direction) {
  $(".js--wp-2").addClass("animated fadeInUp");
}, {
  offset: "50%"
});
$(".js--wp-3").waypoint(function (direction) {
  $(".js--wp-3").addClass("animated fadeIn");
}, {
  offset: "50%"
});
$(".js--wp-4").waypoint(function (direction) {
  $(".js--wp-4").addClass("animated pulse");
}, {
  offset: "50%"
});
/* Mobile navigation */

$(".mobile-nav-icon").click(function () {
  var nav = $(".main-nav");
  var icon = $(".mobile-nav-icon i");

  if (icon.hasClass("ion-navicon-round")) {
    icon.addClass("ion-close-round");
    icon.removeClass("ion-navicon-round");
    nav.addClass("open");
    nav.removeClass("close");
  } else {
    icon.addClass("ion-navicon-round");
    icon.removeClass("ion-close-round");
    nav.addClass("close");
    nav.removeClass("open");
  }
});