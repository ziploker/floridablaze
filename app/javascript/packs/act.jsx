import React, { Component, useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import actBackground from "../../assets/images/actBackground.png";
import mega from "../../assets/images/megav3.png";
import cardTemplate from "../../assets/images/cardTemplate.png";
import sampleShot from "../../assets/images/sampleShot.png";
import samplepic from "../../assets/images/man6.png";
//import "../../assets/stylesheets/sendButtonB";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
//import useDocumentScrollThrottled from './useDocumentScrollThrottled.jsx'
import styled, { keyframes } from "styled-components";
import { RiMailSendLine } from "react-icons/ri";
import { BsMailbox } from "react-icons/bs";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import sendEmailsToReps from '../packs/communications/sendEmailToReps'
import $ from "jquery";
import ReCAPTCHA from "react-google-recaptcha";
import greenCheck from "../../assets/images/greenCheck.png";
import searchIcon from "../../assets/images/search.png";
import searchIconOrange from "../../assets/images/searchGreen.png";
import searchIconOrange2 from "../../assets/images/searchPink2.png";
import ResultCardOne from "./resultCardOne.jsx";

import Button_Loading from "./myComponents/button_loading"
//import ResultCardTwo from './resultCardTwo.jsx'
var Spinner = require("react-spinkit");
const formData = new FormData();

const ActWrapper = styled.div`

  @media only screen and (max-width: 720px) {
    overflow: hidden;
  }

  background-color: black;
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  bottom: 0;
  height: 100%;

`;

const Mega = styled.img`

  /* @media only screen and (max-width: 1400px) {
   width: 85%;
  } */
  @media only screen and (max-width: 720px) {
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
  display: ${props => props.showCards ? "none" : "inherit"};
  grid-area: 1/2/6/3;
  align-self: center;
  justify-self: end;
  //margin-top: -50px;
  margin-right: 1em;
  margin-top: -80px;
  //margin-bottom: 13px;
  //opacity: ${(props) => (props.showLetter ? "0" : "1")}; ;
  opacity: 1;
`;

const ActGrid = styled.div`
  /* @media only screen and (max-width: 1000px){

    grid-template-columns: 1fr;
    grid-template-rows: minmax(min-content, max-content) minmax(min-content, max-content) minmax(100px, max-content) minmax(min-content, max-content);

  } */

  @media only screen and (max-width: 750px){

    justify-items: start;


  }

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
`;

const ActSection = styled.section`




  @media only screen and (max-width: 720px){

    //grid-template-columns: minmax(20px, 1fr) 1fr minmax(20px, 1fr);
    grid-template-columns: 0px 0px minmax(250px,600px) minmax(40px, 1fr);
    min-width: 100%;
    //justify-self: center;


  }
  //display: ${(props) => (props.showCards || props.showLetter ? "none" : "grid")}; ;
  display: ${(props) => (props.showCards ? "none" : "grid")}; ;

  position: relative;
  //grid-template-columns: 43% 57%;
  grid-template-columns: minmax(20px, 100px) minmax(250px, 350px) minmax(350px,600px) minmax(40px, 1fr);
  grid-template-rows: minmax(40px, 50px)  minmax(min-content, max-content) min-content min-content 1fr;

  grid-column-gap: 0.5em;
  grid-area: 1/1/-1/-1;
  transition: opacity 0.4s;
  //padding-bottom: 40px;

  //z-index: ${(props) => (props.showCards || props.showLetter ? "0" : "10")};
  z-index: ${(props) => (props.showCards ? "0" : "10")};


  @media only screen and (min-width: 975px){


    padding-bottom: 30px;

  }
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
  background: #E3B55A;
`;

const StepTwo = styled.div`
  width: 80px;
  height: 4px;
  background: ${props => props.showCards ? "#E3B55A" : "#605C55" };
  margin-left: 36px;
`;

const StepThree = styled.div`
  width: 80px;
  height: 4px;
  background: #605C55;
  margin-left: 36px;
`;

const ActHeader = styled.h1`
  @media only screen and (max-width: 720px){

    //grid-area: 1/1/2/-1;
    //justify-self: center;
    font-size: 15vw;

  }

  font-family: Poppins;
  font-style: normal;
  font-weight: 800;
  font-size: min(10vw, 138px);
  align-self: center;
  line-height: 100%;
  //line-height: 100px;
  /* identical to box height */

  letter-spacing: -0.08em;

  color: #ffffff;
  grid-area: 2/3/3/-1;


  //line-height: 100%;
  margin: 0px 0px 0px 20px;
  //padding-top: 20px;
  //z-index: 1;

  //opacity: ${(props) => (props.showCards || props.showLetter ? "0" : "1")};
  opacity: ${(props) => (props.showCards ? "0" : "1")};

`;

const ActSubheader = styled.h2`
  @media only screen and (max-width: 720px){

    //grid-area: 2/1/3/-1;
    //justify-self: center;
    font-size: 4vw;


  }

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: min(1.5vw, 27px);
  line-height: 130%;
  max-width: 80%;
  //line-height: 100%;

  grid-area: 3/3/4/-1;

  color: #e3b55a;
  margin: 8px 0px 8px 20px;

  //opacity: ${(props) => (props.showCards || props.showLetter ? "0" : "1")};
  opacity: ${(props) => (props.showCards ? "0" : "1")};

`;

const ActSubheader2 = styled.h3`
  @media only screen and (max-width: 720px){

    //grid-area: 3/1/4/-1;
    //justify-self: center;
    font-size: 2vw;

  }

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: min(1vw, 16px);
  //line-height: 100%;
  max-width: 80%;

  grid-area: 4/3/5/-1;

  color: #e3b55a;
  margin: 10px 0px 18px 20px;
  display: inline;
  //line-height: 6vw;
  vertical-align: bottom;

  align-self: start;

  //opacity: ${(props) => (props.showCards || props.showLetter ? "0" : "1")};
  opacity: ${(props) => (props.showCards ? "0" : "1")};

`;

const Form = styled.form`
  @media only screen and (max-width: 720px){

    //grid-area: 4/1/5/-1;

  }

  display: grid;
  position: relative;
  grid-template-columns: 100%;
  //grid-template-rows: minmax(min-content, max-content) minmax(50px, min-content);
  grid-template-areas:
    "input"
    "status";
  justify-content: center;
  justify-self: start;
  align-self: center;

  width: 100%;
  transition: opacity 0.4s;
  transition: opacity 0.4s;

  //box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  //margin-top: 72px;

  grid-area: 5/3/6/4;
  padding: 0px 20px;
  border-radius: 5px;

  //opacity: ${(props) => (props.showCards || props.showLetter ? "0" : "1")};
  opacity: ${(props) => (props.showCards ? "0" : "1")};

`;

const Button = styled.button`
  height: 40px;
  width: 50px;
  //grid-area: button;
  background-color: #e8e5e5;
  //background-image: ${(props) => props.searchButtonActive ? "url(" + searchIconOrange + ")" : "url(" + searchIcon + ")"};
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
  //filter: ${(props) => props.searchButtonActive ? "sepia(0%)" : "sepia(60%)"};

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

  @media only screen and (max-width: 720px){

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
    props.showCards && props.resultFromFlorida == "true" ? "1" : "0"};
  z-index: ${(props) =>
    props.showCards && props.resultFromFlorida == "true" ? "10" : "-5"};
  //background: linear-gradient(to bottom, #5FCC61, #318e33);
  //z-index: 1;
  cursor: pointer;
`;

const ShowLetterDeadEnd = styled.div`

  display: ${(props) =>
    props.showCards && props.resultFromFlorida == "true" ? "none" : "initial"};
  opacity: ${(props) =>
    props.showCards && props.resultFromFlorida == "true" ? "0" : "1"};
  z-index: ${(props) =>
    props.showCards && props.resultFromFlorida == "true" ? "-5" : "10"};
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
`;

const CardOneInfo = styled.div``;

const CardTwoInfo = styled.div``;

const StatusHolder = styled.div`
  grid-area: status;
  display: flex;
  justify-content: center;
  align-content: center;

  justify-self: start;
  min-height: 30px;
  margin-bottom: 16px;
`;

const StatusBar = styled.div`
  max-height: 100%;
  opacity: 1;
  transition: opacity 0.4s;
  transition-timing-function: ease-in;
`;

const StatusSpinner = styled.div`
  max-height: ${(props) =>
    props.showStatusSpinner.toString() == "true" ? "100%" : "0px"};
  opacity: ${(props) =>
    props.showStatusSpinner.toString() == "true" ? "1" : "0"};
  transition: opacity 0.4s;
  transition-timing-function: ease-out;
  margin-left: 8px;
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
    //font-size: 3em;
  }
`;

const Span = styled.span`
  display: ${(props) =>
    props.status == "Search Complete!!" ? "none" : "Block"};
  height: 100%;
  font-size: 0.75em;
  transition: opacity 2s ease-in;
  opacity: ${(props) =>
    props.status.toString() == "Enter an address." ? "0" : "1"};
  color: white;
`;

const ResultSection = styled.div`


  @media only screen and (max-width: 750px){

    grid-area: 1/1/-1/-1;
    //margin: 0px auto;
    //padding: 0px 15px 32px 15px;
    grid-template-columns: minmax(10px, 1fr) minmax(100px, 150px) minmax(8px, 16px) minmax(100px, 150px) minmax(10px, 1fr);

    width: 100vw;

    //max-width: 70vw;

  }

  display: grid;
  transition: opacity 0.4s;
  //transition: opacity 2s linear;
  transform: ${(props) =>
    props.showCards ? "translate(0)" : "transform:translate(9999px)"};
  opacity: ${(props) => (props.showCards ? "1" : "0")};
  z-index: ${(props) => (props.showCards ? "10" : "-5")};
  grid-template-columns: minmax(10px, 1fr) minmax(150px, 200px) minmax(4px,8px) minmax(150px, 200px) minmax(16px, 32px) minmax(350px,670px) minmax(10px, 1fr);
  grid-template-rows: minmax(min-content, max-content) minmax(min-content, max-content) minmax(min-content,max-content) minmax(min-content, max-content);
  //visibility: hidden;
  //grid-template-rows: ${(props) => props.showCards ? "minmax(min-content, max-content) minmax(min-content, max-content) minmax(min-content, max-content) minmax(min-content, max-content) 1fr": "0px 0px 0px 0px 0px"};

  //grid-row-gap: .7em;
  //grid-column-gap: 0.5em;
  padding: 0px 0px 20px 0px;

  //padding: ${(props) => props.showCards ? "75px 0px 50px 0px" : "0px 0px 50px 0px"};

  grid-area: 1/1/6/5;
  //margin: 20px 0px 20px 50px;
  height: ${props => props.showCards ? "inherit" : "0px"};

  //margin: 0px 10px;
`;

const ResultSectionInfoBox = styled.div`

  @media only screen and (max-width: 750px){

    grid-area: 1/1/2/6;




  }

  display: grid;

  grid-template-columns: auto min-content auto;
  //grid-template-rows: 1fr min-content 1fr;
  grid-area: 1/2/2/7;
  //height: 200px;
`;

const ProgressBarz = styled.div`

  display: flex;
  grid-area: 1/3/2/4;
  //margin: 27px 0px 18px 20px;
  margin: 30px 0px 10px 20px;

  padding-left: 2px;
  justify-self: start;

`;

const ProgressBarzResultSection = styled.div`

  display: flex;
  grid-area: 1/1/2/-1;
  //margin: 27px 0px 18px 20px;
  margin: 30px 0px 10px 20px;

  padding-left: 2px;
  justify-self: center;

`;



const ResultCompleteTitle = styled.h1`
  font-family: Poppins;
  justify-self: center;
  color: #ffffff;
  grid-area: 2/1/3/-1;
  font-size: 3.5em;


`;



const ResultSectionBulletPointWrapperSet = styled.div`


@media only screen and (max-width: 750px){

  margin: 0 auto;

  }

  grid-area: 3/2/6/3;
  display: grid;
  grid-template-columns: min-content 1fr min-content;





`;


const ResultSectionBulletPointWrapper = styled.div`


  /* @media only screen and (max-width: 750px){

    justify-self: center;

  } */
  grid-area: ${props => props.gridArea};

  display: grid;
  grid-template-columns: minmax(min-content, max-content) 1fr;

  justify-self: start;



`;

const ResultSectionBulletPoint = styled.div`

  height: 10px;
  width: 10px;
  background-color: ${props => props.open ? "black" : "#E3B55A" };
  border:1.5px solid #E3B55A;

  border-radius: 50%;
  display: inline-block;
  justify-self: center;
  align-self: center;



`;

const ResultSectionBulletPointTitle = styled.h2`

  font-family: Poppins;
  justify-self: center;
  align-self: center;
  color: #ffffff;
  margin-left: 15px;
  font-size: .8em;
  white-space: nowrap;

`;

const ResultSectionSpacerLine = styled.div`

@media only screen and (max-width: 750px){

  margin: 25px 0 45px 0;



}

  height: 1px;
  //width: 100vw;
  background: #E3B55A;
  opacity: .4;
  grid-area: 2/1/3/-1;
  margin: 25px 0 0px 0;


`;

const ResultSectionHeaders = styled.h1`

  @media only screen and (max-width: 750px){

    grid-area: ${props => props.gridAreaTablet};
    //font-size: 8vw;
    margin: 10px 0px 20px 0px;


  }


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




  grid-area: ${props => props.gridArea};
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

  @media only screen and (max-width: 750px){

    grid-area: ${props => props.gridAreaTablet};
    //font-size: 8vw;
    //margin: 50px 0px 0px 0px;


  }

  display: ${(props) =>
    props.showCards && props.resultFromFlorida == "true" ? "flex" : "none"};


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
  grid-area: ${props => props.gridArea};
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

  @media only screen and (max-width: 750px){

    font-size: 4vw;


  }
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
`;

const CardOne = styled.div`
  //display: grid;
  position: relative;
  //grid-template-columns: 85% 15%;
  //grid-template-rows: 73% 17% 10%;
  margin-top: 25px;

  grid-area: 3/2/4/3;

  width: 100%;

  justify-self: end;
  height: 0px;

  padding-top: calc(310/220*100%);

  @media only screen and (max-width: 750px){
    grid-area: 4/2/5/3;
    justify-self: start;
    padding-top: calc(310/220*100%);
    height: 0px;
    width: 100%;
  }
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


`;

const CardOneSub = styled.div`
  position: absolute;
  font-weight: bold;
  left: 3px;
  top: 3px;
  right: 3px;
  //width: 100%;
  opacity: .8;
  color:black;
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
`;

const CardTwoSub = styled(CardOneSub)``;

const CardTwo = styled.div`

  position: relative;

  margin-top: 25px;
  grid-area: 3/4/4/5;

  justify-self: end;
  height: 0px;
  padding-top: calc(310/220*100%);
  width: 100%;

  @media only screen and (max-width: 750px){
    grid-area: 4/4/5/5;
    justify-self: start;
    padding-top: calc(310/220*100%);
    height: 0px;
    width: 100%;
  }
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


`;

const CardTemplate = styled.img`
  grid-area: 1/1/-1/-1;
  width: 100%;
  height: 100%;
  opacity: .8;
`;

const CardPicture = styled.img`
  grid-area: 1/1/-1/-1;

  width: 100%;
  height: 100%;
  border-radius: 13px;

  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${samplepic});
`;

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
`;

const ShowOfferSection = styled.div`

  @media only screen and (max-width: 750px){

    grid-area: 6/1/9/6;
  }

  grid-area: 5/1/6/3;
  width: 80%;
  justify-self: center;

`;

const ResultsBlurb = styled.div`
  grid-area: 3/6/5/7;
  margin-top: 25px;
  border: 1px orange solid;


`;

const TriplePlayWrapper = styled.div`

  display: ${(props) =>
    props.showCards == true && props.resultFromFlorida == "true" ? "grid" : "none"};
  //grid-area: 1/2/7/4;
  //grid-area: 4/6/8/7;
  grid-area: 5/2/6/7;
  width: 100%;
  margin-top: 30px;
  display: grid;
  grid-template-columns: 50% 1fr 1fr;
  grid-gap: 10px;

`;

const Letter = styled.div`


  @media only screen and (max-width: 750px){

    grid-area: 6/1/9/6;
    //margin: 0px auto;
    //padding: 0px 15px 32px 15px;
    grid-template-columns: auto;
    width: 100%;
    min-width: inherit;
    margin-top: 20px;
    justify-self: center;

  }

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

  .LetterTopOverlay {
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
  }

  .LetterSideOverlay {
    background: #494545;
    opacity: 0.4;
    grid-area: 4/1/7/2;
    margin: 0;
    //width: 25px;
    //border-radius: 90px;
    justify-self: center;
    //z-index: 1;
  }

  .LetterSideOverlay2 {
    background: #bea2a2;
    opacity: 0.3;
    grid-area: 1/1/7/2;
    margin: 0;
    //width: 25px;
    //border-radius: 90px;
    justify-self: center;
  }

  /* .miniPic1 {
    grid-area: 1/2/4/3;
    width: 185px;
    height: 244px;
    //z-index: 1;
    min-width: 52px;
    padding: 3px;
    border-radius: 33px;
    //border: 1px solid black;
    justify-self: end;
  }

  .miniPic2 {
    grid-area: 1/3/4/4;
    width: 185px;
    height: 244px;
    //z-index: 1;
    min-width: 52px;
    padding: 3px;
    border-radius: 33px;
    //border: 1px solid black;
    justify-self: start;
  } */

  /* .LetterRecipientsWrapper {
    grid-area: 1/4/4/5;
    margin: 0;
  } */

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
    font-weight: 500;
    margin-top: 15px;
    grid-area: 2/1/3/2;
  }

  p {

    @media only screen and (max-width: 1000px){

      padding: 0px;


    }
    text-indent: 2rem;
    font-size: 0.8em;
    font-weight: 300;
    margin-top: 15px;
    /* grid-area: 5/2/6/5; */
    grid-area: 3/1/4/2;
    padding: 0px 30px;
    line-height: 1.8em;
  }

  div {
    font-size: 0.9em;
    font-weight: 300;
    //min-height: 100px;
  }

  .closing{

    @media only screen and (max-width: 1000px){

      padding: 0px;
      margin-top: 16px;


    }
    padding: 30px;
    justify-self: start;
    //grid-area: 6/2/7/5;
    /* grid-area: 1/1/2/2 */
    grid-area: 4/1/5/2;
  }
