import axios from "axios";
import { element } from "prop-types";
import React, { useState, useEffect, useCallback, useRef } from "react";
import StoryCard from "./storyCard";

function storyFlipper({ allStories, setAllStories }) {
	const [stories, setStories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [lastStoryID, setLastStoryID] = useState(null);
	const [hasMore, setHasMore] = useState(true);

	const intObserver = useRef();
	const lastItemIdRef = useRef();
	const elementRef = useRef(null);
	console.log("in storyFlipper");

	// useEffect(() => {
	// 	console.log(
	// 		"]]]]]]]]]]]]]]]]]]]]]]]]] intObserver.current",
	// 		intObserver.current
	// 	);
	// 	console.log(
	// 		"]]]]]]]]]]]]]]]]]]]]]]]]] lastItemIdRef.current",
	// 		lastItemIdRef.current
	// 	);
	// }, [lastStoryID]);

	//   useEffect(() => {
	//     if (inView) {
	//       console.log(
	//         "SFFFFF ----- UFFFFFFF -- iVIEWWWWW -------------------------------"
	//       );
	//       setIsLoading(true);

	//       console.log("inUseEFFECT ofSTORYFLIPPER, abou to axios to story_flipper");
	//       axios
	//         .post(
	//           "/story_flipper/",
	//           {
	//             data: {
	//               //lastStoryID: lastStoryID,
	//               // width: window.innerWidth,
	//             },
	//           },
	//           { withCredentials: true }
	//         )
	//         .then((response) => {
	//           console.log("RESPONSE from story_flipper", response.data.stories);
	//           console.log(
	//             "RESPONSE from story_flipper",
	//             typeof response.data.stories
	//           );
	//           console.log(
	//             "size of data is ",
	//             response.data.stories.length.toString() +
	//               Boolean(response.data.stories.length)
	//           );

	//           //setStories(response.data.stories);
	//           setStories((prev) => [...prev, ...response.data.stories]);
	//           setIsLoading(false);
	//           setHasNextPage(true);
	//         })
	//         .catch((error) => {
	//           console.log("handleReversePageErrors", error);
	//         });
	//}
	//}, [inView]);

	function onIntersection() {
		console.log("EEEEEEEUUURRRIIIKKKKAAAA");
	}

	useEffect(() => {
		console.log("UEUEUEUEUEUEUEUE");
		const observer = new IntersectionObserver(onIntersection);

		if (observer && elementRef.current) {
			observer.observe(elementRef.current);
		}
	}, [allStories]);
	const getMore = useCallback(
		(n) => {
			console.log("in________GETMORE useCallback");
			console.log("in________GETMORE lastStoryID aka n is ", n.toString());
			console.log(
				"in________GETMORE story.length is ",
				allStories.length.toString()
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
						setAllStories((prev) => [...prev, ...response.data.stories]);

						// setHasNextPage(true);
					} else {
						setAllStories((prev) => [...prev, ...response.data.stories]);
						if (intObserver.current) intObserver.current.disconnect();
					}
				})
				.catch((error) => {
					console.log("handle_getMore_Errors", error);
				});
		},
		[lastStoryID]
	);

	// const lastPostRef = (node) => {
	// 	console.log(
	// 		"/////////////// START lastPostRef //// node is,,,,,,,,,",
	// 		node
	// 	);

	// 	if (node) {
	// 		console.log(
	// 			"/////step1, node was true so, then lastItemIdRef.current = node;"
	// 		);
	// 		lastItemIdRef.current = node;
	// 		console.log(
	// 			"/////step1 results, lastItemIdRef.current = ",
	// 			lastItemIdRef.current
	// 		);
	// 	} else {
	// 		console.log(
	// 			"/////step1, node was false so, then lastItemIdRef.current != node;"
	// 		);
	// 	}

	// 	if (isLoading) {
	// 		console.log("///// isLoading was true so return asap");
	// 		return;
	// 	} else {
	// 		console.log("////// isLoading was false so keep going 	````````");
	// 	}

	// 	if (node) {
	// 		console.log(
	// 			"//// node was true so return setLastStoryID(node.dataset.last), node.dataset.last = ",
	// 			node.dataset.last
	// 		);
	// 		setLastStoryID(node.dataset.last);
	// 	} else {
	// 		console.log(
	// 			"//// node was not true so don set set tLastStoryID(node.dataset.last)"
	// 		);
	// 	}

	// 	if (intObserver.current) {
	// 		console.log(
	// 			"/////intObserver.current was true so intObserver.current.disconnect();"
	// 		);

	// 		intObserver.current.disconnect();
	// 	} else {
	// 		console.log(
	// 			"///// intObserver.current was false so dont intObserver.current.disconnect();"
	// 		);
	// 	}

	// 	intObserver.current = new IntersectionObserver((s) => {
	// 		console.log(
	// 			"//////// intObserver.current = new IntersectionObserver start ////////",
	// 			s
	// 		);
	// 		console.log(
	// 			",,,,,,, s[0].isIntersectin ,,,,,,,,,",
	// 			s[0].isIntersecting.toString()
	// 		);
	// 		console.log(",,,,,,, hasNextPage ,,,,,,,,,", hasNextPage.toString());
	// 		if (s[0].isIntersecting && hasNextPage) {
	// 			console.log(",,,,,,, s[0].isIntersecting && hasNextPage ,,,,,,,,,");
	// 			console.log("We are near the last post!, call getMore() ");
	// 			console.log("We are near the last post! ", lastStoryID);
	// 			console.log("We are near the last post! ", node.dataset.last);

	// 			getMore(node.dataset.last);
	// 		} else {
	// 			console.log(
	// 				"else do nadaaaaaaaaaaaaaaaaaaaaaaaa========================="
	// 			);
	// 		}
	// 	});

	// 	if (node) {
	// 		console.log("\\\\\\\\\\\\\\\\ if node was true so then observe");
	// 		intObserver.current.observe(node);
	// 	} else {
	// 		console.log("\\\\\\\\\\\\\\\\ if node was false so dont observe");
	// 	}
	// };

	const displayStories = allStories.map((s, i) => {
		if (allStories.length === i + 1) {
			console.log("inside displayStories = allStories.map LAST");
			return <StoryCard key={i} i={i} s={s} lastID={s.id} />;
		}
		console.log("inside displayStories = allStories.map REGULAR");

		return <StoryCard key={i} i={i} s={s} />;
	});

	return (
		<>
			{displayStories}
			{isLoading && hasMore && (
				<div ref={elementRef}>Loading more items.....</div>
			)}
			{/* <p className="center">
				<a href="#top">Back to Top</a>
			</p> */}
		</>
	);
}

export default storyFlipper;
