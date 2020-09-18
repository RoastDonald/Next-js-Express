import React, { useRef } from "react";
import Slider from "react-slick";
import Button from "../../../components/common/button/button.component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const { current: slides } = useRef([
    {
      img: "/images/featured/featured_home.jpg",
      primaryLine: "Fender",
      secondaryLine: "Custom shop",
      linkTitle: "Shop Now",
      to: "/shop",
    },
    {
      img: "/images/featured/featured_home_2.jpg",
      primaryLine: "B-Stock",
      secondaryLine: "Awesome discounts",
      linkTitle: "View offers",
      to: "/shop",
    },
  ]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, idx) => (
        <div key={idx}>
          <div
            className="featured_image"
            style={{
              background: `url(${slide.img})`,
              height: `${window.innerHeight}px`,
              backgroundSize: "cover",
            }}
          >
            {/* <div className="featured_action">
              <div className="tag title">{slide.primaryLine}</div>
              <div className="tag low_title">{slide.secondaryLine}</div>
              <div>
                <Button type="default" link={slide.to}>
                  {slide.linkTitle}
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default App;
