import React from "react"
import styled, { keyframes } from "styled-components"

const buttonWidth = "157.8px"

const blue = "#0076d3"
const orange = "#F2BA36"
const textLight = "#fefefe"

const SendButtonV2LoadingAnimationSpin = keyframes`

  to {
    transform: rotate(359deg);
    
  }



`

const SendButtonV2LoadingAnimationGrow = keyframes`

  to {
    width: 14px;
    height: 14px;
    margin-top: -8px;
    right: 13px;
    
  }



`

const StyledLoadingButton = styled.button`
	@media only screen and (max-width: 400px) {
		width: 100%;
		min-width: inherit;
	}
	display: inline-block;
	//min-width: $button-width;
	width: 100%;
	height: 100%;
	line-height: 55px;
	color: black;
	margin: 0 5px 0px 0px;
	background: #ffc439;
	//color: $text-light;
	font-size: 0.9em;
	//padding: 1em;
	border-radius: 28px;
	text-align: center;
	position: relative;
	cursor: pointer;
	appearance: none;
	-webkit-appearance: none;
	//border: 10;
	transition: border-radius linear 0.05s, width linear 0.05s;
	border: 0px;

	&:focus {
		outline: 0;
	}

	&:hover {
		background-color: #f2ba36;
	}
`

const SendButtonV2Loading = styled.div`
	//display: inline-block;
	border: 0;
	outline: 0;
	padding: 12px 16px;
	line-height: 1.4;
	//background: linear-gradient(#4d4d4d,#2f2f2f);
	//border-radius: 5px;
	//border: 1px solid black;
	color: white !important;
	font-size: 1.2em;
	cursor: pointer;
	/* Important part */
	position: relative;
	//transition: padding-right .3s ease-out;
	//padding-right: 40px;
	width: 100%;
	top: 50%;
	left: 0;
	right: 0;
	margin: auto;
	transform: translateY(-50%);

	&:after {
		content: "";
		position: absolute;
		border-radius: 100%;

		left: 0px;
		right: 0px;
		margin: 0 auto;
		top: 5px;
		//top: 0px;
		//width: 0px;
		//height: 0px;
		//margin-top: -2px;
		border: 2px solid rgba(255, 255, 255, 0.5);
		border-left-color: #fff;
		border-top-color: #fff;

		/* , , ${SendButtonV2LoadingAnimationGrow} .3s forwards ease-out */

		width: 14px;
		height: 14px;

		//transform: translateY(-50%);
		//margin-top: -8px;
		//right: 13px;
		//transform: translateY(-50%);

		animation: ${SendButtonV2LoadingAnimationSpin} 0.6s infinite linear;
	}
`

function Button_Loading({ isLoading, showLoader, setShowLoader, children, ...props }) {
	React.useEffect(() => {
		if (isLoading) {
			setShowLoader(true)
		}

		// Show loader a bits longer to avoid loading flash
		if (!isLoading && showLoader) {
			const timeout = setTimeout(() => {
				setShowLoader(false)
			}, 400)

			// Don’t forget to clear the timeout
			return () => {
				clearTimeout(timeout)
			}
		}
	}, [isLoading, showLoader])

	return (
		<StyledLoadingButton {...props}>
			{showLoader ? <SendButtonV2Loading /> : children}
		</StyledLoadingButton>
	)
}

export default Button_Loading
