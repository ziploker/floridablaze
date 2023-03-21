import axios from "axios"
import { element } from "prop-types"
import React, { useState, useEffect, useCallback, useRef } from "react"
import StoryCard from "./storyCard"
import styled from "styled-components"
function storyFlipper({ allStories, setAllStories }) {
	const [stories, setStories] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [hasNextPage, setHasNextPage] = useState(true)

	const intObserver = useRef()
	const lastItemIdRef = useRef()
	const elementRef = useRef(null)
	console.log("in storyFlipper")

	const StoryFlipperWrapper = styled.div`
		@media only screen and (min-width: 985px) {
			display: none;
		}
	`

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

	function onIntersection(entries) {
		//console.log("EEEEEEEUUURRRIIIKKKKAAAA", entries)

		if (entries[0].isIntersecting) {
			setAllStories((prevStories) => {
				//console.log("PPPPPPPPPPPPPPPSSSSSSSSSSSSSS", prevStories)
				let lastID
				prevStories.map((s, i) => {
					if (prevStories.length === i + 1) {
						lastID = s.id
						console.log("in________function onIntersection(entries) LAST ID is = " + lastID)
						getMore(lastID)
					}
				})

				return prevStories
			})
		} else {
			//console.log("do nada")
		}
	}

	useEffect(() => {
		//console.log("UEUEUEUEUEUEUEUE");
		const observer = new IntersectionObserver(onIntersection)

		if (observer && elementRef.current) {
			observer.observe(elementRef.current)
		}

		return () => {
			if (observer) {
				observer.disconnect()
			}
		}
	}, [])

	const getMore = (lastID) => {
		console.log("in________GETMORE useCallback")
		//console.log("in________GETMORE useCallback allStories", allStories);

		//get the lastID
		// let lastID;
		// allStories.map((s, i) => {
		//   if (allStories.length === i + 1) {
		//     lastID = s.id;
		//     console.log("in________GETMORE useCallback LAST ID is = " + lastID);
		//   }
		// });
		setIsLoading(true)
		axios
			.post(
				"/story_flipper/more",
				{
					data: {
						lastStoryID: lastID,
					},
				},
				{ withCredentials: true }
			)
			.then((response) => {
				console.log("RESPONSE from story_flipper", response.data)

				setIsLoading(false)
				if (response.data.newStories.length > 0) {
					setAllStories((prev) => [...prev, ...response.data.newStories])
				} else if (response.data.newStories == 0) {
					setHasNextPage(false)
				}
			})
			.catch((error) => {
				console.log("handle_getMore_Errors", error)
			})
	}

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
			//console.log("inside displayStories = allStories.map LAST")
			//setLastID(s.id);
			return <StoryCard key={i} i={i} s={s} lastID={s.id} />
		}
		//console.log("inside displayStories = allStories.map REGULAR")

		return <StoryCard key={i} i={i} s={s} />
	})

	return (
		<StoryFlipperWrapper>
			{displayStories}
			{isLoading || hasNextPage ? (
				<div ref={elementRef}>Loading more items.....</div>
			) : (
				<p className="center">
					<a href="#top">Back to Top</a>
				</p>
			)}
		</StoryFlipperWrapper>
	)
}

export default storyFlipper