`;


const OfferOne = styled.div`

  display: grid;
  grid-area: 1/2/2/3;
  grid-template-columns: 40px 1fr;
  grid-template-rows: min-content min-content 80px min-content 25px min-content;
  background: white;
  justify-content: center;


  h1{

    grid-area: 1/1/2/3;
    justify-self: center;
    font-family: Poppins;
    font-style: normal;
    font-weight: 400;
    margin: 25px 0 0 0;
    font-size: 2.8em;
  }



  h2{
    grid-area: 4/1/5/3;
    justify-self: center;
    margin: 40px 0 15px 0;

  }


  h4{

    grid-area: 5/1/6/3;
    align-self: start;
    justify-self: center;
    color: red;
    font-size: .8em;
  }




`;


const OfferTwo = styled.div`

  display: grid;
  grid-area: 1/3/2/4;
  grid-template-columns: 40px 1fr;
  grid-template-rows: min-content min-content 80px min-content min-content;
  background: white;
  justify-content: center;


  h1{

    grid-area: 1/1/2/3;
    justify-self: center;
    font-family: Poppins;
    font-style: normal;
    font-weight: 400;
    margin: 25px 0 0 0;
    font-size: 2.8em;
  }



  h2{
    grid-area: 4/1/5/3;
    justify-self: center;
    margin: 40px;

  }




