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
import { _parseRelative } from "gsap/gsap-core";
import "../../assets/stylesheets/home_story_spinner.scss";

const HomeWrapper = styled.div`
  //background: pink;

  //height: calc(100vh - 85px);
  //max-height: 500px;
  overflow: hidden;
  //min-width: 500px;
`;

const News = styled.div`
  @media only screen and (max-width: 866px) {
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
  }

  @media only screen and (min-width: 867px) and (max-width: 1111px) {
    grid-template-columns:
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
      "    .           .    .    .        .     ";
  }

  min-height: 100%;

  display: grid;
  justify-content: center;
  //grid-template-columns: 1fr minmax(0px, 350px) minmax(0px, 600px) 1fr;

  //grid-template-columns: minmax(20px, 1fr) minmax(170px, 350px)  minmax(340px, 600px)  minmax(20px, 1fr);

  //grid-template-columns: 5px 1fr 1fr 1fr 5px;
  grid-template-columns:
    minmax(30px, 1fr) minmax(200px, 600px) minmax(10px, 1fr) minmax(
      200px,
      600px
    )
    minmax(10px, 1fr) minmax(200px, 600px) minmax(30px, 1fr);

  //grid-template-rows: 80px 120px 50px 1fr;
  grid-template-areas:
    "leftArrow   one . two . three   rightArrow"
    "leftArrow   one . two . three   rightArrow"
    "leftArrow   one . two . three   rightArrow"
    "    .        .  .  .  .   .     .";
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
`;

const LeftArrowButton = styled.button`
  @media only screen and (min-width: 867px) {
    width: 100%;
    height: 100%;
    grid-area: leftArrow;
    align-self: center;
    justify-self: end;
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
  grid-area: one;
  max-width: 600px;
  width: 100%;
  justify-self: center;
  display: grid;
`;

const LinkWrapper2 = styled(Link)`
  //grid-area: 1/1/3/2;
  grid-area: two;
  max-width: 600px;
  width: 100%;
  justify-self: center;
`;

const LinkWrapper3 = styled(Link)`
  //grid-area: 1/1/3/2;
  grid-area: three;
  max-width: 600px;
  width: 100%;
  justify-self: center;
`;

const LinkWrapper4 = styled(Link)`
  display: none;
  @media only screen and (max-width: 1111px) {
    //grid-area: 1/1/3/2;
    grid-area: four;
    max-width: 600px;
    width: 100%;
    justify-self: center;
    display: initial;
  }
`;

const Div1 = styled.div`
  box-shadow: 0 2px 5px 0 rgba(227, 181, 90, 0.2);
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  display: grid;
  justify-self: center;
  max-width: 600px;
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
  max-width: 600px;
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
  max-width: 600px;
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
    max-width: 600px;
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
  grid-area: one;
  border-radius: 10px;
  overflow: hidden;
  max-width: 600px;
  width: 100%;
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
`;

const Div2OverlayWrapper = styled(Div1OverlayWrapper)`
  grid-area: two;
`;

const Div3OverlayWrapper = styled(Div1OverlayWrapper)`
  grid-area: three;
`;

