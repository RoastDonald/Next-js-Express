import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { Box } from "@material-ui/core";
import { useStyles } from "./slider.styles";
import { FMButton } from "@/components/formik-mui";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const classes = useStyles();

  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  useEffect(() => {
    setInnerHeight(window.innerHeight);
  }, [window.innerHeight]);

  const { current: slides } = useRef([
    {
      img: "/images/featured/sl-1-s.jpg",
      primaryLine: "Fender",
      secondaryLine: "Custom shop",
      linkTitle: "Shop Now",
      to: "/shop",
    },
    {
      img: "/images/featured/sl-2-s.jpg",
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
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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
            // className="featured_image"
            style={{
              background: `url(${slide.img}) center`,
              height: `${innerHeight}px`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              position: "relative",
            }}
          >
            <Box className={classes.ctaContainer}>
              <div className={classes.ctaTitle}>{slide.primaryLine}</div>
              <div className={classes.ctaDetails}>{slide.secondaryLine}</div>
              <div className={classes.ctaBtn}>
                <FMButton
                  type="default"
                  link={slide.to}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "10px 20px",
                  }}
                >
                  {slide.linkTitle}
                </FMButton>
              </div>
            </Box>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default App;
