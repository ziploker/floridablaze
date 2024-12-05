////////////////////////////////////////////////////////
///////////////////   IMPORTS  /////////////////////////
///////////////////////////////////////////////////////

import React, { useEffect, useLayoutEffect, useState, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
//import useDocumentScrollThrottled from './useDocumentScrollThrottled.jsx'
import styled from "styled-components"
import headerLeaf from "../../assets/images/headerLeafv2.png"
//import headerLogo from '../../assets/images/logo.png'
import Burger from "./burger"
import SideMenu from "./sidemenu"
import company_logo from "../../assets/images/company_logo.svg"
import company_logo_with_tagline from "../../assets/images/company_logo_with_tagline.svg"
import tagline from "../../assets/images/tagline.svg"

import Login from "./pages/login"

////////////////////////////////////////////////////////
//////////////   STYLED COMPONENTS  ///////////////////
///////////////////////////////////////////////////////

const HeaderWrapper = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: minmax(100px, 280px) 1fr;
	/* grid-template-rows: 85px; */
	grid-template-rows: 80px;
	width: 100%;
	//min-width: 500px;
	margin-top: 15px;
	grid-template-areas: "headerLogo headerLeaf ";
	//min-width: 100vw;
	max-width: 2000px;
	overflow: hidden;
	grid-gap: 8px;
	z-index: 51;

	@media only screen and (max-width: 440px) {
		//height: 43px;
	}

	@media only screen and (max-width: 520px) {
		grid-template-rows: 69px;
	}
`

const LogoText = styled.div`
	//width: 100%;
	width: ${(props) => (props.logo_scrolled == "true" ? "260px" : "300px")};

	transition: all 0.3s linear;

	position: ${(props) => (props.logo_scrolled == "true" ? "fixed" : "absolute")};
	margin-left: 50px;
	//transition: all 0.3s linear;
	grid-area: headerLogo;
	top: ${(props) => (props.logo_scrolled == "true" ? "10px" : "4px")};
	//top: 4px;
	grid-gap: 10px;
	justify-self: start;
	align-self: center;

	margin-bottom: 8px;

	display: grid;
	grid-template-columns: 1fr;

	cursor: pointer;

	z-index: 51;

	span {
		color: rgb(241, 203, 203);
	}

	@media only screen and (max-width: 985px) {
		margin-left: 20px;
	}

	@media only screen and (max-width: 731px) {
		width: ${(props) => (props.logo_scrolled == "true" ? "225px" : "265px")};
	}

	@media only screen and (max-width: 520px) {
		width: ${(props) => (props.logo_scrolled == "true" ? "160px" : "200px")};
		top: ${(props) => (props.logo_scrolled == "true" ? "18px" : "4px")};
	}

	@media only screen and (max-width: 295px) {
		width: ${(props) => (props.logo_scrolled == "true" ? "171px" : "171px")};
		margin-left: 15px;
	}

	@media only screen and (max-width: 230px) {
		width: ${(props) => (props.logo_scrolled == "true" ? "100px" : "100px")};
		margin-left: 8px;
	}
`

const LogoTextTop = styled.img`
	/* width: ${(props) => (props.logo_scrolled == "true" ? "175px" : "300px")}; */
	width: 95%;
	justify-self: start;
	/* transition: all 0.3s linear; */

	@media only screen and (max-width: 295px) {
		margin-left: -2px;
	}
`
//
const LogoTextBottom = styled.img`
	justify-self: start;
	width: 112%;
	margin-left: 1px;
	opacity: ${(props) => (props.logo_scrolled == "true" ? "0" : "1")};
	transition: all 0.3s linear;
	max-height: ${(props) => (props.logo_scrolled == "true" ? "0" : "50px")};
	max-width: ${(props) => (props.logo_scrolled == "true" ? "0" : "500px")};
	transform: ${(props) => (props.logo_scrolled == "true" ? "scale(.1)" : "scale(1)")};
`
const HeaderLeafImage = styled.img`
	/* @media only screen and (max-width: 1100px) {
    margin-right: -110px;
    max-width: 100%;
  }

  @media only screen and (max-width: 420px) {
    margin-right: -200px;
  }
*/
	@media only screen and (max-width: 520px) {
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
		props.hamburger_scrolled == "true" || props.long_nav_scrolled == "true" ? "0" : "1"}; */

	//transition: all 0.2s linear;

	@media only screen and (max-width: 1000px) {
		max-width: 420px;
	}
`

const UlWrapper = styled.div`
	display: grid;
`
const LongNav = styled.nav`
	@media only screen and (max-width: 600px) {
		display: none;
	}
	transition: all 0.2s linear;
	grid-area: headerLeaf;
	color: white;
	align-self: center;
	justify-self: end;
	margin: 0 -25px;
	display: flex;
	position: ${(props) => (props.long_nav_scrolled == "true" ? "fixed" : "initial")};
	//position: fixed;

	top: ${(props) => (props.long_nav_scrolled == "true" ? "2px" : "initial")};
	right: ${(props) => (props.long_nav_scrolled == "true" ? "0px" : "initial")};
	color: ${(props) =>
		props.scroll_dir == "scrolling down"
			? props.leaf_scrolled_so_change_color_down == "true"
				? "black"
				: "white"
			: props.leaf_scrolled_so_change_color_up == "true"
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
        // font-size: 39px;
      } */
			align-self: baseline;
			//display: inline-block;
			padding: 0px 5px;
			//transition: // font-size 0.1s linear;
			font-weight: 400;
			// font-size: 30px;
			font-size: 1.5rem;
			line-height: 45px;
			color: inherit;
			text-decoration: none;
			display: grid;

			cursor: pointer;
			&:hover {
				color: rgb(241, 203, 203);
			}

			@media only screen and (max-width: 666px) {
				font-size: 1rem;
			}

			a {
				//transition: all 0.3s ease 0s;
				font-weight: 500;
				// font-size: 1vw;
				line-height: 45px;
				color: inherit;
				@media only screen and (min-width: 1500px) {
					// font-size: 15px;
				}
			}
		}

		span {
			// font-size: 1rem;
		}
	}
