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
import Login from "./pages/login";

////////////////////////////////////////////////////////
//////////////   STYLED COMPONENTS  ///////////////////
///////////////////////////////////////////////////////

const HeaderWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(180px, 280px) 1fr;
  /* grid-template-rows: 85px; */
  grid-template-rows: 100px;
  margin-top: 15px;
  grid-template-areas: "headerLogo headerLeaf ";
  //min-width: 100vw;
  max-width: 2000px;
  overflow: hidden;
  grid-gap: 8px;
  z-index: 51;
`;

const LogoText = styled.img`
	//position: ${(props) => (props.logoScrolled ? "fixed" : "initial")};
	position: fixed;
  opacity: .1;
	//top: ${(props) => (props.logoScrolled ? "10px" : "initial")};
	//font-style: normal;
	//font-weight: normal;
	//font-size: 22px;
	//letter-spacing: -1px;
	//color: #010101;
	margin-left: 50px;
	transition: all .17s linear;
	grid-area: headerLogo;
	top:${(props) => (props.longNavScrolled ? "15px" : "30px")};
  	//left: 50px;
	justify-self: start;
	align-self: center;
	//display: inline-block;
	
	/* font-size: ${(props) => (props.logoScrolled ? "1em" : "2em")}; */
		/* width: ${(props) => (props.logoScrolled ? "155px" : "225px")}; */
	/* width: ${(props) => (props.logoScrolled ? "175px" : "250px")}; */
  
	width: ${(props) => (props.longNavScrolled ? "200px" : "280px")};
  //height: 45px;
	//width: 100%;
	//max-width: 420px;
	//min-width: 100px;
	cursor: pointer;

	z-index: 51;

	span {
		color: rgb(241, 203, 203);
	}
	@media only screen and (max-width: 700px) {
		//width: 200px;
		//margin: 0 0 10px 10px;
    //left: 50px;
    //width: 280px;
    //top: 11px;
	}

	@media only screen and (max-width: 985px) {
		margin-left: 20px;
	}

	@media only screen and (max-width: 520px) {
		width: 164px;
	}

	/* @media only screen and (min-width: 1999px) {

      position: initial;
	} */

	/*
	@media only screen and (max-width: 500px) {
		width: 200px;
	}
	
	@media only screen and (max-width: 385px) {
		width: 160px;
	} */ 
`;

const HeaderLeafImage = styled.img`
  /* @media only screen and (max-width: 1100px) {
    margin-right: -110px;
    max-width: 100%;
  }

  @media only screen and (max-width: 420px) {
    margin-right: -200px;
  }
*/
  @media only screen and (max-width: 330px) {
    display: none;
  }

  width: 100%;
  max-width: 520px;
  min-width: 250px;
  //margin-bottom: -4px;
  //min-width: 400px;
  height: 100%;
  //max-width: 84%;
  grid-area: headerLeaf;
  justify-self: end;
  align-self: center;

  /* opacity: ${(props) =>
    props.hamburgerScrolled || props.longNavScrolled ? "0" : "1"}; */

  //transition: all 0.2s linear;

  @media only screen and (max-width: 1000px) {
    max-width: 420px;
  }
`;

const UlWrapper = styled.div`
  display: grid;
