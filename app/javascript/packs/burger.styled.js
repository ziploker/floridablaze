// Burger.styled.js
import React from "react"
import styled from "styled-components"

const StyledBurger = styled.button`
	//position: absolute;
	//top: 5%;
	//left: 2rem;
	display: grid;
	flex-direction: column;
	justify-content: space-around;
	width: 2rem;
	height: 1.5rem;
	background: transparent;
	//background: pink;
	border: none;
	cursor: pointer;
	padding: 0;
	z-index: 10;

	-webkit-user-select: none; /* Safari */
	-ms-user-select: none; /* IE 10 and IE 11 */
	user-select: none; /* Standard syntax */

	&:focus {
		outline: none;
	}

	@media only screen and (min-width: 1111px) {
		display: none;
	}

	div {
		//width: 50px;
		height: 0.13rem;
		background: ${({ hamburgerScrolled }) => (hamburgerScrolled ? "black" : "white")};
		@media only screen and (max-width: 281px) {
			background: black;
		}
		border-radius: 10px;
		transition: all 0.3s linear;
		position: relative;
		transform-origin: 1px;

		:first-child {
			transform: ${({ openSideMenu }) => (openSideMenu ? "rotate(45deg)" : "rotate(0)")};
		}

		:nth-child(2) {
			opacity: ${({ openSideMenu }) => (openSideMenu ? "0" : "1")};
			transform: ${({ openSideMenu }) => (openSideMenu ? "translateX(5px)" : "translateX(0)")};
			background: inherit;
			width: ${({ openSideMenu }) => (openSideMenu ? "50px" : "initial")};
			@media only screen and (max-width: 281px) {
				color: black;
			}

			font-size: 1.2em;
			height: auto;
			color: ${({ hamburgerScrolled }) => (hamburgerScrolled ? "black" : "white")};

			@media only screen and (max-width: 420px) {
				font-size: 1em;
			}
		}

		:nth-child(3) {
			transform: ${({ openSideMenu }) => (openSideMenu ? "rotate(-45deg)" : "rotate(0)")};
			background: ${({ hamburgerScrolled }) => (hamburgerScrolled ? "black" : "white")};
			@media only screen and (max-width: 281px) {
				background: black;
			}
		}
	}
`

export default StyledBurger
