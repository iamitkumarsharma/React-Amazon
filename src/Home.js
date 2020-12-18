import React, { useState } from "react";
import "./Home.css";
import Product from "./Product";
import { Electronics, Cloths, Books } from "./ItemsStore";
import Slider from "./Slider";
import { Carousel } from "react-responsive-carousel";

function Home() {
  return (
    <div className="home">
      <div className="home_items">
        <Slider />
        <div className="home_row_one">
          {Electronics.map(function products(item) {
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

        <div className="home_row_cloths">
          <h3>Clothings</h3>
          {Cloths.map(function products(item) {
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

        <div className="home_row_books">
          <h3>Books</h3>
          {Books.map(function products(item) {
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
