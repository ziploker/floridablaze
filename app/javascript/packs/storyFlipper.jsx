import axios from "axios";
import React, { useState, useEffect, useCallback, useRef } from "react";
import StoryCard from "./storyCard";

function storyFlipper({ inView }) {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const intObserver = useRef();
  console.log("in storyFlipper");

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      axios
        .post(
          "/story_flipper/",
          {
            data: {
              // lastStory_ID: props.lastStory.id,
              // width: window.innerWidth,
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log("RESPONSE from story_flipper", response.data.stories);
          console.log(
            "RESPONSE from story_flipper",
            typeof response.data.stories
          );
          console.log(
            "size of data is ",
            response.data.stories.length.toString() +
              Boolean(response.data.stories.length)
          );

          //setStories(response.data.stories);
          setStories((prev) => [...prev, ...response.data.stories]);
          setIsLoading(false);
          setHasNextPage(true);
        })
        .catch((error) => {
          console.log("handleReversePageErrors", error);
        });
    }
  }, [inView]);

  const getMore = () => {
    console.log("inGETMORE");

    axios
      .post(
        "/story_flipper/",
        {
          data: {
            // lastStory_ID: props.lastStory.id,
            // width: window.innerWidth,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("RESPONSE from story_flipper", response.data.stories);
        console.log(
          "RESPONSE from story_flipper",
          typeof response.data.stories
        );
        console.log(
          "size of data is ",
          response.data.stories.length.toString() +
            Boolean(response.data.stories.length)
        );

        //setStories(response.data.stories);
        setStories((prev) => [...prev, ...response.data.stories]);
        setIsLoading(false);
        setHasNextPage(true);
      })
      .catch((error) => {
        console.log("handleReversePageErrors", error);
      });
  };

  const lastPostRef = useCallback((node) => {
    console.log(
      ",,,,,,,,,,,,,,,,,,,,,,,, inside last post ref,,,,,,,,,",
      isLoading + " " + hasNextPage
    );
    if (isLoading) return;

    if (intObserver.current) intObserver.current.disconnect();

    intObserver.current = new IntersectionObserver((s) => {
      console.log("NODEv2====hasnextpage====== ", hasNextPage);
      if (s[0].isIntersecting && hasNextPage) {
        console.log("We are near the last post!");
        // setPageNum((prev) => prev + 1);

        getMore();
      }
    });

    if (node) intObserver.current.observe(node);
  }, []);

  const displayStories = stories.map((s, i) => {
    if (stories.length === i + 1) {
      return <StoryCard ref={lastPostRef} key={i} i={i} s={s} />;
    }
    return <StoryCard key={i} i={i} s={s} />;
  });

  return (
    <>
      {displayStories}
      {isLoading && <h1>Loading.....</h1>}
      <p className="center">
        <a href="#top">Back to Top</a>
      </p>
    </>
  );
}

export default storyFlipper;
