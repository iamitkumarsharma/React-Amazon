import React, { useState } from "react";
import "./Home.css";
import Product from "./Product";
import productArray, {
  productArrayTwo,
  productArrayThree,
  productArrayFour,
} from "./ProductArray";

function Home() {
  return (
    <div className="home">
      <div className="home_items">
        <img
          className="home_image"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/AugART/GW/Hero/ShopNow/fst/unrec/PC_Hero_-_Unrec_experimentEnglish_Shop_now1500X600._CB408299558_.jpg"
        />

        <div className="home_row_one">
          {productArray.map(function products(item) {
            return (
              <Product
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating}
              />
            );
          })}
        </div>
        <div className="home_row_two">
          {productArrayTwo.map(function products(item) {
            return (
              <Product
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating}
              />
            );
          })}
        </div>
        <div className="home_row_three">
          {productArrayThree.map(function products(item) {
            return (
              <Product
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating}
              />
            );
          })}
        </div>
        <div className="home_row_four">
          {productArrayFour.map(function products(item) {
            return (
              <Product
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
