import React from "react";
import { useStateValue } from "./StateProvider";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

function Checkout() {
  const [{ basket }] = useStateValue();
  return (
    <div className="container">
      <div className="checkout_left">
        <h1 className="checkout_title">Products in your cart</h1>

        {basket?.length === 0 ? (
          <div className="checkout_message">
            <h3>Your Cart is Empty</h3>
            <p>You have no item in your cart. Please Add items to buy.</p>
          </div>
        ) : (
          <div>
            {basket?.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              ></CheckoutProduct>
            ))}
          </div>
        )}
      </div>

      {basket.length > 0 && (
        <div className="checkout_right">
          <Subtotal />
        </div>
      )}
    </div>
  );
}

export default Checkout;
