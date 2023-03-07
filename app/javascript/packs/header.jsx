////////////////////////////////////////////////////////
///////////////////   IMPORTS  /////////////////////////
///////////////////////////////////////////////////////

import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
//import useDocumentScrollThrottled from './useDocumentScrollThrottled.jsx'
import styled from "styled-components";
import headerLeaf from "../../assets/images/headerLeafv2.png";
//import headerLogo from '../../assets/images/logo.png'
import Burger from "./burger";
import SideMenu from "./sidemenu";
import company_logo from "../../assets/images/company_logo.svg";

////////////////////////////////////////////////////////
//////////////   STYLED COMPONENTS  ///////////////////
///////////////////////////////////////////////////////

const HeaderWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(100px, 300px) 1fr minmax(
      min-content,
      max-content
    );
  grid-template-rows: 85px;
  grid-template-areas: "headerLogo . headerLeaf ";
  min-width: 100vw;
  max-width: 3000px;
  overflow: hidden;
  grid-gap: 8px;
  z-index: 51;
`;

const LogoText = styled.img`
  position: ${(props) => (props.logoScrolled ? "fixed" : "initial")};
  top: ${(props) => (props.logoScrolled ? "10px" : "initial")};
  //font-family: "Permanent Marker", cursive;
  //font-style: normal;
  //font-weight: normal;
  //font-size: 22px;
  //letter-spacing: -1px;
  //color: #010101;
  transition: all 0.2s linear;
  grid-area: headerLogo;
  padding: 0 0 0 15px;
  justify-self: start;
  align-self: center;
  width: ${(props) => (props.logoScrolled ? "155px" : "225px")};
  cursor: pointer;

  z-index: 51;

  span {
    color: rgb(241, 203, 203);
  }
  @media only screen and (max-width: 400px) {
    width: 184px;
  }
  @media only screen and (max-width: 281px) {
    width: 150px;
  }
  @media only screen and (max-width: 218px) {
    width: 120px;
  }
`;

const HeaderLeafImage = styled.img`
  @media only screen and (max-width: 1111px) {
    margin-right: -150px;
    max-width: 100%;
  }

  @media only screen and (max-width: 420px) {
    margin-right: -200px;
  }

  @media only screen and (max-width: 281px) {
    display: none;
  }

  width: 808px;
  margin-bottom: -4px;
  min-width: 400px;
  max-height: 100%;
  max-width: 84%;
  grid-area: headerLeaf;
  justify-self: end;
  align-self: center;

  /* opacity: ${(props) =>
    props.hamburgerScrolled || props.longNavScrolled ? "0" : "1"}; */

  //transition: all 0.2s linear;
`;

const LongNav = styled.nav`
  @media only screen and (max-width: 1111px) {
    display: none;
  }
  //transition: all 0.2s linear;
  grid-area: headerLeaf;
  color: white;
  align-self: center;
  justify-self: end;
  margin: 0 -25px;
  display: flex;
  position: ${(props) => (props.longNavScrolled ? "fixed" : "initial")};
  top: ${(props) => (props.longNavScrolled ? "-3px" : "initial")};
  color: ${(props) => (props.longNavScrolled ? "black" : "white")};

  ul {
    list-style: none;
    margin-right: 40px;
    display: flex;
    align-items: baseline;
    color: inherit;

    li {
      @media only screen and (max-width: 666px) {
        padding: 0px 12px;
      }

      @media only screen and (min-width: 1396px) {
        font-size: 39px;
      }

      display: inline-block;
      padding: 0px 12px;
      transition: font-size 0.1s linear;
      font-weight: 500;
      font-size: ${(props) => (props.longNavScrolled ? "2vw" : "2.8vw")};
      line-height: 45px;
      color: inherit;
      text-decoration: none;
      cursor: pointer;
      &:hover {
        color: rgb(241, 203, 203);
      }

      a {
        @media only screen and (min-width: 1396px) {
          font-size: 21px;
        }

        transition: all 0.3s ease 0s;
        font-weight: 500;
        font-size: ${(props) => (props.longNavScrolled ? "1vw" : "1.3vw")};
        line-height: 45px;
        color: inherit;
      }
    }
  }
`;

const Outter = styled.div`
  width: 100%;
  //height: 100vh;
  //position: relative;
  overflow: hidden;
  //z-index: 505;
