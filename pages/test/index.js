import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SimpleSlider({ mediaData }) {
    const sliderForRef = useRef(null);
    const sliderNavRef = useRef(null);

    const sliderForSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: sliderNavRef.current
    };

    const sliderNavSettings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: sliderForRef.current,
        dots: true,
        focusOnSelect: true
    };

    const handleSlideClick = (slideIndex) => {
        sliderNavRef.current.slickGoTo(slideIndex);
        sliderForRef.current.slickGoTo(slideIndex);
    };

    return (
        <div>
            <Slider {...sliderForSettings} className="slider-for" ref={sliderForRef}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
            </Slider>
            <Slider {...sliderNavSettings} className="slider-nav" ref={sliderNavRef}>
                <a href="#" onClick={() => handleSlideClick(0)}>
                    <div>1</div>
                </a>
                <a href="#" onClick={() => handleSlideClick(1)}>
                    <div>2</div>
                </a>
                <a href="#" onClick={() => handleSlideClick(2)}>
                    <div>3</div>
                </a>
            </Slider>
        </div>
    );
}

export default SimpleSlider;