`;
const LongNav = styled.nav`
	@media only screen and (max-width: 1000px) {
		display: none;
	}
	transition: all 0.2s linear;
	grid-area: headerLeaf;
	color: white;
	align-self: center;
	justify-self: end;
	margin: 0 -25px;
	display: flex;
	position: ${(props) => (props.longNavScrolled ? "fixed" : "initial")};
	//position: fixed;

	top: ${(props) => (props.longNavScrolled ? "2px" : "initial")};
	/* color: ${(props) =>
    props.logoScrolledChangeColor && props.scrollDir == "scrolling down"
      ? "black"
      : "white"}; */

	color: ${(props) =>
    props.scrollDir == "scrolling down"
      ? props.leafScrolledSoChangeColorDown
        ? "black"
        : "white"
      : props.leafScrolledSoChangeColorUp
      ? "white"
      : "black"};
	//height: 100%;

	ul {
		list-style: none;
		margin-right: 40px;
		display: grid;
		align-items: baseline;
		color: inherit;
		align-self: center;
		grid-template-columns: repeat(6, min-content);
		font-family: "Fira Sans";

		li {
			/* @media only screen and (max-width: 666px) {
        padding: 0px 12px;
      } */

			/* @media only screen and (min-width: 1396px) {
        font-size: 39px;
      } */
			align-self: baseline;
			//display: inline-block;
			padding: 0px 5px;
			//transition: font-size 0.1s linear;
			font-weight: 400;
			/* font-size: ${(props) => (props.longNavScrolled ? "1.8vw" : "2vw")}; */
			font-size: 2vw;
			line-height: 45px;
			color: inherit;
			text-decoration: none;
			display: grid;

			cursor: pointer;
			&:hover {
				color: rgb(241, 203, 203);
			}

			@media only screen and (min-width: 1500px) {
				font-size: 30px;
				
			}

			a {

				//transition: all 0.3s ease 0s;
				font-weight: 500;
				/* font-size: ${(props) => (props.longNavScrolled ? ".8vw" : "1vw")}; */
				font-size: 1vw;
				line-height: 45px;
				color: inherit;
				@media only screen and (min-width: 1500px) {
				
					font-size: 15px;
				}
				
			}

				
    }

    span {
      font-size: 1em;
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
  //position: relative;
  /* grid-area: 1/2/2/3;
	justify-self: end;
	align-self: center;
	padding-right: 3em; */

  position: fixed;
  //top: 25px;
  right: 22px;
  transition: all 0.2s linear;
  //position: ${(props) => (props.hamburgerScrolled ? "fixed" : "initial")};
  top: ${(props) => (props.hamburgerScrolled ? "17px" : "56px")};

  @media only screen and (max-width: 330px) {
    //grid-area: 1/2/2/3;
    //justify-self: end;
    //align-self: center;
    //padding: 0 10px;
    //position: initial;
    //top: initial;
    //right: initial;
    top: 14px;
  }

  /* @media only screen and (max-width: 1000px) {
		position: ${(props) => (props.hamburgerScrolled ? "fixed" : "initial")};
		top: ${(props) => (props.hamburgerScrolled ? "18px" : "initial")};
	} */

  button {
    /* div {
			background: white;
			color: white; */

    /* @media only screen and (max-width: 266px) {
				background: black;
				color: black;
			} */
  }

  /* @media only screen and (max-width: 420px) {
		padding-right: 1.1em;
	} */
`;

const TopBackgroundBar = styled.div`
  position: fixed;
  opacity: ${(props) => (props.leafScrolledSoChangeColorDown ? "1" : "0")};
  top: 0;
  width: 100%;
  max-width: 2000px;
  min-width: 269px;
  height: 55px;
  background-color: black;
  //transition: all 0.1s linear;
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
  const [longNavScrolled, setLongNavScrolled] = React.useState(false);
  const [scrollDir, setScrollDir] = useState("scrolling down");

  const [logoScrolled, setLogoScrolled] = React.useState(false);
  const [leafScrolledSoChangeColorDown, setLeafScrolledSoChangeColorDown] =
    React.useState(false);

  const [leafScrolledSoChangeColorUp, setLeafScrolledSoChangeColorUp] =
    React.useState(false);

  const [hamburgerScrolled, setHamburgerScrolled] = React.useState(false);

  // initial distance from element to top of viewport
  const [pixlesFromLogoToTop, setPixlesFromLogoToTop] = useState(26.75);
  const [pixlesFromHamburgerToTop, setPixlesFromHamburgerToTop] =
    useState(30.5);
  // const [pixlesFromLongNavToTop, setPixlesFromLongNavToTop] =
  //   useState(19.366668701171875);
  const [pixlesFromLongNavToTop, setPixlesFromLongNavToTop] = useState(0);

  // refs for elements that need stickyness or effects
  const logoTextRef = useRef();
  const hamburgerRef = React.useRef();
  const longNavRef = React.useRef();

  const locationFromHook = useLocation();
  const navigate = useNavigate();
  // scroll listener

  useEffect(() => {
    console.log("===================window.scrollY===", window.scrollY);
    console.log("==== pixlesFromLongNavToTop ====", pixlesFromLongNavToTop);
    console.log(
      "==== longNavRef.current.getBoundingClientRect().top====",
      longNavRef.current.getBoundingClientRect().top
    );
  });

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? "scrolling down" : "scrolling up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    console.log(scrollDir);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

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
    // console.log("END_OF_USE_EFFECT _window.innerWidth = ", window.innerWidth);
    // console.log(
    //   "END_OF_USE_EFFECT _LogoTextToTop = ",
    //   logoTextRef.current.getBoundingClientRect().top
    // );
    // console.log(
    //   "END_OF_USE_EFFECT _HamburgerToTop = ",
    //   hamburgerRef.current.getBoundingClientRect().top
    // );

    // console.log(
    //   "END_OF_USE_EFFECT _LongNavToTop = ",
    //   longNavRef.current.getBoundingClientRect().top
    // );
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

    // window.scrollY >= pixlesFromLogoToTop - 4
    window.scrollY >= pixlesFromLogoToTop
      ? setLogoScrolled(true)
      : setLogoScrolled(false);
    window.scrollY >= 75
      ? setLeafScrolledSoChangeColorDown(true)
      : setLeafScrolledSoChangeColorDown(false);

    window.scrollY <= 90
      ? setLeafScrolledSoChangeColorUp(true)
      : setLeafScrolledSoChangeColorUp(false);

    //window.scrollY > 0 ? setLogoScrolled(true) : setLogoScrolled(false)
    //console.log("scrolllllY", window.scrollY)
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

  function doSomething(e) {
    //scrollToTop();

    e.preventDefault();

    props.setOpenSideMenu(false);
    props.setLoginClicked(true);
  }

  let listener;

  // if (locationFromHook.pathname === "/edit") {
  // 	return null;
  // } else {
  return (
    <>
      <Login
        handleSuccessfulAuth={props.handleSuccessfulAuth}
        setLoginClicked={props.setLoginClicked}
        loginClicked={props.loginClicked}
        userState={props.userState}
      />
      <TopBackgroundBar
        hamburgerScrolled={hamburgerScrolled}
        logoScrolled={logoScrolled}
        leafScrolledSoChangeColorDown={leafScrolledSoChangeColorDown}
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
          longNavScrolled={longNavScrolled}
        ></LogoText>

        {/* <h1 style={{ display: "none" }}> {logoScrolled ? "TRUE" : "FALSE"} </h1> */}

        <HeaderLeafImage
          src={headerLeaf}
          longNavScrolled={longNavScrolled}
          logoScrolled={logoScrolled}
        ></HeaderLeafImage>
        <LongNav
          ref={longNavRef}
          longNavScrolled={longNavScrolled}
          hamburgerScrolled={hamburgerScrolled}
          leafScrolledSoChangeColorDown={leafScrolledSoChangeColorDown}
          leafScrolledSoChangeColorUp={leafScrolledSoChangeColorUp}
          scrollDir={scrollDir}
        >
          {/* <UlWrapper> */}
          <ul>
            <li key={0}>news</li>
            <li key={1}>
              <span onClick={props.executeScrollForLookupSection}>act</span>
            </li>
            <li key={2}>shop</li>

            {props.userState.loggedInStatus == "LOGGED_IN"
              ? [
                  <li style={{ padding: "0 0 0 4px" }} key={3}>
                    <a key={"a"} onClick={props.handleLogOutClick}>
                      Logout
                    </a>
                  </li>,
                  <span key={4} style={{ fontSize: ".8em", padding: "0 2px" }}>
                    |
                  </span>,
                  <li style={{ padding: "0" }} key={5}>
                    <Link
                      style={{ textDecoration: "none" }}
                      key={"b"}
                      to="/edit"
                    >
                      edit
                    </Link>
                  </li>,
                ]
              : [
                  <li style={{ padding: "0 0 0 4px" }} key={6}>
                    <a key={"c"} onClick={doSomething}>
                      Login
                    </a>
                  </li>,
                  <span key={7} style={{ fontSize: ".8em", padding: "0 2px" }}>
                    |
                  </span>,
                  <li style={{ padding: "0" }} key={8}>
                    <a key={"d"} onClick={props.executeScrollForSection2}>
                      Signup
                    </a>
                  </li>,
                ]}
          </ul>
          {/* </UlWrapper> */}
        </LongNav>

        <HamburgerMenu hamburgerScrolled={hamburgerScrolled} ref={hamburgerRef}>
          <Burger
            openSideMenu={props.openSideMenu}
            setOpenSideMenu={props.setOpenSideMenu}
            hamburgerScrolled={hamburgerScrolled}
            loginClicked={props.loginClicked}
            setLoginClicked={props.setLoginClicked}
          />
        </HamburgerMenu>
      </HeaderWrapper>

      <Outter>
        <SideMenu
          doSomething={doSomething}
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
