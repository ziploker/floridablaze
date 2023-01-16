import axios from "axios";
import React, { useState, useEffect } from "react";
import StoryCard from "./storyCard";

function storyFlipper({ inView }) {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(
      "USEEFFECT in storyFlipper, isloading is " +
        isLoading +
        " and inView is " +
        inView
    );
    {
      inView &&
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

            setStories(response.data.stories);

            setIsLoading(false);
          })
          .catch((error) => {
            console.log("handleReversePageErrors", error);
          });
    }
  }, [inView]);

  function DisplayStories() {
    console.log("inDIsplayStories----------------=============");
    return (
      <>
        {stories.map((s, i) => (
          <StoryCard key={i} i={i} s={s} />
        ))}
      </>
    );
  }

  return <>{isLoading ? <h1>Loading.....</h1> : <DisplayStories />}</>;
}

export default storyFlipper;