`;

const HamburgerMenu = styled.div`
	position: relative;
	grid-area: 1/3/2/4;
	justify-self: end;
	align-self: center;
	padding-right: 1.5em;

	@media only screen and (max-width: 1111px) {
		position: ${(props) => (props.hamburgerScrolled ? "fixed" : "initial")};
		top: ${(props) => (props.hamburgerScrolled ? "7px" : "initial")};
	}

	button {
		/* div {
			background: white;
			color: white; */

			/* @media only screen and (max-width: 266px) {
				background: black;
				color: black;
			} */
		}
	}
`;

const TopBackgroundBar = styled.div`
  position: fixed;
  opacity: ${(props) => (props.logoScrolled ? "1" : "0")};
  top: 0;
  width: 100%;
  height: 40px;
  background-color: black;
  transition: all 0.2s linear;
  z-index: 51;
  -webkit-backface-visibility: hidden;

  background-color: #f4f4f4;
  /* background: rgb(255, 255, 255);
	background: -moz-linear-gradient(
		90deg,
		rgba(255, 255, 255, 0.8897758932674632) 38%,
		rgba(0, 0, 0, 0.9009803750601804) 59%
	);
	background: -webkit-linear-gradient(
		90deg,
		rgba(255, 255, 255, 0.8897758932674632) 38%,
		rgba(0, 0, 0, 0.9009803750601804) 59%
	);
	background: linear-gradient(
		90deg,
		rgba(255, 255, 255, 0.8897758932674632) 38%,
		rgba(0, 0, 0, 0.9009803750601804) 59%
	);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#000000",GradientType=1); */
