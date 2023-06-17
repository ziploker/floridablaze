import React, { useEffect, useState } from "react"
import styled, { ThemeProvider } from "styled-components"
//import { Parallax, Background } from 'react-parallax';

//import { GoogleLogin } from "react-google-login";
//import FacebookLogin from "react-facebook-login";

import floridaBlankPink from "../../assets/images/floridaBlankPink.png"
import floridaMaskCell from "../../assets/images/floridaMaskThinBlanco1.png"
import floridaMask from "../../assets/images/floridaMaskBlanco.png"
import floridaMaskThinLongist from "../../assets/images/floridaMaskThinLongist.png"
import floridaMaskBig from "../../assets/images/floridaMaskBig.png"
import floridaMaskSmaller from "../../assets/images/floridaMaskSmaller.png"
import floridaMaskSmaller3 from "../../assets/images/floridaMaskSmaller3.png"
import floridaMaskSmaller5 from "../../assets/images/floridaMaskSmaller5.png"

import flFists from "../../assets/images/flFists.png"
import thebullet from "../../assets/images/thebullet.png"

import wleaf from "../../assets/images/wleaf.jpg"

import { Link, useLocation } from "react-router-dom"

import redX from "../../assets/images/redXmark.jpg"
import userIcon from "../../assets/images/signup2.svg"
import greenCheck from "../../assets/images/greenCheck.png"
import dummy_avatar from "../../assets/images/dummy_avatar.png"

import {
	Card,
	Logo,
	Form,
	Input,
	Button,
	ErrorMsg,
	XorCheckIcon,
	LoginWrapper,
	InputIcon,
	LogoWrapper,
	H2,
	FormItem,
	FormItemSqueeze,
	Label,
	EmailLabel,
	ErrorWrapper,
} from "./pages/AuthForm"

import axios from "axios"
import $ from "jquery"

import { gsap } from "gsap"

import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
gsap.core.globals("ScrollTrigger", ScrollTrigger)

//var Spinner = require("react-spinkit");
//var randomColor = require('randomcolor');

const SignupWrapper = styled.div`
	@media only screen and (max-width: 985px) {
		//grid-template-columns: minmax(20px, 1fr) minmax(min-content, 705px) minmax(20px, 1fr);
		//grid-template-columns: minmax(20px, 120px) minmax(300px, min-content) minmax(20px, 1fr);
		//grid-template-rows: min-content 1fr min-content;
		grid-template-columns: 2% 1fr 2%;
		min-width: 100%;

		border-top: 25px white solid;

		//padding-left: 20px;
		//justify-self: center;
		//max-height: initial;
	}

	/* @media only screen and (max-width: 777px) {
		grid-template-columns: minmax(20px, 1fr) minmax(300px, min-content) minmax(20px, 1fr);
	} */

	//width: 100vw;

	/* @media only screen and (max-width: 720px){

    grid-template-columns: minmax(20px, 1fr) 1fr minmax(20px, 1fr);
    min-width: 100%;
    //padding-left: 20px;
    //justify-self: center;


  }

  //padding: 45px 0px;
  
  //background-size: cover;
  display: grid;
  grid-template-columns: minmax(20px,1fr) minmax(335px,350px) minmax(350px,600px) minmax(20px,1fr);
  grid-column-gap: 0.5em;
  justify-items: center; */

	position: relative;

	background-color: #ffffff;
	display: ${(props) => (props.showOffer ? "none" : "grid")};

	align-items: center;
	justify-content: center;

	grid-template-columns:
		minmax(0px, 1fr) minmax(300px, 450px) minmax(525px, 700px)
		minmax(20px, 1fr);
	//grid-template-rows: 1fr minmax(min-content, max-content) 1fr;
	//padding-top: 60px;
	//padding-bottom: 20px;
	text-align: center;
	height: 100%;
	//max-height: 620px;
	//background-color: RGB(244, 244, 244);

	border-top: 47px white solid;
	border-bottom: 37px white solid;

	//justify-self: start;
	//grid-template-columns: minmax(170px,350px) minmax(340px,600px);
	//grid-template-columns: minmax(20px, 1fr) minmax(300px, 350px) minmax(420px,600px) minmax(20px, 1fr);

	//grid-area: 1/1/-1/-1;
	//grid-column-gap: 0.5em;

	background: url(${wleaf}) fixed;
	background-size: cover;
	background-position: right bottom;

	//z-index: -1;
`

