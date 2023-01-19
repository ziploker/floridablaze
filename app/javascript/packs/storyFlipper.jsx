import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import StoryCard from "./storyCard";

function storyFlipper({ inView }) {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("in storyFlipper");

  useEffect(() => {
    console.log(
      "in storyFlipper USEEFFECT, isloading is " +
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

  const lastPostRef = useCallback((node) => {
    console.log("NODE========== ", node);
    // if (isLoading) return;

    // if (intObserver.current) intObserver.current.disconnect();

    // intObserver.current = new IntersectionObserver((posts) => {
    //   if (posts[0].isIntersecting && hasNextPage) {
    //     console.log("We are near the last post!");
    //     setPageNum((prev) => prev + 1);
    //   }
    // });

    // if (post) intObserver.current.observe(post);
  }, []);

  // function DisplayStories() {
  //   console.log("inDIsplayStories----------------=============");
  //   return (
  //     <>
  //       {stories.map((s, i) => (
  //         <StoryCard key={i} i={i} s={s} />
  //       ))}
  //     </>
  //   );
  // }

  const displayStories = stories.map((s, i) => {
    if (stories.length === i + 1) {
      console.log("LAAASSSTT");
      return <StoryCard ref={lastPostRef} key={i} i={i} s={s} />;
    }
    return <StoryCard key={i} i={i} s={s} />;
  });

  // const content = results.map((post, i) => {
  //   if (results.length === i + 1) {
  //     return <Post ref={lastPostRef} key={post.id} post={post} />;
  //   }
  //   return <Post key={post.id} post={post} />;
  // });

  //return <>{isLoading ? <h1>Loading.....</h1> : <DisplayStories />}</>;
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
