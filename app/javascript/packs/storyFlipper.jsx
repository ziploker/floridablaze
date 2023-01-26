import axios from "axios";
import React, { useState, useEffect, useCallback, useRef } from "react";
import StoryCard from "./storyCard";

function storyFlipper({ inView }) {
	const [stories, setStories] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [lastStoryID, setLastStoryID] = useState(null);

	const intObserver = useRef();
	const lastItemIdRef = useRef();
	console.log("in storyFlipper");

	useEffect(() => {
		if (inView) {
			setIsLoading(true);

			console.log("inUseEFFECT ofSTORYFLIPPER, abou to axios to story_flipper");
			axios
				.post(
					"/story_flipper/",
					{
						data: {
							//lastStoryID: lastStoryID,
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

	const getMore = useCallback(
		(n) => {
			console.log("in________GETMORE useCallback");
			console.log("in________GETMORE lastStoryID aka n is ", n.toString());
			console.log(
				"in________GETMORE story.length is ",
				stories.length.toString()
			);

			axios
				.post(
					"/story_flipper/more",
					{
						data: {
							lastStoryID: n,
							// width: window.innerWidth,
						},
					},
					{ withCredentials: true }
				)
				.then((response) => {
					console.log("RESPONSE from story_flipper", response.data);
					// console.log(
					// 	"RESPONSE from story_flipper",
					// 	typeof response.data.stories
					// );
					// console.log(
					// 	"size of data is ",
					// 	response.data.stories.length.toString() +
					// 		Boolean(response.data.stories.length)
					// );

					// //setStories(response.data.stories);
					setIsLoading(false);
					if (response.data.howManyStories > 4) {
						setStories((prev) => [...prev, ...response.data.stories]);

						// setHasNextPage(true);
					} else {
						setStories((prev) => [...prev, ...response.data.stories]);
						if (intObserver.current) intObserver.current.disconnect();
					}
				})
				.catch((error) => {
					console.log("handle_getMore_Errors", error);
				});
		},
		[lastStoryID]
	);

	const lastPostRef = useCallback((node) => {
		console.log(",,,,,,, lastPostRef called from last ref ,,,,,,,,,");

		if (node) lastItemIdRef.current = node;

		if (isLoading) return;

		if (node) setLastStoryID(node.dataset.last);

		if (intObserver.current) intObserver.current.disconnect();

		intObserver.current = new IntersectionObserver((s) => {
			if (s[0].isIntersecting && hasNextPage) {
				console.log("We are near the last post!, call getMore() ");
				console.log("We are near the last post! ", lastStoryID);
				console.log("We are near the last post! ", node.dataset.last);

				getMore(node.dataset.last);
			}
		});

		if (node) intObserver.current.observe(node);
	}, []);

	const displayStories = stories.map((s, i) => {
		if (stories.length === i + 1) {
			return <StoryCard key={i} i={i} s={s} lastID={s.id} ref={lastPostRef} />;
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
