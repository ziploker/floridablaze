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

const HomeWrapper = styled.div`
  //background: pink;

  //height: calc(100vh - 85px);
  //max-height: 500px;
  overflow: hidden;
  //min-width: 500px;
`;

const News = styled.div`
  @media only screen and (min-width: 2200px) {
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
  @media only screen and (min-width: 2200px) {
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
  @media only screen and (min-width: 2200px) {
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
  @media only screen and (min-width: 2200px) {
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

  @media only screen and (min-width: 2200px) {
    grid-area: one;
  }
`;

const Div2OverlayWrapper = styled(Div1OverlayWrapper)`
  //grid-area: two;
  grid-area: 1/1/-1/-1;

  @media only screen and (min-width: 2200px) {
    grid-area: two;
  }
`;

const Div3OverlayWrapper = styled(Div1OverlayWrapper)`
  //grid-area: three;
  grid-area: 1/1/-1/-1;

  @media only screen and (min-width: 2200px) {
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
  @media only screen and (min-width: 1111px) {
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
  }

  display: none;
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

  @media only screen and (max-width: 1111px) {
    grid-area: 5/1/-1/-1;
  }
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
  font-size: 21px;
  cursor: pointer;

  &:active {
    lor: white;
    rder: 2px solid white;
  }
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

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////                    ////////////////////////
///////////////   HOME             ////////////////////////
///////////////                    ////////////////////////
///////////////////////////////////////////////////////////

function Home(props) {
  console.log("==============Home===============");
  console.log("==============Home Props===============", props);

  // // // useLayoutEffect(() => {
  const gsapContainer1 = useRef();
  const gsapContainer2 = useRef();
  const leftArrowRef = useRef();

  useEffect(() => {
    // gsapContainer1.current.clientHeight
    //setAllStories;
  });

  // const [screenIsAtTop, setScreenIsAtTop] = React.useState(true);
  const [loadingStories, setLoadingStories] = React.useState(false);

  const [allStories, setAllStories] = useState(props.allStories);
  const [activeStories, setActiveStories] = useState([0, 1]);
  const [page, setPage] = useState(props.page);

  useEffect(() => {
    console.log(
      "compare it=======",
      props.allStories[0].id + "  " + allStories[0].id
    );

    console.log(
      "compare it LOCAL=======",
      JSON.parse(window.localStorage.getItem("allStories"))[0].id
    );

    if (
      props.allStories[0].id ==
      JSON.parse(window.localStorage.getItem("allStories"))[0].id
    ) {
      setAllStories(JSON.parse(window.localStorage.getItem("allStories")));
    }

    console.log(
      "check to see whats up with localstorage",
      typeof window.localStorage.getItem("allStories")
    );
  }, []);

  useEffect(() => {
    window.localStorage.setItem("allStories", JSON.stringify(allStories));
  }, [allStories]);

  function handleForwardPage() {
    //setLoadingStories(true);

    if (activeStories[0] == 0) {
      gsapDeadEndAnimation();
    } else if (activeStories[0] == 1) {
      setActiveStories([0, 1]);
      gsapSwipeAnimation();
    } else {
      let nv0 = activeStories[0] - 2;
      let nv1 = activeStories[1] - 2;
      setActiveStories([nv0, nv1]);
      gsapSwipeAnimation();
    }

    // axios
    // 	.post(
    // 		"/forward/",
    // 		{
    // 			data: {
    // 				//page: props.page,
    // 				lastStory_ID: allStories[0].id,
    // 				width: window.innerWidth,
    // 			},
    // 		},
    // 		{ withCredentials: true }
    // 	)
    // 	.then((response) => {
    // 		if (response.data.numOfResults == 1) {
    // 			let newArray = [];
    // 			newArray[0] = response.data.stories[0];
    // 			newArray[1] = allStories[0];
    // 			gsapSwipeAnimation();
    // 			setAllStories(newArray);
    // 		} else if (response.data.numOfResults == 0) {
    // 			gsapDeadEndAnimation();
    // 			setAllStories(response.data.stories);
    // 			gsapSwipeAnimation();
    // 		}

    // 		setLoadingStories(false);
    // 	})
    // 	.catch((error) => {
    // 		console.log("handleForwardPageErrors", error);
    // 	});
  }

  function handleReversePage(mode) {
    // mode is either "cellphone" or "desktop"
    // check how many stories are left in clients array (allStories)

    console.log("Mode is ==================== ", mode);
    let storiesLeft = allStories.length - (activeStories[1] + 1);

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
                secondToLastStory_ID: (allStories[activeStories[1]] + 1).id,
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
              setAllStories((prevStories) => [
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
                secondToLastStory_ID: allStories[activeStories[1]].id,
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
              setAllStories((prevStories) => [
                ...prevStories,
                ...response.data.stories,
              ]);

              let nv0 = activeStories[0] + 2;
              let nv1 = 0;

              setActiveStories([nv0, nv1]);
              gsapSwipeAnimationReverse();

              setLoadingStories(false);
            } else if (response.data.stories.length == 0) {
              // setAllStories((prevStories) => [
              // 	...prevStories,
              // 	...response.data.stories,
              // ]);

              let nv0 = 0;
              let nv1 = 1;

              setActiveStories([nv0, nv1]);
              gsapSwipeAnimationReverse();

              setLoadingStories(false);
            } else if (response.data.stories.length == 2) {
              setAllStories((prevStories) => [
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
      }
    }

    allStories.map((s, i) => {
      console.log(
        "s+i",
        "ID is " + s.id + " and i is " + i + " count is " + allStories.length
      );
    });
  }
  return (
    <HomeWrapper>
      <News className="box">
        <LeftArrowButton
          onClick={() => handleForwardPage(props, setLoadingStories)}
        >
          <LeftArrow src={scrollArrow}></LeftArrow>
        </LeftArrowButton>

        <LinkWrapper1
          to={
            "/blog/" +
            slugify(allStories ? allStories[activeStories[0]].title : "nada")
          }
          state={{ art: allStories[activeStories[0]] }}
        >
          <Div1
            className="s1"
            imageURL={
              allStories[activeStories[0]]
                ? allStories[activeStories[0]].urls[0]
                : defaultImage
            }
          ></Div1>
        </LinkWrapper1>
        <Div1OverlayWrapper className="s2">
          <StoryOneTitle>
            {allStories[activeStories[0]]
              ? allStories[activeStories[0]].title
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
              allStories[activeStories[1]]
                ? allStories[activeStories[1]].title
                : "nada"
            )
          }
          state={{ art: allStories[activeStories[1]] }}
        >
          <Div2
            className="s1"
            imageURL={
              allStories[activeStories[1]]
                ? allStories[activeStories[1]].urls[0]
                : defaultImage
            }
          ></Div2>
        </LinkWrapper2>
        <Div2OverlayWrapper className="s2">
          <StoryOneTitle>
            {allStories[activeStories[1]]
              ? allStories[activeStories[1]].title
              : "Place holder for title, place holder for title"}
          </StoryOneTitle>
        </Div2OverlayWrapper>

        <RightArrowButton onClick={() => handleReversePage("desktop")}>
          <RightArrow src={scrollArrow}></RightArrow>
        </RightArrowButton>
        <BackgroundGray></BackgroundGray>
      </News>
      {/* ////////// */}

      <Carousel handleReversePage={handleReversePage}>
        <CarouselItem>
          <ItemWrapper>
            <LinkWrapper1
              to={
                "/blog/" +
                slugify(
                  allStories ? allStories[activeStories[0]].title : "nada"
                )
              }
              state={{ art: allStories[activeStories[0]] }}
              ref={gsapContainer1}
            >
              <Div1
                className="s1"
                imageURL={
                  allStories
                    ? allStories[activeStories[0]].urls[0]
                    : defaultImage
                }
              ></Div1>
            </LinkWrapper1>

            <Div1OverlayWrapper ref={gsapContainer2} className="s2">
              <StoryOneTitle>
                {allStories
                  ? allStories[activeStories[0]].title
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
                  allStories ? allStories[activeStories[1]].title : "nada"
                )
              }
              state={{ art: allStories[activeStories[1]] }}
            >
              <Div2
                className="s1"
                imageURL={
                  allStories
                    ? allStories[activeStories[1]].urls[0]
                    : defaultImage
                }
              ></Div2>
            </LinkWrapper2>

            <Div2OverlayWrapper className="s2">
              <StoryOneTitle>
                {allStories
                  ? allStories[activeStories[1]].title
                  : "Place holder for title, place holder for title"}
              </StoryOneTitle>
            </Div2OverlayWrapper>
          </ItemWrapper>
        </CarouselItem>
        {/* <CarouselItem>
          <ItemWrapper>
            <LinkWrapper3
              to={
                "/blog/" + slugify(allStories[2] ? allStories[2].title : "nada")
              }
              state={{ art: allStories[2] }}
            >
              <Div3
                className="s1"
                imageURL={allStories[2] ? allStories[2].urls[0] : defaultImage}
              ></Div3>
            </LinkWrapper3>

            <Div3OverlayWrapper className="s2">
              <StoryOneTitle>
                {allStories[2]
                  ? allStories[2].title
                  : "Place golder for title. place golder for title."}
              </StoryOneTitle>
            </Div3OverlayWrapper>
          </ItemWrapper>
        </CarouselItem> */}
      </Carousel>
    </HomeWrapper>
  );
}

export default Home;
