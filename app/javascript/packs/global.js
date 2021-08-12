import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";

//light blue   #56c5cc 	(86,197,204)
//pink         #f14f7b 	(241,79,123)
//orange       #f7aa1c 	(247,170,28)
//darkblue     #000321 	(0,3,33)
//black        #000000 	(0,0,0)

const GlobalStyles = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -o-font-smoothing: antialiased;
    font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

    //position: relative;
    //overflow-x: hidden;
  }

  a, a:active, a:focus{

    outline: none; /* Works in Firefox, Chrome, IE8 and above */ 

  }
  
  html{
    margin: 0;
    padding: 0;
    //overflow-y: scroll;
    width: 100%;
    height: 100%

  }

  
  
  
  
  body {
    
    font-family: 'Roboto', 'sans-serif', 'serif';
    overflow-x: hidden;
    //position: relative;
    /*overflow-y: scroll;*/
    //padding: 0px 10px 0px;
    //font-size: calc(14px + (24 - 14) * ((100vw - 300px) / (1600 - 300)));
    //line-height: calc(1.3em + (1.5 - 1.2) * ((100vw - 300px)/(1600 - 300)));
    background-color: #f4f4f4;

    padding: 0px;
    margin: 0px;
    font-size: 17px;
    color: #333333;

    
    

  }

  body:not(.user-is-tabbing) button:focus,
  body:not(.user-is-tabbing) input:focus,
  body:not(.user-is-tabbing) select:focus,
  body:not(.user-is-tabbing) textarea:focus {
    outline: none;
  }
  
  *, *::after, *::before {
    box-sizing: border-box;
  }
  

  a{

    text-decoration: none;
    color: black;
    text-align: center;
    
  } 





  
  
  
`;

export default (props) => <GlobalStyles {...props} />;
