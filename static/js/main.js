$(document).ready(function ($) {
    "use strict";


    var book_table = new Swiper(".book-table-img-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: "coverflow",
        coverflowEffect: {
            rotate: 3,
            stretch: 2,
            depth: 100,
            modifier: 5,
            slideShadows: false,
        },
        loopAdditionSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    var team_slider = new Swiper(".team-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });

    jQuery(".filters").on("click", function () {
        jQuery("#menu-dish").removeClass("bydefault_show");
    });
    $(function () {
        var filterList = {
            init: function () {
                $("#menu-dish").mixItUp({
                    selectors: {
                        target: ".dish-box-wp",
                        filter: ".filter",
                    },
                    animation: {
                        effects: "fade",
                        easing: "ease-in-out",
                    },
                    load: {
                        filter: ".all, .breakfast, .lunch, .dinner",
                    },
                });
            },
        };
        filterList.init();
    });

    jQuery(".menu-toggle").click(function () {
        jQuery(".main-navigation").toggleClass("toggled");
    });

    jQuery(".header-menu ul li a").click(function () {
        jQuery(".main-navigation").removeClass("toggled");
    });

    gsap.registerPlugin(ScrollTrigger);

    var elementFirst = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger: "body",
        start: "30px top",
        end: "bottom bottom",

        onEnter: () => myFunction(),
        onLeaveBack: () => myFunction(),
    });

    function myFunction() {
        elementFirst.classList.toggle('sticky_head');
    }

    var scene = $(".js-parallax-scene").get(0);
    var parallaxInstance = new Parallax(scene);


});


jQuery(window).on('load', function () {
    $('body').removeClass('body-fixed');

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old = 0;
    let dur = 0.4;
    let animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }

    // initial position on first === All 
    gsap.set(".filter-active", {
        x: targets[0].offsetLeft,
        width: targets[0].offsetWidth
    });

    function moveBar() {
        if (this.index != activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = gsap.timeline({
                defaults: {
                    duration: 0.4
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active", {
                x: targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff",
                ease: "none"
            }, 0);

        }

    }
});

$(document).ready(function () {
    $("#searchForm").on("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        let searchQuery = $("#searchInput").val(); // Get search input value
        searchResult = document.getElementById("search-result");

        $.ajax({
            url: "/search", // Route in Flask
            type: "POST",
            data: { query: searchQuery }, // Send search query
            success: function (response) {
                // Handle success response
                // alert("Search results: " + response.results);
                searchResult.innerHTML = response.results;
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            }
        });
    });

    $("#newsletter-form").submit(function(e) {
        e.preventDefault(); // Prevent default form submission

        responseDiv = document.getElementById("show-response");

        let formData = {
            name: $("input[name='name']").val(),
            email: $("input[name='email']").val(),
            address: $("input[name='address']").val(),
            password: $("input[name='password']").val()
        };

        $.ajax({
            url: "/subscribe", // Flask route
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function(response) {
                responseDiv.innerHTML = JSON.stringify(response, null, 2);
                $("#newsletter-form")[0].reset(); // Reset form
            },
            error: function(xhr) {
                let errors = xhr.responseJSON.error;
                alert(errors ? errors : "Something went wrong!");
            }
        });
    });

    // Login Form Handling
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        const formData = $(this).serialize();
        
        $.ajax({
            type: 'POST',
            url: '/login',
            data: formData,
            success: function(response) {
                $('#loginResponse').html('<div class="alert alert-success">' + response.message + '</div>');
                // Optionally, you can redirect after a few seconds if you want
                setTimeout(function() {
                    window.location.href = '/';
                }, 2000);
            },
            error: function(xhr) {
                let response = JSON.parse(xhr.responseText);
                $('#loginResponse').html('<div class="alert alert-danger">' + response.error + '</div>');
            }            
        });
    });

    // Signup Form Handling
    $('#signupForm').on('submit', function(e) {
        e.preventDefault();
        const formData = $(this).serialize();
        
        $.ajax({
            type: 'POST',
            url: '/signup',
            data: formData,
            success: function(response) {
                $('#signupResponse').html('<div class="alert alert-success">' + response.message + '</div>');
                // Optionally, you can redirect after a few seconds if you want
                setTimeout(function() {
                    window.location.href = '/login-page';
                }, 2000);
            },
            error: function(xhr) {
                let response = JSON.parse(xhr.responseText);
                $('#signupResponse').html('<div class="alert alert-danger">' + response.error + '</div>');
            }   
        });
    });

});