const SignupMaskWrapper = styled.div`
	@media only screen and (max-width: 985px) {
		grid-area: 1/2/2/3;
		width: 100%;
		//height: 100%;
	}

	display: grid;
	grid-area: 1/3/2/4;
	width: 100%;
	height: 100%;
	//max-height: 500px;
	//grid-template-columns: 1fr max-content 1fr;
	grid-template-rows: min-content 1fr;
`

const TopFiLL = styled.div`
	grid-area: 1/1/2/4;
	background: white;
	width: 100%;
	height: 100%;
`

const BottomFiLL = styled.div`
	@media only screen and (max-width: 985px) {
		grid-area: 2/1/3/4;
	}

	grid-area: 2/1/3/2;
	background: white;
	width: 100%;
	height: 100%;
`

const LeftFiLL = styled.div`
	grid-area: 1/1/4/2;
	background: white;
	width: 100%;
	height: 100%;
`

const RightFiLL = styled.div`
	grid-area: 1/3/4/4;
	background: white;
	width: 100%;
	height: 100%;
`

const TopFiller = styled.div`
	grid-area: 1/1/2/2;
	background: white;
	width: 100%;
	height: 100%;
`

const BottomFiller = styled.div`
	@media only screen and (max-width: 985px) {
		grid-area: 2/1/3/4;
		width: 100%;
		//height: 100%;
	}

	grid-area: 2/1/3/-1;
	background: white;
	width: 100%;
	height: 100%;
`

const SignupMaskImageContainer = styled.div`
	@media only screen and (max-width: 985px) {
		grid-area: 1/1/2/4;
	}

	grid-area: 1/1/2/2;
`

const SignupMaskImage = styled.img`
	@media only screen and (max-width: 985px) {
		width: 100%;

		//max-height: initial
	}

	//grid-area: 1/3/-1/4;
	grid-area: 1/1/2/2;
	@media only screen and (max-width: 400px) {
		//max-height: initial
	}

	grid-area: 1/1/2/2;
	width: 100%;
	/* width: 100%;
  height: 100%; */
	height: 100%;
	max-width: 1400px;

	max-height: 1125px;

	justify-self: center;

	//opacity: .3;
`

const LeftFiller = styled.div`
	@media only screen and (max-width: 985px) {
		//display: none;
	}
	grid-area: 1/1/2/2;
	background: white;
	width: 100%;
	height: 100%;
`

const RightFiller = styled.div`
	@media only screen and (max-width: 985px) {
		grid-area: 1/3/2/4;
	}

	grid-area: 1/4/2/5;
	background: white;
	width: 100%;
	height: 100%;
`

const FloridaImg = styled.img`
	//justify-self: end;
	//align-self: start;
	//grid-area: 1/1/7/3;
	height: 100%;
	width: 100%;
	position: relative;
`

const SignupWrapperInner = styled.div`
	/* @media only screen and (max-width: 720px) {
		grid-template-columns: minmax(20px, 1fr) 1fr minmax(20px, 1fr);
		min-width: 100%;
		//padding-left: 20px;
		//justify-self: center;
	} */
	position: relative;
	height: 100%;
	//background-color: RGB(244, 244, 244);
	background-color: #ffffff;
	display: grid;

	align-items: center;
	justify-content: center;
	//justify-self: start;
	//grid-template-columns: minmax(170px,350px) minmax(340px,600px);
	//grid-template-columns: minmax(20px, 1fr) minmax(300px, 350px) minmax(420px,600px) minmax(20px, 1fr);

	grid-template-columns: 1fr 3fr 3fr 1fr;

	grid-area: 1/1/-1/-1;
	grid-column-gap: 0.5em;
	padding-top: 60px;
	padding-bottom: 20px;
	text-align: center;
	//width: 100vw;
`

const LoginCardWrapper = styled.div`
	background: white;
	grid-area: 1/3/2/4;
	height: 100%;
	padding-top: 20px;
`

