import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
//import { Parallax, Background } from 'react-parallax';
import Login from "./pages/login";
import defaultImage from "../../assets/images/defaultImage.jpg";
import slugify from "react-slugify";
import { Link } from "react-router-dom";
import scrollArrow from "../../assets/images/scroll-arrow.png";
import axios from "axios";
import { gsap } from "gsap";
import { Draggable } from "gsap/all";
import { _parseRelative } from "gsap/gsap-core";
import "../../assets/stylesheets/home_story_spinner.scss";
import Carousel, { CarouselItem } from "./carousel";
//import Dots from "react-carousel-dots";
import "../../assets/stylesheets/dots.css";

const HomeWrapper = styled.div`
  //background: pink;

  //height: calc(100vh - 85px);
  //max-height: 500px;
  overflow: hidden;
  //min-width: 500px;
`;

const News = styled.div`
  @media only screen and (min-width: 985px) {
    /* @media only screen and (max-width: 1111px) {
			//@media only screen and (max-width: 866px) {
			//margin-top: 0px;
			margin: 20px 10px 43px 10px;
			grid-template-columns: 1fr;
			//padding: 0px 20px;
			grid-gap: 10px;

			grid-template-rows: max-content max-content max-content max-content 1fr;
			grid-template-areas:
				"one"
				"two"
				"three"
				"four"
				".";
		} */

    //@media only screen and (min-width: 867px) and (max-width: 1111px) {

    /* grid-template-columns:
			minmax(20px, 1fr)
			minmax(200px, 600px)
			10px
			minmax(200px, 600px)
			minmax(20px, 1fr);

		grid-template-rows: auto 10px auto auto auto auto;
		grid-template-areas:
			"leftArrow      one   .   two   rightArrow"
			"leftArrow       .    .    .    rightArrow  "
			"leftArrow     three  .   four  rightArrow"
			"leftArrow     three  .   four  rightArrow"
			"leftArrow     three  .   four  rightArrow"
			"    .           .    .    .        .     "; */
    //}

    min-height: 100%;

    display: grid;
    justify-content: center;

    /* grid-template-columns:
			minmax(30px, 1fr) minmax(200px, 600px) minmax(10px, 1fr) minmax(
				200px,
				600px
			)
			minmax(10px, 1fr) minmax(200px, 600px) minmax(30px, 1fr);

		grid-template-areas:
			"leftArrow   one . two . three   rightArrow"
			"leftArrow   one . two . three   rightArrow"
			"leftArrow   one . two . three   rightArrow"
			"    .        .  .  .  .   .     ."; */

    grid-template-columns:
      minmax(30px, 50px) 1fr minmax(10px, 30px) 1fr
      minmax(30px, 50px);
    /* minmax(10px, 1fr) minmax(200px, 600px) minmax(30px, 1fr); */

    grid-template-areas:
      "leftArrow   one . two rightArrow"
      "leftArrow   one . two rightArrow"
      "leftArrow   one . two rightArrow"
      "    .        .  .  .      .     ";
    //grid-gap: 20px;

    margin-top: 30px;

    /* display: grid;
		justify-content: center;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-areas:
			"featured one two  ." */

    /* @media only screen and (min-width: 2000px){
			grid-template-columns: 10vw 1fr 1fr 1fr 10vw;

		} */

    /* @media only screen and (min-width: 1850px) {
			grid-template-columns:
				minmax(20px, 1fr) minmax(600px, 700px) minmax(600px, 700px)
				minmax(600px, 700px) minmax(20px, 1fr);
		} */
  }

  display: none;
`;

const LeftArrow = styled.img`
  max-width: 30px;

  position: relative;
  justify-self: end;
  align-self: center;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
`;

const LinkWrapper1 = styled(Link)`
  //grid-area: 1/1/3/2;
  //grid-area: one;
  grid-area: 1/1/-1/-1;
  //max-width: 600px;
  width: 100%;
  justify-self: center;
  display: grid;
  @media only screen and (min-width: 985px) {
    grid-area: one;
    width: 100%;
    justify-self: center;
    display: grid;
  }
`;

const LinkWrapper2 = styled(Link)`
  //grid-area: 1/1/3/2;
  //grid-area: two;
  grid-area: 1/1/-1/-1;
  //max-width: 600px;
  width: 100%;
  justify-self: center;
  display: grid;
  @media only screen and (min-width: 985px) {
    grid-area: two;
    width: 100%;
    justify-self: center;
    display: grid;
  }
`;