const Div4OverlayWrapper = styled(Div1OverlayWrapper)`
  @media only screen and (max-width: 1111px) {
    grid-area: four;
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
  font-size: 16px;
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

const RightArrowButton = styled.button`
  @media only screen and (min-width: 867px) {
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

function handleReversePage(props, setLoadingStories) {
  setLoadingStories(true);
  axios
    .post(
      "/forward/",
      {
        data: {
          //page: props.page,
          fourthToLastStory_ID: props.fourthToLastStory.id,
          width: window.innerWidth,
        },
      },
      { withCredentials: true }
    )
    .then((response) => {
      console.log(
        "=================Stories ",
        JSON.stringify(response.data.stories)
      );
      console.log(
        "i got " + response.data.stories.length.toString() + " back from rails"
      );
      if (response.data.dynamicStoriesPerPage == 3) {
        if (response.data.stories.length == 3) {
          props.setLastStory(props.fourthToLastStory);
          props.setSecondToLastStory(response.data.stories[0]);
          props.setThirdToLastStory(response.data.stories[1]);
          props.setFourthToLastStory(response.data.stories[2]);
        }
      } else if (response.data.dynamicStoriesPerPage == 4) {
        if (response.data.stories.length == 4) {
          props.setLastStory(response.data.stories[0]);
          props.setSecondToLastStory(response.data.stories[1]);
          props.setThirdToLastStory(response.data.stories[2]);
          props.setFourthToLastStory(response.data.stories[3]);
        }
      }

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
      setLoadingStories(false);
    })
    .catch((error) => {
      console.log("handleForwardPageErrors", error);
    });
}

function handleForwardPage(props, setLoadingStories) {
  setLoadingStories(true);
  axios
    .post(
      "/reverse/",
      {
        data: {
          lastStory_ID: props.lastStory.id,
          width: window.innerWidth,
        },
      },
      { withCredentials: true }
    )
    .then((response) => {
      if (response.data.dynamicStoriesPerPage == 3) {
        if (response.data.stories.length == 3) {
          props.setLastStory(response.data.stories[2]);
          props.setSecondToLastStory(response.data.stories[1]);
          props.setThirdToLastStory(response.data.stories[0]);
          props.setFourthToLastStory(props.lastStory);
        }
      } else if (response.data.dynamicStoriesPerPage == 4) {
        if (response.data.stories.length == 4) {
          props.setLastStory(response.data.stories[3]);
          props.setSecondToLastStory(response.data.stories[2]);
          props.setThirdToLastStory(response.data.stories[1]);
          props.setFourthToLastStory(response.data.stories[0]);
        }
      }
      gsap.to(
        ".s1",

        {
          x: "500%",
          duration: 0.2,
        }
      );

      gsap.fromTo(
        ".s1",
        { x: "-300%" },
        {
          x: "initial",

          duration: 0.2,
          delay: 0.1,
        }
      );

      gsap.to(
        ".s2",

        {
          x: "500%",
          duration: 0.2,
        }
      );

      gsap.fromTo(
        ".s2",
        { x: "-300%" },
        {
          x: "initial",

          duration: 0.2,
          delay: 0.1,
        }
      );
      setLoadingStories(false);
    })
    .catch((error) => {
      console.log("handleReversePageErrors", error);
    });
}

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////                    ////////////////////////
///////////////   HOME             ////////////////////////
///////////////                    ////////////////////////
///////////////////////////////////////////////////////////

function Home(props) {
  console.log("==============Home===============");
  console.log("==============Home Props===============", props);

  const gsapContainer1 = useRef();
  const gsapContainer2 = useRef();

  useLayoutEffect(() => {}, []);

  // const [screenIsAtTop, setScreenIsAtTop] = React.useState(true);
  const [loadingStories, setLoadingStories] = React.useState(false);

  return (
    <>
      <HomeWrapper>
        <News className="box">
          <LeftArrowButton
            onClick={() => handleReversePage(props, setLoadingStories)}
          >
            <LeftArrow src={scrollArrow}></LeftArrow>
          </LeftArrowButton>

          <LinkWrapper1
            to={
              "/blog/" +
              slugify(props.lastStory ? props.lastStory.title : "nada")
            }
            state={{ art: props.lastStory }}
            ref={gsapContainer1}
          >
            <Div1
              className="s1"
              imageURL={
                props.lastStory ? props.lastStory.urls[0] : defaultImage
              }
            ></Div1>
          </LinkWrapper1>

          <Div1OverlayWrapper ref={gsapContainer2} className="s2">
            <StoryOneTitle>
              {props.lastStory
                ? props.lastStory.title
                : "Place golder for title. place golder for title."}
            </StoryOneTitle>
          </Div1OverlayWrapper>

          {loadingStories ? (
            <div
              class="loader"
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
                props.secondToLastStory ? props.secondToLastStory.title : "nada"
              )
            }
            state={{ art: props.secondToLastStory }}
          >
            <Div2
              className="s1"
              imageURL={
                props.secondToLastStory
                  ? props.secondToLastStory.urls[0]
                  : defaultImage
              }
            ></Div2>
          </LinkWrapper2>

          <Div2OverlayWrapper className="s2">
            <StoryOneTitle>
              {props.secondToLastStory
                ? props.secondToLastStory.title
                : "Place holder for title, place holder for title"}
            </StoryOneTitle>
          </Div2OverlayWrapper>

          <LinkWrapper3
            to={
              "/blog/" +
              slugify(
                props.thirdTolastStoryLastStory
                  ? props.thirdToLastStory.title
                  : "nada"
              )
            }
            state={{ art: props.thirdTolastStoryLastStory }}
          >
            <Div3
              className="s1"
              imageURL={
                props.thirdToLastStory
                  ? props.thirdToLastStory.urls[0]
                  : defaultImage
              }
            ></Div3>
          </LinkWrapper3>

          <Div3OverlayWrapper className="s2">
            <StoryOneTitle>
              {props.thirdToLastStory
                ? props.thirdToLastStory.title
                : "Place golder for title. place golder for title."}
            </StoryOneTitle>
          </Div3OverlayWrapper>

          <LinkWrapper4
            to={
              "/blog/" +
              slugify(
                props.fourthToLastStory ? props.fourthToLastStory.title : "nada"
              )
            }
            state={{ art: props.fourthToLastStory }}
          >
            <Div4
              className="s1"
              imageURL={
                props.fourthToLastStory
                  ? props.fourthToLastStory.urls[0]
                  : defaultImage
              }
            ></Div4>
          </LinkWrapper4>

          <Div4OverlayWrapper className="s2">
            <StoryOneTitle>
              {props.fourthToLastStory
                ? props.fourthToLastStory.title
                : "Place golder for title. place golder for title."}
            </StoryOneTitle>
          </Div4OverlayWrapper>

          <RightArrowButton
            onClick={() => handleForwardPage(props, setLoadingStories)}
          >
            <RightArrow src={scrollArrow}></RightArrow>
          </RightArrowButton>

          <BackgroundGray></BackgroundGray>
        </News>
      </HomeWrapper>
    </>
  );
}

export default Home;
