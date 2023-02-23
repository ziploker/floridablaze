import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";
import scrollArrow from "../../assets/images/scroll-arrow.png";

const CarouselMain = styled.div`
  overflow: hidden;
  margin: 30px auto 40px auto;
  max-width: 1700px;

  @media only screen and (min-width: 960px) {
    display: none;
  }
`;

const CarouselMainInner = styled.div`
  white-space: nowrap;
  transition: transform 0.3s;
  grid-area: 1/1/-1/-1;
`;

const CarouselMainItem = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* height: 200px; */
  //background-color: green;
  color: #fff;
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;

  button {
    margin: 5px;
  }

  &:button.active {
    background-color: green;
    color: #fff;
  }
`;

const LeftArrowButton = styled.button`
  width: 10%;
  height: 15%;
  opacity: 0.8;
  border-radius: 10px;
  grid-area: 1/1/-1/-1;

  align-self: center;
  justify-self: start;
  //background: rgba(255, 255, 255, 0);
  border: 0;
  display: grid;

  z-index: 1;

  cursor: pointer;

  /* &:hover {
    background: rgba(54, 54, 54, 0.075);
  } */
`;

const LeftArrow = styled.img`
  max-width: 30px;

  position: relative;
  justify-self: center;
  align-self: center;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
`;

const RightArrowButton = styled.button`
  width: 10%;
  height: 15%;
  opacity: 0.8;
  border-radius: 10px;
  grid-area: 1/1/-1/-1;

  align-self: center;
  justify-self: end;
  //background: rgba(255, 255, 255, 0);
  border: 0;
  display: grid;
  cursor: pointer;

  /* &:hover {
    background: rgba(54, 54, 54, 0.075);
  } */
`;

const RightArrow = styled.img`
  max-width: 30px;

  position: relative;
  justify-self: center;
  align-self: center;
`;

const CarouselArrowsWrapper = styled.div`
  display: grid;
  //grid-template-columns: 25px 1fr 25px;
  width: 100%;
  height: 100%;
`;
export const CarouselItem = ({ children, width }) => {
  console.log("children----", children);
  return (
    <CarouselMainItem className="carousel-item" style={{ width: width }}>
      {children}
    </CarouselMainItem>
  );
};

const Carousel = ({ children, handleReversePage, handleForwardPage }) => {
  //const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // const updateIndex = (newIndex) => {
  // if (newIndex < 0) {
  // newIndex = React.Children.count(children) - 1;
  // } else if (newIndex >= React.Children.count(children)) {
  // newIndex = 0;
  // }

  // setActiveIndex(newIndex);
  // };

  useEffect(() => {
    // const interval = setInterval(() => {
    //   if (!paused) {
    //     updateIndex(activeIndex + 1);
    //   }
    // }, 3000);
    // return () => {
    //   if (interval) {
    //     clearInterval(interval);
    //   }
    // };
  });

  const handlers = useSwipeable({
    // onSwipedLeft: () => updateIndex(activeIndex + 1),
    // onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <CarouselMain
      {...handlers}
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <CarouselArrowsWrapper>
        <LeftArrowButton onClick={() => handleForwardPage("cellphone")}>
          <LeftArrow src={scrollArrow}></LeftArrow>
        </LeftArrowButton>
        <CarouselMainInner
          className="inner"
          //style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, { width: "100%" });
          })}
        </CarouselMainInner>
        <RightArrowButton
          onClick={() => {
            //updateIndex(activeIndex + 1);

            handleReversePage("cellphone");
          }}
        >
          <RightArrow src={scrollArrow}></RightArrow>
        </RightArrowButton>
      </CarouselArrowsWrapper>
      <Indicators className="indicators">
        {React.Children.map(children, (child, index) => {
          return (
            <button
            // className={`${index === activeIndex ? "active" : ""}`}
            // onClick={() => {
            // 	updateIndex(index);
            // }}
            >
              {index + 1}
            </button>
          );
        })}
      </Indicators>
    </CarouselMain>
  );
};

export default Carousel;