`;

const BulletPoint = styled.div`
  background: black;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  grid-area: 3/1/4/2;
  justify-self: center;
  margin: 25px 0 0 0;
`;

const BulletPointText = styled.h3`

  grid-area: 3/2/4/3;
  font-size: .8em;
  justify-self: center;
  margin: 20px 0 0 0;
  padding-right: 20px;
`;



const SendButtonWrapper = styled.div`

  @media only screen and (max-width: 400px){
    grid-area: 7/2/8/5;
    align-self: center;
    justify-self: center;
    margin: 16px 0px;
    

  }

  grid-area: 6/1/7/3;
  align-self: center;
  justify-self: center;
  //margin-right: 15px;
  position: relative;
  width: 80%;
  height: 35px;
  margin: 0 0 10px 0;



`;


const SendButtonV2 = styled.button`

  display: inline-block;
  border: 0;
  outline: 0;
  padding: 12px 16px;
  line-height: 1.4;
  background: linear-gradient(#4d4d4d,#2f2f2f);
  border-radius: 5px;
  border: 1px solid black;
  font-family: "poppins", Sans-Serif;
  color: white !important;
  font-size: 1.2em;
  cursor: pointer;
  /* Important part */
  position: relative;
  transition: padding-right .3s ease-out;
  padding-right: 40px;




`;







{/* <OfferOne>
  <h1>email</h1>
  <RiMailSendLine/>

    <BulletPoint/>
    <BulletPointText>
      email will be sent to each of your representatives on your behalf
    </BulletPointText>
    <h2>Free</h2>
    <OfferOneButton></OfferOneButton>

</OfferOne> */}


const FlashError = styled.h4`

@media only screen and (max-width: 400px){

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

@media only screen and (max-width: 400px){

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
`;

const ButtonTabWrapper = styled.div`

  grid-area: 1/1/2/2;
  


`;

const ButtonTabOne = styled.button`


  overflow: hidden;
  border: 1px solid #ccc;
  background-color: ${(props) => props.whichTabIsActive === 1 ? "#ccc" : "#f1f1f1"};

  
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
  border-top-left-radius: 13px;

  &:hover{
    
    background-color: ${(props) => props.whichTabIsActive === 1 ? "#ccc" : "#ddd"};;
  }


  //background-color: #ccc;
`;

const ButtonTabTwo = styled.button`


  overflow: hidden;
  border: 1px solid #ccc;
  background-color: ${(props) => props.whichTabIsActive === 2 ? "#ccc" : "#f1f1f1"};


  
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
  border-bottom-right-radius: 13px;
  &:hover{
    
    background-color: ${(props) => props.whichTabIsActive === 2 ? "#ccc" : "#ddd"};;
  }

  //background-color: #ccc;


`;

const handleKeyDown = (event) => {

  console.log("a key was pressedddddddddddddddddddddddddddd", event.keyCode);
}



const SendButton = styled.a``;

function Act(props, ref) {
  console.log("==============Act===============")
  console.log("==============Act Props===============", props)
  //console.log("HEADER_PROPS solo", location.pathname)

  const [formInfo, setFormInfo] = React.useState({
    address: "",
  });

  //const newRef = useRef();
  const locationFromHook = useLocation();
  //const {LookupScrollToRef, LookupInputRef} = ref;
  const {LookupScrollToRef} = ref
  const {LookupInputRef} = ref
  const [searchButtonActive, setSearchButtonActive] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [showStatusSpinner, setShowStatusSpinner] = React.useState(false);
  const [lastTermSearched, setLastTermSearched] = React.useState("");
  const [firstSuggestedAddress, setFirstSuggestedAddress] = React.useState('')
  const [coordinates, setCoordinates] = React.useState({ lat: "", lng: "" });
  const [showCards, setShowCards] = React.useState(false);
  //const [showLetter, setShowLetter] = React.useState(false);
  //const [showOffer, setShowOffer] = React.useState(true);
  const [addressLineOne, setAddressLineOne] = React.useState("");
  const [addressLineTwo, setAddressLineTwo] = React.useState("");
  const [resultFromFlorida, setResultFromFlorida] = React.useState("true");
  const [sendButtonClass, setSendButtonClass] = React.useState("button error");
  const sendButtonRef = useRef(null);
  

  const [sendEmailsToRepFlashMsg, setSendEmailsToRepFlashMsg] = React.useState("");
  const [successFlag, setSuccessFlag] = React.useState(true);
  const scrolll = props.executeScrollForLookupSectionTwo;
  const myRef = useRef(null)
  const addressInputRef = useRef(null)

  const [recaptchaResponse, setRecaptchaResponse] = React.useState("");
  const [whichTabIsActive, setWhichTabIsActive] = React.useState(1);

  const [isLoading, setIsLoading] = React.useState(false);

  const [isButtonLoading, setIsButtonLoading] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(false);
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

  const [results, setResults] = React.useState( {"one": {}, "two": {} });


  


  // React.useEffect( () => {

  //   window.addEventListener('keydown', handleKeyDown);


  //   //selectFirstOnEnter(LookupInputRef)
  //   return () => {

  //     window.removeEventListener('keydown', handleKeyDown);

  //   };

  // }, []);


  
  

  function loginFromDeadEnd(e) {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    props.setLoginClicked(true);
    props.setOpenSideMenu(false);
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

  //search options for 'react places autocomplete
  const searchOptions = {
    componentRestrictions: { country: ["us"] },
  };

  //address selected from dropdown box///////////////////  HANDLE_SELECT  /////////
  const handleSelect = (address, pid, suggestion) => {

    console.log("handle select start ----------------------------------")
    console.log("addressSELECT^^^^^", suggestion.formattedSuggestion.mainText)
    console.log("addressSELECT22222", suggestion.formattedSuggestion.secondaryText)
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
        setShowStatusSpinner(false);
        console.error("Error", error);
      });

      console.log("handle select end ----------------------------------")
  };

  

  ///SEARCH BUTTON CLICKED///////////////////////////////// HANDLE_ADD  //////////
  const handleAdd = (e) => {

    console.log("HANNNDLLLE ADDDDDDD starrrrtttt =============================")
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

      setShowStatusSpinner(true);

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
                setShowStatusSpinner(false);
                //props.setShowStatusCheck(true)
                setShowCards(true);

                //props.setBullet1("COMPLETED")

                setResults(data);

                setResultFromFlorida(data.one.resultFromFlorida.toString());
                console.log("emailll", data.one.email)
              

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
            setShowStatusSpinner(false);
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
            setShowStatusSpinner(false);
            //props.setShowStatusCheck(true)
            setShowCards(true);

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

    console.log("HANNNDLLLE ADDDDDDD end =============================")
  };

  ////////////////////////////////////////////////   VALID_FORM  //////
  const validForm = () => {
    if (formInfo.address == "") {
      setStatus("Enter an address.");
      //props.setShowStatusCheck(false)

      setTimeout(() => {
        setStatus("");
      }, 2000);

      return false;
    } else if (formInfo.address == lastTermSearched) {
      setStatus("Enter a different address.");
      //props.setShowStatusCheck(false)
      return false;
    } else {
      return true;
    }
  };

  const handleChange2 = (event) => {
    console.log("handle change 222 start @@@@@@@@@@@@@@@@@@@@@@@@@@@@");

    //resets search if user erases first search term
    if (event != lastTermSearched) {
      setStatus("");
      //setShowStatusCheck(false)
    }

    setFormInfo({
      address: event,
    });

    //if (!formInfo.address ){

    //  setSearchButtonActive( true)
    //} else{

    //  setSearchButtonActive( false)

    //}

    console.log("handle change 222 end @@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  };

  // function showLetterFunction() {
  //   setShowCards(false);
  //   setShowLetter(true);
  //   console.log("triggerrrrrrr");
  // }

  function sendLetterFunction() {
    console.log("send?LetterFunct$#%Ton");
  }

  function resetSearch(e) {
    e.preventDefault();
    setShowCards(false);
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
      setFlashMsg('please login first')
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
        //setShowOffer(true);
        console.log("b44444 scroLL")
        myRef.current.scrollIntoView();
        console.log("bAFTER scroLL")

      }, 3500);
    }
  };

  

  const GetHeader = () => {

    console.log("getHeader start &&&&&&&&&&&&&&&&&&&&&&")
    console.log(results)

    if (whichTabIsActive === 1){
    
      if (results.one.chamber !== undefined && results.one.chamber == "Senate"){

        if(results.one.lastName != ""){

          return <h3>Dear Senator {results.one.lastName} </h3>
        
        }else{
          
          return <h3>Dear Senator {results.one.name} </h3>
  
        }

      }else if (results.one.chamber !== undefined && results.one.chamber == "House"){

        if(results.one.lastName != ""){

          return <h3>Dear Representative {results.one.lastName} </h3>
        
        }else{
          
          return <h3>Dear Representative {results.one.name} </h3>

        }  
      }else{

        return null
      }
    
    }else if (whichTabIsActive === 2){

      if (results.two.chamber !== undefined && results.two.chamber == "Senate"){

        if(results.two.lastName != ""){

          return <h3>Dear Senator {results.two.lastName} </h3>
        
        }else{
          
          return <h3>Dear Senator {results.two.name} </h3>
  
        }

      }else if (results.two.chamber !== undefined && results.two.chamber == "House"){

        if(results.two.lastName != ""){

          return <h3>Dear Representative {results.two.lastName} </h3>
        
        }else{
          
          return <h3>Dear Representative {results.two.name} </h3>

        }  
      }else{

        return null
      }
    }else{
      return null
    }
    
    

    

  }


  const HandleButtonTabOne = (e) => {

    console.log(e.target.value);

    if (whichTabIsActive !== 1){

      setWhichTabIsActive(1)
    }

  }

  const HandleButtonTabTwo = (e) => {
    console.log(e.target.value);
    if (whichTabIsActive !== 2){

      setWhichTabIsActive(2)
    }
    
  }


  if (locationFromHook.pathname === "/edit"){

    return null

  }


  var selectFirstOnEnter = (input) => {  // store the original event binding function
    var _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;
    function addEventListenerWrapper(type, listener) {  // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected, and then trigger the original listener.
        if (type == "keydown") { 
            var orig_listener = listener;
            listener = function(event) {
                var suggestion_selected = $(".pac-item-selected").length > 0;
                if (event.which == 13 && !suggestion_selected) { 
                    var simulated_downarrow = $.Event("keydown", {keyCode: 40, which: 40}); 
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
  }

  


  return (
    <ActWrapper ref={LookupScrollToRef} >
      <BGimage src={actBackground} ref={myRef}></BGimage>

      <ActGrid >

        <ActSection showCards={showCards}>

          <ProgressBarz >

            <StepOne/>
            <StepTwo showCards={showCards}/>
            <StepThree showCards={showCards}/>

          </ProgressBarz>

          <ActHeader showCards={showCards}>
            ACT NOW
          </ActHeader>

          <ActSubheader showCards={showCards}>
          Find your Florida State Representatives and let them know you want to legalize marijuana ASAP. What if you could do this in just a few clicks?{" "}
          </ActSubheader>

          <ActSubheader2 showCards={showCards}>
          Enter your address below to see who your Florida State Representitives.{" "}
          </ActSubheader2>

          <Form
            className="form-inline"
            onSubmit={handleAdd}
            showCards={showCards}


          >
            <PlacesAutocomplete
              value={formInfo.address}
              onChange={handleChange2}
              onSelect={handleSelect}
              
              searchOptions={searchOptions}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div
                  style={{
                    width: "100%",
                    border: "medium none !important",
                    margin: "0 0 10px",
                    minWidth: "100%",
                    padding: "50",
                    zIndex: "1000",
                    gridArea: "input",
                    position: "relative",
                    overflow: "visible",
                  }}
                >
                  <Button
                    searchButtonActive={searchButtonActive}
                    disabled={false}
                    type="submit"
                    className="btn btn-primary"
                  >
                    {" "}
                  </Button>

                  <input
                    {...getInputProps({
                      placeholder: "123 Main St, Miami FL, 33155",
                      className: "location-search-input",
                      type: "text",
                      tabIndex: "1",
                      className: "form-control",
                      name: "address",
                      onFocus: activateField,
                      onBlur: disableField,
                      ref: LookupInputRef,
                    })}
                    style={{
                      width: "100%",
                      height: "40px",
                      boxShadow:
                        "0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)",
                      border: "honeydew",
                      display: "block",
                      paddingLeft: "10px",
                      fontSize: "12px",
                      borderRadius: "5px",
                      outline: "none",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      zIndex: "1000",
                      borderBottom: "honeydew",
                      borderLeft: "honeydew",
                      borderRight: "honeydew",
                      borderTop: "1px solid #e6e6e6",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      backgroundColor: "#FFF",
                      fontSize: ".7em",
                      borderRadius: "0 0 2px 2px",
                    }}
                  >
                    {loading && <div>Loading...</div>}
                    
                    {/* {console.log("mainSuggestion", suggestions)} */}
                    {suggestions.map((suggestion) => {
                      
                      
                      
                      
                      setFirstSuggestedAddress(suggestions.values().next().value.description)
                      

                      // console.log("Suggggestion are" + JSON.stringify(suggestion))
                      //props.setFirstMatch(suggestions.values().next().value.description)



                      
                      
                      const style = suggestion.active
                        ? { backgroundColor: "#5FCC61", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };

                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          <ResultSpan>{suggestion.description}</ResultSpan>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>

            <StatusHolder>
              <StatusBar>
                <Span status={status}> {status}</Span>
              </StatusBar>

              <StatusSpinner showStatusSpinner={showStatusSpinner}>
                <Spinner name="wave" color="#87d388" />
              </StatusSpinner>
            </StatusHolder>
          </Form>
          {/* <FindMyRep
            showCards={showCards}
            showLetter={showLetter}
            type="submit"
            name="submint"
          >
            Lookup my Representatives
          </FindMyRep> */}
          <Mega showCards={showCards} src={mega}></Mega>
        </ActSection>


        <ResultSection showCards={showCards}>

          <ResultSectionInfoBox>

            <ProgressBarzResultSection >

              <StepOne/>
              <StepTwo showCards={showCards}/>
              <StepThree showCards={showCards}/>

            </ProgressBarzResultSection>

            <ResultCompleteTitle>

              Results

            </ResultCompleteTitle>









          </ResultSectionInfoBox>

          {/* <ResultSectionSpacerLine/> */}
{/*
          <ResultSectionHeaders gridArea="3/2/4/5" gridAreaTablet="3/2/4/5">Your elected officials</ResultSectionHeaders> */}

          {/* <ResultSectionHeadersAlt
            gridArea="3/6/4/7"
            gridAreaTablet="5/2/6/5"
            resultFromFlorida={resultFromFlorida}
            showCards={showCards}
          >
            Send Personalized Email

          </ResultSectionHeadersAlt> */}

          <CardOne>
            <CardOneWrapper>


                <CardPicture
                  src={results.one.image ? results.one.image : ""} >
                </CardPicture>


              <CardTemplate src={cardTemplate}></CardTemplate>

              <CardNameOfRep>
                {results.one.name ? results.one.name : ""}
              </CardNameOfRep>

              <CardOneSub>{results.one.fullDistrictTrunk}</CardOneSub>
            </CardOneWrapper>
          </CardOne>

          <CardTwo>
            <CardTwoWrapper>


                <CardPicture
                  src={results.two.image ? results.two.image : ""}>
                </CardPicture>





              <CardTemplate src={cardTemplate}></CardTemplate>

              <CardNameOfRep>
                {results.two.name ? results.two.name : ""}
              </CardNameOfRep>

              <CardTwoSub>{results.two.fullDistrictTrunk}</CardTwoSub>
            </CardTwoWrapper>
          </CardTwo>







        <ResultsBlurb>

          because it has proven to help certain illnesses including glaucoma, sclerosis, and cancers such as breast and brain cancer. Prohibition has only cost billions of dollars and studies prove that it has not affected the use of marijuana,
        </ResultsBlurb>



          <TriplePlayWrapper resultFromFlorida={resultFromFlorida}
              showCards={showCards}>
            <Letter
              resultFromFlorida={resultFromFlorida}
              showCards={showCards}
            >
              <ButtonTabWrapper>
                <ButtonTabOne value={1} whichTabIsActive = {whichTabIsActive} onClick={HandleButtonTabOne}>Email One</ButtonTabOne>
                <ButtonTabTwo value={2} whichTabIsActive = {whichTabIsActive} onClick={HandleButtonTabTwo}>Email Two</ButtonTabTwo>
              </ButtonTabWrapper>

              {/* <div className="LetterTopOverlay"></div>
              <div className="LetterSideOverlay"></div>
              <div className="LetterSideOverlay2"></div> */}

              {/* <img
                src={results.one.image ? results.one.image : samplepic}
                className="miniPic1"
              />
              <img
                src={results.two.image ? results.two.image : samplepic}
                className="miniPic2"
              /> */}

              {/* <div className="LetterRecipientsWrapper">
                <h1>recipients</h1>
                <h2 className="email1">{results.one.email}</h2>
                <h2 className="email2">{results.two.email}</h2>
              </div> */}

              <GetHeader/>

              <p>
                I am a constituant of (
                <i>
                  <b style={{ fontSize: ".8em" }}>
                    {results.one.fullDistrict}, {results.one.fullDistrict}
                  </b>
                </i>
                ). I am writing on behalf of legalizing marijuana to all above the
                age of eighteen. Marijuana is as much a recreational drug as
                alcohol, tobacco, and even coffee. Marijuana has never had a
                report of fatal use and the common use for medical purposes has
                been proved and even infused into society today. Many states today
                have legalized it's medical purposes because it has proven to help
                certain illnesses including glaucoma, sclerosis, and cancers such
                as breast and brain cancer. Prohibition has only cost billions of
                dollars and studies prove that it has not affected the use of
                marijuana, in fact it has made it cheaper and more accessible. All
                the money used for prosecution of small offenders can be used for
                tax revenues and ultimately save billions.
              </p>

              <div className="closing">
                Sincerely, <br />
                <sub>Your Name Here</sub> <br />
                <sub>Your Email Here</sub> <br />
              </div>





              <FlashError userState={props.userState}>
                ** Please{" "}
                <a href="#" onClick={loginFromDeadEnd}>
                  Login
                </a>{" "}
                or{" "}
                <a href="#" onClick={props.executeScrollForSection2}>
                  Signup
                </a>{" "}
                to continue.
              </FlashError>
              {/* <FlashSuccess userState={props.userState} successFlag={successFlag}>
                Email sent!!
              </FlashSuccess> */}
            </Letter>
            <OfferOne>
              <h1>Email</h1>
              <RiMailSendLine
                style={{
                  gridArea: "2/1/3/3",
                  justifySelf: "center",
                  margin: "20px 0 0 0",
                  width: "50px",
                  height: "50px"
                }}/>

              <BulletPoint/>
              <BulletPointText>
                email will be sent to each of your representatives on your behalf
              </BulletPointText>
              <h2>Free</h2>

              <h4>{sendEmailsToRepFlashMsg}</h4>

              <SendButtonWrapper>
                

                <Button_Loading
                  
                  onClick={() => {
                    
                    if (recaptchaResponse == "" || recaptchaResponse == null) {
                      
                      setSendEmailsToRepFlashMsg("Please check robot checkbox");

                    }else{
                      setIsButtonLoading(true);
                      
                      //ajax call to rails (lookup#sendEmailsToReps)
                      sendEmailsToReps(setIsButtonLoading, results, setSendEmailsToRepFlashMsg, recaptchaResponse);

                    }
                  }}
                  
                  isLoading={isButtonLoading}

                  showLoader={showLoader}

                  setShowLoader={setShowLoader}

                  
                >
                 
                 Send Emails
                
                </Button_Loading>




              </SendButtonWrapper>

              <ReCAPTCHA
                sitekey="6LdE3NgdAAAAADcnYdc8T-d61yIGGVCwNl3sdfc6"
                onChange={onChange}
                style={{gridArea: "7/1/8/3", background: "white", justifySelf: "center", margin: "10px 0px 20px 0px"}}
                size="compact"


              />

            </OfferOne>

            <OfferTwo>
              <h1>Letter</h1>
              <BsMailbox
                style={{
                  gridArea: "2/1/3/3",
                  justifySelf: "center",
                  margin: "24px 0 0 0",
                  width: "45px",
                  height: "45px"
                }}/>

              <BulletPoint/>
              <BulletPointText>
                a printed letter will be mailed to each of your representatives
                via United States Postal Service
              </BulletPointText>
              <h2>$2.99</h2>

              <ShowOfferSection>
                <PayPalButtons
                  style={{"layout":"vertical"}}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "2.99",
                                }
                            }
                        ]
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                        console.log("STATUS = " + details.status)
                        console.log("name: " + details.payer.name.given_name + " " + details.payer.name.surname );
                        console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.address_line_1));
                        console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.address_line_2));
                        console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.admin_area_2));
                        console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.admin_area_1));
                        console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.postal_code));
                        console.log("address: " + JSON.stringify(details.purchase_units[0].shipping.address.country_code));

                    });
                  }}




                />
              </ShowOfferSection>



            </OfferTwo>


          </TriplePlayWrapper>



          <ShowLetterDeadEnd
            resultFromFlorida={resultFromFlorida}
            showCards={showCards}
          >
            Unfortunately, emailing officials through FloridaBlaze is only
            available in Florida.
            <a href="#" onClick={resetSearch}>
              Try another search.
            </a>
          </ShowLetterDeadEnd>

        </ResultSection>

        {/* <OfferSection>



        </OfferSection> */}


      </ActGrid>

      
<h1>{lastTermSearched}</h1>

    </ActWrapper>
  );
}


const Wtf = React.forwardRef(Act);
export default Wtf;

