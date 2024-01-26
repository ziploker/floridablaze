import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
//light blue   #56c5cc 	(86,197,204)
//pink         #f14f7b 	(241,79,123)
//orange       #f7aa1c 	(247,170,28)
//darkblue     #000321 	(0,3,33)
//black        #000000 	(0,0,0)

const GlobalStyles = createGlobalStyle`
//@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@800&family=PT+Serif&display=swap");

  /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document
   ========================================================================== */

/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
  //font-smoothing: antialiased;
  text-rendering: optimizeLegibility;

  //position: relative;
  //overflow-x: hidden;
}

html {
  margin: 0;
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/* Sections
   ========================================================================== */

/**
 * Remove the margin in all browsers.
 */

body {
  margin: 0 auto;
  max-width: 2000px;
  min-width: 269px;
  body:not(.user-is-tabbing) button:focus,
  body:not(.user-is-tabbing) input:focus,
  body:not(.user-is-tabbing) select:focus,
  body:not(.user-is-tabbing) textarea:focus {
  outline: none;
}
}

/*
 Render the main element consistently in IE.
 */

main {
  display: block;
}

a,
a:active,
a:focus {
  outline: none; /* Works in Firefox, Chrome, IE8 and above */
}

/*
  Correct the font size and margin on h1 elements within section and
 article contexts in Chrome, Firefox, and Safari.
 */

h1 {
  
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Fira Sans' !important;
  font-weight: 800;
}

/* Grouping content
   ========================================================================== */

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd em font sizing in all browsers.
 */

pre {
  font-size: 1rem; /* 2 */
}

/* Text-level semantics
   ========================================================================== */

/**
 * Remove the gray background on active links in IE 10.
 */

a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd em font sizing in all browsers.
 */

code,
kbd,
samp {
  font-size: 1rem; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */

small {
  font-size: 80%;
}

/**
 * Prevent sub and sup elements from affecting the line height in
 * all browsers.
 */

sub,
sup {
  font-size: 1rem;
  //line-height: 0;
  //position: relative;
  //vertical-align: baseline;
  padding: 0 50px;
  font-weight: bold;
}

sub {
  //bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
   ========================================================================== */

/**
 * Remove the border on images inside links in IE 10.
 */

img {
  border-style: none;
}

/* Forms
   ========================================================================== */

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input { /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

button,
select { /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 */

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from fieldset elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    fieldset elements in all browsers.
 */

legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */

textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

[type="search"] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to inherit in Safari.
 */

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/* Interactive
   ========================================================================== */

/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */

details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */

summary {
  display: list-item;
}

/* Misc
   ========================================================================== */

/**
 * Add the correct display in IE 10+.
 */

template {
  display: none;
}

/**
 * Add the correct display in IE 10.
 */

[hidden] {
  display: none;
}


.pac-item span:not(:first-child) {
	font-size: 36px;
	color: rgb(61, 61, 61);
}

.pac-item {
	padding: 10px 0;
}

p{

  font-family: 'PT Serif';
}
















/* ############  EDIT STYLES ############### */



#activity td {
	text-align: center;
	vertical-align: middle;
	padding-top: 12px;
	padding-bottom: 12px;
}
#activity th {
	background-color: #0000006e;
	border: 1px solid #ddd;
	color: white;
	text-align: center;
	vertical-align: middle;
}

#activity tr:nth-child(even) {
	background-color: #f2f2f2;
}

#activity tr:not(:first-child) {
	cursor: pointer;
}
#activity tr:hover {
	background-color: #ddd;
}

.recipients {
	@media only screen and (max-width: 420px) {
		display: none;
	}
}

.totalprice {
	@media only screen and (max-width: 295px) {
		display: none;
	}
}
//spinner for when loading data

.lds-spinner {
	color: official;
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
}
.lds-spinner div {
	transform-origin: 40px 40px;
	animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
	content: " ";
	display: block;
	position: absolute;
	top: 3px;
	left: 37px;
	width: 6px;
	height: 18px;
	border-radius: 20%;
	background: rgb(15, 15, 15);
}
.lds-spinner div:nth-child(1) {
	transform: rotate(0deg);
	animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
	transform: rotate(30deg);
	animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
	transform: rotate(60deg);
	animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
	transform: rotate(90deg);
	animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
	transform: rotate(120deg);
	animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
	transform: rotate(150deg);
	animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
	transform: rotate(180deg);
	animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
	transform: rotate(210deg);
	animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
	transform: rotate(240deg);
	animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
	transform: rotate(270deg);
	animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
	transform: rotate(300deg);
	animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
	transform: rotate(330deg);
	animation-delay: 0s;
}
@keyframes lds-spinner {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}


/* ############  HOME STORY SPINNER ################ */


.loader,
.loader:before,
.loader:after {
	background: #ffffff;
	-webkit-animation: load1 1s infinite ease-in-out;
	animation: load1 1s infinite ease-in-out;
	width: 1em;
	height: 4em;
}
.loader {
	color: #ffffff;
	text-indent: -9999em;
	margin: 88px auto;
	position: relative;
	font-size: 11px;
	-webkit-transform: translateZ(0);
	-ms-transform: translateZ(0);
	transform: translateZ(0);
	-webkit-animation-delay: -0.16s;
	animation-delay: -0.16s;
}
.loader:before,
.loader:after {
	position: absolute;
	top: 0;
	content: "";
}
.loader:before {
	left: -1.5em;
	-webkit-animation-delay: -0.32s;
	animation-delay: -0.32s;
}
.loader:after {
	left: 1.5em;
}
@-webkit-keyframes load1 {
	0%,
	80%,
	100% {
		box-shadow: 0 0;
		height: 4em;
	}
	40% {
		box-shadow: 0 -2em;
		height: 5em;
	}
}
@keyframes load1 {
	0%,
	80%,
	100% {
		box-shadow: 0 0;
		height: 4em;
	}
	40% {
		box-shadow: 0 -2em;
		height: 5em;
	}
}



/* ###########  LIKES  ######################### */
  

.ziploker{

fill: white
}



.selected{

svg{

    #layer1 path:nth-child(2){

        fill:#2ef00a2b;
    }

    #layer1 path:nth-child(3){

        fill: rgb(46, 240, 10);
    }
}
}

//#f0200a2b;

//#f00a0a;



.down_vote_selected{

svg{

    #layer11 path:nth-child(2){

        fill:#f0200a2b;
    }

    #layer11 path:nth-child(3){

        fill: #f00a0a;
    }
}
}



/* ############### RELPLY FORM ######################3 */



.replyFormHidden{

z-index: -1;

opacity: 0;
height: 0px;
min-height: 0px;

transition: all 197ms ease;

top: -100px;
display: grid;
//display: grid;

position: relative;
grid-template-columns: minmax(min-content, max-content) 1fr;
grid-template-rows: minmax(50px, 1fr) minmax(min-content, max-content);
grid-template-areas:

"main_comment_img      main_comment_body  "
"main_comment_img     main_comment_buttons";


margin: 0px 50px 0px 25px;
//min-height: 100px;

//top: -100px;
//left: 0;
background-color: F4F4F4;
//padding: 20px;


img {
  width: 25px;
  height: 25px;
  grid-area: avatar;
  margin: 1px 10px 0px 0px;
  border-radius: 50%;
  border: 1px solid gray;


 grid-Area: main_comment_img;
  
}



}





.replyForm{

z-index: initial;
opacity: 1;
height: initial;
min-height: 100px;
top: 7px;

margin: 0px 50px 15px 25px;



}






// z-index: ${props => props.rows[props.commentid] == "true" ? "1" : "-1"};

//   opacity: ${props => props.rows[props.commentid] == "true" ? "1" : "0"};

//   height: ${props => props.rows[props.commentid] == "true" ? "initial" : "0px"};
//   min-height: ${props => props.rows[props.commentid] == "true" ? "100px" : "0px"};



//   top: ${props => props.rows[props.commentid] == "true" ? "7px" : "-100px"};
//   transition: all .05s ease 0s;




/* ################# SENDBUTTONB ###############################3 */


$button-width: 157.8px;
$spinner-width: calc(#{$button-width}/6);
$blue: #0076d3;
$btn-bg: #ffc439;
$text-light: #fefefe;

@import url(https://fonts.googleapis.com/css?family=Space+Mono);

//*{ box-sizing: border-box;}


//media (min-width: 780px){
//  .wrapper {
//    width: 600px;
//    display: grid;
//    grid-template-columns: repeat(2, [col] calc(100%/2) );
//    grid-auto-rows: 120px;
//    //margin: 30px auto 40px;
//  }
//}




.button{

  @media only screen and (max-width: 400px){

    width: 100%;
    min-width: inherit;


  }
  display: inline-block;
  min-width: $button-width;
  height: 35px;
  line-height: 0;
  color: black;
  margin: 0 5px 0px 0px;
  background: $btn-bg;
  //color: $text-light;
  font-size: 1.1rem;
  padding: 1em;
  border-radius: 4px;
  text-align: center;
  position: relative;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  border: 10;
  transition: border-radius linear 0.05s, width linear 0.05s;

  
  &:focus{
    outline: 0;
  }
  
  &.animate{
    //width: $button-width/2.2;
    width: calc(#{$button-width}/2.2);
    //height: calc(#{$button-width}/2.2);
    height: 71px;
    min-width: 0;
    border-radius: 50%;
    color: transparent;
    margin-right: 35px;
    
    &:after{
      position: absolute;
      content: '';
      width: $spinner-width;
      height: $spinner-width;
      border: 4px solid $text-light;
      border-radius: 50%;
      border-left-color: transparent;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      animation: spin ease-in 2.5s forwards;
      animation-name: spin;
      -webkit-animation-name: spin; 
      transition-timing-function:ease-in-out;
      -webkit-transition-timing-function: ease-in-out;
      animation-duration: 2.5s;
      -webkit-animation-duration: 2.5s;
      animation-fill-mode: forwards;
      -webkit-animation-fill-mode: forwards;
    }

    &.success:before{
      position: absolute;
      content: '';
      width: $spinner-width;
      //height: $spinner-width/2;
      height: calc(#{$spinner-width}/2);
      border: 4px solid $text-light;
      border-right: 0;
      border-top: 0;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%) rotate(0deg) scale(0);
      transform: translate(-50%, -50%) rotate(0deg) scale(0);
      -webkit-animation: success ease-in 0.15s forwards;
      animation: success ease-in 0.15s forwards;
      animation-delay: 2.5s;
    }
    
    &.error{
      position: relative;
      -webkit-animation: vibrate ease-in 0.5s forwards;
      animation: vibrate ease-in 0.5s forwards;
      -webkit-animation-delay: 2.5s;
      animation-delay: 2.5s;
     
      &:before{
        color: #fff;
        position: absolute;
        content: '!';
        font-size: 1.8rem;
        font-weight: bold;
        text-align: center;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%) scale(0);
        transform: translate(-50%, -50%) scale(0);
        -webkit-animation: error ease-in 0.5s forwards;
        animation: error ease-in 0.5s forwards;
        animation-delay: 2.5s;
      }
    }
  }
}

    
@keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg) scale(1);}
    90% { transform: translate(-50%, -50%) rotate(1080deg) scale(1); }
    100% { transform: scale(0); }
    }

@-webkit-keyframes spin {
  0% {-webkit-transform: translate(-50%,-50%) rotate(0deg) scale(1);}

  98% {-webkit-transform: translate(-50%,-50%) rotate(1080deg) scale(1);}

  100% {-webkit-transform: translate(-50%,-50%) rotate(1080deg) scale(0);}
}
    
@keyframes success{
    from {
       transform: translate(-50%, -50%) rotate(0) scale(0);
       }
    to {
      transform: translate(-50%, -50%) rotate(-45deg) scale(1);
    }
}

@-webkit-keyframes success{
    from {
       -webkit-transform: translate(-50%, -50%) rotate(0) scale(0);
       }
    to {
      -webkit-transform: translate(-50%, -50%) rotate(-45deg) scale(1);
    }
}

@keyframes error {
    from { 
    transform: translate(-25%, -25%) scale(0);
    }
    to { 
    transform: translate(-25%, -25%) scale(1);
    background-color: #f44336;
    }
}

@-webkit-keyframes error {
    from { 
    -webkit-transform: translate(-25%, -25%) scale(0);
    }
    to { 
    -webkit-transform: translate(-25%, -25%) scale(1);
    background-color: #f44336;
    }
}


@keyframes vibrate {
    0%, 30%, 60%, 85%, 100% { 
      left: 0;
      background-color: #f44336;
    }
    10%, 40%, 90%, 70% { 
      left: -2px;
      background-color: #f44336;
    }
    20%, 50%, 80%, 95% { 
      left: 2px;
      background-color: #f44336;
    }
}



/* ####################  SIGNUP ######################### */
  

  /* Shared */
.loginBtn {
	box-sizing: border-box;
	position: relative;
	width: 0px;
	margin: 0.2em;
	padding: 0 80px 0 45px;
	border: none;
	text-align: left;
	line-height: 34px;
	white-space: nowrap;
	border-radius: 0.2em;
	font-size: 14px;
	color: #fff;
}
.loginBtn:before {
	content: "";
	box-sizing: border-box;
	position: absolute;
	top: 0;
	left: 0;
	width: 34px;
	height: 100%;
}
.loginBtn:focus {
	outline: none;
}
.loginBtn:active {
	box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
}

/* Facebook */
.loginBtn--facebook {
	grid-area: 2/2/3/3;
	justify-self: start;
	background-color: #4c69ba;
	background-image: linear-gradient(#4c69ba, #3b55a0);
	text-shadow: 0 -1px 0 #354c8c;
}
.loginBtn--facebook:before {
	border-right: #364e92 1px solid;
	background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png") 6px 6px
		no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
	background-color: #5b7bd5;
	background-image: linear-gradient(#5b7bd5, #4864b1);
}

/* Google */
.loginBtn--google {
	justify-self: end;
	grid-area: 2/1/3/2;
	background: #dd4b39;
	height: " 35px";
}
.loginBtn--google:before {
	border-right: #bb3f30 1px solid;
	background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png") 6px 6px
		no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
	background: #e74b37;
}











/* ################## TIPTAP    ############################## */

/* Basic editor styles */
.ProseMirror {
	> * + * {
		margin-top: 0.75em;
	}

	ul,
	ol {
		padding: 0 1rem;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		line-height: 1.1;
	}

	code {
		background-color: rgba(#616161, 0.1);
		color: #616161;
	}

	pre {
		background: #0d0d0d;
		color: #fff;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;

		code {
			color: inherit;
			padding: 0;
			background: none;
			font-size: 0.8rem;
		}
	}

	img {
		max-width: 100%;
		height: auto;
	}

	blockquote {
		padding-left: 1rem;
		border-left: 2px solid rgba(#0d0d0d, 0.1);
	}

	hr {
		border: none;
		border-top: 2px solid rgba(#0d0d0d, 0.1);
		margin: 2rem 0;
	}
}

`;

export default (props) => <GlobalStyles {...props} />;
