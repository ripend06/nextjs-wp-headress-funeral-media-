//single-place.phpスライドショー
$('.sliderFor').slick({
    centerMode: true,
    centerPadding: '10rem',
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: '.sliderNav',
    prevArrow: '<i class="ph-fill ph-caret-circle-left sliderIcon sliderIcon--left"></i>',
    nextArrow: '<i class="ph-fill ph-caret-circle-right sliderIcon sliderIcon--right"></i>',
    responsive: [
        {
            breakpoint: 768,
            settings: {
                centerPadding: '0',
            }
        }
    ]
    });
$('.sliderNav').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    asNavFor: '.sliderFor',
    dots: false,
    arrows: false,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
        {
        breakpoint: 768,
        settings: {
            slidesToShow: 5,
        }
        }
    ]
});