const LoginCard = styled.div`
	@media only screen and (max-width: 720px) {
		grid-area: 2/1/3/4;
		//margin: 25px 0px 0px 0px;

		//width: 100%;
	}
	position: relative;

	box-sizing: border-box;
	//max-width: 600px;

	//width: 100%;
	//margin-left: 20px;
	//padding: 0 2rem;
	//margin-left: 20px;
	//margin-top: 100px;
	//padding: 50px 0px 0px 0px;
	padding: 100px 20px 0px 20px;

	background-color: #fff;
	//border: 1px solid transparent;

	//box-shadow: 0 1px 1px rgba(0,0,0,0.05);
	//border-radius: 8px;

	justify-self: start;
	align-self: center;

	overflow: hidden;
	//margin: 0 auto;
`

const LoginCardFillLeft = styled.div`
	background: white;
	grid-area: 2/1/3/2;
	width: 100%;
	height: 100%;
`

const LoginCardFillRight = styled.div`
	background: white;
	grid-area: 2/3/3/4;
	width: 100%;
	height: 100%;
`

///////////////////////////////////  HANDLE_CHANGE /////////////////////////////
// function handleChange(event){

//   //const value = event.target.value;
//   const target = e.target;
//   const value = target.type === 'checkbox' ? target.checked : target.value;
//   const name = target.name;
//   //const value = target.type === 'checkbox' ? !event.target.checked : event.target.value;

//   setState({
//     ...state,
//     [name]: value
//   });

// }

function handleImageChange(e) {
	formData.append("user[avatar]", e.target.files[0])

	setState({
		...state,
		avatar: URL.createObjectURL(e.target.files[0]),
	})

	//if (e.target.files[0]) setState({ ...state, avatar: e.target.files[0] });
}

const ProfilePicWrapper = styled.div`
	position: relative;
`

const ProfilePic = styled.img`
	border-radius: 50px;
	border: 1px gray solid;
	position: relative;
	width: 70px;
	height: 70px;
	display: block;
	margin-left: auto;
	margin-right: auto;
`

const LabelForFile = styled.label`
	text-align: center;
	display: inline-block;
	font-size: 12px;
	position: absolute;
	right: -15px;
	bottom: -13px;
	z-index: 5;
	border-radius: 50px;
	//background-color: orange;
	padding: 5px;
	margin: 0 auto;

	//background-color: orange;
	cursor: pointer;

	&:hover {
		//background-color: #fce1b3;
	}
`

const Span = styled.h4`
	font-size: 0.5em;
	padding: 5px 12px;
	margin-right: 5px;

	//transition: opacity 2s ease-in;
`

const StatusSpinner = styled.div`
	max-height: ${(props) => (props.showStatusSpinner.toString() == "true" ? "100%" : "0px")};
	opacity: ${(props) => (props.showStatusSpinner.toString() == "true" ? "1" : "0")};
	transition: opacity 0.4s;
	transition-timing-function: ease-out;
`

const BackgroundFists = styled.img`
	/* grid-area: 1/2/2/5;
  
  width: 100%;
  height: 100%; */

	/* justify-self: end;
  align-self: start;
  grid-area: 1/2/-1/3; */
	//height: 500px;
	width: 54vw;
	position: fixed;
	right: 0;
	//top: 20px;
	bottom: 0;
	z-index: 1;
	/* position: -webkit-sticky;
  position: sticky; */
	//width: 100%;

	//grid-area: 1/1/7/3;
`

const LeftSection = styled.div`
  

  @media only screen and (max-width: 400px) {
    //margin: 700px 0px 0px 0px;
  }

  /* @media only screen and (max-width: 720px){

    grid-area: 1/1/2/4;
    margin: 0px 0px 0px 0px;
    //padding-left: 20px;
    //width: 100vw;

  } */

  /* @media only screen and (max-width: 940px){
  
    padding-left: 20px;
    padding-right: 20px;
    
  } */

  align-self: start;

  text-align: left;
  grid-area: 1/2/2/3;
  height: 100%;
  //margin-right: 4.20em;
  //padding-left: 60px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 800;
  min-width: 420px;

  border-right: 1px rgba(114, 111, 111, 0.3) solid;

  h1 {
    color: rgb(6, 7, 1, 0.9);
    padding: 0 0 0 20px;
    margin 0;
    font-size: 5em;
    word-break: keep-all;
    background: white;
    //text-align: center;
  }

  sub {
    color: rgb(6, 7, 1, 0.9);
  }

  @media only screen and (max-width: 985px) {
    //margin: 500px 0px 0px 0px;
    grid-area: 2/2/3/3;
    border-right: initial;
    
    h1{
      font-size: 7em;
    }
    
  }
`

