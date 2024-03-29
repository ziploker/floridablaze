import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";

import '../../../node_modules/modern-normalize/modern-normalize.css';

//light blue   #56c5cc 	(86,197,204)
//pink         #f14f7b 	(241,79,123)
//orange       #f7aa1c 	(247,170,28)
//darkblue     #000321 	(0,3,33)
//black        #000000 	(0,0,0)

const GlobalStyles = createGlobalStyle`





@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth; /* Smoothly animate to different sections within a page, only if the user doesn't mind animations */
  }
}


/*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
  
  padding: 0;
  
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  text-rendering: optimizeLegibility;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
}
html{
  
  font-size: 100%;
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}
/*
  Typographic tweaks!
  3. Add accessible line-height
  4. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;

  max-width: 2000px;
  //min-width: 269px;
  body:not(.user-is-tabbing) button:focus,
  body:not(.user-is-tabbing) input:focus,
  body:not(.user-is-tabbing) select:focus,
  body:not(.user-is-tabbing) textarea:focus {
    outline: none;
  }
}
/*
  5. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
/*
  6. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}

/*
  8. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
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
  font-family: 'Fira Sans';
  font-weight: 400;
  overflow-wrap: break-word;
}

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

sub,
sup {
  //font-size: 1rem;
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



button,
input,
optgroup,
select,
textarea {
  //font-size: 100%; /* 1 */
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
	//font-size: 36px;
	//color: rgb(61, 61, 61);
}

.pac-item {
	padding: 10px 0;
}

p{

  font-family: 'PT Serif';
}

.pac-item span:not(:first-child) {
  font-size: 1.5rem !important;
  // color: rgb(61, 61, 61);
  //color: red;

  @media only screen and (max-width: 985px) {
    font-size: 3rem !important;
  }
}


.pac-item span:nth-child(3) {
	padding: 0 0 0 5px;
  font-size: 1rem !important;
  // color: rgb(61, 61, 61);
  //color: red;

  /* @media only screen and (max-width: 985px) {
    //font-size: 3rem !important;
    display: none;
  } */
}


/* @-ms-viewport{
  width: device-width;
} */




















`;

export default (props) => <GlobalStyles {...props} />;
