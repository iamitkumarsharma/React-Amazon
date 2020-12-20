import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import axios from "axios";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import { db } from "./Firebase";
import ShoppingCartSharpIcon from "@material-ui/icons/ShoppingCartSharp";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const [err, setErr] = useState(null);
  const [disable, setDisable] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeded, setSucceded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  //stripe code for charging amount from the customer
  useEffect(() => {
    const getClientReq = async () => {
      const response = await axios.post(
        /* `http://localhost:5000/payments/create?total=${
          getBasketTotal(basket) * 100
        }`*/
        `https://amazon-react-app.herokuapp.com/payments/create?total=${
          getBasketTotal(basket) * 100
        }`
      );
      setClientSecret(response.data.clientSecret);
    };
    getClientReq();
  }, [basket]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      })
      .then(({ paymentIntent }) => {
        //Paymetn Confirmation
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
        setSucceded(true);
        setErr(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        history.replace("/myorder");
      });
  };

  console.log("secrete", clientSecret);
  const handleChange = (event) => {
    setDisable(event.empty);
    setErr(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_checkout">
        <h1>
          Checkout(
          <Link to="/checkout">
            {basket?.length} <ShoppingCartSharpIcon />
          </Link>
          )
        </h1>
      </div>
      <strong>Acount Details</strong>
      <div className="payment_user_info">
        <h5>{user?.email}</h5>
        <p>Sector-10 Dwarka</p>
        <p>New Delhi</p>
        <p>India</p>
      </div>
      <strong>Cart Items</strong>
      <div className="payment_items">
        <div className="payment_checkoutproduct">
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
      </div>

      <strong>Payment Method</strong>
      <div className="payment_detail">
        {/*stripe*/}
        <form onClick={handleSubmit}>
          <CardElement onChange={handleChange} />
          <div className="payment_price">
            <CurrencyFormat
              decimalScale={2}
              value={getBasketTotal(basket)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₹"}
              renderText={(value) => (
                <>
                  <p>
                    Order Total({basket.length} items):
                    <strong>{`${value}`}</strong>
                  </p>
                  <small className="subtotal__gift">
                    Add Gift Item
                    <input type="checkbox" />
                  </small>
                </>
              )}
            />
          </div>
          <button disabled={processing || disable || succeded}>
            <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
