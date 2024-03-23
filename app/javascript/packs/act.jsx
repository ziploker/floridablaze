import React, { Component, useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import actBackground from "../../assets/images/actBackground.png";
import actBackgroundTest from "../../assets/images/actBackgroundTest.png";
import mega from "../../assets/images/megaFinal.png";
import cardTemplate from "../../assets/images/cardTemplate.png";
import sampleShot from "../../assets/images/sampleShot.png";
import samplepic from "../../assets/images/man6.png";
import samplepic2 from "../../assets/images/dummy_avatar.png";
// testing123123
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import styled, { keyframes } from "styled-components";
//import { RiMailSendLine } from "react-icons/ri";
//import { BsMailbox } from "react-icons/bs";
//import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
//import Script from "react-load-script";
import sendEmailsToReps from "../packs/communications/sendEmailToReps";
import $ from "jquery";
import ReCAPTCHA from "react-google-recaptcha";
import greenCheck from "../../assets/images/greenCheck.png";
import searchIcon from "../../assets/images/search.png";
import searchIconOrange from "../../assets/images/searchGreen.png";
import searchIconOrange2 from "../../assets/images/searchPink2.png";
import ResultCardOne from "./resultCardOne.jsx";
import Button_Loading from "./myComponents/button_loading";
import axios from "axios";

import usps from "../../assets/images/usps-logo.svg";
//var Spinner = require("react-spinkit");
//import Autocomplete from "react-google-autocomplete";
//import { usePlacesWidget } from "react-google-autocomplete";

import "../../assets/stylesheets/act-style1.scss";
import SearchLocationInput from "../packs/SearchLocationInput.js";

import orangeSearch from "../../assets/images/orangeSearch.png";
import orangeMailbox from "../../assets/images/orangeMailbox.png";
import orangeShare from "../../assets/images/orangeShare.png";

import mailIcon from "../../assets/images/Letterbox.png";

import rightArrow from "../../assets/images/scroll-arrow.png";
import gmail_icon from "../../assets/images/gmail_Icon.png";

/////////////////////////////////////////////////////////////

const formData = new FormData();

const ActWrapper = styled.div`
  width: 100%;
  @media only screen and (max-width: 786px) {
    //overflow: hidden;
    width: 100%;
  }
  /* background-image: linear-gradient(
    0deg,
    hsl(0deg 0% 0%) 0%,
    hsl(0deg 1% 16%) 4%,
    hsl(0deg 2% 33%) 10%,
    hsl(0deg 3% 48%) 19%,
    hsl(0deg 8% 64%) 32%,
    hsl(0deg 22% 79%) 53%,
    hsl(0deg 100% 93%) 100%
  ); */

  /* background: linear-gradient(
    0deg,
    hsl(0deg 0% 0%) 0%,
    hsl(0deg 0% 5%) 0%,
    hsl(0deg 1% 9%) 0%,
    hsl(0deg 1% 14%) 0%,
    hsl(0deg 1% 19%) 0%,
    hsl(0deg 2% 23%) 1%,
    hsl(0deg 2% 28%) 2%,
    hsl(0deg 2% 33%) 3%,
    hsl(0deg 3% 37%) 4%,
    hsl(0deg 3% 42%) 6%,
    hsl(0deg 3% 46%) 8%,
    hsl(0deg 4% 51%) 10%,
    hsl(0deg 5% 55%) 13%,
    hsl(0deg 6% 59%) 16%,
    hsl(0deg 8% 64%) 20%,
    hsl(0deg 11% 68%) 25%,
    hsl(0deg 14% 72%) 31%,
    hsl(0deg 19% 77%) 38%,
    hsl(0deg 26% 81%) 47%,
    hsl(0deg 36% 85%) 59%,
    hsl(0deg 56% 89%) 79%,
    hsl(0deg 100% 93%) 100%
  ); */
  ////background-color: black;
  //background-image: url(${actBackground});
  //background-position: 0 50%;
  //background-repeat: no-repeat;

  position: relative;
  //overflow: hidden;

  //padding-bottom: 60px;
`;

const BGimage = styled.img`
  //width: 100vw;
  //height: 100vh;
  //object-fit: cover;
  //grid-area: 1/1/-1/-1;
  //display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  bottom: 0;
  height: 100%;
`;
const BGimageFix = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 36px;
  border-top: 1px solid white;
  grid-area: bgfix;
  /* background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 9%,
    rgba(218, 218, 218, 1) 20%,
    rgba(148, 148, 148, 1) 28%,
    rgba(46, 46, 46, 0.9177870977492559) 42%,
    rgba(0, 0, 0, 0.6320728120349702) 50%,
    rgba(0, 0, 0, 0.44439774200695903) 60%,
    rgba(0, 0, 0, 0.013025192987351164) 82%
  ); */

  background: hsla(0, 0%, 0%, 1);

  background: linear-gradient(
    90deg,
    hsla(0, 0%, 0%, 1) 15%,
    hsla(0, 0%, 80%, 1) 67%,
    hsla(0, 0%, 89%, 1) 76%,
    hsla(0, 0%, 100%, 1) 92%
  );

  background: -moz-linear-gradient(
    90deg,
    hsla(0, 0%, 0%, 1) 15%,
    hsla(0, 0%, 80%, 1) 67%,
    hsla(0, 0%, 89%, 1) 76%,
    hsla(0, 0%, 100%, 1) 92%
  );

  background: -webkit-linear-gradient(
    90deg,
    hsla(0, 0%, 0%, 1) 15%,
    hsla(0, 0%, 80%, 1) 67%,
    hsla(0, 0%, 89%, 1) 76%,
    hsla(0, 0%, 100%, 1) 92%
  );

  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#000000", endColorstr="#CDCDCD", GradientType=1 );
`;

const BGimageFixBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 15px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 9%,
    rgba(218, 218, 218, 1) 20%,
    rgba(148, 148, 148, 1) 28%,
    rgba(46, 46, 46, 0.9177870977492559) 42%,
    rgba(0, 0, 0, 0.6320728120349702) 50%,
    rgba(0, 0, 0, 0.44439774200695903) 60%,
    rgba(0, 0, 0, 0.013025192987351164) 82%
  );
`;
const Mega = styled.img`
  @media only screen and (max-width: 786px) {
    grid-area: 1/1/-1/-1;
    display: none;
  }

  width: 65%;
  //height: 85%;
  display: ${(props) => (props.show_cards == "true" ? "none" : "inherit")};
  grid-area: 1/2/4/3;
  align-self: center;
  justify-self: end;
  //margin-top: -50px;
  margin-right: 40px;
  margin-top: -49px;
  //margin-bottom: 13px;
  //opacity: ${(props) => (props.showLetter ? "0" : "1")}; ;
  opacity: 1;
`;

const ActGrid = styled.div`
  width: 100%;

  position: relative;

  margin: 0 auto;

  justify-items: center;
`;

const ActSection = styled.section`
  @media only screen and (max-width: 786px) {
    //grid-template-columns: minmax(20px, 1fr) 1fr minmax(20px, 1fr);
    grid-template-columns: minmax(8px, 1fr) minmax(197px, 800px) minmax(
        8px,
        1fr
      );
    min-width: 100%;
    grid-column-gap: 0;
    //justify-self: center;
  }

  display: ${(props) => (props.show_cards == "true" ? "none" : "grid")};
  max-width: 1300px;
  margin: 0 auto;
  position: relative;
  //grid-template-columns: 43% 57%;
  /* grid-template-columns:
    
    minmax(80px, 1fr)
    minmax(250px, 350px) minmax(150px, 900px) minmax(80px, 1fr); */
  //grid-template-rows: minmax(40px, 50px) minmax(min-content, max-content) min-content min-content 1fr;
  grid-template-columns: 2% 2fr 4fr 2%;
  grid-column-gap: 0.5em;
  grid-area: 1/1/-1/-1;
  transition: opacity 0.4s;
  //padding-bottom: 40px;
  //margin-top: 30px;
  padding-top: 45px;
  z-index: ${(props) => (props.show_cards == "true" ? "0" : "10")};
`;

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
`;

const StepTwo = styled.div`
  width: 80px;
  height: 4px;
  background: ${(props) =>
    props.show_cards == "true" ? "#E3B55A" : "#605C55"};
  margin-left: 36px;
`;

const StepThree = styled.div`
  width: 80px;
  height: 4px;
  background: #605c55;
  margin-left: 36px;
`;

const ActHeaderWrapper = styled.div`
  display: grid;
  grid-area: 1/3/2/4;
  width: 100%;
  padding-left: 6%;

  @media only screen and (max-width: 786px) {
    justify-self: start;
    grid-area: 1/1/2/3;
    /* margin-top: 25px;
		margin-bottom: 16px; */
    margin: 20px 0 16px 0px;
  }
`;

const ActHeader = styled.h1`
  font-style: normal;
  font-weight: 800;
  // font-size: 8rem;
  align-self: end;
  line-height: 100%;
  //line-height: 100px;
  /* identical to box height */

  letter-spacing: 2px;
  justify-self: start;
  //color: #ffffff;

  //line-height: 100%;
  //margin: 0px 0px 0px 20px;
  //padding-top: 20px;
  //z-index: 1;

  opacity: ${(props) => (props.show_cards == "true" ? "0" : "1")};

  /* ACT NOW */

  font-style: normal;
  //width: 100%;
  letter-spacing: -0.05em;
  word-break: break-word;
  white-space: normal;
  overflow: visible;
`;

const ActSubheader = styled.h2`
  @media only screen and (max-width: 786px) {
    grid-area: 2/1/3/-1;
    //justify-self: center;
    //// font-size: 4vw;
  }

  font-style: normal;
  font-weight: 800;
  //// font-size: min(4vw, 36px);
  line-height: 59px;
  //max-width: 80%;
  //line-height: 100%;
  justify-self: start;
  align-self: start;
  color: #ffffff;
  //margin: 8px 0px 8px 20px;
  margin: -14px 14px 8px 5px;
  display: none;
  opacity: ${(props) => (props.show_cards == "true" ? "0" : "1")};
`;

const ActSubHeaders = styled.div`
  @media only screen and (max-width: 786px) {
    grid-area: 2/1/3/-1;
    //justify-self: center;
    //// font-size: 4vw;
  }
  grid-area: 2/3/3/4;

  display: grid;
  grid-gap: 10px;
  h2 {
    font-family: "Permanent Marker";
    color: red;
    padding-left: 6%;
    //// font-size: 2.6rem;

    @media only screen and (max-width: 786px) {
      //// font-size: 3.6rem;
    }
  }
`;

const ActBulletPointsWrapper = styled.div`
  grid-area: 2/3/3/4;
  //margin-top: 20px;
  //margin-bottom: 16px;
  padding: 0 0 0 6%;
  width: 100%;
  //margin: 15px 0 15px 0px;
  margin-bottom: 10px;
  display: grid;
  grid-gap: 10px;

  @media only screen and (max-width: 786px) {
    justify-self: center;
    grid-area: 2/1/3/3;
  }
`;

const ActBulletWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(75px, min-content) 1fr;
  //margin-bottom: 20px;

  @media only screen and (max-width: 1300px) {
    grid-template-columns: minmax(50px, min-content) 1fr;
  }
`;

const BulletImage = styled.img`
  width: 30px;
  align-self: end;
`;

const BulletOne = styled.p`
  color: white;
  //padding-left: 30px;
  align-self: end;

  /* Lookup your State Representatives. */

  font-style: normal;
  font-weight: 500;

  letter-spacing: 0.02em;
  span {
    color: #e3b55a;
    /* Lookup your State Representatives. */
    letter-spacing: 0.09em;
  }

  @media only screen and (max-width: 1300px) {
    // font-size: 1.7rem;
  }
`;

const Form = styled.div`
  @media only screen and (max-width: 786px) {
    grid-area: 3/1/4/-1;
    padding: 0 6%;
    justify-self: center;
  }
  //background: #ff000047;
  padding: 0 10% 0 6%;
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
  margin-top: 25px;
  transition: opacity 0.4s;

  //max-width: 481px;
  //box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  //margin-top: 72px;

  grid-area: 3/3/4/-1;
  //padding: 0px 20px;
  border-radius: 5px;

  opacity: ${(props) => (props.show_cards == "true" ? "0" : "1")};
  //pointer-events: none;
`;

const MainAddressInput = styled.input`
  grid-area: input;
  height: 60px;
  width: 100%;
  padding: 0.2em 0;
  //text-shadow: 0 1px 1px hsl(0 0% 0% / 20%);
  background: #ff000047;
`;

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
  filter: ${(props) =>
    props.searchButtonActive ? "grayscale(0%)" : "grayscale(80%)"};

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
`;

const FindMyRep = styled.button`
  @media only screen and (max-width: 786px) {
    grid-area: 5/1/6/-1;
    justify-self: start;
    //// font-size: 2vw;
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

  opacity: ${(props) => (props.show_cards == "true" ? "0" : "1")};
`;

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

  opacity: ${(props) =>
    props.show_cards == "true" && props.result_from_florida == "true"
      ? "1"
      : "0"};
  z-index: ${(props) =>
    props.show_cards == "true" && props.result_from_florida == "true"
      ? "10"
      : "-5"};
  //background: linear-gradient(to bottom, #5FCC61, #318e33);
  //z-index: 1;
  cursor: pointer;
`;

const ShowLetterDeadEnd = styled.div`
  display: ${(props) =>
    props.show_cards == "true" && props.result_from_florida == "true"
      ? "none"
      : "initial"};
  opacity: ${(props) =>
    props.show_cards == "true" && props.result_from_florida == "true"
      ? "0"
      : "1"};
  z-index: ${(props) =>
    props.show_cards == "true" && props.result_from_florida == "true"
      ? "-5"
      : "10"};
  grid-area: 5/2/6/5;
  color: white;
  padding: 16px 0px 0px 0px;
  margin: 0 auto;
  justify-self: center;
  align-self: center;
  text-align: left;

  a {
    color: #e7c991;
    // font-size: 0.8rem;

    &:hover {
      color: #ca9a41;
    }
  }
`;

const CardOneInfo = styled.div``;

const CardTwoInfo = styled.div``;

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
`;

const StatusBar = styled.div`
  max-height: 100%;
  opacity: 1;
  transition: opacity 0.4s;
  transition-timing-function: ease-in;
  line-height: 27px;
  margin-left: 10px;
`;

const StatusSpinner = styled.div`
  max-height: ${(props) =>
    props.show_status_spinner == "true" ? "100%" : "0px"};
  opacity: ${(props) => (props.show_status_spinner == "true" ? "1" : "0")};
  transition: opacity 0.4s;
  transition-timing-function: ease-out;
`;

const CheckMark = styled.img`
  max-height: ${(props) =>
    props.showStatusCheck.toString() == "true" ? "100%" : "0px"};
  opacity: ${(props) =>
    props.showStatusCheck.toString() == "true" ? "1" : "0"};
  transition: opacity 0.4s;
  transition-timing-function: ease-out;
  padding-left: 6px;
  height: 11px;
`;

const ResultSpan = styled.div`
  &:hover {
    background-color: #56c5cc;
    //color: red;
    //// font-size: 3rem;
  }
`;

const Span = styled.span`
  display: ${(props) =>
    props.status == "Search Complete!!" ? "none" : "Block"};
  height: 100%;
  // font-size: 0.75rem;
  transition: opacity 2s ease-in;
  opacity: ${(props) =>
    props.status.toString() == "Enter an address." ? "0" : "1"};
  color: black;
`;
const ResultSection = styled.div`
  width: 100%;
  grid-template-columns: 2fr 1.75fr;
  grid-template-areas:
    "  top top"
    " bottom offering ";

  grid-template-rows:
    minmax(min-content, max-content)
    minmax(min-content, max-content);
  @media only screen and (max-width: 786px) {
    grid-template-columns: 1fr;

    grid-template-areas:
      " top  "
      " bottom "
      " offering ";

    //grid-area: x cardOne x cardTwo infoBox x;

    //max-width: 70vw;
    ///}
  }

  display: grid;
  transition: opacity 0.4s;
  //transition: opacity 2s linear;
  transform: ${(props) =>
    props.show_cards == "true"
      ? "translate(0)"
      : "transform:translate(9999px)"};
  opacity: ${(props) => (props.show_cards == "true" ? "1" : "0")};
  z-index: ${(props) => (props.show_cards == "true" ? "10" : "-5")};

  padding: 0px 0px 20px 0px;

  height: ${(props) => (props.show_cards == "true" ? "inherit" : "0px")};

  //margin: 0px 10px;
`;

const NextSteps = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content 1fr;
  min-width: 243px;
  margin: 0 0 0 20px;
  grid-area: nextSteps;
  //width: 95%;

  h1 {
    //margin: -5px 0 0 0;
    padding: 0;
    color: white;
    //letter-spacing: 0.06em;
    font-weight: 800;
    font-size: 3rem;
    //margin: 0 0 20px 0;
    margin-top: -10px;

    @media only screen and (max-width: 786px) {
      justify-self: center;
      //// font-size: 7rem;
    }
  }

  h2 {
    // font-size: 5vw;
    color: white;
    //letter-spacing: 0.15em;
    //margin: 0 0 0 18px;
    color: orange;
    margin-bottom: 8px;

    @media only screen and (max-width: 786px) {
      justify-self: center;
      text-align: center;
      //// font-size: 3rem;
    }
  }

  /* p {
    padding: 0;
    color: white;
    // font-size: 2rem;
    margin: 0;
  } */

  //h2 {
  /* // font-size: 2rem;
			color: white;

			margin-bottom: 16px; */
  //}

  @media only screen and (max-width: 786px) {
    margin: 50px 0 0 0;
    width: 100%;
  }
`;

const LinerVertical = styled.div`
  position: absolute;
  width: 3px;
  height: 109px;
  top: 0px;
  right: 0px;
  background: hsl(38.57142857142857, 100%, 13.725490196078432%);

  @media only screen and (max-width: 786px) {
    display: none;
  }
`;

const LinerHorizontal = styled.div`
  position: absolute;
  width: 240px;
  height: 3px;
  top: 0px;
  right: 0px;
  background: hsl(38.57142857142857, 100%, 13.725490196078432%);

  @media only screen and (max-width: 786px) {
    display: none;
  }
`;

const ResultSectionInfoBox = styled.div`
  display: grid;

  grid-template-columns: auto min-content auto;
  //grid-template-rows: 1fr min-content 1fr;
  //grid-area: 1/2/2/6;
  grid-area: 1/1/2/-1;
  //height: 200px;
`;

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

  @media only screen and (max-width: 786px) {
    justify-self: center;
  }
`;

const ProgressBarzResultSection = styled.div`
  display: flex;
  grid-area: 1/1/2/-1;
  //margin: 27px 0px 18px 20px;
  margin: 30px 0px 30px 20px;

  padding-left: 2px;
  justify-self: center;
`;

const ResultCompleteTitle = styled.h1`
  justify-self: center;
  color: #ffffff;
  grid-area: 2/1/3/-1;
  // font-size: 3.5rem;
`;

const ResultSectionBulletPointWrapperSet = styled.div`
  grid-area: 3/2/6/3;
  display: grid;
  grid-template-columns: min-content 1fr min-content;
`;

const ResultSectionBulletPointWrapper = styled.div`
  grid-area: ${(props) => props.gridArea};

  display: grid;
  grid-template-columns: minmax(min-content, max-content) 1fr;

  justify-self: start;
`;

const ResultSectionBulletPoint = styled.div`
  height: 10px;
  width: 10px;
  background-color: ${(props) => (props.open ? "black" : "#E3B55A")};
  border: 1.5px solid #e3b55a;

  border-radius: 50%;
  display: inline-block;
  justify-self: center;
  align-self: center;
`;

const ResultSectionBulletPointTitle = styled.h2`
  justify-self: center;
  align-self: center;
  color: #ffffff;
  margin-left: 15px;
  // font-size: 0.8rem;
  white-space: nowrap;
`;

const ResultSectionSpacerLine = styled.div`
  height: 1px;
  //width: 100vw;
  background: #e3b55a;
  opacity: 0.4;
  grid-area: 2/1/3/-1;
  margin: 25px 0 0px 0;
`;

const ResultSectionHeaders = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  // font-size: 1rem;
  min-width: 222px;
  margin: 25px 0px 25px 0px;
  padding: 4px 16px;
  //font-style: normal;
  //font-weight: 500;
  //// font-size: 8vw;
  //// font-size: clamp(1rem, -0.875rem + 8.333333vw, 3.5rem);

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
`;

const ResultSectionHeadersAlt = styled.div`
  display: ${(props) =>
    props.show_cards == "true" && props.result_from_florida == "true"
      ? "flex"
      : "none"};

  /* justify-content: center;
  align-items: center;
  text-align: center;
  // font-size: 1rem;
  min-width: 222px;
  margin: 25px 0px 25px 0px;
  padding: 4px 16px;
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
`;

const ResultSectionSubHeader = styled.h2`
  font-style: normal;
  font-weight: 600;
  // font-size: clamp(12px, 1.5vw, 60px);
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
`;

const CardOne = styled.div`
  //display: grid;
  position: relative;
  //grid-template-columns: 85% 15%;
  //grid-template-rows: 73% 17% 10%;
  //margin-top: 25px;
  //opacity: 0.2;
  grid-area: cardOne;

  width: 100%;

  justify-self: end;
  height: 0px;

  padding-top: calc(310 / 220 * 100%);
`;

const CardOneWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 85% 15%;
  grid-template-rows: 73% 17% 10%;

  //border-radius: 16.4px;
`;

const CardOneSub = styled.div`
  position: absolute;
  font-weight: bold;
  left: 3px;
  top: 3px;
  right: 3px;
  //width: 100%;
  //opacity: .8;
  color: black;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background: white;
  // font-size: 0.8rem;
  text-align: center;
  padding: 3px 0px;

  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;

  @media only screen and (min-width: 787px) {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  @media only screen and (max-width: 786px) {
    //// font-size: 1.7rem;
  }
`;

const CardTwoSub = styled(CardOneSub)``;

const CardTwo = styled.div`
  position: relative;

  //margin-top: 25px;
  grid-area: cardTwo;
  //opacity: 0.2;
  justify-self: end;
  height: 0px;
  padding-top: calc(310 / 220 * 100%);
  width: 100%;
`;

const CardTwoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 85% 15%;
  grid-template-rows: 73% 17% 10%;

  //border-radius: 16.4px;
`;

const CardTemplate = styled.img`
  grid-area: 1/1/-1/-1;
  width: 100%;
  height: 100%;
  //opacity: .8;
`;

const CardPicture = styled.img`
  grid-area: 1/1/-1/-1;

  width: 98%;
  height: 98%;
  border-radius: 16px;
  border: 1px solid white;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${samplepic});
  justify-self: center;
  align-self: center;
`;

const CardNameOfRep = styled.h1`
  color: black;
  font-size: 1rem;
  line-height: 0.9em;
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

  @media only screen and (max-width: 786px) {
    //border-top-left-radius: 13px;
    //border-top-right-radius: 13px;
    //// font-size: 3vw;
  }

  @media only screen and (max-width: 786px) {
    // font-size: 10px;
  }
`;

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
`;

const ShowOfferSection = styled.div`
  display: ${(props) => (props.show_cards == "true" ? "WTF" : "none")};
  margin: 0px auto 0 auto;
  width: 55%;
  max-width: 1000px;
  float: left;

  @media only screen and (max-width: 786px) {
    width: 100%;
    margin: 30px auto 0 auto;
  }
`;

const ResultsBlurb = styled.div`
  grid-area: resultBlurb;
  //margin: 25px;
  border: 1px orange solid;
  border-radius: 13px;
  padding: 30px;
  margin-top: 24px;

  @media only screen and (max-width: 786px) {
    grid-area: resultBlurb;
    margin: 10px 16px 0px 16px;
  }
`;

const TriplePlayWrapper = styled.div`
  display: ${(props) =>
    props.show_cards == "true" && props.result_from_florida == "true"
      ? "grid"
      : "none"};

  grid-area: bottom;
  width: 100%;
  margin-top: 30px;
`;

const Letter = styled.div`
  width: 99%;

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
  @media only screen and (max-width: 786px) {
    width: 100%;
  }
`;

const OfferOne = styled.div`
  @media only screen and (max-width: 786px) {
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
    font-style: normal;
    font-weight: 400;
    margin: 25px 0 0 0;
    // font-size: 2.8rem;
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
    // font-size: 0.6rem;
  }
`;

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
  grid-area: offering;
  width: 100%;
  //display: inline-block;
  //width: 100vw;
  /* position: absolute;
  left: 42%;
  top: 69%; */
  max-width: 800px;
  justify-self: start;
  display: ${(props) => (props.which_tab_is_active === 2 ? "none" : "grid")};
  //display: grid;
  margin-top: 30px;

  @media only screen and (max-width: 786px) {
    max-width: initial;
  }
`;

const EmailOfferWrapper = styled.div`
  grid-area: offering;
  width: 100%;

  max-width: 800px;
  justify-self: center;
  display: ${(props) => (props.which_tab_is_active === 1 ? "none" : "grid")};
  margin-top: 30px;
`;
const LetterOffer = styled.div`
  justify-self: center;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  //border: 1px solid orange;
  grid-template-areas: " strip";
  //background-color: white;
`;

const EmailOffer = styled.div`
  justify-self: center;
  display: grid;
  width: 100%;
  grid-template-columns: 1px 1fr 1px;
  //border: 1px solid orange;
  grid-template-areas: " . strip .";
  //background-color: white;
`;
const Strip = styled.div`
  grid-area: strip;
  /* background-color: #eee4e4; */
  background-color: white;
  //margin: 30px 0;
  border-radius: 18px;
  width: 100%;
  max-width: 600px;
  justify-self: center;

  h4 {
    margin: 0 auto;
    height: 20px;
    padding: 10px 5px;
    margin-bottom: 15px;
    text-align: center;
  }
`;

const Total = styled.h2`
  color: gray;
  // font-size: 2rem;
  //justify-self: center;

  margin: 25px 0 24px 0;

  @media only screen and (max-width: 786px) {
    margin: 62px 0 24px 50px;
    //// font-size: 5rem;
  }

  //margin-left: 6%;
`;

const Price = styled.h1`
  font-weight: 400;
  // font-size: 2.5rem;
  //justify-self: center;

  margin: 0 0 20px 0;

  @media only screen and (max-width: 786px) {
    margin: 0 0 46px 48px;
    //// font-size: 7rem;
  }
`;

const Row1 = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  cursor: pointer;

  //margin: 0 10px 20px 10px;
`;

const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  cursor: pointer;

  //margin: 0 10px 20px 10px;
`;

const CheckmarkMainWrapper = styled.div`
  width: 200px;
  //justify-self: center;
  margin-top: 17ypx;
  //margin-left: 6%;
`;

const PicWrapper = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${samplepic2});
  border-radius: 50px;
  width: 100px;
  height: 120px;
  display: grid;
`;

const Pic1 = styled.img`
  border-radius: 15px;

  //border: 2px solid white;
  /* border: ${(props) =>
    props.which_email_is_active == 1
      ? "7px orange solid"
      : "7px white solid"}; */
  border: ${(props) =>
    props.which_email_is_active == 1 ? "7px orange solid" : "7px white solid"};
  width: 100px;
  height: 120px;
`;

const HowItWorksWrapper = styled.div`
  border-top: 1px #e3b55a solid;
  //border-bottom: 1px #e3b55a solid;

  display: grid;
  //max-width: 578px;
  @media only screen and (max-width: 786px) {
    justify-self: center;
    margin-top: 12px;
    max-width: 95%;
    border-top: initial;
    border-bottom: initial;
    padding: 0 47px;
  }
  p {
    color: white;
    line-height: 1.6rem;
    font-size: 2.5rem;
    font-family: Fira Sans;
    align-self: start;
    justify-self: start;
    //padding: 0 8px;
    margin-top: 10px;

    @media only screen and (max-width: 786px) {
      //// font-size: 4rem;
      line-height: initial;
      justify-self: center;
      margin-top: 40px;
    }
  }
`;

const Pic2 = styled.img`
  border-radius: 15px;

  //border: 2px solid white;
  /* border: ${(props) =>
    props.which_email_is_active == 2
      ? "7px orange solid"
      : "7px white solid"}; */
  border: ${(props) =>
    props.which_email_is_active == 2 ? "7px orange solid" : "7px white solid"};

  width: 100px;
  height: 120px;
`;

const Description1 = styled.div`
  margin-left: 6px;
  align-self: center;
  //// font-size: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  //grid-template-rows: 1fr 1fr;
`;

const DWrapper = styled.div`
  align-self: end;
  //padding: 0px 8px 0px 2px;
`;

const D1 = styled.h2`
  display: inline-block;
  // font-size: 1.5rem;
  //padding: 28px 30px 25px 0;
  margin: 0;
  color: #424242;
  border-top-right-radius: 91px;
  //border-top-left-radius: 55px;
  border-bottom-right-radius: 91px;
`;

const D2 = styled.h3`
  //display: inline-block;
  //padding: 0px 8px 0px 2px;
  //border-top-right-radius: 91px;
  // font-size: 1rem;
  //border-top-left-radius: 55px;
  //border-bottom-right-radius: 91px;
  align-self: top;
  margin-top: 10px;
`;

const Description2 = styled.div`
  margin-left: 6px;
  align-self: center;
  //// font-size: 1.5em;
`;

const CheckmarkRow = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
`;

const CheckMarkParagraph = styled.p`
  // font-size: 0.6rem;
  //margin-left: 13px;
  margin-top: 3px;
`;

const GreenCheckmarkWrapper = styled.div`
  width: 18px;
  height: 18px;
  background: green;
  border-radius: 50px;
  //margin-left: 13px;
  position: relative;
  align-self: center;
`;

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
`;

const CheckmarkDescription = styled.h1`
  // font-size: 0.8rem;
  margin-left: 5px;
  color: gray;
`;

const Price1 = styled.div``;

const OfferTwo = styled.div`
  @media only screen and (max-width: 786px) {
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
    font-style: normal;
    font-weight: 400;
    margin: 25px 0 0 0;
    // font-size: 2.8rem;
  }

  h2 {
    grid-area: 5/1/6/3;
    justify-self: center;
    align-self: center;
    //margin: 40px;
  }
`;

const BulletPointText = styled.h3`
  grid-area: 3/2/4/3;
  // font-size: 0.8rem;
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
`;

const BulletPointText2 = styled.h3`
  grid-area: 4/2/5/3;
  // font-size: 0.8rem;
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
`;

const SendButtonWrapper = styled.div`
  grid-area: 7/1/8/3;
  align-self: center;
  justify-self: center;
  //margin-right: 15px;
  position: relative;
  width: 95%;
  height: 55px;
  margin: 0 auto 10px auto;
  border-radius: 28px;
`;

const SendButtonV2 = styled.button`
  display: inline-block;
  border: 0;
  outline: 0;
  padding: 12px 16px;
  line-height: 1.4;
  background: linear-gradient(#4d4d4d, #2f2f2f);
  border-radius: 5px;
  border: 1px solid black;
  color: white !important;
  // font-size: 1.2rem;
  cursor: pointer;
  /* Important part */
  position: relative;
  transition: padding-right 0.3s ease-out;
  padding-right: 40px;
`;

const FlashError = styled.h4`
  @media only screen and (max-width: 400px) {
    grid-area: 8/2/9/5;
    justify-self: center;
    margin-top: 8px;
  }

  // font-size: 0.5rem;
  //position: absolute;
  //bottom: 10px;
  //right: 50%;
  //transform: translateX(-50%);
  grid-area: 7/4/8/5;
  justify-self: end;
  margin-right: 15px;
  display: ${(props) =>
    props.userState.loggedInStatus == "NOT_LOGGED_IN" ? "initial" : "none"};

  a {
    color: blue;

    &:hover {
      color: orange;
    }
  }
`;

const FlashSuccess = styled.h4`
  @media only screen and (max-width: 400px) {
    grid-area: 8/2/9/5;
    justify-self: center;
    margin-top: 8px;
  }
  // font-size: 0.5rem;
  //position: absolute;
  //right: 60px;
  //top: 50%;
  //transform: translateY(-50%);
  grid-area: 7/4/8/5;
  margin-right: 15px;
  justify-self: end;
  display: ${(props) => (props.successFlag ? "initial" : "none")};
`;

const ButtonTabsWrapper = styled.div`
  grid-area: 1/1/2/2;

  display: grid;
  grid-template-columns: max-content max-content min-content max-content;
  grid-template-areas: "question usps or email";

  //height: 60px;
`;

const ButtonsHeader = styled.h1`
  grid-area: question;
  font-family: Fira Sans;
  // font-size: 2rem;
  justify-self: start;
  align-self: center;
`;

const DemoIndicatorDotsWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: grid;
`;

const DemoIndicatorDots = styled.div`
  display: grid;
  grid-area: dots;
  grid-template-columns: min-content 12px 12px max-content min-content;
  grid-template-areas: ". dot1 dot2 info";

  justify-self: start;
  align-self: center;
`;

const DotSpan = styled.span`
  grid-area: info;
  align-self: center;
  justify-self: start;
  margin-left: 8px;
  // font-size: 0.9rem;
`;

const Dot1 = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  grid-area: dot1;
  background-color: ${(props) =>
    props.which_email_is_active == 1 ? "black" : "white"};
  //background-color: white;

  border: 1px solid black;
  box-sizing: border-box;
  transition: transform 0.5s ease;
  align-self: center;
  justify-self: center;
`;
const Dot2 = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  grid-area: dot2;
  background-color: ${(props) =>
    props.which_email_is_active == 2 ? "black" : "white"};
  //background-color: white;
  border: 1px solid black;
  box-sizing: border-box;
  transition: transform 0.5s ease;
  align-self: center;
  justify-self: center;
`;
const Or = styled.h3`
  grid-area: or;
  font-family: Permanent Marker, Fira Sans;
  align-self: center;
  justify-self: center;
  // font-size: 2rem;
`;
const ButtonOneTabWrapper = styled.div`
  display: grid;
  grid-area: usps;
  //border-top-left-radius: 13px;
  //border-right: 1px solid #77767657;
  /* border-bottom: ${(props) =>
    props.which_tab_is_active === 1 ? "none" : "1px solid #77767657"}; */

  //grid-template-columns: 1fr 1fr;
  justify-self: end;
`;

const ButtonGuts = styled.div`
  display: grid;
  display: inline-block;
  width: 100%;
  justify-self: center;
`;
const MailIcon = styled.img`
  //justify-self: end;
  padding: 10px 0;
  align-self: center;
  width: 24px;
  opacity: ${(props) => (props.which_tab_is_active == 1 ? "1" : ".3")};
  height: 100%;
  vertical-align: middle;
  display: inline-block;
`;

const ButtonTabOne = styled.div`
  overflow: hidden;
  //border: 1px solid #ccc;
  height: 100%;
  width: 100%;
  vertical-align: middle;
  display: inline-block;
  //float: left;
  outline: none;
  align-self: center;
  //padding: 6px 16px;
  //transition: 0.3s;
  // font-size: 1.3rem;
  display: grid;
  opacity: ${(props) => (props.which_tab_is_active == 1 ? "1" : ".3")};
  font-weight: ${(props) =>
    props.which_tab_is_active == 1 ? "600" : "initial"};
  //border-top-left-radius: 13px;

  //background-color: #ccc;
`;

const USPS = styled.img`
  width: 100%;
  max-width: 350px;
  justify-self: center;
  align-self: center;
  padding: 12px 24px;
  //border: 1px solid black;

  cursor: pointer;
  background-color: ${(props) =>
    props.which_tab_is_active === 1 ? "#fcfcfc" : "#ddd"};
  &:hover {
    background-color: ${(props) =>
      props.which_tab_is_active === 1 ? "#fcfcfc" : "#e9e9e9"};
  }
`;

const ButtonTwoTabWrapper = styled.div`
  display: grid;
  //border-top-right-radius: 13px;
  justify-self: start;
  grid-area: email;
  //border-left: 1px solid #77767657;
  /* border-bottom: ${(props) =>
    props.which_tab_is_active === 2 ? "none" : "1px solid #77767657"}; */
`;

const ButtonTabTwo = styled.div`
  overflow: hidden;
  //border: 1px solid #ccc;
  width: 100%;
  display: grid;
  //float: left;
  border: none;
  outline: none;
  cursor: pointer;
  //padding: 6px 16px;
  //transition: 0.3s;
  align-self: center;
  justify-self: center;
  opacity: ${(props) => (props.which_tab_is_active == 2 ? "1" : ".3")};
  font-weight: ${(props) =>
    props.which_tab_is_active == 2 ? "600" : "initial"};

  //// font-size: 1.3rem;
  //border-bottom-right-radius: 13px;

  //background-color: #ccc;
`;

const GmailIcon = styled.img`
  justify-self: center;
  align-self: center;
  max-width: 115px;
  width: 100%;
  padding: 12px 24px;
  //border: 1px solid black;
  cursor: pointer;
  background-color: ${(props) =>
    props.which_tab_is_active === 2 ? "#fcfcfc" : "#ddd"};
  &:hover {
    background-color: ${(props) =>
      props.which_tab_is_active === 2 ? "#fcfcfc" : "#e9e9e9"};
  }
`;

const DemoWrapper = styled.div`
  padding: 45px 120px;

  p {
    // font-size: 1.5rem;
  }
`;

const LetterDemoWrapper = styled.div`
  //padding: 45px 120px;
  display: ${(props) => (props.which_tab_is_active == 1 ? "grid" : "none")};
  //grid-gap: 20px;
  //grid-template-columns: 1fr 3fr 20px min-content 1fr;
  grid-template-columns: 1fr;

  grid-template-rows: 22px auto;
  grid-template-areas:
    "dots"
    "center"
    "offer";

  margin: 15px auto;
`;

const LetterDemoCenter = styled.div`
  position: relative;
  display: grid;
  grid-area: center;
`;

const EmailDemoWrapper = styled.div`
  //padding: 45px 120px;
  display: ${(props) => (props.which_tab_is_active == 1 ? "none" : "grid")};

  /* grid-template-columns: 10% 2.5fr 20px 1fr 10%;
	grid-template-rows: 22px auto;
	grid-template-areas:
		".  dots   dots dots  ."
		". center  . offer .";
	margin: 15px auto; */

  grid-template-columns: 1fr;

  grid-template-rows: 22px auto;
  grid-template-areas:
    "dots"
    "center"
    "offer";

  margin: 15px auto;

  /* @media only screen and (max-width: 685px) {
    grid-template-columns: 1% 2.5fr 20px 1fr 1%;
  } */
`;

const EmailDemoCenter = styled.div`
  position: relative;
  display: grid;
  grid-area: center;
`;

// const EmailDemoRight = styled.div`
//   justify-self: center;
//   align-self: center;
//   display: grid;
//   margin-left: 8px;
// `;

const RightArrow = styled.img`
  width: 15px;
  cursor: pointer;
  justify-self: center;
  align-self: center;
`;

const LeftArrow = styled.img`
  //max-width: 60px;
  //margin-top: 69px;
  width: 15px;
  cursor: pointer;
  justify-self: center;
  align-self: center;

  transform: scaleX(-1);
`;

const SubjectBox = styled.div`
  /* width: 96%; */
  //margin-top: 69px;
  justify-self: center;
  border: 1px solid orange;
  position: relative;
  //height: 60px;
  //margin: 45px 0px 0px 0px;
  display: grid;
  grid-template-columns: 1fr 13fr;
  grid-template-areas: " . subject";
  h2 {
    position: absolute;
    // font-size: 0.6rem;
    background-color: white;
    left: 40px;
    top: -17px;
    padding: 3px 6px;
  }

  h3 {
    line-height: 40px;

    //padding-left: 15px;
    //font-weight: initial;

    grid-area: subject;

    justify-self: start;
    align-self: center;
    // font-size: 1.2rem;
    font-weight: 500;
  }
`;

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
    // font-size: 0.6rem;
    background-color: white;
    left: 10px;
    top: -10px;
    padding: 3px 6px;
  }

  h1 {
    justify-self: start;
    //// font-size: .8rem;
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
    //// font-size: .8rem;
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
    //// font-size: .8rem;
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
    // font-size: 0.8rem;
    font-weight: initial;
    margin-top: 30px;
    grid-area: 2/1/3/2;
    margin-left: 16px;
  }

  p {
    // font-size: 1.5rem;
    font-weight: 300;
    margin-top: 15px;
    /* grid-area: 5/2/6/5; */
    //grid-area: 3/1/4/2;
    padding: 0px 15px;
    line-height: 1.8em;
  }
`;

const HowItWorksList = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  // font-size: 1.2rem;
  margin-top: -15px;

  @media only screen and (max-width: 786px) {
    //// font-size: 1.8rem;
    margin-top: 25px;
    justify-self: start;
    //padding: 20px 50px;
    text-align: center;
    //border: 1px solid white;
  }

  p {
    // font-size: 4vw;
    line-height: 1rem;
    margin-top: -7px;
    font-size: 1.6rem;
    @media only screen and (max-width: 786px) {
      margin-top: initial;
      margin-bottom: 45px;
      //// font-size: 3rem;
      line-height: initial;
      //text-align: center;
    }
  }

  p:nth-child(3) {
    font-size: 3rem;
    margin-top: 5px;

    @media only screen and (max-width: 786px) {
      //// font-size: 4rem;
    }
  }
`;

const LetterDemo = styled.div`
  //width: 96%;
  justify-self: center;
  border: 1px solid orange;
  position: relative;
  margin: 0 20px;
  border-bottom-left-radius: 13px;
  border-bottom-right-radius: 13px;
  font-size: 1.1rem;

  h3 {
    font-size: 1.1rem;
    font-weight: regular;
    padding: 0 20px;
  }
  h2 {
    position: absolute;
    // font-size: 0.6rem;
    background-color: white;
    left: 10px;
    top: -10px;
    padding: 3px 6px;
  }

  h1 {
    justify-self: start;
    //// font-size: .8rem;
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
    //// font-size: .8rem;
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
    //// font-size: .8rem;
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
    // font-size: 1.6rem;
    font-weight: bold;

    grid-area: 2/1/3/2;

    margin: 30px 0 25px 50px;
  }

  p {
    font-weight: 300;
    margin-top: 20px;
    /* grid-area: 5/2/6/5; */
    //grid-area: 3/1/4/2;
    padding: 0px 20px;
    line-height: 25px;

    @media only screen and (max-width: 786px) {
      //// font-size: 2.5rem;
      line-height: initial;
    }
  }
`;

const LetterClosing = styled.div`
  display: grid;
  grid-gap: 4px;
  //margin-top: 20px;
  // margin-bottom: 42px;
  padding: 25px 0;
  p {
    margin: 0px;
  }

  h3 {
    @media only screen and (max-width: 786px) {
      //// font-size: 1.5rem;
    }
  }
`;

const EmailDemo = styled.div`
  //width: 96%;
  justify-self: center;
  //border: 1px solid orange;
  position: relative;
  margin: 0 20px;
  border-bottom-left-radius: 13px;
  border-bottom-right-radius: 13px;

  h2 {
    position: absolute;
    // font-size: 1rem;
    background-color: white;
    left: 40px;
    top: -15px;
    padding: 3px 6px;
    font-weight: 800;
  }

  h1 {
    justify-self: start;
    //// font-size: .8rem;
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
    //// font-size: .8rem;
    font-weight: 800;
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
    //// font-size: .8rem;
    font-weight: 300;
    //grid-area: 1/4/4/5;
    //z-index: 1;
    //line-height: 30px;
    //display: inline-block;
    justify-self: center;
    text-align: center;
  }

  p {
    font-weight: 300;
    margin-top: 20px;
    /* grid-area: 5/2/6/5; */
    //grid-area: 3/1/4/2;
    padding: 0px 50px;
    line-height: 25px;
  }

  div {
    //// font-size: 0.9rem;
    //font-weight: 300;
    //min-height: 100px;
    //margin-bottom: 25px;
  }

  .closing {
    /* // font-size: 1.5rem;
		padding: 30px 50px;
		justify-self: start;
		//grid-area: 6/2/7/5;
		/* grid-area: 1/1/2/2 */
  }
`;

const TopBar = styled.div`
  //width: 500px;
  //height: 300px;
  //border: 1px solid orange;
  grid-area: topbar;
  justify-self: start;
  margin: 48px 0px 48px 120px;
  @media only screen and (max-width: 786px) {
    margin: 48px 0px 48px 20px;
  }

  h1 {
    color: black;
    margin: 0 0 15px 0;
    font-weight: 600;
    letter-spacing: 0.03em;
    font-size: 3rem;

    @media only screen and (max-width: 786px) {
      //// font-size: 3.5em;
      margin: 0 0 -5px 0;
    }
  }

  h2 {
    //// font-size: 1rem;
    color: white;
    margin: 0 0 3px 0;
    font-weight: 400;
    //letter-spacing: 0.1em;
    // font-size: 1.8rem;
    @media only screen and (max-width: 786px) {
      //// font-size: 2.2em;
    }
  }

  div {
    //display: grid;
    //grid-template-columns: max-content max-content;
    //grid-template-rows: min-content;
    h3 {
      color: #b4b2b2;
      letter-spacing: 0.03em;
      align-self: end;
      // font-size: 1.5em;
      @media only screen and (max-width: 786px) {
        //// font-size: 2.2em;
      }
    }
    h5 {
      //margin: 0 0 4px 20px;
      align-self: end;
      justify-self: start;
      // font-size: 1rem;
      color: #cab184;
      cursor: pointer;
      color: orange;
      margin-top: 5px;
      &:hover {
        color: #f1ba52;
      }

      @media only screen and (max-width: 786px) {
        //// font-size: 1.3rem;
      }
    }
  }
`;

const BottomBar = styled.div`
  background: black;
  grid-area: bottombar;
  padding: 50px 0px 20px 30px;
  display: grid;
  grid-template-columns:
    1fr minmax(120px, 180px) minmax(10px, 12px)
    minmax(120px, 180px) minmax(min-content, max-content) 1fr;

  grid-template-areas: " . cardOne . cardTwo nextSteps .";

  @media only screen and (max-width: 786px) {
    padding: 50px 10px 20px 10px;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;
    grid-template-areas:
      " cardOne cardTwo"
      "nextSteps nextSteps";
  }
`;
const MiddleBarResultSection = styled.div`
  display: grid;
  position: relative;
  grid-area: top;
  justify-self: center;
  width: 100%;
  margin-bottom: 30px;
  grid-template-columns:
    minmax(120px, 230px) minmax(10px, 12px)
    minmax(120px, 230px) 1fr;

  grid-template-areas:
    "topbar topbar topbar topbar"
    "bgfix bgfix bgfix bgfix"
    "bottombar bottombar bottombar bottombar";

  @media only screen and (max-width: 786px) {
    margin: 0 auto;
    grid-template-columns:
      1fr minmax(10px, 12px)
      1fr;

    grid-template-areas:
      "topbar topbar topbar"
      "bgfix bgfix bgfix"
      "bottombar bottombar bottombar";
  }
`;

var selectFirstOnEnter = (input) => {
  // store the original event binding function
  var _addEventListener = input.addEventListener
    ? input.addEventListener
    : input.attachEvent;
  function addEventListenerWrapper(type, listener) {
    // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected, and then trigger the original listener.
    if (type == "keydown") {
      var orig_listener = listener;
      listener = function (event) {
        var suggestion_selected = $(".pac-item-selected").length > 0;
        if (event.which == 13 && !suggestion_selected) {
          var simulated_downarrow = $.Event("keydown", {
            keyCode: 40,
            which: 40,
          });
          orig_listener.apply(input, [simulated_downarrow]);
        }
        orig_listener.apply(input, [event]);
      };
    }
    _addEventListener.apply(input, [type, listener]); // add the modified listener
  }
  if (input.addEventListener) {
    input.addEventListener = addEventListenerWrapper;
  } else if (input.attachEvent) {
    input.attachEvent = addEventListenerWrapper;
  }
};

const SendButton = styled.a``;

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////              //////////////////////////////////////
//////////////////     ACT      //////////////////////////////////////
//////////////////              //////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function Act(props, ref) {
  console.log("==============Act===============");
  console.log("==============Act Props===============", props);
  //console.log("HEADER_PROPS solo", location.pathname)

  // const [formInfo, setFormInfo] = React.useState({
  //   address: "",
  // });
  //const newRef = useRef();
  const locationFromHook = useLocation();

  const { LookupScrollToRef } = ref;
  const { LookupInputRef } = ref;
  const [tester, setTester] = useState("testing");
  const [addressObject, setAddressObject] = useState(null);
  const [showCards, setShowCards] = React.useState("true");
  const [resultFromFlorida, setResultFromFlorida] = React.useState("true");

  const [searchButtonActive, setSearchButtonActive] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [showStatusSpinner, setShowStatusSpinner] = React.useState("false");
  const [lastTermSearched, setLastTermSearched] = React.useState("");
  const [firstSuggestedAddress, setFirstSuggestedAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({ lat: "", lng: "" });

  const [addressLineOne, setAddressLineOne] = React.useState("");
  const [addressLineTwo, setAddressLineTwo] = React.useState("");
  const [sendButtonClass, setSendButtonClass] = React.useState("button error");
  const sendButtonRef = useRef(null);

  const [select, setSelect] = useState(null);
  const [sendEmailsToRepFlashMsg, setSendEmailsToRepFlashMsg] =
    React.useState("");
  const [successFlag, setSuccessFlag] = React.useState(true);
  const scroll = props.executeScrollForLookupSectionTwo;
  const myRef = useRef(null);
  const addressInputRef = useRef(null);

  const autoCompleteRef = useRef(null);
  const [recaptchaResponse, setRecaptchaResponse] = React.useState("");
  const [whichEmailIsActive, setWhichEmailIsActive] = React.useState(1);
  const [whichTabIsActive, setWhichTabIsActive] = React.useState(1);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isButtonLoading, setIsButtonLoading] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(false);
  const [query, setQuery] = useState("");
  const [isAddressMenuOpen, setIsAddressMenuOpen] = React.useState(false);

  const gradient = {
    someColor: `
      linear-gradient(
        0deg,
        hsl(0deg 0% 0%) 0%,
        hsl(0deg 0% 5%) 0%,
        hsl(0deg 1% 9%) 0%,
        hsl(0deg 1% 14%) 0%,
        hsl(0deg 1% 19%) 0%,
        hsl(0deg 2% 23%) 1%,
        hsl(0deg 2% 28%) 2%,
        hsl(0deg 2% 33%) 3%,
        hsl(0deg 3% 37%) 4%,
        hsl(0deg 3% 42%) 6%,
        hsl(0deg 3% 46%) 8%,
        hsl(0deg 4% 51%) 10%,
        hsl(0deg 5% 55%) 13%,
        hsl(0deg 6% 59%) 16%,
        hsl(0deg 8% 64%) 20%,
        hsl(0deg 11% 68%) 25%,
        hsl(0deg 14% 72%) 31%,
        hsl(0deg 19% 77%) 38%,
        hsl(0deg 26% 81%) 47%,
        hsl(0deg 36% 85%) 59%,
        hsl(0deg 56% 89%) 79%,
        hsl(0deg 100% 93%) 100%
      )
  `,
  };

  const [results, setResults] = React.useState({
    one: {
      resultFromFlorida: "true",
      name: "Juan Alfonso Fernandez-Barquin",
      firstName: "",
      lastName: "",
      image:
        "https://www.myfloridahouse.gov//FileStores/Web/Imaging/Member/4709.jpg",
      id: "ocd-person/a8c88fee-1915-4907-ae37-5755c4bff446",
      email: "JuanF.Barquin@myfloridahouse.gov",
      chamber: "House",
      party: "Republican",
      parent: "Florida Legislature",
      district: "119",
      fullDistrict: "Florida State House district 119",
      fullDistrictTrunk: "Florida State House",
    },
    two: {
      name: "Annette Taddeo",
      firstName: "Annette",
      lastName: "Taddeo",
      image:
        "http://www.flsenate.gov/PublishedContent/Senators/2018-2020/Photos/s40_5331.jpg",
      id: "ocd-person/ea190b03-d1ca-4d75-89c7-dca745386db7",
      email: "taddeo.annette.web@flsenate.gov",
      chamber: "Senate",
      party: "Democrat",
      parent: "Florida Legislature",
      district: "40",
      fullDistrict: "Florida State Senate  ",
      fullDistrictTrunk: "Florida State Senate",
    },
  });

  // const [results, setResults] = React.useState({
  //   one: {
  //     resultFromFlorida: "true",
  //     name: "Kaylee Tuck",
  //     firstName: "Kaylee",
  //     lastName: "Tuck",
  //     image:
  //       "https://www.myfloridahouse.gov//FileStores/Web/Imaging/Member/4776.jpg",
  //     id: "ocd-person/7bf7d958-fabd-430b-9326-97586b0c0880",
  //     email: "Kaylee.Tuck@myfloridahouse.gov",
  //     chamber: "House",
  //     party: "Republican",
  //     parent: "Florida Legislature",
  //     district: "55",
  //     fullDistrict: "Florida State House  ",
  //     fullDistrictTrunk: "Florida State House",
  //     address:
  //       "1401 The Capitol; 402 South Monroe Street; Tallahassee, FL 32399-1300",
  //     classification: "lower",
  //   },
  //   two: {
  //     name: "Ben Albritton",
  //     firstName: "Ben",
  //     lastName: "Albritton",
  //     image:
  //       "https://www.flsenate.gov/PublishedContent/Senators/2020-2022/Photos/s26_5342.jpg",
  //     id: "ocd-person/5c81dfe7-1cec-45e8-8044-6d9cd324f2e8",
  //     email: "albritton.ben.web@flsenate.gov",
  //     chamber: "Senate",
  //     party: "Republican",
  //     parent: "Florida Legislature",
  //     district: "26",
  //     fullDistrict: "Florida State Senate  ",
  //     fullDistrictTrunk: "Florida State Senate",
  //     address:
  //       "314 Senate Building; 404 South Monroe Street; Tallahassee, FL 32399-1100",
  //     classification: "upper",
  //   },
  //   hash: "15a8737628b7c84a892c199720cecdeafc7cd07e",
  // });

  ////const [results, setResults] = React.useState({ one: {}, two: {} });

  // // const [results, setResults] = React.useState({
  // // 	one: {
  // // 		resultFromFlorida: "true",
  // // 		name: "Juan Carlos Porras",
  // // 		firstName: "",
  // // 		lastName: "",
  // // 		image: "https://myfloridahouse.gov//FileStores/Web/Imaging/Member/4898.jpg",
  // // 		id: "ocd-person/6c673f21-8f64-44b7-831f-d3d2e9c78eb3",
  // // 		email: "JuanCarlos.Porras@myfloridahouse.gov",
  // // 		chamber: "House",
  // // 		party: "Republican",
  // // 		parent: "Florida Legislature",
  // // 		district: "119",
  // // 		fullDistrict: "Florida State House district 119",
  // // 		fullDistrictTrunk: "Florida State House district 119",
  // // 		address: "1102 The Capitol; 402 South Monroe Street; Tallahassee, FL 32399-1300",
  // // 		classification: "lower",
  // // 	},
  // // 	two: {
  // // 		name: "Ana Maria Rodriguez",
  // // 		firstName: "",
  // // 		lastName: "",
  // // 		image: "https://flsenate.gov/PublishedContent/Senators/2022-2024/Photos/s40_5379.jpg",
  // // 		id: "ocd-person/afd55a58-b8f6-4dd7-9d93-a2207b65e425",
  // // 		email: "rodriguez.anamaria.web@flsenate.gov",
  // // 		chamber: "Senate",
  // // 		party: "Republican",
  // // 		parent: "Florida Legislature",
  // // 		district: "40",
  // // 		fullDistrict: "Florida State Senate district 40",
  // // 		fullDistrictTrunk: "Florida State Senate district 40",
  // // 		address: "314 Senate Building; 404 South Monroe Street; Tallahassee, FL 32399-1100",
  // // 		classification: "upper",
  // // 	},
  // // 	hash: "b9480b5225ee9bc8cdfe1c6b2f2ea1ebc100687e",
  // // })

  ///////////////////////////////////////////////////////////////

  useEffect(() => {
    //setValue(null);

    console.log("==inside useEffect ACT==");

    //console.log("ADDRESSOBJECTIS_ " + JSON.stringify(addressObject));

    if (addressObject && addressObject.address_components) {
      console.log(
        "ADDRESSOBJECTIS_ && addressObject.address_components" +
          JSON.stringify(addressObject.address_components)
      );

      handleAddressSelected();
    } else if (addressObject && addressObject.manual) {
      handleAddressSelectedManual();
    } else {
      //console.log("addressObject NADA")
    }
  }, [addressObject]);

  React.useEffect(() => {
    console.log("Start the handleKeyDown listiner");

    selectFirstOnEnter(LookupInputRef);
  }, []);

  function loginFromDeadEnd(e) {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    props.set_login_clicked("true");
    props.set_open_side_menu("false");
  }

  function signupFromDeadEnd(e) {
    e.preventDefault();
  }

  // to activate the input field while typing

  function activateField(e) {
    setSearchButtonActive(true);
  }

  // to deactivate input only if it's empty
  function disableField(e) {
    if (e.target.value == "") {
      setSearchButtonActive(false);
    }
  }

  const handleAddressSelected = () => {
    console.log("==== handle_address_selected_START ====");

    setLastTermSearched(addressObject.formated_address);

    //let user know somethings happening
    setStatus("....may take up to 60 seconds");

    setShowStatusSpinner("true");

    //set setCoordinates with LAT/LNG

    console.log(
      "about to check the latlang with address ",
      addressObject.formated_address
    );

    const csrf = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content");

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
        setStatus("");

        //message on bullet 1

        //props.setBullet1msg("Search Complete!")
        setShowStatusSpinner("false");
        //props.setShowStatusCheck(true)
        setShowCards("true");
        props.set_show_offer("true");

        //props.setBullet1("COMPLETED")

        setResults(data);

        setResultFromFlorida(data.one.resultFromFlorida.toString());
        console.log("emailll", data.one.email);

        let flag = data.one.resultFromFlorida.toString();

        console.log("FLAG IS " + flag);

        if (flag == "false") {
          1;

          //props.setBullet2msg("Non-Florida result");
          //props.setBullet2("COMPLETED")
          //props.setShowStatusCheck2(true)
        } else {
          //props.setBullet2msg("Send Message");
          //props.setShowSteps(true)
        }
      });

    console.log("==== handle_address_selected_END ====");
  };

  const handleAddressSelectedManual = () => {
    console.log("==== handle_address_selected_MANUAL_START ====");

    setLastTermSearched(addressObject.address);

    //let user know somethings happening
    setStatus("....may take up to 60 seconds");

    setShowStatusSpinner("true");

    const csrf = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content");

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
        setStatus("");

        //message on bullet 1

        //props.setBullet1msg("Search Complete!")
        setShowStatusSpinner("false");
        //props.setShowStatusCheck(true)
        setShowCards("true");
        props.set_show_offer("true");

        //props.setBullet1("COMPLETED")

        setResults(data);

        setResultFromFlorida(data.one.resultFromFlorida.toString());
        console.log("emailll", data.one.email);

        let flag = data.one.resultFromFlorida.toString();

        console.log("FLAG IS " + flag);

        if (flag == "false") {
          1;

          //props.setBullet2msg("Non-Florida result");
          //props.setBullet2("COMPLETED")
          //props.setShowStatusCheck2(true)
        } else {
          //props.setBullet2msg("Send Message");
          //props.setShowSteps(true)
        }
      });

    console.log("==== handle_address_selected_END ====");
  };

  //address selected from dropdown box///////////////////  HANDLE_SELECT  /////////
  const handleSelect = (address, pid, suggestion) => {
    console.log("handle select start ----------------------------------");
    //console.log("addressSELECT^^^^^", suggestion.formattedSuggestion.mainText)
    //console.log("addressSELECT22222", suggestion.formattedSuggestion.secondaryText)
    //populate the input with the address selected from 'react places autocomplete'
    setFormInfo({ address: address });

    //get the lat/lng of the address selected and save to state
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setCoordinates({
          lat: latLng.lat,
          lng: latLng.lng,
        });
      })
      .catch((error) => {
        setStatus("No results found. Check address");
        setShowStatusSpinner("false");
        console.error("Error", error);
      });

    console.log("handle select end ----------------------------------");
  };

  ///SEARCH BUTTON CLICKED///////////////////////////////// HANDLE_ADD  //////////
  const handleAdd = (e) => {
    console.log(
      "HANNNDLLLE ADDDDDDD starrrrtttt ============================="
    );
    //user enters address but doesnt choose one from "react places autocomplete"
    //and thus bypasses handkeSelect method, which gets the lat lng, so get lat lan otherway
    let secondTryLat = "";
    let secondTryLng = "";

    e.preventDefault();

    if (validForm()) {
      //const fooBarNode = props.sendButtonRef.current

      //Adding class to node element
      //fooBarNode.classList.remove('animate');

      if (props.bullet2 == "COMPLETED") {
        setSendButtonClass("button error");
        //props.setShowStatusCheck2(false)
        //props.setBullet2msg("Send Message")

        //props.setBullet2("NOT_COMPLETED");
      }

      //set current Search term state from input
      setLastTermSearched(formInfo.address);

      //let user know somethings happening
      setStatus("....may take up to 60 seconds");

      setShowStatusSpinner("true");

      //get formdata ready to send to server
      //formData.append("event[address]", formInfo.address);

      formData.append("event[address]", firstSuggestedAddress);

      //lat lng will be empty if user manually enters address instead if
      //selecting address from react places autocompete
      if (coordinates.lat == "" || coordinates.lng == "") {
        geocodeByAddress(formInfo.address)
          .then((results) => getLatLng(results[0]))
          .then((latLng) => {
            secondTryLat = latLng.lat;
            secondTryLng = latLng.lng;

            const csrf = document
              .querySelector("meta[name='csrf-token']")
              .getAttribute("content");

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
                setStatus("");

                //message on bullet 1

                //props.setBullet1msg("Search Complete!")
                setShowStatusSpinner("false");
                //props.setShowStatusCheck(true)
                setShowCards("true");
                props.set_show_offer("true");

                //props.setBullet1("COMPLETED")

                setResults(data);

                setResultFromFlorida(data.one.resultFromFlorida.toString());
                console.log("emailll", data.one.email);

                let flag = data.one.resultFromFlorida.toString();

                console.log("FLAG IS " + flag);

                if (flag == "false") {
                  1;

                  //props.setBullet2msg("Non-Florida result");
                  //props.setBullet2("COMPLETED")
                  //props.setShowStatusCheck2(true)
                } else {
                  //props.setBullet2msg("Send Message");
                  //props.setShowSteps(true)
                }
              });
          })
          .catch((error) => {
            setStatus("No results found. Check address");
            setShowStatusSpinner("false");
            console.log("Error", error);
          });
      } else {
        console.log("lat was NOT empty");
        const csrf = document
          .querySelector("meta[name='csrf-token']")
          .getAttribute("content");
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
            setStatus("");
            //props.setBullet1msg("Search Complete!")
            setShowStatusSpinner("false");
            //props.setShowStatusCheck(true)
            setShowCards("true");
            props.set_show_offer("true");

            //props.setBullet1("COMPLETED")

            setResults(data);

            setResultFromFlorida(data.one.resultFromFlorida.toString());

            let flag = data.one.resultFromFlorida.toString();

            console.log("FLAG IS " + flag);

            if (flag == "false") {
              //props.setBullet2msg("non-Florida result");
              //props.setBullet2("COMPLETED")
              //props.setShowStatusCheck2(true)
            } else {
              //props.setBullet2msg("Send Message");
              //props.setShowSteps(true);
            }
          });
      }
    }

    console.log("HANNNDLLLE ADDDDDDD end =============================");
  };

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
    console.log("send?LetterFunct$#%Ton");
  }

  function resetSearch(e) {
    e.preventDefault();
    setShowCards("false");
    setAddressObject(null);

    //LookupInputRef.current.focus();

    //console.log("insideRESET_SEARCh and Select is", select.current);

    //console.log("insideRESET_SEARCh and LookupInputRef is", LookupInputRef);

    //props.executeScrollForLookupSection();
    setTimeout(() => {
      console.log("inTimeOut_______________________");
      setQuery("");
      autoCompleteRef.current.focus();
    }, 2000);

    //setShowLetter(false);
  }

  function onChange(value) {
    console.log("Captcha value:", value);
    setRecaptchaResponse(value);
    setSendEmailsToRepFlashMsg("");
  }

  const animateButton = function (e) {
    e.preventDefault;
    //reset animation
    //e.target.classList.remove('animate');

    //e.target.classList.add('animate');
    if (props.userState.loggedInStatus == "NOT_LOGGED_IN") {
      setSendButtonClass("button error animate");
      setFlashMsg("please login first");
      setTimeout(function () {
        //setFlashMsg('<a href="#" onClick={loginFromDeadEnd}>Login</a> to continue')
        //setFlashMsg('')
        //e.target.classList.remove('animate')
      }, 4000);
    } else {
      console.log("rrrrrrrrrrrrrrrrrrrrrr");
      setSendButtonClass("button success animate");

      setTimeout(function () {
        setSuccessFlag(true);

        console.log("b44444 scroLL");
        myRef.current.scrollIntoView();
        console.log("bAFTER scroLL");
      }, 3500);
    }
  };

  const GetHeader = () => {
    console.log("getHeader start &&&&&&&&&&&&&&&&&&&&&&");

    console.log(results);

    if (whichEmailIsActive === 1) {
      if (
        results.one.chamber !== undefined &&
        results.one.chamber == "Senate"
      ) {
        if (results.one.lastName != "") {
          return <p>Dear Senator {results.one.lastName}, </p>;
        } else {
          return <p>Dear Senator {results.one.name}, </p>;
        }
      } else if (
        results.one.chamber !== undefined &&
        results.one.chamber == "House"
      ) {
        if (results.one.lastName != "") {
          return <p>Dear Representative {results.one.lastName}, </p>;
        } else {
          return <p>Dear Representative {results.one.name}, </p>;
        }
      } else {
        return "default header 1";
      }
    } else if (which_email_is_active === 2) {
      if (
        results.two.chamber !== undefined &&
        results.two.chamber == "Senate"
      ) {
        if (results.two.lastName != "") {
          return <p>Dear Senator {results.two.lastName}, </p>;
        } else {
          return <p>Dear Senator {results.two.name}, </p>;
        }
      } else if (
        results.two.chamber !== undefined &&
        results.two.chamber == "House"
      ) {
        if (results.two.lastName != "") {
          return <p>Dear Representative {results.two.lastName}, </p>;
        } else {
          return <p>Dear Representative {results.two.name}, </p>;
        }
      } else {
        return "default header 2";
      }
    } else {
      return "default header 3";
    }
  };

  const HandleLetterButton = (e) => {
    console.log(e.target.value);

    if (whichTabIsActive !== 1) {
      setWhichTabIsActive(1);
    }
  };

  const HandleEmailButton = (e) => {
    console.log(e.target.value);

    if (whichTabIsActive !== 2) {
      setWhichTabIsActive(2);
    }
  };
  const HandleButtonTabOne = (e) => {
    console.log(e.target.value);

    if (whichEmailIsActive !== 1) {
      setWhichEmailIsActive(1);
    }
  };

  const HandleButtonTabTwo = (e) => {
    console.log(e.target.value);
    if (whichEmailIsActive !== 2) {
      setWhichEmailIsActive(2);
    }
  };

  //

  const sendAdderessToServerAndFinishLookup = () => {
    console.log("The current address is ", addressObject);

    geocodeByAddress(addressObject.formated_address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) =>
        console.log("Successfully got latitude and longitude", { lat, lng })
      );

    //   geocodeByAddress("9900 sw 166 ct")
    // .then(results => console.log(results))
    // .catch(error => console.error(error));
  };

  const handleFocus = (element) => {
    if (addressObject) {
      select.select.state.inputValue = addressObject.formated_address;
    }
  };

  const handleAddress = (v) => {
    console.log("onChange => so HANDLE_ADDRESS", v);
    setAddressObject(v);

    console.log("MAIN_TEXT", v.value.structured_formatting.main_text);
    console.log("SECONDARY_TEXT", v.value.structured_formatting.secondary_text);

    setAddressLineOne(v.value.structured_formatting.main_text);
    setAddressLineTwo(v.value.structured_formatting.secondary_text);
  };

  const handleInputChange = (v) => {
    console.log("handleInputChange", v);

    if (v == "") {
      isAddressMenuOpen ? setIsAddressMenuOpen(false) : null;
    } else {
      isAddressMenuOpen ? null : setIsAddressMenuOpen(true);
    }
  };

  const clickedThisTest = (v) => {
    console.log("clickedThisTest = ", v);
  };

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
    const addressObject = autocompleteRef.current.getPlace();
    console.log("addressObject------------ " + addressObject.to_s);
    // const address = addressObject.address_components;
    // console.log("addressObject.address_components " + address.to_s);
    // Check if address is valid
    // if (address) {
    // 	setCity(address[0].long_name);
    // 	setQuery(addressObject.formatted_address);
    // }
  };

  const handleEmailDemoRight = () => {
    setWhichEmailIsActive((prevEmailState) => {
      if (prevEmailState == 1) {
        return 2;
      } else {
        return 1;
      }
    });
  };

  const handleWhichDemoToSelect = (numString) => {
    setWhichEmailIsActive(() => {
      if (numString == "1") {
        return 1;
      } else if (numString == "2") {
        return 2;
      }
    });
  };
  if (locationFromHook.pathname === "/edit") {
    return null;
  } else {
    return (
      <ActWrapper
        style={{
          background: showCards == "true" ? "white" : gradient.someColor,
        }}
        show_cards={showCards}
        ref={LookupScrollToRef}
      >
        {/*<BGimage src={actBackground} ref={myRef}></BGimage>*/}

        {/*<BGimageFixBottom />*/}
        <ActGrid show_cards={showCards}>
          <ActSection show_cards={showCards}>
            <ActHeaderWrapper>
              <ActHeader show_cards={showCards}>ACT NOW</ActHeader>

              {/*<ActSubheader show_cards={showCards}>
                ...3 quick steps
              </ActSubheader>*/}
            </ActHeaderWrapper>

            <ActSubHeaders>
              <h2>Lookup & Contact</h2>
              <h2 style={{ color: "black", marginTop: "-20px" }}>
                your State Reps
              </h2>
            </ActSubHeaders>

            {/*<ActBulletPointsWrapper>
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
            </ActBulletPointsWrapper>*/}

            <Form className="form-inline" show_cards={showCards}>
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
                <StatusSpinner show_status_spinner={showStatusSpinner}>
                  {/* <Spinner name="wave" color="#87d388" /> */}
                </StatusSpinner>

                <StatusBar>
                  <Span status={status}> {status}</Span>
                </StatusBar>
              </StatusHolder>
            </Form>

            <Mega show_cards={showCards} src={mega}></Mega>
          </ActSection>

          <ResultSection show_cards={showCards}>
            <MiddleBarResultSection>
              <TopBar>
                <h1>Results</h1>
                {/* <h2>We located your State Representatives !!</h2> */}

                <div>
                  <h3>
                    {addressObject && addressObject.formatted_address
                      ? addressObject.formatted_address
                      : addressObject && addressObject.address
                      ? addressObject.address
                      : "123 Main St Miami, FL 33155"}
                  </h3>
                  <h5 onClick={resetSearch}>new search</h5>
                </div>
              </TopBar>
              <BGimageFix />
              <BottomBar>
                <CardOne>
                  <CardOneWrapper which_email_is_active={whichEmailIsActive}>
                    <CardPicture
                      src={results.one.image ? results.one.image : ""}
                    ></CardPicture>

                    <CardTemplate src={cardTemplate}></CardTemplate>

                    <CardNameOfRep>
                      {results.one.name ? results.one.name : ""}
                    </CardNameOfRep>

                    <CardOneSub>{results.one.fullDistrictTrunk}</CardOneSub>
                  </CardOneWrapper>
                </CardOne>

                <CardTwo>
                  <CardTwoWrapper which_email_is_active={whichEmailIsActive}>
                    <CardPicture
                      src={results.two.image ? results.two.image : ""}
                    ></CardPicture>

                    <CardTemplate src={cardTemplate}></CardTemplate>

                    <CardNameOfRep>
                      {results.two.name ? results.two.name : ""}
                    </CardNameOfRep>

                    <CardTwoSub>{results.two.fullDistrictTrunk}</CardTwoSub>
                  </CardTwoWrapper>
                </CardTwo>

                <NextSteps>
                  <h1>NEXT STEP:</h1>
                  {/* <h2>Join our Recreational Cannabis Initiative campaign!</h2> */}
                  <h2>Contact your State Representatives.</h2>
                  <HowItWorksWrapper>
                    <p>How it works?</p>
                    <HowItWorksList>
                      <p>
                        Your personalized letters will be printed on top-notch
                        quality paper.
                      </p>
                      <p>
                        Mailed to both Representatives via First Class USPS
                        mail.
                      </p>
                      <p>That's it!</p>
                    </HowItWorksList>
                  </HowItWorksWrapper>
                  {/* <h2>checkout the letters</h2> */}
                  {/* <div>
								<p>
									Checkout the personalized letter we generated below. <br />
									We'll take care of preparing the letters and mail them to each of yh2our
									Representatives via United States Postal Service.
								</p>
							</div> */}
                </NextSteps>
              </BottomBar>
              {/* <LinerVertical />
						<LinerHorizontal /> */}
            </MiddleBarResultSection>

            <TriplePlayWrapper
              result_from_florida={resultFromFlorida}
              show_cards={showCards}
            >
              <Letter
                result_from_florida={resultFromFlorida}
                show_cards={showCards}
              >
                {/*{" "}
                <ButtonTabsWrapper>
                  <ButtonsHeader>Pick one: </ButtonsHeader>
                  <ButtonOneTabWrapper
                  //value={1}
                  //which_tab_is_active={whichTabIsActive}
                  //onClick={HandleButtonTabOne}
                  //onClick={HandleLetterButton}
                  >
                    <ButtonGuts>
                      <ButtonTabOne which_tab_is_active={whichTabIsActive}>
                        <USPS
                          src={usps}
                          which_tab_is_active={whichTabIsActive}
                          onClick={HandleLetterButton}
                        />
                      </ButtonTabOne>
                    </ButtonGuts>
                  </ButtonOneTabWrapper>
                  <Or>OR</Or>
                  <ButtonTwoTabWrapper
                  //value={2}
                  //which_tab_is_active={whichTabIsActive}
                  //onClick={HandleButtonTabTwo}
                  //onClick={HandleEmailButton}
                  >
                    <ButtonTabTwo which_tab_is_active={whichTabIsActive}>
                      <GmailIcon
                        src={gmail_icon}
                        which_tab_is_active={whichTabIsActive}
                        onClick={HandleEmailButton}
                      />
                    </ButtonTabTwo>
                  </ButtonTwoTabWrapper>
                </ButtonTabsWrapper>{" "}
          */}
                {/* <DemoIndicatorDotsWrapper>
								
							</DemoIndicatorDotsWrapper> */}
                <EmailDemoWrapper which_tab_is_active={whichTabIsActive}>
                  <EmailDemoCenter>
                    <EmailDemo>
                      <SubjectBox>
                        <h2>subject</h2>
                        <h3>
                          We need a more sensible approach to marijuana laws.
                        </h3>
                      </SubjectBox>

                      <BodyBox>
                        <h2>body</h2>

                        <GetHeader />

                        <div>
                          <p>
                            I am a constituent of
                            {
                              whichEmailIsActive === 1
                                ? " (" + results.one.fullDistrict + ")."
                                : //" district "
                                  // + results.one.district
                                  " (" + results.two.fullDistrict + ")."
                              //" district "
                              // + results.two.district
                            }
                          </p>

                          <p>
                            I am writing to express my strong support for the
                            legalization and regulation of marijuana for
                            recreational use in our state. It is disheartening
                            to see that many other states have embraced this
                            common-sense approach while our state continues to
                            lag behind.
                          </p>

                          <p>
                            As a Legislator, you have the power to make a
                            difference. I implore you to consider the undeniable
                            benefits of legalizing and regulating marijuana for
                            adults like myself. I firmly believe that it is time
                            for our state to take this important step forward.
                          </p>

                          <p>
                            Thank you for your attention to this matter, and I
                            hope I can count on your support to bring an end to
                            marijuana prohibition in our state.
                          </p>
                        </div>
                        <LetterClosing>
                          <p>Sincerely,</p>
                          <p>
                            {props.userState.loggedInStatus == "LOGGED_IN"
                              ? props.userState.user.full_name
                              : "[Your Name Here]"}
                          </p>{" "}
                          <p>
                            {addressLineOne !== ""
                              ? addressLineOne
                              : "[Your address]"}
                          </p>{" "}
                          <p>
                            {addressLineTwo !== ""
                              ? addressLineTwo
                              : "[city, state, zipcode]"}
                          </p>{" "}
                        </LetterClosing>

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
                    </EmailDemo>
                  </EmailDemoCenter>

                  {/* <OfferOne>letter
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
                  {/* <EmailDemoRight onClick={handleEmailDemoRight}> */}
                  {/* <RightArrow src={rightArrow} /> */}
                  {/* </EmailDemoRight> */}
                </EmailDemoWrapper>
                <LetterDemoWrapper which_tab_is_active={whichTabIsActive}>
                  <LetterDemoCenter>
                    <LetterDemo>
                      {/* <h2>body</h2> */}

                      <GetHeader />

                      <div>
                        <p>
                          I am a constituent of
                          {
                            whichEmailIsActive === 1
                              ? " (" + results.one.fullDistrict + ")."
                              : //+ " district "
                                // + results.one.district
                                " (" + results.two.fullDistrict + ")."
                            //+ " district "
                            // + results.two.district
                          }
                        </p>

                        <p>
                          I am writing to express my strong support for the
                          legalization and regulation of marijuana for
                          recreational use in our state. It is disheartening to
                          see that many other states have embraced this
                          common-sense approach while our state continues to lag
                          behind.
                        </p>

                        <p>
                          As a Legislator, you have the power to make a
                          difference. I implore you to consider the undeniable
                          benefits of legalizing and regulating marijuana for
                          adults like myself. I firmly believe that it is time
                          for our state to take this important step forward.
                        </p>

                        <p>
                          Thank you for your attention to this matter, and I
                          hope I can count on your support to bring an end to
                          marijuana prohibition in our state.
                        </p>
                      </div>
                      <LetterClosing>
                        <p>Sincerely,</p>
                        <p>
                          {props.userState.loggedInStatus == "LOGGED_IN"
                            ? props.userState.user.full_name
                            : "[Your Name Here]"}
                        </p>{" "}
                        <p>
                          {addressLineOne !== ""
                            ? addressLineOne
                            : "[Your address]"}
                        </p>{" "}
                        <p>
                          {addressLineTwo !== ""
                            ? addressLineTwo
                            : "[city, state, zipcode]"}
                        </p>{" "}
                      </LetterClosing>

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

                  {/* <EmailDemoRight onClick={handleEmailDemoRight}> */}
                  {/* <RightArrow src={rightArrow} /> */}
                  {/* </EmailDemoRight> */}
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

            <LetterOfferWrapper which_tab_is_active={whichTabIsActive}>
              <LetterOffer>
                <Strip>
                  <Total>Total</Total>
                  <Price>$2.99</Price>

                  <Row1
                    onClick={() => handleWhichDemoToSelect("1")}
                    which_email_is_active={whichEmailIsActive}
                  >
                    <PicWrapper>
                      <Pic1
                        src={results.one.image ? results.one.image : ""}
                        which_email_is_active={whichEmailIsActive}
                      ></Pic1>
                    </PicWrapper>
                    <Description1>
                      <DWrapper>
                        <D1 which_email_is_active={whichEmailIsActive}>
                          Representative{" "}
                          {results.one.name ? results.one.name : ""}
                        </D1>
                      </DWrapper>
                      <D2>1 letter delivered via USPS</D2>
                    </Description1>
                  </Row1>
                  <Row2
                    onClick={() => handleWhichDemoToSelect("2")}
                    which_email_is_active={whichEmailIsActive}
                  >
                    <PicWrapper>
                      <Pic2
                        src={results.two.image ? results.two.image : ""}
                        which_email_is_active={whichEmailIsActive}
                      ></Pic2>
                    </PicWrapper>
                    <Description2>
                      <DWrapper>
                        <D1 which_email_is_active={whichEmailIsActive}>
                          Senator {results.two.name ? results.two.name : ""}
                        </D1>
                      </DWrapper>
                      <D2>1 letter delivered via USPS</D2>
                    </Description2>
                  </Row2>
                  {/* <CheckmarkMainWrapper>
                  <CheckmarkRow>
                    <GreenCheckmarkWrapper>
                      <GreenCheckmark></GreenCheckmark>
                    </GreenCheckmarkWrapper>
                    <CheckmarkDescription>It's easy</CheckmarkDescription>
                  </CheckmarkRow>
                  <CheckMarkParagraph>
                    a printed letter will be mailed to each of your
                    representatives via United States Postal Service.
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
                    Sending a letter via USPS is most effective way to get your
                    point across.
                  </CheckMarkParagraph>
                </CheckmarkMainWrapper> */}
                  {/* <ShowOfferSectionWrapper> */}
                  <ShowOfferSection show_cards={showCards}>
                    <PayPalButtons
                      style={{
                        layout: "vertical",
                        shape: "rect",
                        disableMaxWidth: true,
                        height: 55,
                      }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: "4.99",
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
                  {/* </ShowOfferSectionWrapper> */}
                </Strip>
              </LetterOffer>
            </LetterOfferWrapper>

            <EmailOfferWrapper which_tab_is_active={whichTabIsActive}>
              <EmailOffer>
                <Strip>
                  <Total>Total</Total>
                  <Price>Free</Price>

                  <Row1
                    onClick={() => handleWhichDemoToSelect("1")}
                    which_email_is_active={whichEmailIsActive}
                  >
                    <PicWrapper>
                      <Pic1
                        src={results.one.image ? results.one.image : ""}
                        which_email_is_active={whichEmailIsActive}
                      ></Pic1>
                    </PicWrapper>

                    <Description1>
                      <DWrapper>
                        <D1 which_email_is_active={whichEmailIsActive}>
                          Representative{" "}
                          {results.one.name ? results.one.name : ""}
                        </D1>
                      </DWrapper>
                      <D2>1 personalized email.</D2>
                    </Description1>
                  </Row1>
                  <Row2
                    onClick={() => handleWhichDemoToSelect("2")}
                    which_email_is_active={whichEmailIsActive}
                  >
                    <Pic2
                      src={results.two.image ? results.two.image : ""}
                      which_email_is_active={whichEmailIsActive}
                    ></Pic2>

                    <Description2>
                      <DWrapper>
                        <D1 which_email_is_active={whichEmailIsActive}>
                          Senator {results.two.name ? results.two.name : ""}
                        </D1>
                      </DWrapper>
                      <D2>1 personalized email.</D2>
                    </Description2>
                  </Row2>

                  <SendButtonWrapper>
                    <Button_Loading
                      onClick={() => {
                        if (
                          recaptchaResponse == "" ||
                          recaptchaResponse == null
                        ) {
                          setSendEmailsToRepFlashMsg(
                            "Please check robot checkbox"
                          );
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
                      >
                        <span style={{}}> Send Emails</span>
                      </div>
                    </Button_Loading>
                  </SendButtonWrapper>
                  <h4>{sendEmailsToRepFlashMsg}</h4>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                    }}
                  >
                    <div />
                    <ReCAPTCHA
                      sitekey="6LdE3NgdAAAAADcnYdc8T-d61yIGGVCwNl3sdfc6"
                      onChange={onChange}
                      className="testClass"
                      size="normal"
                    />
                    <div />
                  </div>
                </Strip>
              </EmailOffer>
            </EmailOfferWrapper>

            <ShowLetterDeadEnd
              result_from_florida={resultFromFlorida}
              show_cards={showCards}
            >
              Unfortunately, emailing officials through FloridaBlaze is only
              available in Florida.
              <a href="#" onClick={resetSearch}>
                Try another search.
              </a>
            </ShowLetterDeadEnd>
          </ResultSection>
        </ActGrid>
      </ActWrapper>
    );
  }
}

const Wtf = React.forwardRef(Act);
export default Wtf;
