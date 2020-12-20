import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import Button from "@material-ui/core/Button";

function Product({ id, title, image, price, rating }) {
  //es6 destructuring
  const [{ basket }, dispatch] = useStateValue();

  const addtobasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_) => (
              <p>⭐</p>
            ))}
        </div>
      </div>

      <img src={image} alt=""></img>

      <Button onClick={addtobasket} variant="contained" color="primary">
        Add to cart
      </Button>
    </div>
  );
}

export default Product;