`;

////////////////////////////////////////////////////////
///////////////   HEADER FUNCTION   ///////////////////
///////////////////////////////////////////////////////
function Header(props) {
  console.log("==============Header===============");
  console.log("==============Header Props===============", props);

  // if true, element reached the top of viewport, ready to be "sticky"
  const [logoScrolled, setLogoScrolled] = React.useState(false);
  const [hamburgerScrolled, setHamburgerScrolled] = React.useState(false);
  const [longNavScrolled, setLongNavScrolled] = React.useState(false);

  // initial distance from element to top of viewport
  const [pixlesFromLogoToTop, setPixlesFromLogoToTop] = useState(26.75);
  const [pixlesFromHamburgerToTop, setPixlesFromHamburgerToTop] =
    useState(30.5);
  const [pixlesFromLongNavToTop, setPixlesFromLongNavToTop] =
    useState(19.366668701171875);

  // refs for elements that need stickyness or effects
  const logoTextRef = useRef();
  const hamburgerRef = React.useRef();
  const longNavRef = React.useRef();

  const locationFromHook = useLocation();
  const navigate = useNavigate();
  // scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  // set initial values for "sticky" feature
  useEffect(() => {
    //
    setPixlesFromLogoToTop(logoTextRef.current.getBoundingClientRect().top);
    //
    window.innerWidth <= 500
      ? setPixlesFromHamburgerToTop(
          hamburgerRef.current.getBoundingClientRect().top
        )
      : null;
    //
    window.innerWidth > 500
      ? setPixlesFromLongNavToTop(
          longNavRef.current.getBoundingClientRect().top
        )
      : null;
    console.log("END_OF_USE_EFFECT _window.innerWidth = ", window.innerWidth);
    console.log(
      "END_OF_USE_EFFECT _LogoTextToTop = ",
      logoTextRef.current.getBoundingClientRect().top
    );
    console.log(
      "END_OF_USE_EFFECT _HamburgerToTop = ",
      hamburgerRef.current.getBoundingClientRect().top
    );

    console.log(
      "END_OF_USE_EFFECT _LongNavToTop = ",
      longNavRef.current.getBoundingClientRect().top
    );
  }, []);

  ////sticky nav end
  useEffect(() => {
    // make it so this header doesnt load on certin pages
    if (
      locationFromHook.pathname === "/login" ||
      locationFromHook.pathname === "/signup" ||
      locationFromHook.pathname === "/forgot" ||
      locationFromHook.pathname === "/edit" ||
      locationFromHook.pathname === "/change"
    ) {
      return;
    } else {
      //function to pass to mousedown listener, to close side menu if need be.
      listener = (event) => {
        //if you click in the menu,  dont close it
        if (hamburgerRef.current.contains(event.target)) {
          return;
        }

        //if you click anywhere outside the side menu, close it.
        //mouseDownHandler();
        props.setOpenSideMenu(false);
      };
    }

    //resize and/or orientationchange listener
    const handleResize = () => {
      //closed sideMenu on orientation change, if it gets bigger than 850px
      if (window.innerWidth > 500) {
        props.setOpenSideMenu(false);
      }
    };

    //set up event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      console.log("cleanup");
      console.log("cleanup done, openSideMenu = " + props.openSideMenu);
    };
  }, [hamburgerRef]);
  //}, [hamburgerRef, mouseDownHandler]);

  // sets the state so the element can stick
  const handleScroll = () => {
    //console.log("===================window.scrollY===", window.scrollY);
    // console.log(
    //   "===================pixlesFromLongNavToTop===",
    //   pixlesFromLongNavToTop
    // );
    //console.log("===================inner width===", window.innerWidth);
    window.scrollY >= pixlesFromLogoToTop - 4
      ? setLogoScrolled(true)
      : setLogoScrolled(false);

    window.scrollY >= pixlesFromHamburgerToTop - 7
      ? setHamburgerScrolled(true)
      : setHamburgerScrolled(false);

    window.scrollY >= pixlesFromLongNavToTop && window.innerWidth > 500
      ? setLongNavScrolled(true)
      : setLongNavScrolled(false);
  };

  // scroll to top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  //put directly in function, delete this if it works
  function mouseDownHandler() {
    props.setOpenSideMenu(false);
    console.log(
      "mouseDownEventTriggered & openSideMenu = " + props.openSideMenu
    );
  }

  function doSomething() {
    scrollToTop();
    props.setLoginClicked(true);
    props.setOpenSideMenu(false);
  }

  let listener;

  // if (locationFromHook.pathname === "/edit") {
  // 	return null;
  // } else {
  return (
    <>
      <TopBackgroundBar
        hamburgerScrolled={hamburgerScrolled}
        logoScrolled={logoScrolled}
      />

      <HeaderWrapper
        openSideMenu={props.openSideMenu}
        logoScrolled={logoScrolled}
      >
        <LogoText
          onClick={() => {
            navigate("/");
          }}
          src={company_logo}
          ref={logoTextRef}
          logoScrolled={logoScrolled}
        ></LogoText>

        <h1 style={{ display: "none" }}> {logoScrolled ? "TRUE" : "FALSE"} </h1>

        <HeaderLeafImage
          src={headerLeaf}
          longNavScrolled={longNavScrolled}
          logoScrolled={logoScrolled}
        ></HeaderLeafImage>
        <LongNav
          ref={longNavRef}
          longNavScrolled={longNavScrolled}
          hamburgerScrolled={hamburgerScrolled}
        >
          <ul>
            <li key={0}>news</li>
            <li key={1}>
              <span onClick={props.executeScrollForLookupSection}>Act</span>
            </li>
            <li key={2}>shop</li>

            <li key={3}>
              {props.userState.loggedInStatus == "LOGGED_IN"
                ? [
                    <a key={"a"} onClick={props.handleLogOutClick}>
                      {" "}
                      Logout |{" "}
                    </a>,
                    <Link key={"b"} to="/edit">
                      edit{" "}
                    </Link>,
                  ]
                : [
                    <a key={"c"} onClick={doSomething}>
                      {" "}
                      Login |
                    </a>,
                    <a key={"d"} onClick={props.executeScrollForSection2}>
                      {" "}
                      Signup
                    </a>,
                  ]}{" "}
            </li>
          </ul>
        </LongNav>

        <HamburgerMenu hamburgerScrolled={hamburgerScrolled} ref={hamburgerRef}>
          <Burger
            openSideMenu={props.openSideMenu}
            setOpenSideMenu={props.setOpenSideMenu}
            hamburgerScrolled={hamburgerScrolled}
          />
        </HamburgerMenu>
      </HeaderWrapper>

      <Outter>
        <SideMenu
          //doSomething={doSomething}
          hamburgerScrolled={hamburgerScrolled}
          openSideMenu={props.openSideMenu}
          setOpenSideMenu={props.setOpenSideMenu}
          //executeScroll={executeScroll}
          userState={props.userState}
          executeScrollForLookupSection={props.executeScrollForLookupSection}
          executeScrollForSection2={props.executeScrollForSection2}
        />
      </Outter>
    </>
  );
}

export default Header;
