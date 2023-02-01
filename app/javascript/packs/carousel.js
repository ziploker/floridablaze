import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";
import { gsap } from "gsap";
import { Draggable } from "gsap/all";
import "../../assets/stylesheets/carouselstyle.scss";

//import "./sliderInfo.js";

const CarouselMain = styled.div`
	overflow: hidden;
	margin: 30px 0px 40px 0px;
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

		console.log("inside SLIDERINFO ____________");
		gsap.registerPlugin(Draggable);

		var slideDelay = 1.5;
		var slideDuration = 0.3;

		var slides = document.querySelectorAll(".slide");
		var prevButton = document.querySelector("#prevButton");
		var nextButton = document.querySelector("#nextButton");
		console.log("slides----------------------------------", slides);
		var numSlides = slides.length;

		// for (var i = 0; i < numSlides; i++) {
		// 	gsap.set(slides[i], {
		// 		backgroundColor: Math.random() * 0xffffff,
		// 		xPercent: i * 100,
		// 	});
		// }

		window.addEventListener("resize", resize);

		prevButton.addEventListener("click", function () {
			animateSlides(1);
		});

		nextButton.addEventListener("click", function () {
			animateSlides(-1);
		});

		var wrap = wrapPartial(-100, (numSlides - 1) * 100);
		var timer = gsap.delayedCall(slideDelay, autoPlay);

		var animation = gsap.to(slides, 1, {
			xPercent: "+=" + numSlides * 100,
			ease: "none",
			paused: true,
			repeat: -1,
			modifiers: {
				xPercent: wrap,
			},
		});

		var proxy = document.createElement("div");
		gsap.set(proxy, { x: "+=0" });
		//var transform = proxy._gsTransform;
		var transform = gsap.getProperty(proxy);
		var slideAnimation = gsap.to({}, 0.1, {});
		var slideWidth = 0;
		var wrapWidth = 0;
		resize();

		var draggable = new Draggable(proxy, {
			trigger: ".slides-container",
			throwProps: true,
			onPress: updateDraggable,
			onDrag: updateProgress,
			onThrowUpdate: updateProgress,
			snap: {
				x: snapX,
			},
		});

		// window.addEventListener("resize", resize);

		// prevButton.addEventListener("click", function () {
		// 	animateSlides(1);
		// });

		// nextButton.addEventListener("click", function () {
		// 	animateSlides(-1);
		// });

		function updateDraggable() {
			timer.restart(true);
			slideAnimation.kill();
			this.update();
		}

		function animateSlides(direction) {
			timer.restart(true);
			slideAnimation.kill();

			var x = snapX(transform.x + direction * slideWidth);

			slideAnimation = gsap.to(proxy, slideDuration, {
				x: x,
				onUpdate: updateProgress,
			});
		}

		function autoPlay() {
			if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
				timer.restart(true);
			} else {
				animateSlides(-1);
			}
		}

		function updateProgress() {
			animation.progress(transform.x / wrapWidth);
		}

		function snapX(x) {
			return Math.round(x / slideWidth) * slideWidth;
		}

		function resize() {
			var norm = transform.x / wrapWidth || 0;

			slideWidth = slides[0].offsetWidth;
			wrapWidth = slideWidth * numSlides;

			gsap.set(proxy, {
				x: norm * wrapWidth,
			});

			animateSlides(0);
			slideAnimation.progress(1);
		}

		function wrapPartial(min, max) {
			var r = max - min;
			return function (value) {
				var v = value - min;
				return ((r + (v % r)) % r) + min;
			};
		}
	});

	const handlers = useSwipeable({
		onSwipedLeft: () => updateIndex(activeIndex + 1),
		onSwipedRight: () => updateIndex(activeIndex - 1),
	});

	return (
		<CarouselMain
			{...handlers}
			//className="carousel"
			className="slides-inner"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
		>
			<CarouselMainInner
				//className="inner"
				className="slides-inner"
				style={{ transform: `translateX(-${activeIndex * 100}%)` }}
			>
				{React.Children.map(children, (child, index) => {
					return React.cloneElement(child, { width: "100%" });
				})}
			</CarouselMainInner>
			<Indicators className="indicators">
				<button
					id="prevButton"
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
					id="nextButton"
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
