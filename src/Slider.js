import React from "react";
import { Carousel } from "react-responsive-carousel";
import "./Slider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Slider() {
  return (
    <div className="slider">
      <div className="slider_image">
        <Carousel
          transitionTime={1000}
          showThumbs={false}
          autoPlay={true}
          showArrows={true}
          infiniteLoop={true}
        >
          <div>
            <img
              alt=""
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Home/LA/Diwali2019/Rishab/Auto_Biss/HobbyStore_GW/Hobby_1500x600._CB416245605_.jpg"
            />
          </div>
          <div>
            <img
              alt=""
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/vivo/December/GW/V19/D19383832_WL_Vivo_BAU_Dec2020_Tall_Hero_1500x600._CB413828217_.jpg"
            />
          </div>
          <div>
            <img
              alt=""
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/Xiaomi/Mi_days/Uber_GW/D18787601_BAU_Xiaomi_Family_DesktopHero_1500x600._CB413305591_.jpg"
            />
          </div>
          <div>
            <img
              alt=""
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Home/LA/Diwali2019/Rishab/Auto_Biss/HobbyStore_GW/Hobby_1500x600._CB416245605_.jpg"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default Slider;