const LinkWrapper3 = styled(Link)`
  //grid-area: 1/1/3/2;
  //grid-area: three;
  grid-area: 1/1/-1/-1;
  //max-width: 600px;
  width: 100%;
  justify-self: center;
  display: grid;
  @media only screen and (min-width: 985px) {
    /* grid-area: three;
		width: 100%;
		justify-self: center;
		display: grid; */
    display: none;
  }
`;

const LinkWrapper4 = styled(Link)`
  display: none;
  @media only screen and (max-width: 1111px) {
    //grid-area: 1/1/3/2;
    //grid-area: four;
    grid-area: 1/1/-1/-1;
    //max-width: 600px;
    width: 100%;
    justify-self: center;
    display: grid;
  }
`;

const Div1 = styled.div`
  box-shadow: 0 2px 5px 0 rgba(227, 181, 90, 0.2);
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  display: grid;
  justify-self: center;
  //max-width: 600px;
  width: 100%;

  background-image: url(${(props) => props.imageURL});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: bottom center;

  &:before {
    content: "";
    display: block;
    height: 0;
    width: 0;
    padding-bottom: calc(9 / 16 * 100%);
  }

  &:hover {
    box-shadow: 0 0 0 5px #e3b55a;
    transition: box-shadow 80ms;
    border-radius: 4px;
    outline: none;
  }
`;

const Div2 = styled.div`
  box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  display: grid;
  justify-self: center;
  //max-width: 600px;
  width: 100%;

  background-image: url(${(props) => props.imageURL});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: bottom center;

  &:before {
    content: "";
    display: block;
    height: 0;
    width: 0;
    padding-bottom: calc(9 / 16 * 100%);
  }

  &:hover {
    box-shadow: 0 0 0 5px #e3b55a;
    transition: box-shadow 80ms;
    border-radius: 4px;
    outline: none;
  }
`;

const Div3 = styled.div`
  box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  display: grid;
  justify-self: center;
  //max-width: 600px;
  width: 100%;

  background-image: url(${(props) => props.imageURL});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: bottom center;

  &:hover {
    box-shadow: 0 0 0 5px #e3b55a;
    transition: box-shadow 80ms;
    border-radius: 4px;
    outline: none;
  }

  &:before {
    content: "";
    display: block;
    height: 0;
    width: 0;
    padding-bottom: calc(9 / 16 * 100%);
  }
`;

const Div4 = styled.div`
  @media only screen and (max-width: 1111px) {
    box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    display: grid;
    justify-self: center;
    //max-width: 600px;
    width: 100%;

    background-image: url(${(props) => props.imageURL});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: bottom center;

    &:hover {
      box-shadow: 0 0 0 5px #e3b55a;
      transition: box-shadow 80ms;
      border-radius: 4px;
      outline: none;
    }

    &:before {
      content: "";
      display: block;
      height: 0;
      width: 0;
      padding-bottom: calc(9 / 16 * 100%);
    }
  }

  display: none;
`;

const Div1OverlayWrapper = styled.div`
  pointer-events: none;
  word-break: break-all;
  //grid-area: one;
  grid-area: 1/1/-1/-1;
  border-radius: 10px;
  overflow: hidden;
  //max-width: 600px;
  width: 100%;
  height: 100%;
  justify-self: center;
  display: grid;
  z-index: 1;

  background: rgb(0, 0, 0);
  background: -moz-linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 10%,
    rgba(255, 145, 145, 0) 34%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 10%,
    rgba(255, 145, 145, 0) 34%
  );
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 10%,
    rgba(255, 145, 145, 0) 34%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#ff9191",GradientType=1);

  @media only screen and (min-width: 985px) {
    grid-area: one;
  }
`;

const Div2OverlayWrapper = styled(Div1OverlayWrapper)`
  //grid-area: two;
  grid-area: 1/1/-1/-1;

  @media only screen and (min-width: 985px) {
    grid-area: two;
  }
`;

const Div3OverlayWrapper = styled(Div1OverlayWrapper)`
  //grid-area: three;
  grid-area: 1/1/-1/-1;

  @media only screen and (min-width: 985px) {
    //grid-area: three;
    display: none;
  }
`;

const Div4OverlayWrapper = styled(Div1OverlayWrapper)`
  @media only screen and (max-width: 1111px) {
    //grid-area: four;
    grid-area: 1/1/-1/-1;
    display: inherit;
  }

  display: none;
`;

const StoryImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StoryOneTitle = styled.h1`
  //grid-area: 1 /1 /2/2;
  white-space: normal;
  font-size: 4vw;
  word-break: break-all;
  //align-self: end;
  //justify-self: start;
  //text-align: left;
  color: white;
  //line-height: 1em;
  //letter-spacing: 2px;
  //z-index: 1;
  padding: 0px 8px 8px 8px;
  width: 100%;
  //min-height: 100%;
  align-self: end;
  justify-self: center;
  text-align: center;
`;

const LeftArrowButton = styled.button`
  width: 100%;
  height: 100%;
  grid-area: leftArrow;
  align-self: center;
  justify-self: end;
  background: rgba(255, 255, 255, 0);
  border: 0;
  display: grid;

  z-index: 1;

  cursor: pointer;

  &:hover {
    background: rgba(54, 54, 54, 0.075);
  }
`;

const RightArrowButton = styled.button`
  //@media only screen and (min-width: 1111px) {
  width: 100%;
  height: 100%;
  grid-area: rightArrow;
  align-self: center;
  justify-self: start;
  background: rgba(255, 255, 255, 0);
  border: 0;
  display: grid;
  cursor: pointer;

  &:hover {
    background: rgba(54, 54, 54, 0.075);
  }
  //}

  //display: none;
`;

const RightArrow = styled.img`
  max-width: 30px;

  position: relative;
  justify-self: start;
  align-self: center;
`;

const StoryImageWrapper = styled.div`
  width: 100%;
  height: 0px;
  //min-height: 90px;
  //max-height: 300px;
  grid-area: 1 /1 /2 /2;
  padding-top: 60%;
  position: relative;

  /* @media screen and (min-width: 750px) and (max-width: 1111px){
        width: 100%;
        height: 100%;

        grid-area: picture;

        padding:0;

        align-self: center;
        justify-self: center;
        //border: 5px solid white;

    } */
`;

const StoryImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BackgroundGray = styled.div`
  @media only screen and (max-width: 866px) {
    display: none;
  }
  background: #c4c4c4;
  grid-area: 3/1/-1/-1;
  z-index: -1;
  padding: 75px 0px;

  /* @media only screen and (max-width: 1111px) {
		grid-area: 5/1/-1/-1;
	} */
`;

const ItemWrapper = styled.div`
  display: grid;
  width: 97%;
  margin: 0 auto;
`;

const MainDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: 250px;
`;

const SlidesContainer = styled.div`
  /* position: relative; */
  /* overflow: hidden; */
  /* display: flex; */
  /* flex: 1; */

  //height: 20%;
  width: 100%;
  background: #555;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const SlidesInner = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  /* display: grid;
  grid-template-columns: repeat(10, 1fr); */
`;

const Indicators = styled.div`
  display: grid;
  //grid-auto-flow: column;
  /* grid-template-columns: ${(props) =>
    `repeat(${props.allStories.length}, 10px)`}; */
  height: 20px;
  margin-bottom: 16px;
  overflow: none;
`;

const DotWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(11, ${props.cellSize}px)`};
  justify-self: center;
`;

const DotLeftZero = styled.div`
  border-radius: 50%;
  width: 0px;
  height: 0px;
  justify-self: center;
  align-self: center;
  background-color: black;
  opacity: ${(props) =>
    props.statusOfIndicators < -6 || props.directionOfFlow == "forward"
      ? "1"
      : "0"};
`;

//should be 2px
const DotLeftLow = styled.div`
  border-radius: 50%;
  width: ${(props) => props.low};
  height: ${(props) => props.low};
  justify-self: center;
  align-self: center;
  background-color: black;
  opacity: ${(props) =>
    props.statusOfIndicators < -5 || props.directionOfFlow == "forward"
      ? "1"
      : "0"};
`;

//should be 3px
const DotLeftMid = styled.div`
  border-radius: 50%;
  width: ${(props) => props.mid};
  height: ${(props) => props.mid};
  justify-self: center;
  align-self: center;
  //opacity: ${(props) => (props.statusOfIndicators < -4 ? "1" : "0")};
  /* background-color: ${(props) =>
    props.statusOfIndicators == 0 ? "orange" : "black"}; ; */
  background-color: ${(props) =>
    props.activeIndicator == 1 ? "orange" : "black"};
`;

const DotLeft = styled.div`
  border-radius: 50%;
  width: ${(props) => props.high};
  height: ${(props) => props.high};
  /* background-color: ${(props) =>
    props.statusOfIndicators == -1 ? "orange" : "black"}; */
  background-color: ${(props) =>
    props.activeIndicator == 2 ? "orange" : "black"};
  justify-self: center;
  align-self: center;