`

const Outter = styled.div`
	width: 100%;
	//height: 100vh;
	//position: relative;
	overflow: hidden;
	//z-index: 505;
`

const HamburgerMenu = styled.div`
	margin-top: ${(props) => (props.hamburger_scrolled == "true" ? "0px" : "8px")};
	grid-area: 1/2/2/3;
	justify-self: end;
	align-self: center;
	position: ${(props) => (props.hamburger_scrolled == "true" ? "fixed" : "grid")};
	padding-right: ${(props) => (props.hamburger_scrolled == "true" ? "0px" : "13px")};
	//top: 25px;
	right: 13px;
	//transition: all 0.2s linear;
	padding-left: 10px;

	top: ${(props) => (props.hamburger_scrolled == "true" ? "17px" : "initial")};

	@media only screen and (max-width: 520px) {
		align-self: start;

		margin-top: ${(props) => (props.hamburger_scrolled == "true" ? "0px" : "17px")};
	}
	@media only screen and (max-width: 230px) {
		margin-top: ${(props) => (props.hamburger_scrolled == "true" ? "0px" : "5px")};

		top: ${(props) => (props.hamburger_scrolled == "true" ? "15px" : "initial")};
	}
	@media only screen and (max-width: 155px) {
		right: 8px;
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

	/* @media only screen and (max-width: 420px) {
		padding-right: 1.1em;
	} */
`

const TopBackgroundBar = styled.div`
	position: fixed;
	/* opacity: ${(props) => (props.leaf_scrolled_so_change_color_down == "true" ? "1" : "0")}; */
	opacity: ${(props) => (props.logo_scrolled == "true" ? "1" : "0")};
	top: 0;
	width: 100%;
	max-width: 2000px;
	min-width: 269px;
	height: 50px;
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
`

////////////////////////////////////////////////////////
///////////////   HEADER FUNCTION   ///////////////////
///////////////////////////////////////////////////////
function Header(props) {
	console.log("==============Header===============")
	console.log("==============Header Props===============", props)

	// if true, element reached the top of viewport, ready to be "sticky"
	const [longNavScrolled, setLongNavScrolled] = React.useState("false")
	const [scrollDir, setScrollDir] = useState("scrolling down")

	const [logoScrolled, setLogoScrolled] = React.useState("false")
	const [leafScrolledSoChangeColorDown, setLeafScrolledSoChangeColorDown] = React.useState("false")

	const [leafScrolledSoChangeColorUp, setLeafScrolledSoChangeColorUp] = React.useState("false")

	const [hamburgerScrolled, setHamburgerScrolled] = React.useState("false")

	// initial distance from element to top of viewport
	const [pixlesFromLogoToTop, setPixlesFromLogoToTop] = useState(1)
	const [pixlesFromHamburgerToTop, setPixlesFromHamburgerToTop] = useState(1)
	const [pixlesFromLongNavToTop, setPixlesFromLongNavToTop] = useState(1)
	const [windowWidth, setWindowWidth] = useState(0)
	//33
	//const [pixlesFromLongNavToTop, setPixlesFromLongNavToTop] = useState(0);

	// refs for elements that need stickyness or effects
	const logoTextRef = useRef()
	const hamburgerRef = React.useRef()
	const longNavRef = React.useRef()

	const locationFromHook = useLocation()
	const navigate = useNavigate()
	// scroll listener

	let resizeWindow = () => {
		setWindowWidth(window.innerWidth)
	}

	useEffect(() => {
		console.log("===================window.scrollY===", window.scrollY)
		console.log("==== pixlesFromLongNavToTop ====", pixlesFromLogoToTop)
		// console.log(
		//   "==== longNavRef.current.getBoundingClientRect().top====",
		//   longNavRef.current.getBoundingClientRect().top
		// );
		resizeWindow()
		window.addEventListener("resize", resizeWindow)
		return () => window.removeEventListener("resize", resizeWindow)
	})

	useEffect(() => {
		console.log("UseEffect 22222222222")
		const threshold = 0
		let lastScrollY = window.pageYOffset
		let ticking = false

		const updateScrollDir = () => {
			const scrollY = window.pageYOffset

			if (Math.abs(scrollY - lastScrollY) < threshold) {
				ticking = false
				return
			}
			setScrollDir(scrollY > lastScrollY ? "scrolling down" : "scrolling up")
			lastScrollY = scrollY > 0 ? scrollY : 0
			ticking = false
		}

		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(updateScrollDir)
				ticking = true
			}
		}

		window.addEventListener("scroll", onScroll)
		console.log(scrollDir)

		return () => window.removeEventListener("scroll", onScroll)
	}, [scrollDir])

	useEffect(() => {
		console.log("UseEffect 3333333333")
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	// set initial values for "sticky" feature
	useEffect(() => {
		console.log("UseEffect 444444444444")
		console.log(
			"Sticky feature, initial hamburgerRef.current.getBoundingClientRect().top is ",
			hamburgerRef.current.getBoundingClientRect().top
		)
		console.log(
			"What is the longNavRef.current.getBoundingClientRect().top",
			longNavRef.current.getBoundingClientRect().top
		)
		//
		setPixlesFromLogoToTop(
			logoTextRef.current.getBoundingClientRect().top //-30
		)

		longNavRef.current.getBoundingClientRect().top == 0
			? null
			: setPixlesFromLongNavToTop(longNavRef.current.getBoundingClientRect().top)

		hamburgerRef.current.getBoundingClientRect().top > 37
			? null
			: setPixlesFromHamburgerToTop(hamburgerRef.current.getBoundingClientRect().top - 20)

		//
		// // // window.innerWidth > 500
		// // //   ? setPixlesFromLongNavToTop(
		// // //       longNavRef.current.getBoundingClientRect().top
		// // //     )
		// // //   : null;
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
	}, [])

	////sticky nav end
	useEffect(() => {
		console.log("UseEffect 5555555555555")
		// make it so this header doesnt load on certin pages
		if (
			locationFromHook.pathname === "/login" ||
			locationFromHook.pathname === "/signup" ||
			locationFromHook.pathname === "/forgot" ||
			locationFromHook.pathname === "/edit" ||
			locationFromHook.pathname === "/change"
		) {
			return
		} else {
			//function to pass to mousedown listener, to close side menu if need be.
			listener = (event) => {
				//if you click in the menu,  dont close it
				if (hamburgerRef.current.contains(event.target)) {
					return
				}

				//if you click anywhere outside the side menu, close it.
				//mouseDownHandler();
				props.set_open_side_menu("false")
			}
		}

		//resize and/or orientationchange listener
		const handleResize = () => {
			//closed sideMenu on orientation change, if it gets bigger than 850px
			if (window.innerWidth > 500) {
				props.set_open_side_menu("false")
			}
		}

		//set up event listeners
		window.addEventListener("resize", handleResize)
		window.addEventListener("orientationchange", handleResize)
		document.addEventListener("mousedown", listener)

		return () => {
			window.removeEventListener("resize", handleResize)
			window.removeEventListener("orientationchange", handleResize)
			document.removeEventListener("mousedown", listener)
			console.log("cleanup")
		}
	}, [hamburgerRef])
	//}, [hamburgerRef, mouseDownHandler]);

	// sets the state so the element can stick
	const handleScroll = () => {
		console.log("===================window.scrollY===", window.scrollY)
		console.log("===================pixlesFromLongNavToTop===", pixlesFromLongNavToTop)

		// window.scrollY >= pixlesFromLogoToTop - 4
		window.scrollY >= pixlesFromLogoToTop + 1 ? setLogoScrolled("true") : setLogoScrolled("false")

		window.scrollY >= 60
			? setLeafScrolledSoChangeColorDown("true")
			: setLeafScrolledSoChangeColorDown("false")

		window.scrollY <= 69
			? setLeafScrolledSoChangeColorUp("true")
			: setLeafScrolledSoChangeColorUp("false")

		window.scrollY >= pixlesFromHamburgerToTop + 10
			? setHamburgerScrolled("true")
			: setHamburgerScrolled("false")

		window.scrollY >= pixlesFromLongNavToTop + 25
			? setLongNavScrolled("true")
			: setLongNavScrolled("false")
	}

	// scroll to top
	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	//put directly in function, delete this if it works
	function mouseDownHandler() {
		props.set_open_side_menu("false")
	}

	function doSomething(e) {
		//scrollToTop();

		e.preventDefault()

		props.set_open_side_menu("false")
		props.set_login_clicked("true")
	}

	let listener

	// if (locationFromHook.pathname === "/edit") {
	// 	return null;
	// } else {
	return (
		<>
			<Login
				handleSuccessfulAuth={props.handleSuccessfulAuth}
				set_login_clicked={props.set_login_clicked}
				login_clicked={props.login_clicked}
				userState={props.userState}
			/>
			<TopBackgroundBar
				hamburger_scrolled={hamburgerScrolled}
				logo_scrolled={logoScrolled}
				leaf_scrolled_so_change_color_down={leafScrolledSoChangeColorDown}
			/>

			<HeaderWrapper open_side_menu={props.open_side_menu} logo_scrolled={logoScrolled}>
				<LogoText
					onClick={() => {
						navigate("/")
					}}
					ref={logoTextRef}
					logo_scrolled={logoScrolled}
					windowWidth={windowWidth}
					//long_nav_scrolled={longNavScrolled}
				>
					<LogoTextTop logo_scrolled={logoScrolled} src={company_logo} alt="floridablaze home" />
					<LogoTextBottom logo_scrolled={logoScrolled} src={tagline} alt="" />
				</LogoText>

				<HeaderLeafImage
					src={headerLeaf}
					long_nav_scrolled={longNavScrolled}
					logo_scrolled={logoScrolled}
					alt=""
				></HeaderLeafImage>
				<LongNav
					ref={longNavRef}
					long_nav_scrolled={longNavScrolled}
					hamburger_scrolled={hamburgerScrolled}
					leaf_scrolled_so_change_color_down={leafScrolledSoChangeColorDown}
					leaf_scrolled_so_change_color_up={leafScrolledSoChangeColorUp}
					scroll_dir={scrollDir}
				>
					{/* <UlWrapper> */}
					<ul>
						<li key={0}>news</li>
						<li key={1} onClick={props.executeScrollForLookupSection}>
							act
						</li>
						<li key={2}>shop</li>

						{props.userState.loggedInStatus == "LOGGED_IN"
							? [
									<li style={{ padding: "0 0 0 4px", fontSize: ".75rem" }} key={3}>
										<a key={"a"} onClick={props.handleLogOutClick}>
											Logout
										</a>
									</li>,
									<span key={4} style={{ fontSize: ".8em", padding: "0 2px" }}>
										|
									</span>,
									<li style={{ padding: "0" }} key={5}>
										<Link
											style={{ textDecoration: "none", fontSize: ".75rem" }}
											key={"b"}
											to="/edit"
										>
											edit
										</Link>
									</li>,
							  ]
							: [
									<li style={{ padding: "0 0 0 4px", fontSize: ".75rem" }} key={6}>
										<a key={"c"} onClick={doSomething}>
											Login
										</a>
									</li>,
									<span key={7} style={{ fontSize: ".8em", padding: "0 2px" }}>
										|
									</span>,
									<li style={{ padding: "0", fontSize: ".75rem" }} key={8}>
										<a key={"d"} onClick={props.executeScrollForSection2}>
											Signup
										</a>
									</li>,
							  ]}
					</ul>
					{/* </UlWrapper> */}
				</LongNav>

				<HamburgerMenu hamburger_scrolled={hamburgerScrolled} ref={hamburgerRef}>
					<Burger
						open_side_menu={props.open_side_menu}
						set_open_side_menu={props.set_open_side_menu}
						hamburger_scrolled={hamburgerScrolled}
						login_clicked={props.login_clicked}
						set_login_clicked={props.set_login_clicked}
						leaf_scrolled_so_change_color_down={leafScrolledSoChangeColorDown}
						leaf_scrolled_so_change_color_up={leafScrolledSoChangeColorUp}
						scroll_dir={scrollDir}
					/>
				</HamburgerMenu>
			</HeaderWrapper>

			<Outter>
				<SideMenu
					doSomething={doSomething}
					hamburger_scrolled={hamburgerScrolled}
					open_side_menu={props.open_side_menu}
					set_open_side_menu={props.set_open_side_menu}
					//executeScroll={executeScroll}
					userState={props.userState}
					executeScrollForLookupSection={props.executeScrollForLookupSection}
					executeScrollForSection2={props.executeScrollForSection2}
				/>
			</Outter>
			{/* <h1>{windowWidth}</h1> */}
		</>
	)
}

export default Header
