import React, { useState, useEffect } from "react";
import "./Home.css";
import Product from "./Product";
import { Electronics, Cloths, Books } from "./ItemsStore";
import Slider from "./Slider";
import { Carousel } from "react-responsive-carousel";
import { useStateValue } from "./StateProvider";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  const [{ search }] = useStateValue([]);
  const [eitem, setEitem] = useState([]);
  const [citem, setCitem] = useState([]);
  const [bitem, setBitem] = useState([]);
  AOS.init();

  useEffect(() => {
    const filterElectronics = Electronics.filter((product) => {
      return product.title
        .toLowerCase()
        .includes(search.toString().toLowerCase());
    });
    const filterCloth = Cloths.filter((product) => {
      return product.title
        .toLowerCase()
        .includes(search.toString().toLowerCase());
    });

    const filterBook = Books.filter((product) => {
      return product.title
        .toLowerCase()
        .includes(search.toString().toLowerCase());
    });
    setEitem(filterElectronics);
    setCitem(filterCloth);
    setBitem(filterBook);
  }, [search]);

  return (
    <div className="home">
      <div className="home_items">
        <Slider />

        <div className="home_category">
          {!search ? <strong>Electronics</strong> : ""}
          <div className="home_row_one">
            {eitem.map(function products(item) {
              return (
                <div
                  className="home_row_one"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <Product
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                  />
                </div>
              );
            })}
          </div>
          {!search ? <strong>Clothings</strong> : ""}
          <div className="home_row_cloths">
            {citem.map(function products(item) {
              return (
                <div
                  className="home_row_one"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <Product
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    rating={item.rating}
                  />
                </div>
              );
            })}
          </div>
          {!search ? <strong>Books</strong> : ""}
          <div className="home_row_books">
            {bitem.map(function products(item) {
              return (
                <div
                  className="home_row_one"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <Product
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    rating={item.rating}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
