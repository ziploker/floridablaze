import React, { useEffect, useState, useRef, useCallback } from "react"
import styled, { ThemeProvider } from "styled-components"
//import { Parallax, Background } from 'react-parallax';
//import "../../assets/stylesheets/dotStyles.scss";
import Login from "./pages/login"
import defaultImage from "../../assets/images/defaultImage.jpg"
//import slugify from "react-slugify";
import { Link } from "react-router-dom"
import scrollArrow from "../../assets/images/scroll-arrow.png"
import axios from "axios"
import { gsap } from "gsap"
//import { Draggable } from "gsap/all";
import { _parseRelative } from "gsap/gsap-core"
import "../../assets/stylesheets/home_story_spinner.scss"
import "../../assets/stylesheets/dotS.css"
import Carousel, { CarouselItem } from "./carousel"
import debounce from "debounce"

//import Dots from "react-carousel-dots";

//
//
//
//
//
//

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////                    ////////////////////////
///////////////   HOME             ////////////////////////
///////////////                    ////////////////////////
///////////////////////////////////////////////////////////

function Home(props) {
	console.log("==============Home===============")
	console.log("==============Home Props===============", props)

	//
	//
	//
	//

	return <h1>WWWTTTFFFF</h1>
}

export default Home