const SocialMedia = styled.div`
	display: grid;
	grid-template-columns: minmax(min-content, 1fr) minmax(min-content, 1fr);
	grid-template-rows: min-content;

	h3 {
		grid-area: 1/1/2/3;
		justify-self: center;
		font-size: 0.8em;
		margin-bottom: 10px;
	}

	button {
		height: 35px;
		width: 35px;
	}
`

const RightSection = styled.div`
	@media only screen and (max-width: 985px) {
		grid-area: 1/2/2/3;
		grid-template-columns: 1px 30px 1fr;
	}

	@media only screen and (max-width: 400px) {
		//grid-template-rows: 420px repeat(4, 73px) 1fr;
	}

	//background: #C4C4C4;
	grid-area: 1/3/2/4;
	//height: 80%;
	border-top-left-radius: 60px;
	border-bottom-left-radius: 60px;

	display: grid;
	padding: 0px 50px 50px 14px;

	grid-template-columns: 28px 30px minmax(430px, 620px);
	grid-template-rows: 260px repeat(4, 120px) 1fr;

	align-self: start;
	//min-width: 525px;
	//max-width: 600px;

	//max-width: 700px;
`

const WeedBullet1 = styled.img`
	width: 21px;
	grid-area: 2/2/3/3;
	align-self: center;
	justify-self: center;
	margin-top: 1.5px;
`

const WeedBullet2 = styled.img`
	width: 21px;
	grid-area: 3/2/4/3;
	align-self: center;
	justify-self: center;
	margin-top: 1.5px;
`

const WeedBullet3 = styled.img`
	width: 21px;
	grid-area: 4/2/5/3;
	align-self: center;
	justify-self: center;
	margin-top: 1.5px;
`

const WeedBullet4 = styled.img`
	width: 21px;
	grid-area: 5/2/6/3;
	align-self: center;

	justify-self: center;
	margin-top: 1.5px;
`

const WeedBulletText1 = styled.h2`
	grid-area: 2/3/3/4;
	justify-self: start;
	align-self: center;

	padding-left: 10px;
	font-size: 1.5emem;
	align-self: center;

	@media only screen and (max-width: 985px) {
		font-size: 2.4em;
	}
`

const WeedBulletText2 = styled.h2`
	grid-area: 3/3/4/4;
	justify-self: start;
	align-self: center;
	font-size: 1.5em;
	padding-left: 10px;
	align-self: center;
	@media only screen and (max-width: 985px) {
		font-size: 2.4em;
	}
`

const WeedBulletText3 = styled.h2`
	grid-area: 4/3/5/4;
	justify-self: start;
	align-self: center;
	font-size: 1.5em;
	padding-left: 10px;
	align-self: center;
	@media only screen and (max-width: 985px) {
		font-size: 2.4em;
	}
`

const WeedBulletText4 = styled.h2`
	grid-area: 5/3/6/4;
	justify-self: start;
	align-self: center;
	padding-left: 10px;
	font-size: 1.5em;
	align-self: center;
	@media only screen and (max-width: 985px) {
		font-size: 2.4em;
	}
`
const Spacer = styled.h2`
	font-family: Poppins;
	font-style: normal;
	font-weight: normal;
	font-size: 2.5vw;
	//line-height: 100%;

	z-index: -10;
	grid-area: 1/3/2/5;
	color: #e3b55a;
	margin: 0px 0px 8px 20px;

	@media only screen and (max-width: 720px) {
		display: none;
	}
`

// const ActHeader = styled.h1`
//   @media only screen and (max-width: 720px) {
//     grid-area: 1/1/2/-1;
//     //justify-self: center;
//     font-size: 15vw;
//   }

//   font-family: Poppins;
//   font-style: normal;
//   font-weight: 800;
//   font-size: 10vw;
//   //line-height: 100px;
//   /* identical to box height */

//   letter-spacing: -0.08em;

//   color: #ffffff;
//   grid-area: 1/3/2/-1;
//   align-self: end;

