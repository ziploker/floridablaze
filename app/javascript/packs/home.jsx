import React, { useEffect, useState, useRef, useCallback } from "react"
import styled, { ThemeProvider } from "styled-components"
//import { Parallax, Background } from 'react-parallax';
import Login from "./pages/login"
import defaultImage from "../../assets/images/defaultImage.jpg"
import slugify from "react-slugify"
import { Link } from "react-router-dom"
import scrollArrow from "../../assets/images/scroll-arrow.png"
import axios from "axios"
import { gsap } from "gsap"
import { Draggable } from "gsap/all"
import { _parseRelative } from "gsap/gsap-core"
import "../../assets/stylesheets/home_story_spinner.scss"
import Carousel, { CarouselItem } from "./carousel"
//import Dots from "react-carousel-dots";
import "../../assets/stylesheets/dots.css"

//
//
//
//
//
//

const HomeWrapper = styled.div`
	//background: pink;

	//height: calc(100vh - 85px);
	//max-height: 500px;
	overflow: hidden;
	//min-width: 500px;
`

const News = styled.div`
	@media only screen and (min-width: 985px) {
		/* @media only screen and (max-width: 1111px) {
			//@media only screen and (max-width: 866px) {
			//margin-top: 0px;
			margin: 20px 10px 43px 10px;
			grid-template-columns: 1fr;
			//padding: 0px 20px;
			grid-gap: 10px;

			grid-template-rows: max-content max-content max-content max-content 1fr;
			grid-template-areas:
				"one"
				"two"
				"three"
				"four"
				".";
		} */

		//@media only screen and (min-width: 867px) and (max-width: 1111px) {

		/* grid-template-columns:
			minmax(20px, 1fr)
			minmax(200px, 600px)
			10px
			minmax(200px, 600px)
			minmax(20px, 1fr);

		grid-template-rows: auto 10px auto auto auto auto;
		grid-template-areas:
			"leftArrow      one   .   two   rightArrow"
			"leftArrow       .    .    .    rightArrow  "
			"leftArrow     three  .   four  rightArrow"
			"leftArrow     three  .   four  rightArrow"
			"leftArrow     three  .   four  rightArrow"
			"    .           .    .    .        .     "; */
		//}

		min-height: 100%;

		display: grid;
		justify-content: center;

		/* grid-template-columns:
			minmax(30px, 1fr) minmax(200px, 600px) minmax(10px, 1fr) minmax(
				200px,
				600px
			)
			minmax(10px, 1fr) minmax(200px, 600px) minmax(30px, 1fr);

		grid-template-areas:
			"leftArrow   one . two . three   rightArrow"
			"leftArrow   one . two . three   rightArrow"
			"leftArrow   one . two . three   rightArrow"
			"    .        .  .  .  .   .     ."; */

		grid-template-columns:
			minmax(30px, 50px) 1fr minmax(10px, 30px) 1fr
			minmax(30px, 50px);
		/* minmax(10px, 1fr) minmax(200px, 600px) minmax(30px, 1fr); */

		grid-template-areas:
			"leftArrow   one . two rightArrow"
			"leftArrow   one . two rightArrow"
			"leftArrow   one . two rightArrow"
			"    .        .  .  .      .     ";
		//grid-gap: 20px;

		margin-top: 30px;

		/* display: grid;
		justify-content: center;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-areas:
			"featured one two  ." */

		/* @media only screen and (min-width: 2000px){
			grid-template-columns: 10vw 1fr 1fr 1fr 10vw;

		} */

		/* @media only screen and (min-width: 1850px) {
			grid-template-columns:
				minmax(20px, 1fr) minmax(600px, 700px) minmax(600px, 700px)
				minmax(600px, 700px) minmax(20px, 1fr);
		} */
	}

	display: none;
`

const LeftArrow = styled.img`
	max-width: 30px;

	position: relative;
	justify-self: end;
	align-self: center;
	-webkit-transform: scaleX(-1);
	transform: scaleX(-1);
`

