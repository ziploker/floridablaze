import axios from "axios";
import React, { useState, useEffect } from "react";

function storyFlipper({ inView }) {
	useEffect(() => {}, []);

	function GetStories(props) {
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
			})
			.catch((error) => {
				console.log("handleReversePageErrors", error);
			});

		return <h1>TRUE</h1>;
	}

	return (
		<div>
			<h1>LOADING...</h1>
			{inView == true ? <GetStories /> : <h1>FALSE</h1>}
		</div>
	);
}

export default storyFlipper;