`;

const Dot1 = styled.div`
  border-radius: 50%;
  width: ${(props) => props.high};
  height: ${(props) => props.high};
  /* background-color: ${(props) =>
    props.statusOfIndicators == -2 ? "orange" : "black"}; */
  background-color: ${(props) =>
    props.activeIndicator == 3 ? "orange" : "black"};
  justify-self: center;
  align-self: center;
`;
const Dot2 = styled.div`
  border-radius: 50%;
  width: ${(props) => props.high};
  height: ${(props) => props.high};
  /* background-color: ${(props) =>
    props.statusOfIndicators == -3 ? "orange" : "black"}; */
  background-color: ${(props) =>
    props.activeIndicator == 4 ? "orange" : "black"};
  justify-self: center;
  align-self: center;
`;
const Dot3 = styled.div`
  border-radius: 50%;
  width: ${(props) => props.high};
  height: ${(props) => props.high};
  /* background-color: ${(props) =>
    props.statusOfIndicators == -4 ? "orange" : "black"}; */
  background-color: ${(props) =>
    props.activeIndicator == 5 ? "orange" : "black"};
  justify-self: center;
  align-self: center;
`;

const DotRight = styled.div`
  border-radius: 50%;
  width: ${(props) => props.high};
  height: ${(props) => props.high};
  /* background-color: ${(props) =>
    props.statusOfIndicators < -4 ? "orange" : "black"}; */
  background-color: ${(props) =>
    props.activeIndicator == 6 ? "orange" : "black"};
  justify-self: center;
  align-self: center;
`;

const DotRightMid = styled.div`
  border-radius: 50%;
  width: ${(props) => props.mid};
  height: ${(props) => props.mid};
  background-color: black;
  justify-self: center;
  align-self: center;
  /* display: ${(props) =>
    props.activeStories[0] >= props.allStories.length - 1
      ? "none"
      : "initial"}; */
  /* opacity: ${(props) =>
    props.activeStories[0] >= props.allStories.length - 1 ? "0" : "1"}; */
`;

const DotRightLow = styled.div`
  border-radius: 50%;
  width: ${(props) => props.low};
  height: ${(props) => props.low};
  background-color: black;
  justify-self: center;
  align-self: center;
  /* display: ${(props) =>
    props.activeStories[0] >= props.allStories.length - 2
      ? "none"
      : "initial"}; */
  /* opacity: ${(props) =>
    props.activeStories[0] >= props.allStories.length - 2 ? "0" : "1"}; */
`;

const DotRightZero = styled.div`
  border-radius: 50%;
  width: 0px;
  height: 0px;
  background-color: black;
  justify-self: center;
  align-self: center;
  /* display: ${(props) =>
    props.activeStories[0] >= props.allStories.length - 3
      ? "none"
      : "initial"}; */
  /* opacity: ${(props) =>
    props.activeStories[0] >= props.allStories.length - 3 ? "0" : "0"}; */
`;

const Slide = styled.div`
  /* position: absolute; */

  /* font-size: 90px; */
  /* font-weight: 700; */
  /* color: rgba(255, 255, 255, 0.9); */
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  /* height: 100%; */

  /* //width: calc(100% / 3); */
  /* width: 100%; */

  box-sizing: border-box;
  display: grid;
  align-items: center;
  justify-content: center;
  background: green;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  flex-shrink: 0;
  color: black;
  font-size: rtpx;
  cursor: pointer;

  &:active {
    lor: white;
    rder: 2px solid white;
  }
`;

const AllDotsWrapper = styled.div`
  grid-area: 1/2/2/3;
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(${props.allStories.length + 11}, 20px)`};
  overflow: hidden;
  width: 220px;
  justify-self: center;
  margin-bottom: 13px;

  transition: transform 0.5s ease;
`;

const gsapSwipeAnimation = () => {
  gsap.to(
    ".s1",

    {
      x: "-500%",
      duration: 0.2,
    }
  );

  gsap.fromTo(
    ".s1",
    { x: "300%" },
    {
      x: "initial",

      duration: 0.2,
      delay: 0.1,
    }
  );

  gsap.to(
    ".s2",

    {
      x: "-500%",
      duration: 0.2,
    }
  );

  gsap.fromTo(
    ".s2",
    { x: "300%" },
    {
      x: "initial",

      duration: 0.2,
      delay: 0.1,
    }
  );
};