const LinkWrapper1 = styled(Link)`
	//grid-area: 1/1/3/2;
	//grid-area: one;
	grid-area: 1/1/-1/-1;
	//max-width: 600px;
	width: 100%;
	justify-self: center;
	display: grid;
	@media only screen and (min-width: 985px) {
		grid-area: one;
		width: 100%;
		justify-self: center;
		display: grid;
	}
`

const LinkWrapper2 = styled(Link)`
	//grid-area: 1/1/3/2;
	//grid-area: two;
	grid-area: 1/1/-1/-1;
	//max-width: 600px;
	width: 100%;
	justify-self: center;
	display: grid;
	@media only screen and (min-width: 985px) {
		grid-area: two;
		width: 100%;
		justify-self: center;
		display: grid;
	}
`

const Div1 = styled.div`
	box-shadow: 0 2px 5px 0 rgba(227, 181, 90, 0.2);
	position: relative;
	border-radius: 10px;
	overflow: hidden;
	display: grid;
	justify-self: center;
	//max-width: 600px;
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
`

const Div2 = styled.div`
	box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);
	position: relative;
	border-radius: 10px;
	overflow: hidden;
	display: grid;
	justify-self: center;
	//max-width: 600px;
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
`

const Div1OverlayWrapper = styled.div`
	pointer-events: none;
	word-break: break-all;
	//grid-area: one;
	grid-area: 1/1/-1/-1;
	border-radius: 10px;
	overflow: hidden;
	//max-width: 600px;
	width: 100%;
	height: 100%;
	justify-self: center;
	display: grid;
	z-index: 1;

	background: rgb(0, 0, 0);
	background: -moz-linear-gradient(0deg, rgba(0, 0, 0, 1) 10%, rgba(255, 145, 145, 0) 34%);
	background: -webkit-linear-gradient(0deg, rgba(0, 0, 0, 1) 10%, rgba(255, 145, 145, 0) 34%);
	background: linear-gradient(0deg, rgba(0, 0, 0, 1) 10%, rgba(255, 145, 145, 0) 34%);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#ff9191",GradientType=1);

	@media only screen and (min-width: 985px) {
		grid-area: one;
	}
`

const Div2OverlayWrapper = styled(Div1OverlayWrapper)`
	//grid-area: two;
	grid-area: 1/1/-1/-1;

	@media only screen and (min-width: 985px) {
		grid-area: two;
	}
`

const StoryOneTitle = styled.h1`
	//grid-area: 1 /1 /2/2;
	white-space: normal;
	font-size: 4vw;
	word-break: break-all;
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
`

const LeftArrowButton = styled.button`
	width: 100%;
	height: 100%;
	grid-area: leftArrow;
	align-self: center;
	justify-self: end;
	background: rgba(255, 255, 255, 0);
	border: 0;
	display: grid;

	z-index: 1;

	cursor: pointer;

	&:hover {
		background: rgba(54, 54, 54, 0.075);
	}
`

const RightArrowButton = styled.button`
	//@media only screen and (min-width: 1111px) {
	width: 100%;
	height: 100%;
	grid-area: rightArrow;
	align-self: center;
	justify-self: start;
	background: rgba(255, 255, 255, 0);
	border: 0;
	display: grid;
	cursor: pointer;

	&:hover {
		background: rgba(54, 54, 54, 0.075);
	}
	//}

	//display: none;
`

const RightArrow = styled.img`
	max-width: 30px;

	position: relative;
	justify-self: start;
	align-self: center;
`

const BackgroundGray = styled.div`
	@media only screen and (max-width: 866px) {
		display: none;
	}
	background: #c4c4c4;
	grid-area: 3/1/-1/-1;
	z-index: -1;
	padding: 75px 0px;

	/* @media only screen and (max-width: 1111px) {
		grid-area: 5/1/-1/-1;
	} */
`

const ItemWrapper = styled.div`
	display: grid;
	width: 97%;
	margin: 0 auto;
`

