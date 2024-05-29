import React from "react";

import StyledSideMenu from "./sidemenu.styled";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Menu(props) {
  return (
    <StyledSideMenu
      open_side_menu={props.open_side_menu}
      hamburger_scrolled={props.hamburger_scrolled}
    >
      <div style={{ gridArea: "1/2/-1/-1" }}>
        <a key={1} style={{ borderBottom: "2px orange solid" }} href="/">
          <span>Home</span>
        </a>
        <a
          style={{ borderBottom: "2px orange solid" }}
          key={2}
          onClick={props.executeScrollForLookupSection}
        >
          <span>Act</span>
        </a>
        <a key={3} style={{ borderBottom: "2px orange solid" }} href="#">
          <span>Shop</span>
        </a>
        <div
          style={{
            height: "2px",
            background:
              "linear-gradient(90deg, rgba(223,157,17,1) 56%, rgba(0,212,255,0) 100%)",
          }}
        />
        <div style={{ paddingTop: "40px" }} key={4}>
          {props.userState.loggedInStatus == "LOGGED_IN"
            ? [
                <a
                  style={{ fontSize: "4vw" }}
                  key={"a"}
                  onClick={props.handleLogOutClick}
                >
                  {" "}
                  Logout{" "}
                </a>,
                <span key={"line"} style={{ fontSize: "4vw" }}>
                  |{" "}
                </span>,
                <Link style={{ fontSize: "4vw" }} key={"b"} to="/edit">
                  edit{" "}
                </Link>,
              ]
            : [
                <a
                  style={{ fontSize: "4vw" }}
                  key={"c"}
                  onClick={props.doSomething}
                >
                  {" "}
                  Login |
                </a>,
                <a
                  style={{ fontSize: "4vw" }}
                  key={"d"}
                  onClick={props.executeScrollForSection2}
                >
                  {" "}
                  Signup
                </a>,
              ]}{" "}
        </div>

        {/* 
        <li key={5}>

            <li key={4}>{props.userState.loggedInStatus == "LOGGED_IN" ? [<Link key={"a"} to="/"> Logout | </Link>, <Link key={"b"} to="/edit">edit </Link>] :   [<Link key={"c"} to="/login"> Login |</Link>, <Link key={"d"} to="/signup"> Signup</Link>]  } </li>

        </li>
        */}
      </div>
    </StyledSideMenu>
  );
}

export default Menu;

/*

<a href="/">
        <span role="img" aria-label="about us"></span>
        About us
      </a>
      <a href="/">
        <span role="img" aria-label="price"></span>
        Pricing
        </a>
      <a href="/">
        <span role="img" aria-label="contact"></span>
        Contact
        </a>

*/
