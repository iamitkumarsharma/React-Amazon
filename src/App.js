import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./Firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import MyOrder from "./MyOrder";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promis = loadStripe(
  "pk_test_51HxFd6D0Fe8Zcq3kYDieJRvAkqT5fD6xYQwWCbaQYM1Hu3rMghKdX0tmet7ShfP6GqGDHCzLLvMYHyYd7ZpH1H5c00cgXNS3bG"
);
function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Router>
        <div className="app">
          <Switch>
            <Route path="/checkout">
              <Header />
              <Checkout />
            </Route>
            <Route path="/payment">
              <Header />
              <Elements stripe={promis}>
                <Payment />
              </Elements>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/myorder">
              <Header />
              <MyOrder />
            </Route>
            <Route path="/">
              <Header /> {/*Default Rauter page*/}
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

//set up router
//home screen
//checkout
//login

export default App;