const AllDotsWrapper = styled.div`
	grid-area: 1/2/2/3;
	display: grid;
	grid-template-columns: ${(props) => `repeat(${props.allStories.length + 11}, 20px)`};
	overflow: hidden;
	width: 220px;
	justify-self: center;
	margin-bottom: 13px;

	transition: transform 0.5s ease;
`

//
//
//
//
//
//

const gsapSwipeAnimation = () => {
	gsap.to(
		".s1",

		{
			x: "-500%",
			duration: 0.2,
		}
	)

	gsap.fromTo(
		".s1",
		{ x: "300%" },
		{
			x: "initial",

			duration: 0.2,
			delay: 0.1,
		}
	)

	gsap.to(
		".s2",

		{
			x: "-500%",
			duration: 0.2,
		}
	)

	gsap.fromTo(
		".s2",
		{ x: "300%" },
		{
			x: "initial",

			duration: 0.2,
			delay: 0.1,
		}
	)
}

const gsapSwipeAnimationReverse = () => {
	gsap.to(".s1", {
		x: "500%",
		duration: 0.2,
	})
	gsap.fromTo(
		".s1",
		{ x: "-300%" },
		{
			x: "initial",
			duration: 0.2,
			delay: 0.1,
		}
	)
	gsap.to(".s2", {
		x: "500%",
		duration: 0.2,
	})
	gsap.fromTo(
		".s2",
		{ x: "-300%" },
		{
			x: "initial",
			duration: 0.2,
			delay: 0.1,
		}
	)
}

const gsapDeadEndAnimation = () => {
	gsap.to(
		".s1",

		{
			x: "-10%",
			duration: 0.2,
		}
	)
	gsap.to(
		".s1",

		{
			x: "0",
			duration: 0.9,
		}
	)
}

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////                    ////////////////////////
///////////////   HOME             ////////////////////////
///////////////                    ////////////////////////
///////////////////////////////////////////////////////////

