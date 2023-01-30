import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";

import "../../assets/stylesheets/carouselstyle.scss";

const CarouselMain = styled.div`
  overflow: hidden;
`;

const CarouselMainInner = styled.div`
  white-space: nowrap;
  transition: transform 0.3s;
`;

const CarouselMainItem = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* height: 200px; */
  background-color: green;
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
export const CarouselItem = ({ children, width }) => {
  console.log("children----", children);
  return (
    <CarouselMainItem className="carousel-item" style={{ width: width }}>
      {children}
    </CarouselMainItem>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

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
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <CarouselMain
      {...handlers}
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <CarouselMainInner
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </CarouselMainInner>
      <Indicators className="indicators">
        <button
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          Prev
        </button>
        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={`${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                updateIndex(index);
              }}
            >
              {index + 1}
            </button>
          );
        })}
        <button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          Next
        </button>
      </Indicators>
    </CarouselMain>
  );
};

export default Carousel;