//   //line-height: 100%;
//   margin: -10px 0px 0px 20px;
//   padding-top: 20px;
//   //z-index: 1;

//   opacity: ${(props) => (props.showCards || props.showLetter ? "0" : "1")};
// `;

const formData = new FormData()
///////////////////////////////////  SIGN_UP_PAGE //////////////////////////////

function Signup(props, ref) {
	console.log("==============Signup Section===============")
	console.log("============= Signup Section Props===============", props)

	function useWindowDimensions() {
		const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

		useEffect(() => {
			function handleResize() {
				setWindowDimensions(getWindowDimensions())
			}

			window.addEventListener("resize", handleResize)
			return () => window.removeEventListener("resize", handleResize)
		}, [])

		return windowDimensions
	}

	const locationFromHook = useLocation()

	const { section2ScrollToRef } = ref

	const [mobile, setMobile] = useState(false)

	const [state, setState] = React.useState({
		full_name: "",
		full_nameFieldActive: false,

		email: "",
		emailFieldActive: false,

		password: "",
		passwordFieldActive: false,

		opt_in: false,

		status: "",

		showErrorBackground: false,

		errors: {},
		color: "#45B5644",
		isBtnDisabled: false,
		showStatusSpinner: false,
		waitMessage: "",
	})

	const responseGoogle = async (response) => {
		//send googles response to registrations#google
		//console.log("google_response", response);

		axios
			.post(
				"/auth/rgsi",
				{
					data: {
						gtoken: "test_data",
					},
				},
				{
					headers: {
						Authorization: response.tokenId,
					},
				},
				{ wals: true }
			)
			.then((reithCredentisponse) => {
				//console.log("rgsi response", response.data.status)
				if (response.data.status == "green") {
					props.handleSuccessfulAuth(response.data)
					console.log("result from google signin axios call", response.data.error)
				} else if (response.data.status == "pink") {
					console.log("result from google signin axios call", response.data.error)
				} else {
					console.log("result from google signin axios call, this should never happen")
				}
			})
			.catch((error) => {
				//console.log("articleErrors", error)
			})
	}

	const responseFacebook = async (response) => {
		console.log("About to make axios call to send info to server", response)

		//send googles response to registrations#google
		//console.log("google_response", response);

		axios
			.post(
				"/auth/rfsi",
				{
					data: {
						gtoken: "test_data",
					},
				},
				{
					headers: {
						Authorization: JSON.stringify(response),
					},
				},
				{ withCredentials: true }
			)
			.then((response) => {
				//console.log("rgsi response", response.data.status)
				if (response.data.status == "green") {
					props.handleSuccessfulAuth(response.data)
					console.log("result from google signin axios call", response.data.error)
				} else if (response.data.status == "pink") {
					console.log("result from google signin axios call", response.data.error)
				} else {
					console.log("result from google signin axios call, this should never happen")
				}
			})
			.catch((error) => {
				//console.log("articleErrors", error)
			})
	}

	useEffect(() => {
		console.log("==============Signup section useEffect===============")

		let homeWrapper = document.querySelectorAll(".homeWrapper")
		let formItem = document.querySelectorAll(".formItemSqueeze")
		let formWrapper = document.querySelectorAll(".formWrapper")

		let tl = gsap.timeline({
			duration: ".1",
			scrollTrigger: {
				//markers: {startColor: "green", endColor: "red", fontSize: "12px"},
				trigger: homeWrapper,
				start: "25% 87%",
				end: "bottom bottom",
				toggleActions: "play none none none",
			},
		})

		tl.from(
			formWrapper,

			{
				opacity: 0,
			}
		)

		tl.from(
			formItem,

			{
				x: 100,
				opacity: 0,
				ease: "back",
				stagger: 0.1,
			},
			"<.1"
		)

		// function handleResize() {
		//   setWindowDimensions(getWindowDimensions());
		// }

		// window.addEventListener('resize', handleResize);

		// return () => window.removeEventListener('resize', handleResize);
	}, [])

	function getWindowDimensions() {
		const { innerWidth: width, innerHeight: height } = window
		return {
			width,
			height,
		}
	}

	const validForm = () => {
		if (state.full_name) {
			return true
		} else {
			return true
		}
	}

	const handleChange = (e) => {
		const target = e.target

		const value = target.type === "checkbox" ? target.checked : target.value
		const name = target.name

		console.log("TARGET_CHECKED " + target.checked.toString())
		console.log("target_name " + target.name.toString())
		console.log("value " + value.toString())
		//const value = target.type === 'checkbox' ? !event.target.checked : event.target.value;
		setState({
			...state,
			[name]: value,
		})
	}

	////////////////////// Handlev Submit V2 //////////////////////////
	const handleAdd = (e) => {
		e.preventDefault()

		setState({
			...state,
			status: "",
			errors: {},
			showErrorBackground: true,
			waitMessage: "...one moment",
			showStatusSpinner: true,
			isBtnDisabled: true,
		})

		if (validForm()) {
			formData.append("user[full_name]", state.full_name)

			formData.append("user[email]", state.email)
			formData.append("user[password]", state.password)
			formData.append("user[opt_in]", state.opt_in)

			console.log("formdata from handle add in signup")
			console.log(formData)

			//get token for form submission
			const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content")

			$.ajax({
				url: "/registrations",
				headers: {
					"X-CSRF-Token": csrf,
				},
				method: "POST",
				data: formData,
				contentType: false,
				processData: false,

				success: function (response) {
					//props.handleAdd(data);

					if (response.status === "green") {
						setState({
							...state,
							//focussed: (props.focussed) || false,
							full_name: "",
							full_nameFieldActive: false,

							email: "",
							emailFieldActive: false,
							password: "",
							passwordFieldActive: false,

							opt_in: false,
							showErrorBackground: true,
							status: response.status,

							errors: response.error,
						})

						props.handleSuccessfulAuth(response)
						//props.history.push("/")
					} else {
						//update error state
						setState({
							...state,
							showErrorBackground: true,
							status: response.status,
							errors: response.error,
						})
					}
				},
				error: function (xhr, status, error) {
					//alert('Message did not reach server: ', error);
				},
			})
		} else {
			//alert('Please fill all fields.');
		}
	}

	///////////////////////////////////  SETUP ERRORMESSAGES //////////////////////
	let errorMessages = []

	if (state.errors) {
		if (state.errors.success) {
			errorMessages.push(<ErrorMsg> {state.errors.success[0]} </ErrorMsg>)
		}

		if (state.errors.auth) {
			errorMessages.push(<ErrorMsg> {state.errors.auth[0]} </ErrorMsg>)
		}

		if (state.errors.password) {
			errorMessages.push(<ErrorMsg> {"Password " + state.errors.password[0]} </ErrorMsg>)
		}

		if (state.errors.password_confirmation) {
			errorMessages.push(
				<ErrorMsg> {"Confirmation " + state.errors.password_confirmation[0]} </ErrorMsg>
			)
		}

		if (state.errors.green) {
			errorMessages.push(<ErrorMsg> {state.errors.green} </ErrorMsg>)
		}
	}

	// to activate the input field while typing
	function activateField(e) {
		setState({
			...state,
			[e.target.name + "FieldActive"]: true,
		})
	}

	// to deactivate input only if it's empty
	function disableField(e) {
		if (e.target.value === "") {
			setState({
				...state,
				[e.target.name + "FieldActive"]: false,
			})
		}
	}

	const componentClicked = () => {
		console.log("clickedd")
	}

	const { height, width } = useWindowDimensions()

	if (locationFromHook.pathname === "/edit") {
		return null
	} else {
		return (
			<SignupWrapper className="homeWrapper" ref={section2ScrollToRef} showOffer={props.showOffer}>
				<SignupMaskWrapper>
					{/* <SignupMask src={width > 850 ? floridaMaskBig : width > 400 ? floridaMaskCell : floridaMaskThinLongist}/> */}
					<SignupMaskImageContainer>
						<SignupMaskImage src={floridaMaskBig} />
					</SignupMaskImageContainer>

					{/* <TopFiLL/> */}
					<BottomFiLL />
					{/* <LeftFiLL/>
        <RightFiLL/> */}

					{/* <BottomFiller/> */}
				</SignupMaskWrapper>

				{/* <SignupMask src={width > 850 ? floridaMask : width > 550 ? floridaMaskSmaller : width > 400 ? floridaMaskSmaller3 : floridaMaskSmaller5}/> */}
				<LeftFiller />
				<RightFiller />

				<LeftSection>
					{/* <img style={{width: "50px"}} src={userIcon}/> */}

					<h1>Sign Up!</h1>

					<LoginCardWrapper>
						<LoginCard className="formWrapper">
							<Form onSubmit={handleAdd}>
								<FormItemSqueeze className="formItemSqueeze">
									<Label className={state.full_nameFieldActive ? "field-active" : ""}>
										{" "}
										full name{" "}
									</Label>

									<Input
										name="full_name"
										type="text"
										value={state.full_name}
										onChange={handleChange}
										onFocus={activateField}
										onBlur={disableField}
										required
									/>
								</FormItemSqueeze>

								<FormItemSqueeze className="formItemSqueeze">
									<EmailLabel className={state.emailFieldActive ? "field-active" : ""}>
										email
									</EmailLabel>

									<Input
										name="email"
										type="email"
										value={state.email}
										onChange={handleChange}
										onFocus={activateField}
										onBlur={disableField}
										required
									/>
								</FormItemSqueeze>

								<FormItemSqueeze className="formItemSqueeze">
									<Label className={state.passwordFieldActive ? "field-active" : ""}>
										password
									</Label>

									<Input
										name="password"
										type="password"
										autocomplete="off"
										value={state.password}
										onChange={handleChange}
										onFocus={activateField}
										onBlur={disableField}
										required
									/>
								</FormItemSqueeze>

								{/* <div  style={{display: "flex", justifyContent: "center"}}>
                  
                  
              <input
                name="opt_in" 
                type="checkbox" 
                id="opt_in"
                checked={state.opt_in}
                  
                onChange={handleChange} 
                  
              />
                  
              
              <h3 style={{marginLeft: "5px", fontSize: ".6em", color: "gray"}} htmlFor="opt_in" >Opt In to receive e-mails from FloridaBlaze </h3>
            
            </div> */}

								<Button className="formItemSqueeze" type="submit" disabled={state.isBtnDisabled}>
									Sign Up
								</Button>

								<SocialMedia>
									<h3
										style={{
											color: "gray",
											alignSelf: "center",
											justifySelf: "center",
										}}
										htmlFor="opt_in"
									>
										--- or ---{" "}
									</h3>

									{/* <GoogleLogin
										render={(renderProps) => (
											<button
												className="loginBtn loginBtn--google"
												onClick={renderProps.onClick}
												disabled={renderProps.disabled}
											>
												Google
											</button>
										)}
										buttonText="Login"
										onSuccess={responseGoogle}
										onFailure={responseGoogle}
										cookiePolicy={"single_host_origin"}
									/> */}

									{/* <FacebookLogin
                    appId="293426502140339"
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={componentClicked}
                    callback={responseFacebook}
                    cssClass="loginBtn loginBtn--facebook"
                    textButton="Facebook"
                  /> */}
								</SocialMedia>
							</Form>

							<ErrorWrapper showErrorBackground={state.showErrorBackground}>
								<Span waitMessage={state.waitMessage}> {state.waitMessage}</Span>

								<XorCheckIcon
									status={state.status}
									src={state.status === "pink" ? redX : greenCheck}
								/>

								{errorMessages}

								<StatusSpinner showStatusSpinner={state.showStatusSpinner}>
									{/* <Spinner name="wave" color="#56c5cc" /> */}
								</StatusSpinner>
							</ErrorWrapper>
						</LoginCard>
					</LoginCardWrapper>
				</LeftSection>
				<LoginCardFillLeft />
				<LoginCardFillRight />

				<RightSection>
					<WeedBullet1 src={thebullet} />
					<WeedBulletText1>Make Florida green.</WeedBulletText1>
					<WeedBullet2 src={thebullet} />
					<WeedBulletText2> Contact your state Reps. </WeedBulletText2>
					<WeedBullet3 src={thebullet} />
					<WeedBulletText3>Get marijuana related news.</WeedBulletText3>
					<WeedBullet4 src={thebullet} />
					<WeedBulletText4>Become a FloridaBlazer now.</WeedBulletText4>
				</RightSection>

				{/* <Spacer>
        Contact Your State Representatives

        </Spacer> */}
			</SignupWrapper>
		)
	}
}

const Wtf = React.forwardRef(Signup)
export default Wtf
