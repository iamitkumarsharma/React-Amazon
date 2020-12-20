import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useStateValue } from "./StateProvider";
import { auth } from "./Firebase";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles({
  list: {
    width: 250,
    margin: "0px",
  },
  fullList: {
    width: "auto",
  },
});

function Header() {
  const [{ basket, user, search }, dispatch] = useStateValue();
  const [input, setInput] = useState([]); //set input to dispact search/input string
  const [anchorEl, setAnchorEl] = React.useState(null);

  //drawer setup for mobile view
  const classes = useStyles();
  const [draw, setDraw] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDraw({ ...draw, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <AccountCircleIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText>
            <Link to={!user && "/login"} className="header_link">
              <div onClick={login}>
                <span style={{ color: "black" }}>
                  <p>Hello</p> {user?.email}
                </span>
              </div>
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ShoppingBasketIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText>
            <Link to={"/MyOrder"} className="header_link">
              <p style={{ color: "black" }}>My Order</p>
            </Link>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <LockIcon className="larger" />
          </ListItemIcon>
          <ListItemText>
            <Link to={!user && "./login"} className="header_link">
              <p>
                <span style={{ color: "black" }} onClick={login}>
                  {user ? "SignOut" : "Sign In"}
                </span>
              </p>
            </Link>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );

  useEffect(() => {
    //this useEffect execute code when input set
    dispatch({
      //dispatching the input to reducer with actiontype "SET_SEARCH"
      type: "SET_SEARCH",
      payload: input,
    });
  }, [input]); //this use effect depends on input value entered by user

  const searchHandle = (event) => {
    //when search button clicked input get erased
    event.preventDefault();
    setInput("");
  };

  const login = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <div className="header_menu">
        <Link to="/ ">
          <img className="header_logo" src="./amazon_logo.png"></img>
        </Link>
      </div>
      <div className="hearder Drawer">
        {["left"].map((anchor) => (
          <div key={anchor}>
            <MenuIcon
              onClick={toggleDrawer(anchor, true)}
              fontSize="large"
              className="header_burger"
            ></MenuIcon>
            <Drawer
              anchor={anchor}
              open={draw[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </div>
        ))}
      </div>

      <div className="header_search">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          type="text"
          placeholder="Search"
          className="search_input"
        ></input>
        <SearchIcon onClick={searchHandle} className="search_icon"></SearchIcon>
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
          <div className="header_cart header_cart_res">
            <ShoppingCartIcon fontSize="large" />
            <span className="header_cart_count">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
