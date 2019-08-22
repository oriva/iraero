// document.addEventListener('DOMContentLoaded', () => {
$(document).ready(()=>{
    $(".owl-mobile").owlCarousel({
        items: 1,
        dots: true,
        nav: false,
        smartSpeed: 150
    });

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
});

// });