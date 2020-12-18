import React from "react";
import "./Order.css";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import moment from "moment";
function Order({ order }) {
  return (
    <div className="order">
      <h3>Order</h3>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p>
        Order_id :<small>{order.id}</small>
      </p>
      <div className="order_item">
        {order.data.basket?.map((item) => (
          <CheckoutProduct
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            hideButton
          ></CheckoutProduct>
        ))}
        <div className="order_price">
          <CurrencyFormat
            decimalScale={2}
            value={order.data.amount / 100}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
            renderText={(value) => (
              <>
                <p>
                  Order Total:
                  <strong>{`${value}`}</strong>
                </p>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default Order;