const gsapSwipeAnimationReverse = () => {
  gsap.to(".s1", {
    x: "500%",
    duration: 0.2,
  });
  gsap.fromTo(
    ".s1",
    { x: "-300%" },
    {
      x: "initial",
      duration: 0.2,
      delay: 0.1,
    }
  );
  gsap.to(".s2", {
    x: "500%",
    duration: 0.2,
  });
  gsap.fromTo(
    ".s2",
    { x: "-300%" },
    {
      x: "initial",
      duration: 0.2,
      delay: 0.1,
    }
  );
};

const gsapDeadEndAnimation = () => {
  gsap.to(
    ".s1",

    {
      x: "-10%",
      duration: 0.2,
    }
  );
  gsap.to(
    ".s1",

    {
      x: "0",
      duration: 0.9,
    }
  );
};

const getNewBigDots = () => {};

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////                    ////////////////////////
///////////////   HOME             ////////////////////////
///////////////                    ////////////////////////
///////////////////////////////////////////////////////////

function Home(props) {
  console.log("==============Home===============");
  console.log("==============Home Props===============", props);
  console.log("start of function=================", props.allStories);

  // // // useLayoutEffect(() => {
  const gsapContainer1 = useRef();
  const gsapContainer2 = useRef();
  const leftArrowRef = useRef();

  const [loadingStories, setLoadingStories] = React.useState(false);

  //const [allStories, setAllStories] = useState(props.allStoriesFromController);
  const [activeStories, setActiveStories] = useState([0, 1]);

  const [activeDot, setActiveDot] = useState(0);
  const [visibleDots, setVisibleDots] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
  const [transitionX, setTransitionX] = useState(60);
  const [allDotsWrapperWidth, setAllDotsWrapperWidth] = useState(100);

  const isMounted = useRef(false);
  const app = useRef();
  // store the timeline in a ref.
  const tl = useRef();
  const tlFirstReverse = useRef();
  const tlSecondReverse = useRef();
  const tl3Reverse = useRef();
  const tl2Reverse = useRef();
  const tl1Reverse = useRef();
  const tlmaster = useRef();
  const high = "8px";
  const med = "6px";
  const low = "4px";
  const zero = "0px";
  const cellSize = 30;

  useEffect(() => {
    console.log("start of function UE=================", props.allStories);

    setInnerWidth(window.innerWidth);

    if (
      window.localStorage.getItem("allStories") !== null &&
      JSON.parse(window.localStorage.getItem("allStories")).length > 0 &&
      props.allStoriesFromController.length > 0
    ) {
      console.log(
        "compare it LOCAL=======",
        JSON.parse(window.localStorage.getItem("allStories"))[0].id
      );

      if (
        props.allStoriesFromController[0].id ==
        JSON.parse(window.localStorage.getItem("allStories"))[0].id
      ) {
        props.setAllStories(
          JSON.parse(window.localStorage.getItem("allStories"))
        );
      }

      console.log(
        "check to see whats up with localstorage",
        typeof window.localStorage.getItem("allStories")
      );
    }
    // }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("allStories", JSON.stringify(props.allStories));
  }, [props.allStories]);

  useEffect(() => {
    if (isMounted.current) {
      setTransitionX((pre) => pre - 20);
    } else {
      isMounted.current = true;
    }
  }, [visibleDots]);

  function handleForwardPage(mode) {
    setDirectionOfFlow("forward");
    //setLoadingStories(true);
    //setStatusOfIndicators((pre) => pre + 3);
    //tl1Reverse.current.reverse();
    //tl2Reverse.current.reverse();

    setActiveIndicator((prev) => {
      if (prev == 2) {
        tl3Reverse.current.reverse();
        return prev - 1;
      } else if (prev == 1) {
        return 1;
      } else {
        return prev - 1;
      }
    });

    if (activeStories[0] == 0) {
      gsapDeadEndAnimation();
    } else if (activeStories[0] == 1) {
      setActiveStories([0, 1]);
      gsapSwipeAnimation();
    } else {
      if (mode == "desktop") {
        let nv0 = activeStories[0] - 2;
        let nv1 = activeStories[1] - 2;
        setActiveStories([nv0, nv1]);
        gsapSwipeAnimation();
      } else if (mode == "cellphone") {
        if (activeStories[0] > activeStories[1]) {
          console.log("activeStories[0] is > activeStories[1]");
          let nv0 = activeStories[0] - 1;
          let nv1 = nv0 + 1;
          setActiveStories([nv0, nv1]);
        } else {
          let nv0 = activeStories[0] - 1;
          let nv1 = activeStories[1] - 1;
          setActiveStories([nv0, nv1]);
        }

        gsapSwipeAnimation();
      }
    }
  }

  function handleReversePage(mode) {
    // mode is either "cellphone" or "desktop"
    // check how many stories are left in clients array (allStories)

    // if (activeStories[0] == props.allStories.length - 1) {
    //   return;
    // }
    console.log("HAAAAAAANNDDLLEEERREEVEERRSSSEEE" + activeDot);
    setActiveDot((pre) => {
      console.log("HAAAAAAANNDDLLEEERREEVEERRSSSEEE PRE Type " + typeof pre);
      let nn = pre + 22;

      console.log("HAAAAAAANNDDLLEEERREEVEERRSSSEEE " + typeof nn);
      console.log("HAAAAAAANNDDLLEEERREEVEERRSSSEEE nn " + nn);
      console.log("HAAAAAAANNDDLLEEERREEVEERRSSSEEE cals " + calc(pre + 22));

      return pre + 1;
    });

    console.log("HAAAAAAANNDDLLEEERREEVEERRSSSEEE" + activeDot);
    console.log("HAAAAAAANNDDLLEEERREEVEERRSSSEEE" + props.allStories.length);

    if (
      activeDot + 3 == visibleDots[7] &&
      activeDot + 1 <= props.allStories.length
    ) {
      setVisibleDots((pre) => {
        let newArray = [];

        pre.map((n, i) => {
          newArray[i] = n + 1;
        });

        return newArray;
      });
    }

    if (activeStories[0] == props.allStories.length - 3) {
      console.log("newanimation");
    }

    console.log("Mode is ==================== ", mode);
    let storiesLeft = props.allStories.length - (activeStories[1] + 1);

    if (storiesLeft >= 2) {
      console.log(
        "there are " + storiesLeft + " stories left in allStories array"
      );

      // shift active stories up by two and animate change
      if (mode == "desktop") {
        if (activeStories[0] > activeStories[1]) {
          let nv1 = activeStories[1] + 2;
          let nv0 = nv1 - 1;

          setActiveStories([nv0, nv1]);

          gsapSwipeAnimationReverse();
        } else {
          let nv0 = activeStories[0] + 2;
          let nv1 = activeStories[1] + 2;

          setActiveStories([nv0, nv1]);

          gsapSwipeAnimationReverse();
        }
      } else if (mode == "cellphone") {
        console.log("storiesLeft >= 2 and mode cellphone");
        if (activeStories[0] > activeStories[1]) {
          console.log("activeStories[0] was > activeStories[1]");
          let nv1 = activeStories[1] + 1;
          let nv0 = nv1 - 1;

          setActiveStories([nv0, nv1]);

          gsapSwipeAnimationReverse();
        } else {
          let nv0 = activeStories[0] + 1;
          let nv1 = activeStories[1] + 1;

          setActiveStories([nv0, nv1]);

          gsapSwipeAnimationReverse();
        }
      }
    } else if (storiesLeft == 1) {
      console.log(
        "there is " +
          storiesLeft +
          " story left in allStories array, fetching 1 more"
      );
      if (mode == "desktop") {
        setLoadingStories(true);
        axios
          .post(
            "/reverse/",
            {
              data: {
                secondToLastStory_ID: (props.allStories[activeStories[1]] + 1)
                  .id,
                getNumOfStories: 1,
              },
            },
            { withCredentials: true }
          )
          .then((response) => {
            console.log(
              "============ fetch response, asked for 1 and got " +
                response.data.stories.length +
                " back."
            );

            if (response.data.stories.length == 1) {
              props.setAllStories((prevStories) => [
                ...prevStories,
                ...response.data.stories,
              ]);

              let nv0 = activeStories[0] + 2;
              let nv1 = activeStories[1] + 2;

              setActiveStories([nv0, nv1]);
              gsapSwipeAnimationReverse();

              setLoadingStories(false);
            } else if (response.data.stories.length == 0) {
              let nv0 = activeStories[0] + 2;
              let nv1 = 0;

              setActiveStories([nv0, nv1]);
              gsapSwipeAnimationReverse();

              setLoadingStories(false);
            }
          })
          .catch((error) => {
            console.log("handleReversePageErrors", error);
          });
      } else if (mode == "cellphone") {
        console.log("storiesLeft == 1 and mode cellphone");

        let nv0 = activeStories[0] + 1;
        let nv1 = activeStories[1] + 1;

        setActiveStories([nv0, nv1]);
        gsapSwipeAnimationReverse();
      }
    } else if (storiesLeft == 0) {
      console.log(
        "there are " +
          storiesLeft +
          " stories left in allStories array, fetching 2 more"
      );
      if (mode == "desktop") {
        setLoadingStories(true);
        axios
          .post(
            "/reverse/",
            {
              data: {
                secondToLastStory_ID: props.allStories[activeStories[1]].id,
                getNumOfStories: 2,
              },
            },
            { withCredentials: true }
          )
          .then((response) => {
            console.log(
              "============ fetch response, asked for 2 and got " +
                response.data.stories.length +
                " back."
            );

            if (response.data.stories.length == 1) {
              props.setAllStories((prevStories) => [
                ...prevStories,
                ...response.data.stories,
              ]);

              let nv0 = activeStories[0] + 2;
              let nv1 = 0;

              setActiveStories([nv0, nv1]);
              gsapSwipeAnimationReverse();

              setLoadingStories(false);
            } else if (response.data.stories.length == 0) {
              let nv0 = 0;
              let nv1 = 1;

              setActiveStories([nv0, nv1]);
              gsapSwipeAnimationReverse();

              setLoadingStories(false);
            } else if (response.data.stories.length == 2) {
              props.setAllStories((prevStories) => [
                ...prevStories,
                ...response.data.stories,
              ]);
              let nv0 = activeStories[0] + 2;
              let nv1 = activeStories[1] + 2;

              setActiveStories([nv0, nv1]);
              gsapSwipeAnimationReverse();

              setLoadingStories(false);
            }
          })
          .catch((error) => {
            console.log("handleReversePageErrors", error);
          });
      } else if (mode == "cellphone") {
        console.log("333333333333333333333333333333");

        setLoadingStories(true);
        axios
          .post(
            "/reverse/",
            {
              data: {
                secondToLastStory_ID: props.allStories[activeStories[1]].id,
                getNumOfStories: 2,
              },
            },
            { withCredentials: true }
          )
          .then((response) => {
            console.log(
              "============ fetch response, asked for 2 and got " +
                response.data.stories.length +
                " back."
            );

            if (response.data.stories.length == 1) {
              props.setAllStories((prevStories) => [
                ...prevStories,
                ...response.data.stories,
              ]);

              let nv0 = activeStories[0] + 1;
              let nv1 = activeStories[1] + 1;

              setActiveStories([nv0, nv1]);
              gsapSwipeAnimationReverse();

              setLoadingStories(false);
            } else if (response.data.stories.length == 0) {
              console.log(
                "---------------     everything was zero     -----------"
              );

              let nv0 = activeStories[0] + 1;
              let nv1 = 0;

              setActiveStories([nv0, nv1]);
              gsapSwipeAnimationReverse();

              setLoadingStories(false);
            } else if (response.data.stories.length == 2) {
              props.setAllStories((prevStories) => [
                ...prevStories,
                ...response.data.stories,
              ]);
              let nv0 = activeStories[0] + 1;
              let nv1 = activeStories[1] + 1;

              setActiveStories([nv0, nv1]);
              gsapSwipeAnimationReverse();

              setLoadingStories(false);
            }
          })
          .catch((error) => {
            console.log("handleReversePageErrors", error);
          });
      }
    }
  }

  const getDotClassName = (index) => {
    // console.log("GETDOTCLASSNAME---------------------======= " + index);
    if (index + 3 == visibleDots[2] || index + 3 == visibleDots[8]) {
      return "medium";
    } else if (index + 3 == visibleDots[1] || index + 3 == visibleDots[9]) {
      return "small";
    } else if (index + 3 == visibleDots[0] || index + 3 == visibleDots[10]) {
      return "invisible";
    } else if (index + 3 >= visibleDots[2] && index + 3 <= visibleDots[7]) {
      return "";
    } else {
      return "invisible";
    }
  };

  const getDotStyle = () => {
    let style = {
      height: "16px",
      width: "16px",
      transform: `translateX(${transitionX}px)`,
    };

    return style;
  };

  const getDots = () => {
    const dots = [];

    props.allStories.map((s, i) => {
      console.log(
        "About to MAP and they're are a total of " +
          props.allStories.length +
          " stories."
      );
      dots.push(
        <div
          //transitionX={transitionX}
          // allStories={props.allStories}
          style={getDotStyle()}
          className="dot-holder"
          key={i}
        >
          <div
            // activeDot={activeDot}
            // dotScale={getDotScale(i)}
            // i={i}
            key={`${i}-inner`}
            className={`eachDot
                      ${getDotClassName(i)}
                      ${activeDot === i ? "active" : ""}`}
          />
        </div>
      );
    });
    return dots;
  };

  return (
    <HomeWrapper ref={app}>
      {/* <h1>{innerWidth}</h1> */}
      <News className="box">
        <LeftArrowButton onClick={() => handleForwardPage("desktop")}>
          <LeftArrow src={scrollArrow}></LeftArrow>
        </LeftArrowButton>

        <LinkWrapper1
          to={
            "/blog/" +
            slugify(
              props.allStories[activeStories[0]]
                ? props.allStories[activeStories[0]].title
                : "nada"
            )
          }
          state={{ art: props.allStories[activeStories[0]] }}
        >
          <Div1
            className="s1"
            imageURL={
              props.allStories[activeStories[0]]
                ? props.allStories[activeStories[0]].urls[0]
                : defaultImage
            }
          ></Div1>
        </LinkWrapper1>
        <Div1OverlayWrapper className="s2">
          <StoryOneTitle>
            {props.allStories[activeStories[0]]
              ? props.allStories[activeStories[0]].title
              : "Place golder for title. place golder for title."}
          </StoryOneTitle>
        </Div1OverlayWrapper>
        {loadingStories ? (
          <div
            className="loader"
            style={{
              gridArea: "one",
              justifySelf: "center",
              alignSelf: "center",
            }}
          >
            Loading...
          </div>
        ) : null}
        <LinkWrapper2
          to={
            "/blog/" +
            slugify(
              props.allStories[activeStories[1]]
                ? props.allStories[activeStories[1]].title
                : "nada"
            )
          }
          state={{ art: props.allStories[activeStories[1]] }}
        >
          <Div2
            className="s1"
            imageURL={
              props.allStories[activeStories[1]]
                ? props.allStories[activeStories[1]].urls[0]
                : defaultImage
            }
          ></Div2>
        </LinkWrapper2>
        <Div2OverlayWrapper className="s2">
          <StoryOneTitle>
            {props.allStories[activeStories[1]]
              ? props.allStories[activeStories[1]].title
              : "Place holder for title, place holder for title"}
          </StoryOneTitle>
        </Div2OverlayWrapper>

        <RightArrowButton onClick={() => handleReversePage("desktop")}>
          <RightArrow src={scrollArrow}></RightArrow>
        </RightArrowButton>
        <BackgroundGray></BackgroundGray>
      </News>
      {/* ////////// */}

      <Carousel
        handleReversePage={handleReversePage}
        handleForwardPage={handleForwardPage}
      >
        <CarouselItem>
          <ItemWrapper>
            <LinkWrapper1
              to={
                "/blog/" +
                slugify(
                  props.allStories[activeStories[0]]
                    ? props.allStories[activeStories[0]].title
                    : "nada"
                )
              }
              state={{ art: props.allStories[activeStories[0]] }}
              ref={gsapContainer1}
            >
              <Div1
                className="s1"
                imageURL={
                  props.allStories[activeStories[0]]
                    ? props.allStories[activeStories[0]].urls[0]
                    : defaultImage
                }
              ></Div1>
            </LinkWrapper1>

            <Div1OverlayWrapper ref={gsapContainer2} className="s2">
              <StoryOneTitle>
                {props.allStories[activeStories[0]]
                  ? props.allStories[activeStories[0]].title
                  : "Place golder for title. place golder for title."}
              </StoryOneTitle>
            </Div1OverlayWrapper>
          </ItemWrapper>
        </CarouselItem>
        <CarouselItem>
          <ItemWrapper>
            <LinkWrapper2
              to={
                "/blog/" +
                slugify(
                  props.allStories[activeStories[1]]
                    ? props.allStories[activeStories[1]].title
                    : "nada"
                )
              }
              state={{ art: props.allStories[activeStories[1]] }}
            >
              <Div2
                className="s1"
                imageURL={
                  props.allStories[activeStories[1]]
                    ? props.allStories[activeStories[1]].urls[0]
                    : defaultImage
                }
              ></Div2>
            </LinkWrapper2>

            <Div2OverlayWrapper className="s2">
              <StoryOneTitle>
                {props.allStories[activeStories[1]]
                  ? props.allStories[activeStories[1]].title
                  : "Place holder for title, place holder for title"}
              </StoryOneTitle>
            </Div2OverlayWrapper>
          </ItemWrapper>
        </CarouselItem>
      </Carousel>

      <button onClick={backToStart}>back to start</button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        <AllDotsWrapper
          allDotsWrapperWidth={allDotsWrapperWidth}
          allStories={props.allStories}
        >
          {getDots()}
        </AllDotsWrapper>
      </div>
    </HomeWrapper>
  );
}

export default Home;
