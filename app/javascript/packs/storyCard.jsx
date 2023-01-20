import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import slugify from "react-slugify";

const LinkWrapper1 = styled(Link)`
  //grid-area: 1/1/3/2;
  grid-area: 1/1/-1/-1;
  max-width: 600px;
  width: 100%;
  justify-self: center;
  display: grid;
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

const Div1OverlayWrapper = styled.div`
  pointer-events: none;
  grid-area: 1/1/-1/-1;
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

const StoryFlipperWrapper = styled.div`
  display: grid;
  margin: 20px 10px 43px 10px;
  grid-template-columns: 1fr;

  grid-gap: 10px;
`;
// const Post = React.forwardRef(({ post }, ref) => {
const storyCard = React.forwardRef(({ s, i, intersectionObserverRef }, ref) => {
  console.log("Insiode StoryCXard and ref ios ", ref);

  const body = (
    <>
      <LinkWrapper1
        to={"/blog/" + slugify(s.title)}
        // state={{ art: props.lastStory }}
        // ref={gsapContainer1}
      >
        <Div1
          //className="s1"
          imageURL={s.urls[0]}
        ></Div1>
      </LinkWrapper1>

      <Div1OverlayWrapper
      //</>ref={gsapContainer2}
      //className="s2"
      >
        <StoryOneTitle>{s.title}</StoryOneTitle>
      </Div1OverlayWrapper>
    </>
  );

  const content = ref ? (
    <StoryFlipperWrapper ref={ref} key={i}>
      {body}
    </StoryFlipperWrapper>
  ) : (
    <StoryFlipperWrapper key={i}>{body}</StoryFlipperWrapper>
  );

  return content;
});

export default storyCard;
