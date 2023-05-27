import React, { Component, useEffect, useState, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import actBackground from "../../assets/images/actBackground.png"
import mega from "../../assets/images/megav3.png"
import cardTemplate from "../../assets/images/cardTemplate.png"
import sampleShot from "../../assets/images/sampleShot.png"
import samplepic from "../../assets/images/man6.png"
import samplepic2 from "../../assets/images/dummy_avatar.png"

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import styled, { keyframes } from "styled-components"
//import { RiMailSendLine } from "react-icons/ri";
//import { BsMailbox } from "react-icons/bs";
//import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete"
//import Script from "react-load-script";
import sendEmailsToReps from "../packs/communications/sendEmailToReps"
import $ from "jquery"
import ReCAPTCHA from "react-google-recaptcha"
import greenCheck from "../../assets/images/greenCheck.png"
import searchIcon from "../../assets/images/search.png"
import searchIconOrange from "../../assets/images/searchGreen.png"
import searchIconOrange2 from "../../assets/images/searchPink2.png"
import ResultCardOne from "./resultCardOne.jsx"
import Button_Loading from "./myComponents/button_loading"
import axios from "axios"
//var Spinner = require("react-spinkit");
//import Autocomplete from "react-google-autocomplete";
//import { usePlacesWidget } from "react-google-autocomplete";

import "../../assets/stylesheets/act.scss"
import SearchLocationInput from "../packs/SearchLocationInput.js"

import orangeSearch from "../../assets/images/orangeSearch.png"
import orangeMailbox from "../../assets/images/orangeMailbox.png"
import orangeShare from "../../assets/images/orangeShare.png"

import mailIcon from "../../assets/images/Letterbox.png"

import rightArrow from "../../assets/images/scroll-arrow.png"

/////////////////////////////////////////////////////////////

const formData = new FormData()

const ActWrapper = styled.div`
	@media only screen and (max-width: 985px) {
		//overflow: hidden;
	}

	background-color: black;
	//background-image: url(${actBackground});
	//background-position: 0 50%;
	//background-repeat: no-repeat;

	position: relative;
	//overflow: hidden;

	//padding-bottom: 60px;
`

const BGimage = styled.img`
	//width: 100vw;
	//height: 100vh;
	//object-fit: cover;
	//grid-area: 1/1/-1/-1;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	bottom: 0;
	height: 100%;
`

const Mega = styled.img`
	/* @media only screen and (max-width: 1400px) {
   width: 85%;
  } */
	@media only screen and (max-width: 985px) {
		grid-area: 1/1/-1/-1;
		display: none;
	}

	/* @media only screen and (max-width: 1000px) {
    //grid-area: 1/1/2/-1;
    display: none;
  } */

	//position: absolute;
	//top: -5vh;
	//left: 12vw;
	width: 100%;
	height: 100%;
	display: ${(props) => (props.showCards ? "none" : "inherit")};
	grid-area: 1/2/6/3;
	align-self: center;
	justify-self: end;
	//margin-top: -50px;
	margin-right: 1em;
	margin-top: -69px;
	//margin-bottom: 13px;
	//opacity: ${(props) => (props.showLetter ? "0" : "1")}; ;
	opacity: 1;
`

const ActGrid = styled.div`
	/* @media only screen and (max-width: 1000px){

    grid-template-columns: 1fr;
    grid-template-rows: minmax(min-content, max-content) minmax(min-content, max-content) minmax(100px, max-content) minmax(min-content, max-content);

  } */

	/* @media only screen and (max-width: 750px){

    justify-items: start;


  } */

	//overflow: hidden;
	//display: grid;
	position: relative;
	max-width: 1383px;
	margin: 0 auto;
	//grid-template-columns: 43% 57%;
	//grid-template-columns: minmax(20px, 1fr) minmax(335px, 350px) minmax(350px,600px) minmax(20px, 1fr);
	//grid-template-rows: 120px 40px 50px 100px 50px 1fr;

	//grid-column-gap: 0.5em;
	justify-items: center;
`

const ActSection = styled.section`
	@media only screen and (max-width: 985px) {
		//grid-template-columns: minmax(20px, 1fr) 1fr minmax(20px, 1fr);
		grid-template-columns: minmax(8px, 1fr) minmax(197px, 600px) minmax(8px, 1fr);
		min-width: 100%;
		grid-column-gap: 0;
		//justify-self: center;
	}

	display: ${(props) => (props.showCards ? "none" : "grid")};

	position: relative;
	//grid-template-columns: 43% 57%;
	grid-template-columns:
    /* minmax(20px, 100px) minmax(250px, 350px) minmax(350px, 600px) */
    /* minmax(40px, 1fr); */
		minmax(80px, 1fr)
		minmax(250px, 350px) minmax(150px, 600px) minmax(80px, 1fr);
	//grid-template-rows: minmax(40px, 50px) minmax(min-content, max-content) min-content min-content 1fr;

	grid-column-gap: 0.5em;
	grid-area: 1/1/-1/-1;
	transition: opacity 0.4s;
	//padding-bottom: 40px;

	//z-index: ${(props) => (props.showCards || props.showLetter ? "0" : "10")};
	z-index: ${(props) => (props.showCards ? "0" : "10")};

	@media only screen and (min-width: 975px) {
		//padding-bottom: 30px;
	}
`

// const ProgressBarz = styled.div`

//   display: flex;
//   //grid-area: 1/3/2/-1;
//   //margin: 27px 0px 18px 20px;
//   margin: 10px 0px 10px 0px;

//   justify-self: center;

// `;

const StepOne = styled.div`
	width: 80px;
	height: 4px;
	background: #e3b55a;
`

const StepTwo = styled.div`
	width: 80px;
	height: 4px;
	background: ${(props) => (props.showCards ? "#E3B55A" : "#605C55")};
	margin-left: 36px;
`

const StepThree = styled.div`
	width: 80px;
	height: 4px;
	background: #605c55;
	margin-left: 36px;
`

const ActHeaderWrapper = styled.div`
	display: grid;
	grid-area: 1/3/2/4;
	width: 100%;
	margin-top: 20px;

	@media only screen and (min-width: 1026px) {
		margin: 20px 0 0 30px;
	}

	@media only screen and (max-width: 985px) {
		justify-self: start;
		grid-area: 1/2/2/3;
		/* margin-top: 25px;
		margin-bottom: 16px; */
		margin: 20px 0 16px 0px;
	}
`

const ActHeader = styled.h1`
	@media only screen and (max-width: 350px) {
		font-size: 50px;
	}

	@media only screen and (max-width: 250px) {
		font-size: 40px;
	}
	font-family: Poppins;
	font-style: normal;
	font-weight: 800;
	font-size: min(16vw, 97px);
	align-self: center;
	line-height: 100%;
	//line-height: 100px;
	/* identical to box height */

	letter-spacing: -0.08em;
	justify-self: start;
	color: #ffffff;

	//line-height: 100%;
	//margin: 0px 0px 0px 20px;
	//padding-top: 20px;
	//z-index: 1;

	//opacity: ${(props) => (props.showCards || props.showLetter ? "0" : "1")};
	opacity: ${(props) => (props.showCards ? "0" : "1")};

	/* ACT NOW */

	font-family: "Poppins";
	font-style: normal;
	width: 100%;
	letter-spacing: -0.05em;
	word-break: break-word;
	white-space: normal;
	overflow: visible;
	color: #ffffff;
	//margin: 24px 0 21px 60px;
`

const ActSubheader = styled.h2`
	/* @media only screen and (max-width: 985px) {
		//grid-area: 2/1/3/-1;
		//justify-self: center;
		font-size: 4vw;
	} */

	font-family: Poppins;
	font-style: normal;
	font-weight: 800;
	font-size: min(4vw, 36px);
	line-height: 59px;
	//max-width: 80%;
	//line-height: 100%;
	justify-self: start;
	align-self: start;
	color: #ffffff;
	//margin: 8px 0px 8px 20px;
	margin: -14px 14px 8px 5px;
	display: none;
	//opacity: ${(props) => (props.showCards || props.showLetter ? "0" : "1")};
	opacity: ${(props) => (props.showCards ? "0" : "1")};

	@media only screen and (max-width: 350px) {
		font-size: 20px;
	}
`

const ActBulletPointsWrapper = styled.div`
	grid-area: 2/3/3/4;
	margin-top: 20px;
	margin-bottom: 16px;

	width: 100%;

	@media only screen and (min-width: 1026px) {
		margin: 20px 0 26px 30px;
	}

	@media only screen and (max-width: 985px) {
		justify-self: center;
		grid-area: 2/2/3/3;
		margin: 20px 0 26px 0px;
	}
`

const ActBulletWrapper = styled.div`
	display: grid;
	grid-template-columns: minmax(30px, min-content) 1fr;
	margin-bottom: 15px;
`

const BulletImage = styled.img`
	width: 100%;
`

const BulletOne = styled.p`
	color: white;
	padding-left: 10px;
	align-self: center;
	font-size: min(3.6vw, 20px);
	@media only screen and (max-width: 350px) {
		font-size: 13px;
	}
	/* Lookup your State Representatives. */

	font-family: "Poppins";
	font-style: normal;
	font-weight: 500;

	letter-spacing: 0.02em;
	span {
		color: #e3b55a;
		/* Lookup your State Representatives. */
		letter-spacing: 0.09em;
	}
`

const Form = styled.div`
	@media only screen and (min-width: 1026px) {
		margin: 0 0 0 60px;
	}
	@media only screen and (max-width: 985px) {
		grid-area: 3/2/4/3;
		padding: 0;
		justify-self: center;
	}

	padding: 0 20px 0 0;
	//height: 38px;
	display: grid;
	position: relative;
	grid-template-columns: 100%;
	//grid-template-rows: minmax(min-content, max-content) minmax(50px, min-content);
	grid-template-areas:
		"input"
		"status";
	justify-content: center;
	justify-self: center;
	align-self: center;

	width: 100%;
	transition: opacity 0.4s;

	//max-width: 481px;
	//box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
	//margin-top: 72px;

	grid-area: 3/3/4/-1;
	//padding: 0px 20px;
	border-radius: 5px;

	//opacity: ${(props) => (props.showCards || props.showLetter ? "0" : "1")};
	opacity: ${(props) => (props.showCards ? "0" : "1")};
	//pointer-events: none;
`

const MainAddressInput = styled.input`
	grid-area: input;
	height: 60px;
	width: 100%;
	padding: 0.2em 0.5em;
	text-shadow: 0 1px 1px hsl(0 0% 0% / 20%);
	font: normal 1.5em system-ui, sans-serif;
`

const Button = styled.button`
	height: 40px;
	width: 50px;
	//grid-area: button;
	background-color: #e8e5e5;

	background-image: url(${searchIconOrange});
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	border: 5px solid #e8e5e5;
	border-top-right-radius: 8px;
	border-bottom-right-radius: 8px;
	//border: none;
	//z-index: 999;
	cursor: pointer;
	color: black;
	position: absolute;
	right: 0;
	//z-index: 1002;

	transition: background-image 1s;
	transition-timing-function: ease-in;
	filter: ${(props) => (props.searchButtonActive ? "grayscale(0%)" : "grayscale(80%)")};

	&:hover {
		//background-image: url( ${searchIconOrange});transition: background-image 1s;
		transition-timing-function: ease-in;
		filter: grayscale(0%);
		//filter: sepia(0%);
	}

	//&:disabled{
	//  opacity: .6;
	//  cursor: default;
	//  background-color: #eae6de;
	//  &:hover{

	//    background-color: #FFA500;
	//      opacity: .6;
	//      background-color: #eae6de;

	//  }
	//}
`

const FindMyRep = styled.button`
	@media only screen and (max-width: 985px) {
		grid-area: 5/1/6/-1;
		justify-self: start;
		//font-size: 2vw;
	}

	grid-area: 5/3/6/4;
	font-style: normal;
	font-weight: 400;
	width: 250px;
	height: 50px;
	background-color: #c33;
	color: #fff;
	letter-spacing: 0;
	line-height: 26px;
	text-decoration: none;
	-webkit-transition: all 0.2s;
	transition: all 0.2s;
	overflow: visible;
	text-align: center;
	text-transform: capitalize;
	white-space: nowrap;
	padding: 12px 45px;
	display: -webkit-inline-box;
	display: -ms-inline-flexbox;
	display: inline-flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	border-radius: 5px;
	border: 0;

	margin-left: 20px;

	cursor: pointer;
	//z-index: 1;

	//opacity: ${(props) => (props.showCards || props.showLetter ? "0" : "1")};
	opacity: ${(props) => (props.showCards ? "0" : "1")};
`

const ShowLetterButton = styled.div`
	grid-area: 5/1/6/3;
	font-style: normal;
	font-weight: 400;
	width: 250px;
	height: 50px;
	background-color: #c33;
	color: #fff;
	letter-spacing: 0;
	line-height: 26px;
	text-decoration: none;
	-webkit-transition: all 0.2s;
	transition: all 0.2s;
	overflow: visible;
	text-align: center;
	text-transform: capitalize;
	white-space: nowrap;
	padding: 12px 45px;
	display: -webkit-inline-box;
	display: -ms-inline-flexbox;
	display: inline-flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-self: start;
	border-radius: 5px;
	border: 0;
	//cursor: pointer;
	//margin-left: 20px;
	margin-top: 25px;

	opacity: ${(props) => (props.showCards && props.resultFromFlorida == "true" ? "1" : "0")};
	z-index: ${(props) => (props.showCards && props.resultFromFlorida == "true" ? "10" : "-5")};
	//background: linear-gradient(to bottom, #5FCC61, #318e33);
	//z-index: 1;
	cursor: pointer;
`

const ShowLetterDeadEnd = styled.div`
	display: ${(props) =>
		props.showCards && props.resultFromFlorida == "true" ? "none" : "initial"};
	opacity: ${(props) => (props.showCards && props.resultFromFlorida == "true" ? "0" : "1")};
	z-index: ${(props) => (props.showCards && props.resultFromFlorida == "true" ? "-5" : "10")};
	grid-area: 5/2/6/5;
	color: white;
	padding: 16px 0px 0px 0px;
	margin: 0 auto;
	justify-self: center;
	align-self: center;
	text-align: left;

	a {
		color: #e7c991;
		font-size: 0.8em;

		&:hover {
			color: #ca9a41;
		}
	}
`

const CardOneInfo = styled.div``

const CardTwoInfo = styled.div``

const StatusHolder = styled.div`
	grid-area: status;
	display: flex;
	justify-content: center;
	align-content: center;
	padding: 10px 0px 0px 0px;
	justify-self: start;
	min-height: 30px;
	margin-bottom: 16px;
	pointer-events: none;
`

const StatusBar = styled.div`
	max-height: 100%;
	opacity: 1;
	transition: opacity 0.4s;
	transition-timing-function: ease-in;
	line-height: 27px;
	margin-left: 10px;
`

const StatusSpinner = styled.div`
	max-height: ${(props) => (props.showStatusSpinner.toString() == "true" ? "100%" : "0px")};
	opacity: ${(props) => (props.showStatusSpinner.toString() == "true" ? "1" : "0")};
	transition: opacity 0.4s;
	transition-timing-function: ease-out;
`

const CheckMark = styled.img`
	max-height: ${(props) => (props.showStatusCheck.toString() == "true" ? "100%" : "0px")};
	opacity: ${(props) => (props.showStatusCheck.toString() == "true" ? "1" : "0")};
	transition: opacity 0.4s;
	transition-timing-function: ease-out;
	padding-left: 6px;
	height: 11px;
`

const ResultSpan = styled.div`
	&:hover {
		background-color: #56c5cc;
		//color: red;
		//font-size: 3em;
	}
`

const Span = styled.span`
	display: ${(props) => (props.status == "Search Complete!!" ? "none" : "Block")};
	height: 100%;
	font-size: 0.75em;
	transition: opacity 2s ease-in;
	opacity: ${(props) => (props.status.toString() == "Enter an address." ? "0" : "1")};
	color: white;
`
const ResultSection = styled.div`
	///@media only screen and (max-width: 1000px) {
	grid-area: 1/1/-1/-1;
	//margin: 0px auto;
	//padding: 0px 15px 32px 15px;
	grid-template-columns: minmax(10px, 1fr) 8fr minmax(10px, 1fr);

	grid-template-rows:
		minmax(min-content, max-content) minmax(min-content, max-content)
		minmax(min-content, max-content);

	grid-template-areas:
		"  .     top        . "
		"  .    middle   . "
		"  .    bottom     . ";

	width: 100vw;

	//grid-area: x cardOne x cardTwo infoBox x;

	//max-width: 70vw;
	///}

	@media only screen and (max-width: 985px) {
		/* grid-template-columns:
      minmax(10px, 1fr) minmax(100px, 150px) minmax(4px, 8px)
      minmax(100px, 150px) minmax(10px, 1fr); */
	}

	display: grid;
	transition: opacity 0.4s;
	//transition: opacity 2s linear;
	transform: ${(props) => (props.showCards ? "translate(0)" : "transform:translate(9999px)")};
	opacity: ${(props) => (props.showCards ? "1" : "0")};
	z-index: ${(props) => (props.showCards ? "10" : "-5")};
	/* grid-template-columns:
    minmax(10px, 1fr) minmax(150px, 200px) minmax(4px, 8px) minmax(150px, 200px)
    minmax(4px, 8px) minmax(150px, 670px) minmax(10px, 1fr);
  grid-template-rows: */
	/* minmax(min-content, max-content) minmax(min-content, max-content) */
	/* minmax(min-content, max-content) minmax(min-content, max-content); */
	//visibility: hidden;
	/* grid-template-rows: ${(props) =>
		props.showCards
			? "minmax(min-content, max-content) minmax(min-content, max-content) minmax(min-content, max-content) minmax(min-content, max-content) 1fr"
			: "0px 0px 0px 0px 0px"}; */

	//grid-row-gap: .7em;
	//grid-column-gap: 0.5em;
	padding: 0px 0px 20px 0px;

	/* padding: ${(props) => (props.showCards ? "75px 0px 50px 0px" : "0px 0px 50px 0px")}; */

	//grid-area: 1/1/6/5;
	//margin: 20px 0px 20px 50px;
	height: ${(props) => (props.showCards ? "inherit" : "0px")};

	//margin: 0px 10px;
`

const NextSteps = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: min-content 1fr;

	grid-area: nextSteps;
	margin: 0 0 0 20px;
	h1 {
		margin: -5px 0 0 0;
		padding: 0;
		color: white;
		letter-spacing: 0.15em;
		font-weight: 800;
		font-size: 3em;
		//margin: 0 0 0 18px;
	}

	h2 {
		color: #ffffffa8;
		font-size: 1.1em;
		letter-spacing: 0.15em;
		//margin: 0 0 0 18px;
	}

	div {
		grid-area: 2/1/3/-1;
		//margin: 15px 0 0 0;
		width: 60%;

		//border-radius: 22px;
		//background: #e3b55a;
		border-top: 1px #e3b55a solid;
		border-bottom: 1px #e3b55a solid;

		display: grid;
		p {
			color: white;
			font-family: "poppins", Sans-Serif;
			line-height: 1.6em;
			align-self: center;
			justify-self: center;
			padding: 0 8px;
		}
	}
`

const LinerVertical = styled.div`
	position: absolute;
	width: 3px;
	height: 109px;
	top: 109px;
	right: 130px;
	background: hsl(38.57142857142857, 100%, 13.725490196078432%);
`

const LinerHorizontal = styled.div`
	position: absolute;
	width: 240px;
	height: 3px;
	top: 131px;
	right: 106px;
	background: hsl(38.57142857142857, 100%, 13.725490196078432%);
`

const ResultSectionInfoBox = styled.div`
	/* @media only screen and (max-width: 750px){

    grid-area: 1/1/2/6;




  } */

	display: grid;

	grid-template-columns: auto min-content auto;
	//grid-template-rows: 1fr min-content 1fr;
	//grid-area: 1/2/2/6;
	grid-area: 1/1/2/-1;
	//height: 200px;
`

const ProgressBarz = styled.div`
	display: flex;
	grid-area: 1/3/2/4;
	//margin: 27px 0px 18px 20px;
	margin: 20px 0px 28px 20px;

	//padding-left: 2px;
	justify-self: start;

	@media only screen and (min-width: 1026px) {
		margin: 20px 0px 28px 80px;
	}

	@media only screen and (max-width: 985px) {
		justify-self: center;
	}
`

const ProgressBarzResultSection = styled.div`
	display: flex;
	grid-area: 1/1/2/-1;
	//margin: 27px 0px 18px 20px;
	margin: 30px 0px 30px 20px;

	padding-left: 2px;
	justify-self: center;
`

const ResultCompleteTitle = styled.h1`
	font-family: Poppins;
	justify-self: center;
	color: #ffffff;
	grid-area: 2/1/3/-1;
	font-size: 3.5em;
`

const ResultSectionBulletPointWrapperSet = styled.div`
	/* @media only screen and (max-width: 750px){

  margin: 0 auto;

  } */

	grid-area: 3/2/6/3;
	display: grid;
	grid-template-columns: min-content 1fr min-content;
`

const ResultSectionBulletPointWrapper = styled.div`
	/* @media only screen and (max-width: 750px){

    justify-self: center;

  } */
	grid-area: ${(props) => props.gridArea};

	display: grid;
	grid-template-columns: minmax(min-content, max-content) 1fr;

	justify-self: start;
`

const ResultSectionBulletPoint = styled.div`
	height: 10px;
	width: 10px;
	background-color: ${(props) => (props.open ? "black" : "#E3B55A")};
	border: 1.5px solid #e3b55a;

	border-radius: 50%;
	display: inline-block;
	justify-self: center;
	align-self: center;
`

const ResultSectionBulletPointTitle = styled.h2`
	font-family: Poppins;
	justify-self: center;
	align-self: center;
	color: #ffffff;
	margin-left: 15px;
	font-size: 0.8em;
	white-space: nowrap;
`

const ResultSectionSpacerLine = styled.div`
	/* @media only screen and (max-width: 750px){

  margin: 25px 0 45px 0;



} */

	height: 1px;
	//width: 100vw;
	background: #e3b55a;
	opacity: 0.4;
	grid-area: 2/1/3/-1;
	margin: 25px 0 0px 0;
`

const ResultSectionHeaders = styled.h1`
	/* @media only screen and (max-width: 750px){

    grid-area: ${(props) => props.gridAreaTablet};
    //font-size: 8vw;
    margin: 10px 0px 20px 0px;


  } */

	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 1em;
	min-width: 222px;
	margin: 25px 0px 25px 0px;
	padding: 4px 16px;
	font-family: Poppins;
	//font-style: normal;
	//font-weight: 500;
	//font-size: 8vw;
	//font-size: clamp(1rem, -0.875rem + 8.333333vw, 3.5rem);

	/* identical to box height, or 90px */

	letter-spacing: -0.03em;
	color: black;
	background: white;

	border-radius: 11.11px;

	grid-area: ${(props) => props.gridArea};
	justify-self: center;
	align-self: end;

	white-space: nowrap;

	//margin: 20px 0px;
	//padding: 0px 20px;

	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	-o-user-select: none;
	user-select: none;
`

const ResultSectionHeadersAlt = styled.div`
	/* @media only screen and (max-width: 750px){

    grid-area: ${(props) => props.gridAreaTablet};
    //font-size: 8vw;
    //margin: 50px 0px 0px 0px;


  } */

	display: ${(props) => (props.showCards && props.resultFromFlorida == "true" ? "flex" : "none")};

	/* justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1em;
  min-width: 222px;
  margin: 25px 0px 25px 0px;
  padding: 4px 16px;
  font-family: Poppins;
  letter-spacing: -0.03em;
  color: black;
  background: white;
  border-radius: 11.11px;
  grid-area: ${(props) => props.gridArea};
  justify-self: center;
  align-self: end;
  white-space: nowrap;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none; */
`

const ResultSectionSubHeader = styled.h2`
	/* @media only screen and (max-width: 750px){

    font-size: 4vw;


  } */
	font-family: Poppins;
	font-style: normal;
	font-weight: 600;
	font-size: clamp(12px, 1.5vw, 60px);
	//text-align: end;

	/* or 22px */
	/* display: flex;
  align-items: center; */
	letter-spacing: -0.03em;

	color: #ffffff;

	grid-area: 2/2/3/7;
	padding: 0px 20px;
	justify-self: start;
	white-space: nowrap;
	line-height: 1em;
	margin-bottom: 15px;

	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	-o-user-select: none;
	user-select: none;
`

const CardOne = styled.div`
	//display: grid;
	position: relative;
	//grid-template-columns: 85% 15%;
	//grid-template-rows: 73% 17% 10%;
	//margin-top: 25px;
	opacity: 0.2;
	grid-area: cardOne;

	width: 100%;

	justify-self: end;
	height: 0px;

	padding-top: calc(310 / 220 * 100%);

	@media only screen and (max-width: 985px) {
		grid-area: 3/2/4/3;
		/* justify-self: start;
    padding-top: calc(310/220*100%);
    height: 0px;
    width: 100%; */
	}
`

const CardOneWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	display: grid;
	grid-template-columns: 85% 15%;
	grid-template-rows: 73% 17% 10%;

	border-radius: 16.4px;
	border-left: ${(props) =>
		props.whichEmailIsActive == 1 ? "2px solid orange" : "2px solid #DECDD1"};
	border-bottom: ${(props) =>
		props.whichEmailIsActive == 1 ? "2px solid orange" : "2px solid #DECDD1"};
`

const CardOneSub = styled.div`
	position: absolute;
	font-weight: bold;
	left: 3px;
	top: 3px;
	right: 3px;
	//width: 100%;
	//opacity: .8;
	color: black;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	background: white;
	font-size: 0.7em;
	text-align: center;
	padding: 3px 0px;

	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	-o-user-select: none;
	user-select: none;
`

const CardTwoSub = styled(CardOneSub)``

const CardTwo = styled.div`
	position: relative;

	//margin-top: 25px;
	grid-area: cardTwo;
	opacity: 0.2;
	justify-self: end;
	height: 0px;
	padding-top: calc(310 / 220 * 100%);
	width: 100%;

	/* @media only screen and (max-width: 750px){
    grid-area: 4/4/5/5;
    justify-self: start;
    padding-top: calc(310/220*100%);
    height: 0px;
    width: 100%;
  } */

	@media only screen and (max-width: 985px) {
		grid-area: 3/4/4/5;
		/* justify-self: start;
    padding-top: calc(310/220*100%);
    height: 0px;
    width: 100%; */
	}
`

const CardTwoWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	display: grid;
	grid-template-columns: 85% 15%;
	grid-template-rows: 73% 17% 10%;

	border-radius: 16.4px;

	border-left: ${(props) =>
		props.whichEmailIsActive == 2 ? "2px solid orange" : "2px solid orange"};
	border-bottom: ${(props) =>
		props.whichEmailIsActive == 2 ? "2px solid orange" : "2px solid orange"};
`

const CardTemplate = styled.img`
	grid-area: 1/1/-1/-1;
	width: 100%;
	height: 100%;
	//opacity: .8;
`

const CardPicture = styled.img`
	grid-area: 1/1/-1/-1;

	width: 100%;
	height: 100%;
	border-radius: 16px;
	border: 1px solid white;
	background-size: cover;
	background-repeat: no-repeat;
	background-image: url(${samplepic});
`

const CardNameOfRep = styled.h1`
	color: black;
	font-size: 9px;
	line-height: 1.1em;
	z-index: 1;
	/* position: absolute;
  bottom: 10%;
  left: 3%; */

	align-self: center;
	padding-left: 6px;

	grid-area: 2/1/3/2;
	//word-spacing: -2px;

	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	-o-user-select: none;
	user-select: none;
`

const ShowOfferSectionWrapper = styled.div`
	grid-area: 7/1/8/3;
	width: 100%;
	justify-self: center;
	margin-top: 4px;

	div {
		div {
			min-width: 100px !important;
		}
	}

	position: relative;
`

const ShowOfferSection = styled.div`
	/* @media only screen and (max-width: 750px){

    grid-area: 6/1/9/6;
  } */

	/* grid-area: 7/1/8/3;
  width: 80%;
  justify-self: center;
  margin-top: 4px;

  div{

    div{
      min-width: 100px !important;
    }
  } */

	/* position: absolute;
  left: 0;
  right: 0; */
	//padding: 0px 10% 0px 10%;
	//background-color: white;
	margin-top: 20px;
`

const ResultsBlurb = styled.div`
	grid-area: resultBlurb;
	//margin: 25px;
	border: 1px orange solid;
	border-radius: 13px;
	padding: 30px;
	margin-top: 24px;

	@media only screen and (max-width: 1000px) {
		grid-area: resultBlurb;
		margin: 10px 0px 0px 16px;
	}

	@media only screen and (max-width: 985px) {
		grid-area: resultBlurb;
		margin: 10px 16px 0px 16px;
	}
`

const TriplePlayWrapper = styled.div`
	display: ${(props) =>
		props.showCards == true && props.resultFromFlorida == "true" ? "grid" : "none"};

	grid-area: bottom;
	width: 100%;
	margin-top: 30px;
	//display: grid;
	//grid-template-columns: 50% 1fr 1fr;
	//grid-gap: 5px;

	/* @media only screen and (max-width: 1000px) {
		grid-template-columns: 1fr 1fr;
		grid-area: 3/2/4/6;
		max-width: 777px;
	}

	@media only screen and (max-width: 985px) {
		grid-area: 4/1/5/6;
	} */
`

const Letter = styled.div`
	width: 100%;
	@media only screen and (max-width: 1000px) {
		grid-area: 1/1/2/3;
		//margin: 0px auto;
		//padding: 0px 15px 32px 15px;
		//grid-template-columns: auto;
		//width: 100%;
		//min-width: inherit;
		//margin-top: 20px;
		justify-self: center;
	}

	/* @media only screen and (max-width: 985px){

    grid-area: 4/2/5/6;
    //margin: 0px auto;
    //padding: 0px 15px 32px 15px;
    //grid-template-columns: auto;
    //width: 100%;
    //min-width: inherit;
    //margin-top: 20px;
    justify-self: center;

  } */

	display: grid;
	//min-width: 400px;
	//max-width: 500px;
	justify-self: start;
	border-radius: 13px;
	background: white;
	//margin: 60px auto 0 auto;
	//grid-template-columns: 0px 130px 130px 1fr;
	grid-auto-rows: minmax(min-content, max-content);
	//grid-gap: 8px;

	//padding: 20px;
	//margin: 0px 8px;
	//opacity: ${(props) => (props.showLetter ? "1" : "0")};
	//height: ${(props) => (props.showLetter ? "auto" : "0px")};
	//z-index: ${(props) => (props.showLetter ? "10" : "-5")};
	transition: opacity 0.4s;

	/* .LetterTopOverlay {
    //background: #1d0a0a;
    opacity: 0.6;
    grid-area: 1/1/4/5;
    margin: 0;
    height: 2px;
    align-self: end;
    //border-bottom: 1px solid gray;

    background: rgb(2, 0, 36);
    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 0.11918764087666311) 0%,
      rgba(85, 85, 85, 1) 49%,
      rgba(2, 0, 36, 0.14439772491027658) 100%
    );
  } */

	//border: 1px solid black;

	/* .LetterRecipientsWrapper {
    grid-area: 1/4/4/5;
    margin: 0;
  } */
`

const OfferOne = styled.div`
	@media only screen and (max-width: 1000px) {
		grid-area: 2/1/3/2;
		//margin: 0px auto;
		//padding: 0px 15px 32px 15px;
		//grid-template-columns: auto;
		//width: 100%;
		//min-width: inherit;
		//margin-top: 20px;
		justify-self: end;
	}

	display: grid;
	//grid-area: 1/2/2/3;
	grid-template-columns: 40px 1fr;
	//grid-template-rows: min-content min-content 80px min-content 25px min-content;
	//grid-template-rows: min-content;

	grid-template-rows: 115px 78px 1fr 1fr 100px 15px 50px 161px;
	max-width: 270px;

	background: white;
	justify-content: center;
	border-radius: 13px;

	h1 {
		grid-area: 1/1/2/3;
		justify-self: center;
		font-family: Poppins;
		font-style: normal;
		font-weight: 400;
		margin: 25px 0 0 0;
		font-size: 2.8em;
	}

	h2 {
		grid-area: 5/1/6/3;
		justify-self: center;
		align-self: center;
		//margin: 40px 0 15px 0;
	}

	h4 {
		grid-area: 6/1/7/3;
		align-self: start;
		justify-self: center;
		align-self: end;
		color: red;
		font-size: 0.6em;
	}
`

{
	/* <LetterOffer>

<Row1>
  <Pic1>

  </Pic1>
  <Description1>

  </Description1>
  <Price1>

  </Price1>

</Row1>
</LetterOffer> */
}

const LetterOfferWrapper = styled.div`
	grid-area: offer;
	display: inline-block;
	/* position: absolute;
  left: 42%;
  top: 69%; */
`
const LetterOffer = styled.div`
	display: grid;
	grid-template-columns: minmax(200px, 250px);
	//border: 1px solid orange;
	//background-color: #e4e4e4;
	h2 {
		color: gray;
		font-size: 0.8em;
		//justify-self: center;
		margin-top: 8px;
		margin-left: 6%;
	}
`

const Price = styled.h1`
	font-family: "MuseoModerno", cursive;
	font-weight: 400;
	font-size: 3em;
	//justify-self: center;
	margin-left: 6%;
`

const Row1 = styled.div`
	display: grid;
	grid-template-columns: min-content 1fr;
	border-top: ${(props) => (props.whichEmailIsActive == 1 ? "1px orange solid" : "initial")};
	border-right: ${(props) => (props.whichEmailIsActive == 1 ? "1px orange solid" : "initial")};
	cursor: pointer;
	border-top-right-radius: 23px;
	border-top-left-radius: 23px;
	border-bottom-right-radius: 23px;

	margin: 3px 3% 3px 6%;

	&:hover {
		border-top: 1px #f5c896 solid;
		border-right: 1px #f5c896 solid;
	}
`

const Row2 = styled.div`
	display: grid;
	grid-template-columns: min-content 1fr;
	border-top: ${(props) => (props.whichEmailIsActive == 2 ? "1px orange solid" : "initial")};
	border-right: ${(props) => (props.whichEmailIsActive == 2 ? "1px orange solid" : "initial")};
	cursor: pointer;
	border-top-right-radius: 23px;
	border-top-left-radius: 23px;
	border-bottom-right-radius: 23px;

	margin: 3px 3% 3px 6%;

	&:hover {
		border-top: 1px #f5c896 solid;
		border-right: 1px #f5c896 solid;
	}
`

const CheckmarkMainWrapper = styled.div`
	width: 200px;
	justify-self: center;
	margin-top: 10px;
`

const Pic1Wrapper = styled.div`
	background-size: cover;
	background-repeat: no-repeat;
	background-image: url(${samplepic2});
	border-radius: 50px;
	width: 43px;
	height: 43px;
`

const Pic1 = styled.img`
	border-radius: 50px;
	width: 100%;
	width: 43px;
	height: 43px;
	border: 2px solid white;
`

const Description1 = styled.div`
	margin-left: 6px;
	align-self: center;
	font-size: 0.8em;
`

const CheckmarkRow = styled.div`
	display: grid;
	grid-template-columns: min-content 1fr;
`

const CheckMarkParagraph = styled.p`
	font-size: 0.6em;
	margin-left: 13px;
	margin-top: 3px;
`

const GreenCheckmarkWrapper = styled.div`
	width: 18px;
	height: 18px;
	background: green;
	border-radius: 50px;
	margin-left: 13px;
	position: relative;
	align-self: center;
`

const GreenCheckmark = styled.div`
	display: inline-block;
	position: absolute;
	top: 0px;
	left: 0px;
	transform: rotate(45deg);
	height: 15px;
	width: 6px;
	margin-left: 50%;
	border-bottom: 4px solid white;
	border-right: 3px solid white;
`

const CheckmarkDescription = styled.h1`
	font-size: 0.8em;
	margin-left: 5px;
	color; gray;
	
`

const Price1 = styled.div``

const OfferTwo = styled.div`
	@media only screen and (max-width: 1000px) {
		grid-area: 2/2/3/3;
		//margin: 0px auto;
		//padding: 0px 15px 32px 15px;
		//grid-template-columns: auto;
		//width: 100%;
		//min-width: inherit;
		//margin-top: 20px;
		justify-self: start;
	}

	display: grid;
	grid-area: 1/3/2/4;
	grid-template-columns: 40px 1fr;
	//grid-template-rows: min-content min-content 80px min-content min-content;
	//grid-template-rows: 115px 85px 1fr 1fr 115px 200px;
	grid-template-rows: 115px 78px 1fr 1fr 100px 15px 211px;
	background: white;
	justify-content: center;
	border-radius: 13px;
	max-width: 270px;

	h1 {
		grid-area: 1/1/2/3;
		justify-self: center;
		font-family: Poppins;
		font-style: normal;
		font-weight: 400;
		margin: 25px 0 0 0;
		font-size: 2.8em;
	}

	h2 {
		grid-area: 5/1/6/3;
		justify-self: center;
		align-self: center;
		//margin: 40px;
	}
`

const BulletPointText = styled.h3`
	grid-area: 3/2/4/3;
	font-size: 0.8em;
	justify-self: center;
	align-self: start;
	//margin: 20px 0 0 0;
	padding-right: 20px;
	position: relative;

	&:before {
		background: black;
		border-radius: 50%;
		width: 8px;
		height: 8px;
		grid-area: 3/1/4/2;
		justify-self: center;
		//margin: 25px 0 0 0;
		position: absolute;
		content: "";
		left: -20px;
		top: 4px;
	}
`

const BulletPointText2 = styled.h3`
	grid-area: 4/2/5/3;
	font-size: 0.8em;
	justify-self: center;
	align-self: start;
	//margin: 20px 0 0 0;
	padding-right: 20px;
	position: relative;
	margin-top: 11px;

	&:before {
		background: black;
		border-radius: 50%;
		width: 8px;
		height: 8px;
		grid-area: 3/1/4/2;
		justify-self: center;
		//margin: 25px 0 0 0;
		position: absolute;
		content: "";
		left: -20px;
		top: 4px;
	}
`

const SendButtonWrapper = styled.div`
	/* @media only screen and (max-width: 400px){
    grid-area: 7/2/8/5;
    align-self: center;
    justify-self: center;
    margin: 16px 0px;
    

  } */

	grid-area: 7/1/8/3;
	align-self: center;
	justify-self: center;
	//margin-right: 15px;
	position: relative;
	width: 80%;
	height: 35px;
	margin: 0 0 10px 0;
`

const SendButtonV2 = styled.button`
	display: inline-block;
	border: 0;
	outline: 0;
	padding: 12px 16px;
	line-height: 1.4;
	background: linear-gradient(#4d4d4d, #2f2f2f);
	border-radius: 5px;
	border: 1px solid black;
	font-family: "poppins", Sans-Serif;
	color: white !important;
	font-size: 1.2em;
	cursor: pointer;
	/* Important part */
	position: relative;
	transition: padding-right 0.3s ease-out;
	padding-right: 40px;
`

const FlashError = styled.h4`
	@media only screen and (max-width: 400px) {
		grid-area: 8/2/9/5;
		justify-self: center;
		margin-top: 8px;
	}

	font-size: 0.5em;
	//position: absolute;
	//bottom: 10px;
	//right: 50%;
	//transform: translateX(-50%);
	grid-area: 7/4/8/5;
	justify-self: end;
	margin-right: 15px;
	display: ${(props) => (props.userState.loggedInStatus == "NOT_LOGGED_IN" ? "initial" : "none")};

	a {
		color: blue;

		&:hover {
			color: orange;
		}
	}
`

const FlashSuccess = styled.h4`
	@media only screen and (max-width: 400px) {
		grid-area: 8/2/9/5;
		justify-self: center;
		margin-top: 8px;
	}
	font-size: 0.5em;
	//position: absolute;
	//right: 60px;
	//top: 50%;
	//transform: translateY(-50%);
	grid-area: 7/4/8/5;
	margin-right: 15px;
	justify-self: end;
	display: ${(props) => (props.successFlag ? "initial" : "none")};
`

const ButtonTabsWrapper = styled.div`
	grid-area: 1/1/2/2;

	display: grid;
	grid-template-columns: 50% 50%;
	//height: 60px;
`

const DemoIndicatorDotsWrapper = styled.div`
	width: 100%;
	height: 100px;
	display: grid;
`

const DemoIndicatorDots = styled.div`
	display: grid;
	grid-area: dots;
	grid-template-columns: min-content 12px 12px max-content min-content;
	grid-template-areas: ". dot1 dot2 info";

	justify-self: start;
	align-self: center;
`

const DotSpan = styled.span`
	grid-area: info;
	align-self: center;
	justify-self: start;
	margin-left: 8px;
	font-size: 0.9em;
`

const Dot1 = styled.div`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	grid-area: dot1;
	background-color: ${(props) => (props.whichEmailIsActive == 1 ? "black" : "white")};
	//background-color: white;

	border: 1px solid black;
	box-sizing: border-box;
	transition: transform 0.5s ease;
	align-self: center;
	justify-self: center;
`
const Dot2 = styled.div`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	grid-area: dot2;
	background-color: ${(props) => (props.whichEmailIsActive == 2 ? "black" : "white")};
	//background-color: white;
	border: 1px solid black;
	box-sizing: border-box;
	transition: transform 0.5s ease;
	align-self: center;
	justify-self: center;
`

const ButtonOneTabWrapper = styled.div`
	display: grid;
	border-top-left-radius: 13px;
	border-right: 1px solid #77767657;
	border-bottom: ${(props) => (props.whichTabIsActive === 1 ? "none" : "1px solid #77767657")};

	//grid-template-columns: 1fr 1fr;
	cursor: pointer;
	background-color: ${(props) => (props.whichTabIsActive === 1 ? "#fcfcfc" : "#ddd")};
	&:hover {
		background-color: ${(props) => (props.whichTabIsActive === 1 ? "#fcfcfc" : "#e9e9e9")};
	}
`

const ButtonGuts = styled.div`
	display: grid;
	display: inline-block;
	justify-self: center;
`
const MailIcon = styled.img`
	//justify-self: end;
	padding: 10px 0;
	align-self: center;
	width: 24px;
	opacity: ${(props) => (props.whichTabIsActive == 1 ? "1" : ".3")};
	height: 100%;
	vertical-align: middle;
	display: inline-block;
`

const ButtonTabOne = styled.div`
	overflow: hidden;
	//border: 1px solid #ccc;
	height: 100%;
	vertical-align: middle;
	display: inline-block;
	//float: left;
	outline: none;
	align-self: center;
	padding: 6px 16px;
	//transition: 0.3s;
	font-size: 1.3em;
	opacity: ${(props) => (props.whichTabIsActive == 1 ? "1" : ".3")};
	font-weight: ${(props) => (props.whichTabIsActive == 1 ? "600" : "initial")};
	//border-top-left-radius: 13px;

	//background-color: #ccc;
`

const ButtonTwoTabWrapper = styled.div`
	display: grid;
	border-top-right-radius: 13px;
	cursor: pointer;
	border-left: 1px solid #77767657;
	border-bottom: ${(props) => (props.whichTabIsActive === 2 ? "none" : "1px solid #77767657")};

	background-color: ${(props) => (props.whichTabIsActive === 2 ? "#fcfcfc" : "#ddd")};
	&:hover {
		background-color: ${(props) => (props.whichTabIsActive === 2 ? "#fcfcfc" : "#e9e9e9")};
	}
`

const ButtonTabTwo = styled.div`
	overflow: hidden;
	//border: 1px solid #ccc;

	float: left;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 6px 16px;
	//transition: 0.3s;
	align-self: center;
	justify-self: center;
	opacity: ${(props) => (props.whichTabIsActive == 2 ? "1" : ".3")};
	font-weight: ${(props) => (props.whichTabIsActive == 2 ? "600" : "initial")};

	font-size: 1.3em;
	//border-bottom-right-radius: 13px;

	//background-color: #ccc;
`

const DemoWrapper = styled.div`
	padding: 45px 120px;
`

const LetterDemoWrapper = styled.div`
	//padding: 45px 120px;
	display: ${(props) => (props.whichTabIsActive == 1 ? "grid" : "none")};
	//grid-gap: 20px;
	grid-template-columns: 1fr 3fr 20px min-content 1fr;
	grid-template-rows: 22px auto;
	grid-template-areas:
		".  dots   dots dots  ."
		". center  . offer .";
	margin: 15px auto;
`

const LetterDemoCenter = styled.div`
	position: relative;
	display: grid;
	grid-area: center;
`

const EmailDemoWrapper = styled.div`
	//padding: 45px 120px;
	display: ${(props) => (props.whichTabIsActive == 1 ? "none" : "grid")};

	//grid-gap: 20px;
	grid-template-columns: 1fr 3fr 20px min-content 1fr;
	grid-template-rows: 22px auto;
	grid-template-areas:
		".  dots   dots dots  ."
		". center  . offer .";
	margin: 15px auto;
`

const EmailDemoLeft = styled.div`
	justify-self: end;
	align-self: center;
	display: grid;
	margin-right: 8px;
`

const EmailDemoCenter = styled.div`
	position: relative;
	display: grid;
	grid-area: center;
`

const EmailDemoRight = styled.div`
	justify-self: center;
	align-self: center;
	display: grid;
	margin-left: 8px;
`

const RightArrow = styled.img`
	width: 15px;
	cursor: pointer;
	justify-self: center;
	align-self: center;
`

const LeftArrow = styled.img`
	//max-width: 60px;
	//margin-top: 69px;
	width: 15px;
	cursor: pointer;
	justify-self: center;
	align-self: center;

	transform: scaleX(-1);
`

const SubjectBox = styled.div`
	/* width: 96%; */
	//margin-top: 69px;
	justify-self: center;
	border: 1px solid orange;
	position: relative;
	height: 35px;
	//margin: 45px 0px 0px 0px;

	h2 {
		position: absolute;
		font-size: 0.6em;
		background-color: white;
		left: 10px;
		top: -10px;
		padding: 3px 6px;
	}

	h3 {
		line-height: 35px;
		font-size: 0.6em;
		padding-left: 15px;
		font-weight: initial;
	}
`

const BodyBox = styled.div`
	//width: 96%;
	justify-self: center;
	border: 1px solid orange;
	position: relative;
	margin: 40px 0px;
	border-bottom-left-radius: 13px;
	border-bottom-right-radius: 13px;

	h2 {
		position: absolute;
		font-size: 0.6em;
		background-color: white;
		left: 10px;
		top: -10px;
		padding: 3px 6px;
	}

	h1 {
		justify-self: start;
		//font-size: .8rem;
		//grid-area: 1/4/4/5;
		//z-index: 1;
		//line-height: 30px;
		//display: inline-block;
		margin: 10px auto 16px auto;
		justify-self: center;
		text-align: center;
	}

	.email1 {
		justify-self: start;
		//font-size: .8em;
		font-weight: 300;
		//grid-area: 1/4/4/5;
		//z-index: 1;
		//line-height: 30px;
		//display: inline-block;
		margin-bottom: 8px;
		justify-self: center;
		text-align: center;
	}

	.email2 {
		justify-self: start;
		//font-size: .8em;
		font-weight: 300;
		//grid-area: 1/4/4/5;
		//z-index: 1;
		//line-height: 30px;
		//display: inline-block;
		justify-self: center;
		text-align: center;
	}

	h3 {
		justify-self: start;
		font-size: 0.8em;
		font-weight: initial;
		margin-top: 30px;
		grid-area: 2/1/3/2;
		margin-left: 16px;
	}

	p {
		/* @media only screen and (max-width: 1000px){

      padding: 0px;


    } */
		//text-indent: 2rem;
		font-size: 0.8em;
		font-weight: 300;
		margin-top: 15px;
		/* grid-area: 5/2/6/5; */
		grid-area: 3/1/4/2;
		padding: 0px 15px;
		line-height: 1.8em;
	}

	div {
		font-size: 0.9em;
		font-weight: 300;
		//min-height: 100px;
	}

	.closing {
		/* @media only screen and (max-width: 1000px){

      padding: 0px;
      margin-top: 16px;


    } */
		padding: 30px 15px;
		justify-self: start;
		//grid-area: 6/2/7/5;
		/* grid-area: 1/1/2/2 */
		grid-area: 4/1/5/2;
	}
`

const LetterDemo = styled.div`
	//width: 96%;
	justify-self: center;
	border: 1px solid orange;
	position: relative;
	//margin: 40px 0px;
	border-bottom-left-radius: 13px;
	border-bottom-right-radius: 13px;

	h2 {
		position: absolute;
		font-size: 0.6em;
		background-color: white;
		left: 10px;
		top: -10px;
		padding: 3px 6px;
	}

	h1 {
		justify-self: start;
		//font-size: .8rem;
		//grid-area: 1/4/4/5;
		//z-index: 1;
		//line-height: 30px;
		//display: inline-block;
		margin: 10px auto 16px auto;
		justify-self: center;
		text-align: center;
	}

	.email1 {
		justify-self: start;
		//font-size: .8em;
		font-weight: 300;
		//grid-area: 1/4/4/5;
		//z-index: 1;
		//line-height: 30px;
		//display: inline-block;
		margin-bottom: 8px;
		justify-self: center;
		text-align: center;
	}

	.email2 {
		justify-self: start;
		//font-size: .8em;
		font-weight: 300;
		//grid-area: 1/4/4/5;
		//z-index: 1;
		//line-height: 30px;
		//display: inline-block;
		justify-self: center;
		text-align: center;
	}

	h3 {
		justify-self: start;
		font-size: 0.8em;
		font-weight: initial;
		margin-top: 30px;
		grid-area: 2/1/3/2;
		margin-left: 16px;
	}

	p {
		/* @media only screen and (max-width: 1000px){

      padding: 0px;


    } */
		//text-indent: 2rem;
		font-size: 0.8em;
		font-weight: 300;
		margin-top: 15px;
		/* grid-area: 5/2/6/5; */
		grid-area: 3/1/4/2;
		padding: 0px 15px;
		line-height: 1.8em;
	}

	div {
		font-size: 0.9em;
		font-weight: 300;
		//min-height: 100px;
	}

	.closing {
		/* @media only screen and (max-width: 1000px){

      padding: 0px;
      margin-top: 16px;


    } */
		padding: 30px 15px;
		justify-self: start;
		//grid-area: 6/2/7/5;
		/* grid-area: 1/1/2/2 */
		grid-area: 4/1/5/2;
	}
`

const TopBarResultSection = styled.div`
	//width: 500px;
	//height: 300px;
	//border: 1px solid orange;
	margin: 30px 0 20px 0;

	grid-area: top;
	h1 {
		color: white;
		margin: 0 0 15px 0;
		font-weight: 600;
		letter-spacing: 0.03em;
	}

	h2 {
		//font-size: 1em;
		color: white;
		margin: 0 0 3px 0;
		font-weight: 400;
		//letter-spacing: 0.1em;
	}

	div {
		display: grid;
		grid-template-columns: max-content max-content;
		//grid-template-rows: min-content;
		h3 {
			color: #b4b2b2;
			letter-spacing: 0.03em;
			align-self: end;
		}
		h5 {
			margin: 0 0 4px 20px;
			align-self: end;
			justify-self: start;
			font-size: 0.6em;
			color: #cab184;
			cursor: pointer;
			color: orange;
			&:hover {
				color: #f1ba52;
			}
		}
	}
`
const MiddleBarResultSection = styled.div`
	display: grid;
	grid-area: middle;
	grid-template-columns:
		minmax(100px, 150px) minmax(10px, 12px)
		minmax(100px, 150px) 1fr;

	grid-template-areas: " cardOne . cardTwo nextSteps";
`

var selectFirstOnEnter = (input) => {
	// store the original event binding function
	var _addEventListener = input.addEventListener ? input.addEventListener : input.attachEvent
	function addEventListenerWrapper(type, listener) {
		// Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected, and then trigger the original listener.
		if (type == "keydown") {
			var orig_listener = listener
			listener = function (event) {
				var suggestion_selected = $(".pac-item-selected").length > 0
				if (event.which == 13 && !suggestion_selected) {
					var simulated_downarrow = $.Event("keydown", {
						keyCode: 40,
						which: 40,
					})
					orig_listener.apply(input, [simulated_downarrow])
				}
				orig_listener.apply(input, [event])
			}
		}
		_addEventListener.apply(input, [type, listener]) // add the modified listener
	}
	if (input.addEventListener) {
		input.addEventListener = addEventListenerWrapper
	} else if (input.attachEvent) {
		input.attachEvent = addEventListenerWrapper
	}
}

const SendButton = styled.a``

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////              //////////////////////////////////////
//////////////////     ACT      //////////////////////////////////////
//////////////////              //////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function Act(props, ref) {
	console.log("==============Act===============")
	console.log("==============Act Props===============", props)
	//console.log("HEADER_PROPS solo", location.pathname)

	// const [formInfo, setFormInfo] = React.useState({
	//   address: "",
	// });
	//const newRef = useRef();
	const locationFromHook = useLocation()

	const { LookupScrollToRef } = ref
	const { LookupInputRef } = ref
	const [tester, setTester] = useState("testing")
	const [addressObject, setAddressObject] = useState(null)
	const [showCards, setShowCards] = React.useState(true)
	const [resultFromFlorida, setResultFromFlorida] = React.useState("true")

	const [searchButtonActive, setSearchButtonActive] = React.useState(false)
	const [status, setStatus] = React.useState("")
	const [showStatusSpinner, setShowStatusSpinner] = React.useState(false)
	const [lastTermSearched, setLastTermSearched] = React.useState("")
	const [firstSuggestedAddress, setFirstSuggestedAddress] = React.useState("")
	const [coordinates, setCoordinates] = React.useState({ lat: "", lng: "" })

	//const [showLetter, setShowLetter] = React.useState(false);
	//const [showOffer, setShowOffer] = React.useState(true);
	const [addressLineOne, setAddressLineOne] = React.useState("")
	const [addressLineTwo, setAddressLineTwo] = React.useState("")
	const [sendButtonClass, setSendButtonClass] = React.useState("button error")
	const sendButtonRef = useRef(null)

	const [select, setSelect] = useState(null)
	const [sendEmailsToRepFlashMsg, setSendEmailsToRepFlashMsg] = React.useState("")
	const [successFlag, setSuccessFlag] = React.useState(true)
	const scrolll = props.executeScrollForLookupSectionTwo
	const myRef = useRef(null)
	const addressInputRef = useRef(null)

	const autoCompleteRef = useRef(null)
	const [recaptchaResponse, setRecaptchaResponse] = React.useState("")
	const [whichEmailIsActive, setWhichEmailIsActive] = React.useState(1)
	const [whichTabIsActive, setWhichTabIsActive] = React.useState(1)

	const [isLoading, setIsLoading] = React.useState(false)
	const [isButtonLoading, setIsButtonLoading] = React.useState(false)
	const [showLoader, setShowLoader] = React.useState(false)
	const [query, setQuery] = useState("")
	const [isAddressMenuOpen, setIsAddressMenuOpen] = React.useState(false)
	// const [results, setResults] = React.useState({
	//   one: {
	//     resultFromFlorida: "true",
	//     name: "Juan Alfonso Fernandez-Barquin",
	//     firstName: "",
	//     lastName: "",
	//     image:
	//       "https://www.myfloridahouse.gov//FileStores/Web/Imaging/Member/4709.jpg",
	//     id: "ocd-person/a8c88fee-1915-4907-ae37-5755c4bff446",
	//     email: "JuanF.Barquin@myfloridahouse.gov",
	//     chamber: "House",
	//     party: "Republican",
	//     parent: "Florida Legislature",
	//     district: "119",
	//     fullDistrict: "Florida State House district 119",
	//     fullDistrictTrunk: "Florida State House",
	//   },
	//   two: {
	//     name: "Annette Taddeo",
	//     firstName: "Annette",
	//     lastName: "Taddeo",
	//     image:
	//       "http://www.flsenate.gov/PublishedContent/Senators/2018-2020/Photos/s40_5331.jpg",
	//     id: "ocd-person/ea190b03-d1ca-4d75-89c7-dca745386db7",
	//     email: "taddeo.annette.web@flsenate.gov",
	//     chamber: "Senate",
	//     party: "Democrat",
	//     parent: "Florida Legislature",
	//     district: "40",
	//     fullDistrict: "Florida State Senate  ",
	//     fullDistrictTrunk: "Florida State Senate",
	//   },
	// });

	// const [results, setResults] = React.useState({
	// 	one: {
	// 		resultFromFlorida: "true",
	// 		name: "Kaylee Tuck",
	// 		firstName: "Kaylee",
	// 		lastName: "Tuck",
	// 		image: "https://www.myfloridahouse.gov//FileStores/Web/Imaging/Member/4776.jpg",
	// 		id: "ocd-person/7bf7d958-fabd-430b-9326-97586b0c0880",
	// 		email: "Kaylee.Tuck@myfloridahouse.gov",
	// 		chamber: "House",
	// 		party: "Republican",
	// 		parent: "Florida Legislature",
	// 		district: "55",
	// 		fullDistrict: "Florida State House  ",
	// 		fullDistrictTrunk: "Florida State House",
	// 		address: "1401 The Capitol; 402 South Monroe Street; Tallahassee, FL 32399-1300",
	// 		classification: "lower",
	// 	},
	// 	two: {
	// 		name: "Ben Albritton",
	// 		firstName: "Ben",
	// 		lastName: "Albritton",
	// 		image: "https://www.flsenate.gov/PublishedContent/Senators/2020-2022/Photos/s26_5342.jpg",
	// 		id: "ocd-person/5c81dfe7-1cec-45e8-8044-6d9cd324f2e8",
	// 		email: "albritton.ben.web@flsenate.gov",
	// 		chamber: "Senate",
	// 		party: "Republican",
	// 		parent: "Florida Legislature",
	// 		district: "26",
	// 		fullDistrict: "Florida State Senate  ",
	// 		fullDistrictTrunk: "Florida State Senate",
	// 		address: "314 Senate Building; 404 South Monroe Street; Tallahassee, FL 32399-1100",
	// 		classification: "upper",
	// 	},
	// 	hash: "15a8737628b7c84a892c199720cecdeafc7cd07e",
	// })
	//   const [results, setResults] = React.useState({ one: {}, two: {} });

	const [results, setResults] = React.useState({
		one: {
			resultFromFlorida: "true",
			name: "Juan Carlos Porras",
			firstName: "",
			lastName: "",
			image: "https://myfloridahouse.gov//FileStores/Web/Imaging/Member/4898.jpg",
			id: "ocd-person/6c673f21-8f64-44b7-831f-d3d2e9c78eb3",
			email: "JuanCarlos.Porras@myfloridahouse.gov",
			chamber: "House",
			party: "Republican",
			parent: "Florida Legislature",
			district: "119",
			fullDistrict: "Florida State House district 119",
			fullDistrictTrunk: "Florida State House district 119",
			address: "1102 The Capitol; 402 South Monroe Street; Tallahassee, FL 32399-1300",
			classification: "lower",
		},
		two: {
			name: "Ana Maria Rodriguez",
			firstName: "",
			lastName: "",
			image: "https://flsenate.gov/PublishedContent/Senators/2022-2024/Photos/s40_5379.jpg",
			id: "ocd-person/afd55a58-b8f6-4dd7-9d93-a2207b65e425",
			email: "rodriguez.anamaria.web@flsenate.gov",
			chamber: "Senate",
			party: "Republican",
			parent: "Florida Legislature",
			district: "40",
			fullDistrict: "Florida State Senate district 40",
			fullDistrictTrunk: "Florida State Senate district 40",
			address: "314 Senate Building; 404 South Monroe Street; Tallahassee, FL 32399-1100",
			classification: "upper",
		},
		hash: "b9480b5225ee9bc8cdfe1c6b2f2ea1ebc100687e",
	})

	///////////////////////////////////////////////////////////////

	useEffect(() => {
		//setValue(null);

		console.log("==inside useEffect ACT==")

		//console.log("ADDRESSOBJECTIS_ " + JSON.stringify(addressObject));

		if (addressObject && addressObject.address_components) {
			console.log(
				"ADDRESSOBJECTIS_ && addressObject.address_components" +
					JSON.stringify(addressObject.address_components)
			)

			handleAddressSelected()
		} else if (addressObject && addressObject.manual) {
			handleAddressSelectedManual()
		} else {
			//console.log("addressObject NADA")
		}
	}, [addressObject])

	React.useEffect(() => {
		console.log("Start the handleKeyDown listiner")

		selectFirstOnEnter(LookupInputRef)
	}, [])

	function loginFromDeadEnd(e) {
		e.preventDefault()

		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})

		props.setLoginClicked(true)
		props.setOpenSideMenu(false)
	}

	function signupFromDeadEnd(e) {
		e.preventDefault()
	}

	// to activate the input field while typing

	function activateField(e) {
		setSearchButtonActive(true)
	}

	// to deactivate input only if it's empty
	function disableField(e) {
		if (e.target.value == "") {
			setSearchButtonActive(false)
		}
	}

	const handleAddressSelected = () => {
		console.log("==== handle_address_selected_START ====")

		setLastTermSearched(addressObject.formated_address)

		//let user know somethings happening
		setStatus("....may take up to 60 seconds")

		setShowStatusSpinner(true)

		//set setCoordinates with LAT/LNG

		console.log("about to check the latlang with address ", addressObject.formated_address)
		// geocodeByAddress(addressObject.formated_address)
		//   .then((results) => getLatLng(results[0]))
		//   .then((latLng) => {
		//     console.log("handleAddressSelected and got coordinates", latLng);

		//     setCoordinates({
		//       lat: latLng.lat,
		//       lng: latLng.lng,
		//     });

		//     const csrf = document
		//       .querySelector("meta[name='csrf-token']")
		//       .getAttribute("content");

		//     fetch("/lookup", {
		//       method: "post",
		//       dataType: "text",
		//       body: JSON.stringify({
		//         lookup: {
		//           address: addressObject.formated_address,
		//           lat: latLng.lat,
		//           lng: latLng.lng,
		//         },
		//       }),
		//       headers: {
		//         "Content-Type": "application/json",
		//         "X-CSRF-Token": csrf,
		//       },
		//     })
		//       .then((response) => response.json())
		//       .then((data) => {
		//         //props.setStatus("Search Complete!!")

		//         //info message under the address search input box
		//         setStatus("");

		//         //message on bullet 1

		//         //props.setBullet1msg("Search Complete!")
		//         setShowStatusSpinner(false);
		//         //props.setShowStatusCheck(true)
		//         setShowCards(true);

		//         //props.setBullet1("COMPLETED")

		//         setResults(data);

		//         setResultFromFlorida(data.one.resultFromFlorida.toString());
		//         console.log("emailll", data.one.email);

		//         let flag = data.one.resultFromFlorida.toString();

		//         console.log("FLAG IS " + flag);

		//         if (flag == "false") {
		//           1;

		//           //props.setBullet2msg("Non-Florida result");
		//           //props.setBullet2("COMPLETED")
		//           //props.setShowStatusCheck2(true)
		//         } else {
		//           //props.setBullet2msg("Send Message");
		//           //props.setShowSteps(true)
		//         }
		//       });
		//   })
		//   .catch((error) => {
		//     setStatus("No results found. Check address");
		//     setShowStatusSpinner(false);
		//     console.error("Error", error);
		//   });

		// setCoordinates({
		//   lat: addressObject.geometry.location.lat(),
		//   lng: addressObject.geometry.location.lng(),
		// });

		const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content")

		fetch("/lookup", {
			method: "post",
			dataType: "text",
			body: JSON.stringify({
				lookup: {
					address: addressObject.formated_address,
					lat: addressObject.geometry.location.lat(),
					lng: addressObject.geometry.location.lng(),
				},
			}),
			headers: {
				"Content-Type": "application/json",
				"X-CSRF-Token": csrf,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				//props.setStatus("Search Complete!!")

				//info message under the address search input box
				setStatus("")

				//message on bullet 1

				//props.setBullet1msg("Search Complete!")
				setShowStatusSpinner(false)
				//props.setShowStatusCheck(true)
				setShowCards(true)

				//props.setBullet1("COMPLETED")

				setResults(data)

				setResultFromFlorida(data.one.resultFromFlorida.toString())
				console.log("emailll", data.one.email)

				let flag = data.one.resultFromFlorida.toString()

				console.log("FLAG IS " + flag)

				if (flag == "false") {
					1

					//props.setBullet2msg("Non-Florida result");
					//props.setBullet2("COMPLETED")
					//props.setShowStatusCheck2(true)
				} else {
					//props.setBullet2msg("Send Message");
					//props.setShowSteps(true)
				}
			})

		//props.setStatus("Search Complete!!");

		//info message under the address search input box
		//setStatus("");

		//setShowStatusSpinner(false);

		//setShowCards(true);

		console.log("==== handle_address_selected_END ====")
	}

	const handleAddressSelectedManual = () => {
		console.log("==== handle_address_selected_MANUAL_START ====")

		setLastTermSearched(addressObject.address)

		//let user know somethings happening
		setStatus("....may take up to 60 seconds")

		setShowStatusSpinner(true)

		//set setCoordinates with LAT/LNG

		// console.log(
		//   "about to check the latlang with address ",
		//   addressObject.formated_address
		// );
		// geocodeByAddress(addressObject.formated_address)
		//   .then((results) => getLatLng(results[0]))
		//   .then((latLng) => {
		//     console.log("handleAddressSelected and got coordinates", latLng);

		//     setCoordinates({
		//       lat: latLng.lat,
		//       lng: latLng.lng,
		//     });

		//     const csrf = document
		//       .querySelector("meta[name='csrf-token']")
		//       .getAttribute("content");

		//     fetch("/lookup", {
		//       method: "post",
		//       dataType: "text",
		//       body: JSON.stringify({
		//         lookup: {
		//           address: addressObject.formated_address,
		//           lat: latLng.lat,
		//           lng: latLng.lng,
		//         },
		//       }),
		//       headers: {
		//         "Content-Type": "application/json",
		//         "X-CSRF-Token": csrf,
		//       },
		//     })
		//       .then((response) => response.json())
		//       .then((data) => {
		//         //props.setStatus("Search Complete!!")

		//         //info message under the address search input box
		//         setStatus("");

		//         //message on bullet 1

		//         //props.setBullet1msg("Search Complete!")
		//         setShowStatusSpinner(false);
		//         //props.setShowStatusCheck(true)
		//         setShowCards(true);

		//         //props.setBullet1("COMPLETED")

		//         setResults(data);

		//         setResultFromFlorida(data.one.resultFromFlorida.toString());
		//         console.log("emailll", data.one.email);

		//         let flag = data.one.resultFromFlorida.toString();

		//         console.log("FLAG IS " + flag);

		//         if (flag == "false") {
		//           1;

		//           //props.setBullet2msg("Non-Florida result");
		//           //props.setBullet2("COMPLETED")
		//           //props.setShowStatusCheck2(true)
		//         } else {
		//           //props.setBullet2msg("Send Message");
		//           //props.setShowSteps(true)
		//         }
		//       });
		//   })
		//   .catch((error) => {
		//     setStatus("No results found. Check address");
		//     setShowStatusSpinner(false);
		//     console.error("Error", error);
		//   });

		// setCoordinates({
		//   lat: addressObject.geometry.location.lat(),
		//   lng: addressObject.geometry.location.lng(),
		// });

		const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content")

		fetch("/lookup", {
			method: "post",
			dataType: "text",
			body: JSON.stringify({
				lookup: {
					//address: addressObject.formated_address,
					lat: addressObject.lat,
					lng: addressObject.lng,
				},
			}),
			headers: {
				"Content-Type": "application/json",
				"X-CSRF-Token": csrf,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				//props.setStatus("Search Complete!!")

				//info message under the address search input box
				setStatus("")

				//message on bullet 1

				//props.setBullet1msg("Search Complete!")
				setShowStatusSpinner(false)
				//props.setShowStatusCheck(true)
				setShowCards(true)

				//props.setBullet1("COMPLETED")

				setResults(data)

				setResultFromFlorida(data.one.resultFromFlorida.toString())
				console.log("emailll", data.one.email)

				let flag = data.one.resultFromFlorida.toString()

				console.log("FLAG IS " + flag)

				if (flag == "false") {
					1

					//props.setBullet2msg("Non-Florida result");
					//props.setBullet2("COMPLETED")
					//props.setShowStatusCheck2(true)
				} else {
					//props.setBullet2msg("Send Message");
					//props.setShowSteps(true)
				}
			})

		//props.setStatus("Search Complete!!");

		//info message under the address search input box
		//setStatus("");

		//setShowStatusSpinner(false);

		//setShowCards(true);

		console.log("==== handle_address_selected_END ====")
	}

	//address selected from dropdown box///////////////////  HANDLE_SELECT  /////////
	const handleSelect = (address, pid, suggestion) => {
		console.log("handle select start ----------------------------------")
		//console.log("addressSELECT^^^^^", suggestion.formattedSuggestion.mainText)
		//console.log("addressSELECT22222", suggestion.formattedSuggestion.secondaryText)
		//populate the input with the address selected from 'react places autocomplete'
		setFormInfo({ address: address })

		//get the lat/lng of the address selected and save to state
		geocodeByAddress(address)
			.then((results) => getLatLng(results[0]))
			.then((latLng) => {
				setCoordinates({
					lat: latLng.lat,
					lng: latLng.lng,
				})
			})
			.catch((error) => {
				setStatus("No results found. Check address")
				setShowStatusSpinner(false)
				console.error("Error", error)
			})

		console.log("handle select end ----------------------------------")
	}

	///SEARCH BUTTON CLICKED///////////////////////////////// HANDLE_ADD  //////////
	const handleAdd = (e) => {
		console.log("HANNNDLLLE ADDDDDDD starrrrtttt =============================")
		//user enters address but doesnt choose one from "react places autocomplete"
		//and thus bypasses handkeSelect method, which gets the lat lng, so get lat lan otherway
		let secondTryLat = ""
		let secondTryLng = ""

		e.preventDefault()

		if (validForm()) {
			//const fooBarNode = props.sendButtonRef.current

			//Adding class to node element
			//fooBarNode.classList.remove('animate');

			if (props.bullet2 == "COMPLETED") {
				setSendButtonClass("button error")
				//props.setShowStatusCheck2(false)
				//props.setBullet2msg("Send Message")

				//props.setBullet2("NOT_COMPLETED");
			}

			//set current Search term state from input
			setLastTermSearched(formInfo.address)

			//let user know somethings happening
			setStatus("....may take up to 60 seconds")

			setShowStatusSpinner(true)

			//get formdata ready to send to server
			//formData.append("event[address]", formInfo.address);

			formData.append("event[address]", firstSuggestedAddress)

			//lat lng will be empty if user manually enters address instead if
			//selecting address from react places autocompete
			if (coordinates.lat == "" || coordinates.lng == "") {
				geocodeByAddress(formInfo.address)
					.then((results) => getLatLng(results[0]))
					.then((latLng) => {
						secondTryLat = latLng.lat
						secondTryLng = latLng.lng

						const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content")

						fetch("/lookup", {
							method: "post",
							dataType: "text",
							body: JSON.stringify({
								lookup: {
									address: formInfo.address,
									lat: secondTryLat,
									lng: secondTryLng,
								},
							}),
							headers: {
								"Content-Type": "application/json",
								"X-CSRF-Token": csrf,
							},
						})
							.then((response) => response.json())
							.then((data) => {
								//props.setStatus("Search Complete!!")

								//info message under the address search input box
								setStatus("")

								//message on bullet 1

								//props.setBullet1msg("Search Complete!")
								setShowStatusSpinner(false)
								//props.setShowStatusCheck(true)
								setShowCards(true)

								//props.setBullet1("COMPLETED")

								setResults(data)

								setResultFromFlorida(data.one.resultFromFlorida.toString())
								console.log("emailll", data.one.email)

								let flag = data.one.resultFromFlorida.toString()

								console.log("FLAG IS " + flag)

								if (flag == "false") {
									1

									//props.setBullet2msg("Non-Florida result");
									//props.setBullet2("COMPLETED")
									//props.setShowStatusCheck2(true)
								} else {
									//props.setBullet2msg("Send Message");
									//props.setShowSteps(true)
								}
							})
					})
					.catch((error) => {
						setStatus("No results found. Check address")
						setShowStatusSpinner(false)
						console.log("Error", error)
					})
			} else {
				console.log("lat was NOT empty")
				const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content")
				fetch("/lookup", {
					method: "post",
					dataType: "text",
					body: JSON.stringify({
						lookup: {
							address: formInfo.address,
							lat: coordinates.lat,
							lng: coordinates.lng,
						},
					}),
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-Token": csrf,
					},
				})
					.then((response) => response.json())
					.then((data) => {
						//props.setStatus("Search Complete!!")
						setStatus("")
						//props.setBullet1msg("Search Complete!")
						setShowStatusSpinner(false)
						//props.setShowStatusCheck(true)
						setShowCards(true)

						//props.setBullet1("COMPLETED")

						setResults(data)

						setResultFromFlorida(data.one.resultFromFlorida.toString())

						let flag = data.one.resultFromFlorida.toString()

						console.log("FLAG IS " + flag)

						if (flag == "false") {
							//props.setBullet2msg("non-Florida result");
							//props.setBullet2("COMPLETED")
							//props.setShowStatusCheck2(true)
						} else {
							//props.setBullet2msg("Send Message");
							//props.setShowSteps(true);
						}
					})
			}
		}

		console.log("HANNNDLLLE ADDDDDDD end =============================")
	}

	////////////////////////////////////////////////   VALID_FORM  //////
	// const validForm = () => {
	//   if (formInfo.address == "") {
	//     setStatus("Enter an address.");
	//     //props.setShowStatusCheck(false)

	//     setTimeout(() => {
	//       setStatus("");
	//     }, 2000);

	//     return false;
	//   } else if (formInfo.address == lastTermSearched) {
	//     setStatus("Enter a different address.");
	//     //props.setShowStatusCheck(false)
	//     return false;
	//   } else {
	//     return true;
	//   }
	// };

	// const handleChange2 = (event) => {
	//   console.log("handle change 222 start @@@@@@@@@@@@@@@@@@@@@@@@@@@@");

	//   //resets search if user erases first search term
	//   if (event != lastTermSearched) {
	//     setStatus("");
	//     //setShowStatusCheck(false)
	//   }

	//   setFormInfo({
	//     address: event,
	//   });

	//   //if (!formInfo.address ){

	//   //  setSearchButtonActive( true)
	//   //} else{

	//   //  setSearchButtonActive( false)

	//   //}

	//   console.log("handle change 222 end @@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	// };

	function sendLetterFunction() {
		console.log("send?LetterFunct$#%Ton")
	}

	function resetSearch(e) {
		e.preventDefault()
		setShowCards(false)
		setAddressObject(null)

		//LookupInputRef.current.focus();

		//console.log("insideRESET_SEARCh and Select is", select.current);

		//console.log("insideRESET_SEARCh and LookupInputRef is", LookupInputRef);

		//props.executeScrollForLookupSection();
		setTimeout(() => {
			console.log("inTimeOut_______________________")
			setQuery("")
			autoCompleteRef.current.focus()
		}, 2000)

		//setShowLetter(false);
	}

	function onChange(value) {
		console.log("Captcha value:", value)
		setRecaptchaResponse(value)
		setSendEmailsToRepFlashMsg("")
	}

	const animateButton = function (e) {
		e.preventDefault
		//reset animation
		//e.target.classList.remove('animate');

		//e.target.classList.add('animate');
		if (props.userState.loggedInStatus == "NOT_LOGGED_IN") {
			setSendButtonClass("button error animate")
			setFlashMsg("please login first")
			setTimeout(function () {
				//setFlashMsg('<a href="#" onClick={loginFromDeadEnd}>Login</a> to continue')
				//setFlashMsg('')
				//e.target.classList.remove('animate')
			}, 4000)
		} else {
			console.log("rrrrrrrrrrrrrrrrrrrrrr")
			setSendButtonClass("button success animate")

			setTimeout(function () {
				setSuccessFlag(true)
				//setShowOffer(true);
				console.log("b44444 scroLL")
				myRef.current.scrollIntoView()
				console.log("bAFTER scroLL")
			}, 3500)
		}
	}

	const GetHeader = () => {
		console.log("getHeader start &&&&&&&&&&&&&&&&&&&&&&")
		console.log("which email is active is " + whichEmailIsActive)
		console.log(results)

		if (whichEmailIsActive === 1) {
			if (results.one.chamber !== undefined && results.one.chamber == "Senate") {
				if (results.one.lastName != "") {
					return <h3>Dear Senator {results.one.lastName}, </h3>
				} else {
					return <h3>Dear Senator {results.one.name}, </h3>
				}
			} else if (results.one.chamber !== undefined && results.one.chamber == "House") {
				if (results.one.lastName != "") {
					return <h3>Dear Representative {results.one.lastName}, </h3>
				} else {
					return <h3>Dear Representative {results.one.name}, </h3>
				}
			} else {
				return "default header 1"
			}
		} else if (whichEmailIsActive === 2) {
			if (results.two.chamber !== undefined && results.two.chamber == "Senate") {
				if (results.two.lastName != "") {
					return <h3>Dear Senator {results.two.lastName}, </h3>
				} else {
					return <h3>Dear Senator {results.two.name}, </h3>
				}
			} else if (results.two.chamber !== undefined && results.two.chamber == "House") {
				if (results.two.lastName != "") {
					return <h3>Dear Representative {results.two.lastName}, </h3>
				} else {
					return <h3>Dear Representative {results.two.name}, </h3>
				}
			} else {
				return "default header 2"
			}
		} else {
			return "default header 3"
		}
	}

	const HandleLetterButton = (e) => {
		console.log(e.target.value)

		if (whichTabIsActive !== 1) {
			setWhichTabIsActive(1)
		}
	}

	const HandleEmailButton = (e) => {
		console.log(e.target.value)

		if (whichTabIsActive !== 2) {
			setWhichTabIsActive(2)
		}
	}
	const HandleButtonTabOne = (e) => {
		console.log(e.target.value)

		if (whichEmailIsActive !== 1) {
			setWhichEmailIsActive(1)
		}
	}

	const HandleButtonTabTwo = (e) => {
		console.log(e.target.value)
		if (whichEmailIsActive !== 2) {
			setWhichEmailIsActive(2)
		}
	}

	//

	const sendAdderessToServerAndFinishLookup = () => {
		console.log("The current address is ", addressObject)

		geocodeByAddress(addressObject.formated_address)
			.then((results) => getLatLng(results[0]))
			.then(({ lat, lng }) => console.log("Successfully got latitude and longitude", { lat, lng }))

		//   geocodeByAddress("9900 sw 166 ct")
		// .then(results => console.log(results))
		// .catch(error => console.error(error));
	}

	const handleFocus = (element) => {
		if (addressObject) {
			select.select.state.inputValue = addressObject.formated_address
		}
	}

	const handleAddress = (v) => {
		console.log("onChange => so HANDLE_ADDRESS", v)
		setAddressObject(v)

		console.log("MAIN_TEXT", v.value.structured_formatting.main_text)
		console.log("SECONDARY_TEXT", v.value.structured_formatting.secondary_text)

		setAddressLineOne(v.value.structured_formatting.main_text)
		setAddressLineTwo(v.value.structured_formatting.secondary_text)
	}

	const handleInputChange = (v) => {
		console.log("handleInputChange", v)

		if (v == "") {
			isAddressMenuOpen ? setIsAddressMenuOpen(false) : null
		} else {
			isAddressMenuOpen ? null : setIsAddressMenuOpen(true)
		}
	}

	const clickedThisTest = (v) => {
		console.log("clickedThisTest = ", v)
	}

	//   const handleScriptLoad = () => {
	//     // Declare Options For Autocomplete

	//     console.log("script looodesd");
	//     const options = {
	//       // types: ["(cities)"],
	//       // bounds: [
	//       // 	{ lat: 50, lng: 50 },
	//       // 	{ lat: 100, lng: 100 },
	//       // ],
	//       componentRestrictions: {
	//         country: ["us"],
	//       },
	//     };

	//     // Initialize Google Autocomplete
	//     /*global google*/ // To disable any eslint 'google not defined' errors
	//     autocompleteRef.current = new window.google.maps.places.Autocomplete(
	//       document.getElementById("testID"),
	//       options
	//     );

	//     console.log(
	//       "autocompleteRefautocompleteRefautocompleteRef " +
	//         autocompleteRef.current.inspect
	//     );

	//     // Avoid paying for data that you don't need by restricting the set of
	//     // place fields that are returned to just the address components and formatted
	//     // address.
	//     // autocompleteRef.current.setFields([
	//     // 	"address_components",
	//     // 	"formatted_address",
	//     // ]);

	//     // Fire Event when a suggested name is selected
	//     autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
	//     console.log("autocompleteRef.inspect " + autocompleteRef.current.to_s);
	//   };

	const handlePlaceSelect = () => {
		// Extract City From Address Object
		const addressObject = autocompleteRef.current.getPlace()
		console.log("addressObject------------ " + addressObject.to_s)
		// const address = addressObject.address_components;
		// console.log("addressObject.address_components " + address.to_s);
		// Check if address is valid
		// if (address) {
		// 	setCity(address[0].long_name);
		// 	setQuery(addressObject.formatted_address);
		// }
	}

	const handleEmailDemoRight = () => {
		setWhichEmailIsActive((prevEmailState) => {
			if (prevEmailState == 1) {
				return 2
			} else {
				return 1
			}
		})
	}

	const handleWhichDemoToSelect = (numString) => {
		setWhichEmailIsActive(() => {
			if (numString == "1") {
				return 1
			} else if (numString == "2") {
				return 2
			}
		})
	}

	return (
		<ActWrapper ref={LookupScrollToRef}>
			<BGimage src={actBackground} ref={myRef}></BGimage>

			<ActGrid>
				<ActSection showCards={showCards}>
					{/* <ProgressBarz>
						<StepOne />
						<StepTwo showCards={showCards} />
						<StepThree showCards={showCards} />
					</ProgressBarz> */}

					<ActHeaderWrapper>
						<ActHeader showCards={showCards}>ACT NOW</ActHeader>

						<ActSubheader showCards={showCards}>...3 quick steps</ActSubheader>
					</ActHeaderWrapper>

					<ActBulletPointsWrapper>
						<ActBulletWrapper>
							<BulletImage src={orangeSearch} />

							<BulletOne>
								<span>Lookup</span> your State Representatives
							</BulletOne>
						</ActBulletWrapper>

						<ActBulletWrapper>
							<BulletImage src={orangeMailbox} />

							<BulletOne>
								<span>Contact</span> them in just a few clicks
							</BulletOne>
						</ActBulletWrapper>

						<ActBulletWrapper>
							<BulletImage src={orangeShare} />

							<BulletOne>
								<span>Share </span>this tool
							</BulletOne>
						</ActBulletWrapper>
					</ActBulletPointsWrapper>

					<Form className="form-inline" showCards={showCards}>
						{/* <button
              style={{width: "100px", height: "50px"}}
              //searchButtonActive={searchButtonActive}
              //disabled={false}
              type="submit"
              onClick={sendAdderessToServerAndFinishLookup}
              className="btn btn-primary"
            >
              send
            </button> */}
						<SearchLocationInput
							passRef={autoCompleteRef}
							addressObject={addressObject}
							setAddressObject={setAddressObject}
							query={query}
							setQuery={setQuery}
							passRef2={LookupInputRef}
						/>

						<StatusHolder>
							<StatusSpinner showStatusSpinner={showStatusSpinner}>
								{/* <Spinner name="wave" color="#87d388" /> */}
							</StatusSpinner>

							<StatusBar>
								<Span status={status}> {status}</Span>
							</StatusBar>
						</StatusHolder>
					</Form>

					<Mega showCards={showCards} src={mega}></Mega>
				</ActSection>

				<ResultSection showCards={showCards}>
					{/* <ResultSectionInfoBox>
            <ProgressBarzResultSection>
              <StepOne />
              <StepTwo showCards={showCards} />
              <StepThree showCards={showCards} />
            </ProgressBarzResultSection>

           
          </ResultSectionInfoBox> */}

					<TopBarResultSection>
						<h1>Results</h1>
						<h2>We located your State Representatives !!</h2>

						<div>
							<h3>
								{addressObject && addressObject.formatted_address
									? addressObject.formatted_address
									: addressObject && addressObject.address
									? addressObject.address
									: "123 Main St Miami, FL 33155"}
							</h3>
							<h5 onClick={resetSearch}>New Search ?</h5>
						</div>
					</TopBarResultSection>

					<MiddleBarResultSection>
						<CardOne>
							<CardOneWrapper whichEmailIsActive={whichEmailIsActive}>
								<CardPicture src={results.one.image ? results.one.image : ""}></CardPicture>

								<CardTemplate src={cardTemplate}></CardTemplate>

								<CardNameOfRep>{results.one.name ? results.one.name : ""}</CardNameOfRep>

								<CardOneSub>{results.one.fullDistrictTrunk}</CardOneSub>
							</CardOneWrapper>
						</CardOne>

						<CardTwo>
							<CardTwoWrapper whichEmailIsActive={whichEmailIsActive}>
								<CardPicture src={results.two.image ? results.two.image : ""}></CardPicture>

								<CardTemplate src={cardTemplate}></CardTemplate>

								<CardNameOfRep>{results.two.name ? results.two.name : ""}</CardNameOfRep>

								<CardTwoSub>{results.two.fullDistrictTrunk}</CardTwoSub>
							</CardTwoWrapper>
						</CardTwo>

						<NextSteps>
							<h1>NEXT STEP:</h1>
							{/* <h2>checkout the letters</h2> */}
							<div>
								<p>
									a printed letter will be mailed to each of your representatives via United States
									Postal Service.
								</p>
							</div>
						</NextSteps>
						<LinerVertical />
						<LinerHorizontal />
					</MiddleBarResultSection>

					<TriplePlayWrapper resultFromFlorida={resultFromFlorida} showCards={showCards}>
						<Letter resultFromFlorida={resultFromFlorida} showCards={showCards}>
							<ButtonTabsWrapper>
								<ButtonOneTabWrapper
									//value={1}
									whichTabIsActive={whichTabIsActive}
									//onClick={HandleButtonTabOne}
									onClick={HandleLetterButton}
								>
									<ButtonGuts>
										<MailIcon whichTabIsActive={whichTabIsActive} src={mailIcon} />
										<ButtonTabOne whichTabIsActive={whichTabIsActive}>
											Letters <span style={{ fontSize: ".6em" }}>(via USPS)</span>
										</ButtonTabOne>
									</ButtonGuts>
								</ButtonOneTabWrapper>
								<ButtonTwoTabWrapper
									//value={2}
									whichTabIsActive={whichTabIsActive}
									//onClick={HandleButtonTabTwo}
									onClick={HandleEmailButton}
								>
									<ButtonTabTwo whichTabIsActive={whichTabIsActive}>EmaiL</ButtonTabTwo>
								</ButtonTwoTabWrapper>
							</ButtonTabsWrapper>

							{/* <DemoIndicatorDotsWrapper>
								
							</DemoIndicatorDotsWrapper> */}

							<EmailDemoWrapper whichTabIsActive={whichTabIsActive}>
								<EmailDemoLeft onClick={handleEmailDemoRight}>
									{/* <LeftArrow src={rightArrow} /> */}
								</EmailDemoLeft>
								{/* <DemoIndicatorDots>
                  <EmailDemoLeft onClick={handleEmailDemoRight}>
                    <LeftArrow src={rightArrow} />
                  </EmailDemoLeft>
                  <Dot1 whichEmailIsActive={whichEmailIsActive} />
                  <Dot2 whichEmailIsActive={whichEmailIsActive} />
                  <DotSpan>
                    ({whichTabIsActive == 1 ? "Letter " : "Email "}
                    {whichEmailIsActive == 1 ? "1 of 2" : "2 of 2"})
                  </DotSpan>
                  <EmailDemoRight onClick={handleEmailDemoRight}>
                    <RightArrow src={rightArrow} />
                  </EmailDemoRight>
                </DemoIndicatorDots> */}
								<EmailDemoCenter>
									<div>
										<SubjectBox>
											<h2>subject</h2>
											<h3>We need a more sensible approach to marijuana laws.</h3>
										</SubjectBox>

										<BodyBox>
											<h2>body</h2>

											<GetHeader />

											<p>
												I am a constituent of (
												<i>
													{whichEmailIsActive === 1
														? results.one.fullDistrict + " district " + results.one.district
														: results.two.fullDistrict + " district " + results.two.district}
												</i>
												). I am writing to urge you to support legalizing and regulating marijuana
												for adults. Many other states are currently benefiting from this common
												sense approach. Why is our state lagging behind?
											</p>
											<p>
												Prohibition has never worked and causes an increase in unregulated sales.
												Legalizing marijuana for recreational use would virtually eliminate the
												black market, create thousands of jobs in a growing industry and bring in
												millions of dolars of tax revenue.
											</p>
											<p>
												As a Legislator, you are in a position where you can make a difference. Can
												i count on you to end marijuana prohibition?
											</p>

											<div className="closing">
												Sincerely, <br />
												<sub>
													{props.userState.loggedInStatus == "LOGGED_IN"
														? props.userState.user.full_name
														: "[Your Name Here]"}
												</sub>{" "}
												<br />
												<sub>{addressLineOne !== "" ? addressLineOne : "[Your address]"}</sub>{" "}
												<br />
												<sub>
													{addressLineTwo !== "" ? addressLineTwo : "[city, state, zipcode]"}
												</sub>{" "}
												<br />
											</div>

											{/* <FlashError userState={props.userState}>
                  ** Please{" "}
                  <a href="#" onClick={loginFromDeadEnd}>
                    Login
                  </a>{" "}
                  or{" "}
                  <a href="#" onClick={props.executeScrollForSection2}>
                    Signup
                  </a>{" "}
                  to continue.
                </FlashError> */}
										</BodyBox>
									</div>
								</EmailDemoCenter>
								<LetterOfferWrapper>
									<LetterOffer>
										<h2>Total</h2>
										<Price>$2.99</Price>

										<Row1
											onClick={() => handleWhichDemoToSelect("1")}
											whichEmailIsActive={whichEmailIsActive}
										>
											<Pic1Wrapper>
												<Pic1 src={results.one.image ? results.one.image : ""}></Pic1>
											</Pic1Wrapper>
											<Description1>
												Representative {results.one.name ? results.one.name : ""}
											</Description1>
										</Row1>
										<Row2
											onClick={() => handleWhichDemoToSelect("2")}
											whichEmailIsActive={whichEmailIsActive}
										>
											<Pic1 src={results.two.image ? results.two.image : ""}></Pic1>
											<Description1>
												Senator {results.two.name ? results.two.name : ""}
											</Description1>
										</Row2>
										<CheckmarkMainWrapper>
											<CheckmarkRow>
												<GreenCheckmarkWrapper>
													<GreenCheckmark></GreenCheckmark>
												</GreenCheckmarkWrapper>
												<CheckmarkDescription>It's easy</CheckmarkDescription>
											</CheckmarkRow>
											<CheckMarkParagraph>
												a printed letter will be mailed to each of your representatives via United
												States Postal Service.
											</CheckMarkParagraph>
										</CheckmarkMainWrapper>

										<CheckmarkMainWrapper>
											<CheckmarkRow>
												<GreenCheckmarkWrapper>
													<GreenCheckmark></GreenCheckmark>
												</GreenCheckmarkWrapper>
												<CheckmarkDescription>100% effective</CheckmarkDescription>
											</CheckmarkRow>
											<CheckMarkParagraph>
												Sending a letter via USPS is most effective way to get your point across.
											</CheckMarkParagraph>
										</CheckmarkMainWrapper>
										{/* <ShowOfferSectionWrapper> */}
										<ShowOfferSection>
											<PayPalButtons
												style={{ layout: "vertical" }}
												createOrder={(data, actions) => {
													return actions.order.create({
														purchase_units: [
															{
																amount: {
																	value: "2.99",
																},
															},
														],
													})
												}}
												forceReRender={[results]}
												onApprove={(data, actions) => {
													return actions.order.capture().then((details) => {
														//const name = details.payer.name.given_name;
														//alert(`Transaction completed by ${name}`);
														// console.log("STATUS = " + details.status)

														// console.log(details)

														// console.log("name: " + details.payer.name.given_name + " " + details.payer.name.surname );
														// console.log("email: " + details.payer.email_address);
														// console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.address_line_1));
														// console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.address_line_2));
														// console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.admin_area_2));
														// console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.admin_area_1));
														// console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.postal_code));
														// console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.country_code));
														//console.log("DATA", data)

														//console.log("insiiiiiide1 " + results.inspect);

														axios
															.post(
																"/send/letters",
																{
																	data: {
																		ppResults: data,
																		infoOnReps: results,
																		buyerDetails: details,
																	},
																},
																{ withCredentials: true }
															)
															.then((response) => {
																//console.log("resoooooooooooooooonse = " + response.inspect)
																//addAllCommentsToStateForReplyButtonToWork(response.data.comments)
																//addAllCommentsToStateForShowMoreButtonToWork(response.data.comments)
																//setArtData(response.data.article)
																//setArtDataComments(response.data.comments)
																//setIsCommentsLoading(false)
																//setIsCommentsLoading(false)
																//setCurrentUser(@current_user)
															})
															.catch((error) => {
																//console.log("articleErrors", error)
															})
													})
												}}
											/>
										</ShowOfferSection>
										{/* </ShowOfferSectionWrapper> */}
									</LetterOffer>
								</LetterOfferWrapper>
								{/* <OfferOne>
									<BulletPointText>
										Personalized email will be sent to each of your representatives.
									</BulletPointText>

									<BulletPointText2>
										Email will look exacly like it's being sent from you.
									</BulletPointText2>

									<h2>Free</h2>

									<h4>{sendEmailsToRepFlashMsg}</h4>

									<SendButtonWrapper>
										<Button_Loading
											onClick={() => {
												if (recaptchaResponse == "" || recaptchaResponse == null) {
													setSendEmailsToRepFlashMsg("Please check robot checkbox")
												} else {
													setIsButtonLoading(true)

													//ajax call to rails (lookup#sendEmailsToReps)
													sendEmailsToReps(
														setIsButtonLoading,
														results,
														setSendEmailsToRepFlashMsg,
														recaptchaResponse,
														addressLineOne,
														addressLineTwo
													)
												}
											}}
											isLoading={isButtonLoading}
											showLoader={showLoader}
											setShowLoader={setShowLoader}
										>
											<div
												style={{
													//position: "relative",
													//display: "grid",
													//gridTemplateColumns: "1fr 3fr",
													height: "100%",
													width: "100%",
												}}
											>
												<span style={{}}> Send Emails</span>
											</div>
										</Button_Loading>
									</SendButtonWrapper>

									<ReCAPTCHA
										sitekey="6LdE3NgdAAAAADcnYdc8T-d61yIGGVCwNl3sdfc6"
										onChange={onChange}
										className="testClass"
										size="compact"
									/>
								</OfferOne> */}
								<EmailDemoRight onClick={handleEmailDemoRight}>
									{/* <RightArrow src={rightArrow} /> */}
								</EmailDemoRight>
							</EmailDemoWrapper>

							<LetterDemoWrapper whichTabIsActive={whichTabIsActive}>
								<EmailDemoLeft onClick={handleEmailDemoRight}>
									{/* <LeftArrow src={rightArrow} /> */}
								</EmailDemoLeft>
								{/* <DemoIndicatorDots>
                  <EmailDemoLeft onClick={handleEmailDemoRight}>
                    <LeftArrow src={rightArrow} />
                  </EmailDemoLeft>
                  <Dot1 whichEmailIsActive={whichEmailIsActive} />
                  <Dot2 whichEmailIsActive={whichEmailIsActive} />
                  <DotSpan>
                    ({whichTabIsActive == 1 ? "Letter " : "Email "}
                    {whichEmailIsActive == 1 ? "1 of 2" : "2 of 2"})
                  </DotSpan>
                  <EmailDemoRight onClick={handleEmailDemoRight}>
                    <RightArrow src={rightArrow} />
                  </EmailDemoRight>
                </DemoIndicatorDots> */}
								<LetterDemoCenter>
									<LetterDemo>
										{/* <h2>body</h2> */}

										<GetHeader />

										<p>
											I am a constituent of (
											<i>
												{whichEmailIsActive === 1
													? results.one.fullDistrict + " district " + results.one.district
													: results.two.fullDistrict + " district " + results.two.district}
											</i>
											). I am writing to urge you to support legalizing and regulating marijuana for
											adults. Many other states are currently benefiting from this common sense
											approach. Why is our state lagging behind?
										</p>
										<p>
											Prohibition has never worked and causes an increase in unregulated sales.
											Legalizing marijuana for recreational use would virtually eliminate the black
											market, create thousands of jobs in a growing industry and bring in millions
											of dolars of tax revenue.
										</p>
										<p>
											As a Legislator, you are in a position where you can make a difference. Can i
											count on you to end marijuana prohibition?
										</p>

										<div className="closing">
											Sincerely, <br />
											<sub>
												{props.userState.loggedInStatus == "LOGGED_IN"
													? props.userState.user.full_name
													: "[Your Name Here]"}
											</sub>{" "}
											<br />
											<sub>{addressLineOne !== "" ? addressLineOne : "[Your address]"}</sub> <br />
											<sub>
												{addressLineTwo !== "" ? addressLineTwo : "[city, state, zipcode]"}
											</sub>{" "}
											<br />
										</div>

										{/* <FlashError userState={props.userState}>
                  ** Please{" "}
                  <a href="#" onClick={loginFromDeadEnd}>
                    Login
                  </a>{" "}
                  or{" "}
                  <a href="#" onClick={props.executeScrollForSection2}>
                    Signup
                  </a>{" "}
                  to continue.
                </FlashError> */}
									</LetterDemo>
									{/* <OfferTwo>
                    <BulletPointText>
                      a printed letter will be mailed to each of your
                      representatives via United States Postal Service.
                    </BulletPointText>

                    <BulletPointText2>
                      most effective way to get your point across.
                    </BulletPointText2>
                    <h2>$2.99</h2>

                    <ShowOfferSectionWrapper>
                      <ShowOfferSection>
                        <PayPalButtons
                          style={{ layout: "vertical" }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: "2.99",
                                  },
                                },
                              ],
                            });
                          }}
                          forceReRender={[results]}
                          onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                              //const name = details.payer.name.given_name;
                              //alert(`Transaction completed by ${name}`);
                              // console.log("STATUS = " + details.status)

                              // console.log(details)

                              // console.log("name: " + details.payer.name.given_name + " " + details.payer.name.surname );
                              // console.log("email: " + details.payer.email_address);
                              // console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.address_line_1));
                              // console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.address_line_2));
                              // console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.admin_area_2));
                              // console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.admin_area_1));
                              // console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.postal_code));
                              // console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.country_code));
                              //console.log("DATA", data)

                              //console.log("insiiiiiide1 " + results.inspect);

                              axios
                                .post(
                                  "/send/letters",
                                  {
                                    data: {
                                      ppResults: data,
                                      infoOnReps: results,
                                      buyerDetails: details,
                                    },
                                  },
                                  { withCredentials: true }
                                )
                                .then((response) => {
                                  //console.log("resoooooooooooooooonse = " + response.inspect)
                                  //addAllCommentsToStateForReplyButtonToWork(response.data.comments)
                                  //addAllCommentsToStateForShowMoreButtonToWork(response.data.comments)
                                  //setArtData(response.data.article)
                                  //setArtDataComments(response.data.comments)
                                  //setIsCommentsLoading(false)
                                  //setIsCommentsLoading(false)
                                  //setCurrentUser(@current_user)
                                })
                                .catch((error) => {
                                  //console.log("articleErrors", error)
                                });
                            });
                          }}
                        />
                      </ShowOfferSection>
                    </ShowOfferSectionWrapper>
                  </OfferTwo> */}
								</LetterDemoCenter>
								<LetterOfferWrapper>
									<LetterOffer>
										<h2>Total</h2>
										<Price>$2.99</Price>

										<Row1
											onClick={() => handleWhichDemoToSelect("1")}
											whichEmailIsActive={whichEmailIsActive}
										>
											<Pic1Wrapper>
												<Pic1 src={results.one.image ? results.one.image : ""}></Pic1>
											</Pic1Wrapper>
											<Description1>
												Representative {results.one.name ? results.one.name : ""}
											</Description1>
										</Row1>
										<Row2
											onClick={() => handleWhichDemoToSelect("2")}
											whichEmailIsActive={whichEmailIsActive}
										>
											<Pic1 src={results.two.image ? results.two.image : ""}></Pic1>
											<Description1>
												Senator {results.two.name ? results.two.name : ""}
											</Description1>
										</Row2>
										<CheckmarkMainWrapper>
											<CheckmarkRow>
												<GreenCheckmarkWrapper>
													<GreenCheckmark></GreenCheckmark>
												</GreenCheckmarkWrapper>
												<CheckmarkDescription>It's easy</CheckmarkDescription>
											</CheckmarkRow>
											<CheckMarkParagraph>
												a printed letter will be mailed to each of your representatives via United
												States Postal Service.
											</CheckMarkParagraph>
										</CheckmarkMainWrapper>

										<CheckmarkMainWrapper>
											<CheckmarkRow>
												<GreenCheckmarkWrapper>
													<GreenCheckmark></GreenCheckmark>
												</GreenCheckmarkWrapper>
												<CheckmarkDescription>100% effective</CheckmarkDescription>
											</CheckmarkRow>
											<CheckMarkParagraph>
												Sending a letter via USPS is most effective way to get your point across.
											</CheckMarkParagraph>
										</CheckmarkMainWrapper>
										{/* <ShowOfferSectionWrapper> */}
										<ShowOfferSection>
											<PayPalButtons
												style={{ layout: "vertical" }}
												createOrder={(data, actions) => {
													return actions.order.create({
														purchase_units: [
															{
																amount: {
																	value: "2.99",
																},
															},
														],
													})
												}}
												forceReRender={[results]}
												onApprove={(data, actions) => {
													return actions.order.capture().then((details) => {
														//const name = details.payer.name.given_name;
														//alert(`Transaction completed by ${name}`);
														// console.log("STATUS = " + details.status)

														// console.log(details)

														// console.log("name: " + details.payer.name.given_name + " " + details.payer.name.surname );
														// console.log("email: " + details.payer.email_address);
														// console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.address_line_1));
														// console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.address_line_2));
														// console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.admin_area_2));
														// console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.admin_area_1));
														// console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.postal_code));
														// console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.country_code));
														//console.log("DATA", data)

														//console.log("insiiiiiide1 " + results.inspect);

														axios
															.post(
																"/send/letters",
																{
																	data: {
																		ppResults: data,
																		infoOnReps: results,
																		buyerDetails: details,
																	},
																},
																{ withCredentials: true }
															)
															.then((response) => {
																//console.log("resoooooooooooooooonse = " + response.inspect)
																//addAllCommentsToStateForReplyButtonToWork(response.data.comments)
																//addAllCommentsToStateForShowMoreButtonToWork(response.data.comments)
																//setArtData(response.data.article)
																//setArtDataComments(response.data.comments)
																//setIsCommentsLoading(false)
																//setIsCommentsLoading(false)
																//setCurrentUser(@current_user)
															})
															.catch((error) => {
																//console.log("articleErrors", error)
															})
													})
												}}
											/>
										</ShowOfferSection>
										{/* </ShowOfferSectionWrapper> */}
									</LetterOffer>
								</LetterOfferWrapper>
								<EmailDemoRight onClick={handleEmailDemoRight}>
									{/* <RightArrow src={rightArrow} /> */}
								</EmailDemoRight>
							</LetterDemoWrapper>
						</Letter>

						{/* <OfferOne>
              <h1>Email</h1> */}

						{/* <RiMailSendLine
								style={{
									gridArea: "2/1/3/3",
									justifySelf: "center",
									alignSelf: "start",

									width: "40px",
									height: "40px",
								}}
							/> */}

						{/* <BulletPointText>
                Personalized email will be sent to each of your representatives.
              </BulletPointText>

              <BulletPointText2>
                Email will look exacly like it's being sent from you.
              </BulletPointText2>

              <h2>Free</h2>

              <h4>{sendEmailsToRepFlashMsg}</h4>

              <SendButtonWrapper>
                <Button_Loading
                  onClick={() => {
                    if (recaptchaResponse == "" || recaptchaResponse == null) {
                      setSendEmailsToRepFlashMsg("Please check robot checkbox");
                    } else {
                      setIsButtonLoading(true);

                      //ajax call to rails (lookup#sendEmailsToReps)
                      sendEmailsToReps(
                        setIsButtonLoading,
                        results,
                        setSendEmailsToRepFlashMsg,
                        recaptchaResponse,
                        addressLineOne,
                        addressLineTwo
                      );
                    }
                  }}
                  isLoading={isButtonLoading}
                  showLoader={showLoader}
                  setShowLoader={setShowLoader}
                >
                  <div
                    style={{
                      //position: "relative",
                      //display: "grid",
                      //gridTemplateColumns: "1fr 3fr",
                      height: "100%",
                      width: "100%",
                    }}
                  > */}
						{/* <RiMailSendLine
											style={{
												//gridArea: "2/1/3/3",
												////justifySelf: "end",
												////alignSelf: "center",
												//position: "absolute",
												width: "15px",
												height: "15px",
												transform: "translate(-6px, 2px)",
												//top: "-6.7px",
												//left: "25px",
												////gridArea: "1/1/2/2"
											}}
										/> */}

						{/* <span style={{}}> Send Emails</span>
                  </div>
                </Button_Loading>
              </SendButtonWrapper>

              <ReCAPTCHA
                sitekey="6LdE3NgdAAAAADcnYdc8T-d61yIGGVCwNl3sdfc6"
                onChange={onChange}
                className="testClass"
                size="compact"
              />
            </OfferOne> */}

						{/* <OfferTwo>
              <h1>Letter</h1> */}
						{/* <BsMailbox
								style={{
									gridArea: "2/1/3/3",
									justifySelf: "center",
									alignSelf: "start",

									width: "45px",
									height: "45px",
								}}
							/> */}

						{/* <BulletPointText>
                a printed letter will be mailed to each of your representatives
                via United States Postal Service.
              </BulletPointText>

              <BulletPointText2>
                most effective way to get your point across.
              </BulletPointText2>
              <h2>$2.99</h2>

              <ShowOfferSectionWrapper>
                <ShowOfferSection>
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: "2.99",
                            },
                          },
                        ],
                      });
                    }}
                    forceReRender={[results]}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        //const name = details.payer.name.given_name;
                        //alert(`Transaction completed by ${name}`);
                        // console.log("STATUS = " + details.status)

                        // console.log(details)

                        // console.log("name: " + details.payer.name.given_name + " " + details.payer.name.surname );
                        // console.log("email: " + details.payer.email_address);
                        // console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.address_line_1));
                        // console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.address_line_2));
                        // console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.admin_area_2));
                        // console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.admin_area_1));
                        // console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.postal_code));
                        // console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.country_code));
                        //console.log("DATA", data)

                        //console.log("insiiiiiide1 " + results.inspect);

                        axios
                          .post(
                            "/send/letters",
                            {
                              data: {
                                ppResults: data,
                                infoOnReps: results,
                                buyerDetails: details,
                              },
                            },
                            { withCredentials: true }
                          )
                          .then((response) => {
                            //console.log("resoooooooooooooooonse = " + response.inspect)
                            //addAllCommentsToStateForReplyButtonToWork(response.data.comments)
                            //addAllCommentsToStateForShowMoreButtonToWork(response.data.comments)
                            //setArtData(response.data.article)
                            //setArtDataComments(response.data.comments)
                            //setIsCommentsLoading(false)
                            //setIsCommentsLoading(false)
                            //setCurrentUser(@current_user)
                          })
                          .catch((error) => {
                            //console.log("articleErrors", error)
                          });
                      });
                    }}
                  />
                </ShowOfferSection>
              </ShowOfferSectionWrapper>
            </OfferTwo> */}
					</TriplePlayWrapper>

					<ShowLetterDeadEnd resultFromFlorida={resultFromFlorida} showCards={showCards}>
						Unfortunately, emailing officials through FloridaBlaze is only available in Florida.
						<a href="#" onClick={resetSearch}>
							Try another search.
						</a>
					</ShowLetterDeadEnd>
				</ResultSection>
			</ActGrid>
		</ActWrapper>
	)
}

const Wtf = React.forwardRef(Act)
export default Wtf