function Home(props) {
	console.log("==============Home===============")
	console.log("==============Home Props===============", props)

	//
	//
	//
	//

	const gsapContainer1 = useRef()
	const gsapContainer2 = useRef()
	const isMountedForVisibleDotsUseEffect = useRef(false)
	const isMountedForactiveDotUseEffect = useRef(false)
	const whatMode = useRef("")
	const whatDirection = useRef("")

	const [loadingStories, setLoadingStories] = React.useState(false)
	const [activeStories, setActiveStories] = useState([0, 1])
	const [activeDot, setActiveDot] = useState(0)
	const [visibleDots, setVisibleDots] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
	const [transitionX, setTransitionX] = useState(60)

	//
	//
	//
	//sets initial sories to local state for caching
	useEffect(() => {
		console.log("start of function UE=================", props.allStories)

		if (
			window.localStorage.getItem("allStories") !== null &&
			JSON.parse(window.localStorage.getItem("allStories")).length > 0 &&
			props.allStoriesFromController.length > 0
		) {
			console.log(
				"compare it LOCAL=======",
				JSON.parse(window.localStorage.getItem("allStories"))[0].id
			)

			if (
				props.allStoriesFromController[0].id ==
				JSON.parse(window.localStorage.getItem("allStories"))[0].id
			) {
				props.setAllStories(JSON.parse(window.localStorage.getItem("allStories")))
			}

			console.log(
				"check to see whats up with localstorage",
				typeof window.localStorage.getItem("allStories")
			)
		}
		// }
	}, [])

	//
	//
	//sets props.allStories to local state for caching every time new stories are scrolled
	useEffect(() => {
		window.localStorage.setItem("allStories", JSON.stringify(props.allStories))
	}, [props.allStories])

	//
	//
	//shifts the indicator dots to the left everytime visibleDots changes
	useEffect(() => {
		if (isMountedForVisibleDotsUseEffect.current) {
			if (whatDirection.current == "reverse") {
				if (visibleDots[7] - 3 == props.allStories.length) {
					console.log("AT the ned of the line")
				} else {
					setTransitionX((pre) => pre - 20)
				}
			} else if (whatDirection.current == "forward") {
				if (visibleDots[7] - 3 == props.allStories.length) {
					console.log("AT the ned of the line")
				} else {
					setTransitionX((pre) => pre - 20)
				}
			}
		} else {
			isMountedForVisibleDotsUseEffect.current = true
		}
	}, [visibleDots])

	//
	//
	//changes Stories and activeDot position everytime activeDot changes
	useEffect(() => {
		if (isMountedForactiveDotUseEffect.current) {
			console.log("inside useEffect and whatMode is = " + whatMode.current)
			console.log("inside useEffect and whatDirection is = " + whatDirection.current)

			const mode = whatMode.current
			const direction = whatDirection.current

			console.log(
				"activeDot USEEffect activeDot = " +
					activeDot +
					" and AS.length is " +
					props.allStories.length
			)

			if (direction == "reverse") {
				//
				//
				//Indicator Dots Logic

				console.log(
					"--------=-=-=-==--=- inside DOtLogic activeDot ===-=-=---=-=-=-=-=-=-=-= " + activeDot
				)
				console.log(
					"--------=-=-=-==--=- inside DOtLogic visibleDots[7] ===-=-=---=-=-=-=-=-=-=-= " +
						visibleDots[7]
				)

				//visible dot default is 7, so activeDot + 3 will == 7 when the indicator reaches
				//position 7 and on next right arrow click, dots will shift to the left
				if (activeDot + 3 == visibleDots[7] && activeDot + 1 <= props.allStories.length) {
					setVisibleDots((pre) => {
						let newArray = []

						pre.map((n, i) => {
							newArray[i] = n + 1
						})

						return newArray
					})
				}
				//
				//
				//
				//Story Logic
				let storiesLeft = props.allStories.length - (activeStories[1] + 1)

				let atLastStory = false

				if (activeStories[0] + 1 == props.allStories.length) {
					atLastStory = true
				}
				console.log("activeStories[0] ======================== " + activeStories[0])
				console.log("atLastStory ======================== " + atLastStory)

				if (atLastStory) {
					console.log("==========At====The=====End========")
				} else {
					if (storiesLeft >= 2) {
						console.log("there are " + storiesLeft + " stories left in allStories array")

						// shift active stories up by two and animate change
						if (mode == "desktop") {
							if (activeStories[0] > activeStories[1]) {
								let nv1 = activeStories[1] + 2
								let nv0 = nv1 - 1

								setActiveStories([nv0, nv1])

								gsapSwipeAnimationReverse()
							} else {
								let nv0 = activeStories[0] + 2
								let nv1 = activeStories[1] + 2

								setActiveStories([nv0, nv1])

								gsapSwipeAnimationReverse()
							}
						} else if (mode == "cellphone") {
							console.log("storiesLeft >= 2 and mode cellphone")
							if (activeStories[0] > activeStories[1]) {
								console.log("activeStories[0] was > activeStories[1]")
								let nv1 = activeStories[1] + 1
								let nv0 = nv1 - 1

								setActiveStories([nv0, nv1])

								gsapSwipeAnimationReverse()
							} else {
								let nv0 = activeStories[0] + 1
								let nv1 = activeStories[1] + 1

								setActiveStories([nv0, nv1])

								gsapSwipeAnimationReverse()
							}
						}
					} else if (storiesLeft == 1) {
						console.log(
							"there is " + storiesLeft + " story left in allStories array, fetching 1 more"
						)
						if (mode == "desktop") {
							setLoadingStories(true)
							axios
								.post(
									"/reverse/",
									{
										data: {
											secondToLastStory_ID: (props.allStories[activeStories[1]] + 1).id,
											getNumOfStories: 1,
										},
									},
									{ withCredentials: true }
								)
								.then((response) => {
									console.log(
										"============ fetch response, asked for 1 and got " +
											response.data.stories.length +
											" back."
									)

									if (response.data.stories.length == 1) {
										props.setAllStories((prevStories) => [...prevStories, ...response.data.stories])

										let nv0 = activeStories[0] + 2
										let nv1 = activeStories[1] + 2

										setActiveStories([nv0, nv1])
										gsapSwipeAnimationReverse()

										setLoadingStories(false)
									} else if (response.data.stories.length == 0) {
										let nv0 = activeStories[0] + 2
										let nv1 = 0

										setActiveStories([nv0, nv1])
										gsapSwipeAnimationReverse()

										setLoadingStories(false)
									}
								})
								.catch((error) => {
									console.log("handleReversePageErrors", error)
								})
						} else if (mode == "cellphone") {
							console.log("storiesLeft == 1 and mode cellphone")

							let nv0 = activeStories[0] + 1
							let nv1 = activeStories[1] + 1

							setActiveStories([nv0, nv1])
							gsapSwipeAnimationReverse()
						}
					} else if (storiesLeft == 0) {
						console.log(
							"there are " + storiesLeft + " stories left in allStories array, fetching 2 more"
						)
						if (mode == "desktop") {
							setLoadingStories(true)
							axios
								.post(
									"/reverse/",
									{
										data: {
											secondToLastStory_ID: props.allStories[activeStories[1]].id,
											getNumOfStories: 2,
										},
									},
									{ withCredentials: true }
								)
								.then((response) => {
									console.log(
										"============ fetch response, asked for 2 and got " +
											response.data.stories.length +
											" back."
									)

									if (response.data.stories.length == 1) {
										props.setAllStories((prevStories) => [...prevStories, ...response.data.stories])

										let nv0 = activeStories[0] + 2
										let nv1 = 0

										setActiveStories([nv0, nv1])
										gsapSwipeAnimationReverse()

										setLoadingStories(false)
									} else if (response.data.stories.length == 0) {
										let nv0 = 0
										let nv1 = 1

										setActiveStories([nv0, nv1])
										gsapSwipeAnimationReverse()

										setLoadingStories(false)
									} else if (response.data.stories.length == 2) {
										props.setAllStories((prevStories) => [...prevStories, ...response.data.stories])
										let nv0 = activeStories[0] + 2
										let nv1 = activeStories[1] + 2

										setActiveStories([nv0, nv1])
										gsapSwipeAnimationReverse()

										setLoadingStories(false)
									}
								})
								.catch((error) => {
									console.log("handleReversePageErrors", error)
								})
						} else if (mode == "cellphone") {
							console.log("333333333333333333333333333333")

							setLoadingStories(true)
							axios
								.post(
									"/reverse/",
									{
										data: {
											secondToLastStory_ID: props.allStories[activeStories[1]].id,
											getNumOfStories: 2,
										},
									},
									{ withCredentials: true }
								)
								.then((response) => {
									console.log(
										"============ fetch response, asked for 2 and got " +
											response.data.stories.length +
											" back."
									)

									if (response.data.stories.length == 1) {
										props.setAllStories((prevStories) => [...prevStories, ...response.data.stories])

										let nv0 = activeStories[0] + 1
										let nv1 = activeStories[1] + 1

										setActiveStories([nv0, nv1])
										gsapSwipeAnimationReverse()

										setLoadingStories(false)
									} else if (response.data.stories.length == 0) {
										console.log("---------------     everything was zero     -----------")

										let nv0 = activeStories[0] + 1
										let nv1 = 0

										setActiveStories([nv0, nv1])
										gsapSwipeAnimationReverse()

										setLoadingStories(false)
									} else if (response.data.stories.length == 2) {
										props.setAllStories((prevStories) => [...prevStories, ...response.data.stories])
										let nv0 = activeStories[0] + 1
										let nv1 = activeStories[1] + 1

										setActiveStories([nv0, nv1])
										gsapSwipeAnimationReverse()

										setLoadingStories(false)
									}
								})
								.catch((error) => {
									console.log("handleReversePageErrors", error)
								})
						}
					}
				}
			} else if (direction == "forward") {
				//
				//
				//Indicator Dots Logic
				console.log("started dot Logic forward " + activeDot + "  " + visibleDots[3])
				if (activeDot + 5 == visibleDots[3]) {
					// setVisibleDots((pre) => {
					// 	let newArray = []
					// 	pre.map((n, i) => {
					// 		newArray[i] = n - 1
					// 	})
					// 	return newArray
					// })

					console.log("start Scrolling left 7878787878787878")
				}
			}
		} else {
			isMountedForactiveDotUseEffect.current = true
		}
	}, [activeDot])

	//
	//
	//
	//

	function handleForwardPage(mode) {
		// mode is either "cellphone" or "desktop"
		// sets the useRef with mode "desktop" or "cellphone"
		// so it can be accessed in the useEffect thats run after setActiveDot
		whatDirection.current = "forward"
		whatMode.current = mode
		if (activeDot > 0) {
			setActiveDot((pre) => {
				return pre - 1
			})
		} else {
			console.log("did nothing because activeDot was zero " + activeDot)
		}
	}

	function handleReversePage(mode) {
		// mode is either "cellphone" or "desktop"
		// sets the useRef with mode "desktop" or "cellphone"
		// so it can be accessed in the useEffect thats run after setActiveDot
		whatDirection.current = "reverse"
		whatMode.current = mode
		if (activeDot + 1 == props.allStories.length) {
			console.log(
				"did nothing because activeDot was same as allstories.length" +
					activeDot +
					" == " +
					props.allStories.length
			)
		} else {
			setActiveDot((pre) => {
				return pre + 1
			})
		}
	}

	const getDotClassName = useCallback(
		(index) => {
			//console.log("======Running getDotClassName usecallback inside home function=======")

			// if (whatDirection.current == "reverse" || whatDirection.current == "") {
			if (index + 3 == visibleDots[2] || index + 3 == visibleDots[8]) {
				return "medium"
			} else if (index + 3 == visibleDots[1] || index + 3 == visibleDots[9]) {
				return "small"
			} else if (index + 3 == visibleDots[0] || index + 3 == visibleDots[10]) {
				return "invisible"
			} else if (index + 3 >= visibleDots[2] && index + 3 <= visibleDots[7]) {
				return ""
			} else {
				return "invisible"
			}
			// } else if (whatDirection.current == "forward") {
			// 	if (index + 3 == visibleDots[2] || index + 3 == visibleDots[8]) {
			// 		return "medium"
			// 	} else if (index + 3 == visibleDots[1] || index + 3 == visibleDots[9]) {
			// 		return "small"
			// 	} else if (index + 3 == visibleDots[0] || index + 3 == visibleDots[10]) {
			// 		return "invisible"
			// 	} else if (index + 3 >= visibleDots[2] && index + 3 <= visibleDots[7]) {
			// 		return ""
			// 	} else {
			// 		return "invisible"
			// 	}
			// }
		},
		[visibleDots]
	)

	const getDotStyle = useCallback(() => {
		//console.log("======Running getDotsStyle usecallback inside home function=======")

		let style = {
			height: "16px",
			width: "16px",
			transform: `translateX(${transitionX}px)`,
		}

		return style
	}, [transitionX])

	const getDots = useCallback(() => {
		//console.log("======Running getDots usecallback inside home function=======")
		const dots = []

		props.allStories.map((s, i) => {
			console.log(
				"About to MAP and they're are a total of " + props.allStories.length + " stories."
			)
			dots.push(
				<div style={getDotStyle()} className="dot-holder" key={i}>
					<div
						key={`${i}-inner`}
						className={`eachDot
                      ${getDotClassName(i)}
                      ${activeDot === i ? "active" : ""}`}
					/>
				</div>
			)
		})
		return dots
	}, [props.allStories, activeDot])

	//
	//
	//
	//

	return (
		<HomeWrapper>
			{/* <h1>{innerWidth}</h1> */}
			<News className="box">
				<LeftArrowButton onClick={() => handleForwardPage("desktop")}>
					<LeftArrow src={scrollArrow}></LeftArrow>
				</LeftArrowButton>

				<LinkWrapper1
					to={
						"/blog/" +
						slugify(
							props.allStories[activeStories[0]] ? props.allStories[activeStories[0]].title : "nada"
						)
					}
					state={{ art: props.allStories[activeStories[0]] }}
				>
					<Div1
						className="s1"
						imageURL={
							props.allStories[activeStories[0]]
								? props.allStories[activeStories[0]].urls[0]
								: defaultImage
						}
					></Div1>
				</LinkWrapper1>
				<Div1OverlayWrapper className="s2">
					<StoryOneTitle>
						{props.allStories[activeStories[0]]
							? props.allStories[activeStories[0]].title
							: "Place golder for title. place golder for title."}
					</StoryOneTitle>
				</Div1OverlayWrapper>
				{loadingStories ? (
					<div
						className="loader"
						style={{
							gridArea: "one",
							justifySelf: "center",
							alignSelf: "center",
						}}
					>
						Loading...
					</div>
				) : null}
				<LinkWrapper2
					to={
						"/blog/" +
						slugify(
							props.allStories[activeStories[1]] ? props.allStories[activeStories[1]].title : "nada"
						)
					}
					state={{ art: props.allStories[activeStories[1]] }}
				>
					<Div2
						className="s1"
						imageURL={
							props.allStories[activeStories[1]]
								? props.allStories[activeStories[1]].urls[0]
								: defaultImage
						}
					></Div2>
				</LinkWrapper2>
				<Div2OverlayWrapper className="s2">
					<StoryOneTitle>
						{props.allStories[activeStories[1]]
							? props.allStories[activeStories[1]].title
							: "Place holder for title, place holder for title"}
					</StoryOneTitle>
				</Div2OverlayWrapper>

				<RightArrowButton onClick={() => handleReversePage("desktop")}>
					<RightArrow src={scrollArrow}></RightArrow>
				</RightArrowButton>
				<BackgroundGray></BackgroundGray>
			</News>
			{/* ////////// */}

			<Carousel handleReversePage={handleReversePage} handleForwardPage={handleForwardPage}>
				<CarouselItem>
					<ItemWrapper>
						<LinkWrapper1
							to={
								"/blog/" +
								slugify(
									props.allStories[activeStories[0]]
										? props.allStories[activeStories[0]].title
										: "nada"
								)
							}
							state={{ art: props.allStories[activeStories[0]] }}
							ref={gsapContainer1}
						>
							<Div1
								className="s1"
								imageURL={
									props.allStories[activeStories[0]]
										? props.allStories[activeStories[0]].urls[0]
										: defaultImage
								}
							></Div1>
						</LinkWrapper1>

						<Div1OverlayWrapper ref={gsapContainer2} className="s2">
							<StoryOneTitle>
								{props.allStories[activeStories[0]]
									? props.allStories[activeStories[0]].title
									: "Place golder for title. place golder for title."}
							</StoryOneTitle>
						</Div1OverlayWrapper>
					</ItemWrapper>
				</CarouselItem>
				<CarouselItem>
					<ItemWrapper>
						<LinkWrapper2
							to={
								"/blog/" +
								slugify(
									props.allStories[activeStories[1]]
										? props.allStories[activeStories[1]].title
										: "nada"
								)
							}
							state={{ art: props.allStories[activeStories[1]] }}
						>
							<Div2
								className="s1"
								imageURL={
									props.allStories[activeStories[1]]
										? props.allStories[activeStories[1]].urls[0]
										: defaultImage
								}
							></Div2>
						</LinkWrapper2>

						<Div2OverlayWrapper className="s2">
							<StoryOneTitle>
								{props.allStories[activeStories[1]]
									? props.allStories[activeStories[1]].title
									: "Place holder for title, place holder for title"}
							</StoryOneTitle>
						</Div2OverlayWrapper>
					</ItemWrapper>
				</CarouselItem>
			</Carousel>

			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
				<AllDotsWrapper allStories={props.allStories}>{getDots()}</AllDotsWrapper>
			</div>
		</HomeWrapper>
	)
}

export default Home
