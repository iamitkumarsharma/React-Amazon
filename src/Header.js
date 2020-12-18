import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useStateValue } from "./StateProvider";
import { auth } from "./Firebase";

function Header() {
  const [{ basket, user }] = useStateValue();

  const login = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/ ">
        <img className="header_logo" src="./amazon_logo.png"></img>
      </Link>

      <div className="header_search">
        <input
          type="text"
          placeholder="Search"
          className="search_input"
        ></input>
        <SearchIcon className="search_icon"></SearchIcon>
      </div>

      <div className="header_nav">
        <Link to={!user && "/login"} className="header_link">
          <div onClick={login} className="header_option">
            <span className="header_option_one">Hello {user?.email}</span>
            <span className="header_option_two">
              {user ? "SignOut" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to={"/MyOrder"} className="header_link">
          <div className="header_option">
            <span className="header_option_one">Return</span>
            <span className="header_option_two">Order</span>
          </div>
        </Link>
        <Link className="header_link">
          <div className="header_option">
            <span className="header_option_one">Yours</span>
            <span className="header_option_two">Prime</span>
          </div>
        </Link>

        <Link to="/checkout" className="header_link">
          <div className="header_cart">
            <ShoppingCartIcon />
            <span className="header_cart_count">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
