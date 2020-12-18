import React from "react";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { Link, useHistory } from "react-router-dom";
import "./Subtotal.css";

function Subtotal() {
  const [{ basket }] = useStateValue();
  const history = useHistory();
  return (
    <div className="subtotal">
      <CurrencyFormat
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
        renderText={(value) => (
          <>
            <strong>
              Subtotal({basket.length} items):<strong>{`${value}`}</strong>
            </strong>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a subtotal gift
            </small>
          </>
        )}
      />

      <button onClick={(e) => history.push("./Payment")}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
