import React, { useState, useRef, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
//import logoImg from "../../assets/images/logoPlaceholder.jpg";
import redX from "../../assets/images/redXmark.jpg";
import greenCheck from "../../assets/images/greenCheck.png";
import tinyMan from "../../assets/images/tinyManLogo.png";
import lock from "../../assets/images/lockIcon.png";
import styled from "styled-components";
import userIcon from "../../assets/images/signup2.svg";
import {
	Card,
	Logo,
	Form,
	Button,
	ErrorMsg,
	XorCheckIcon,
	LoginWrapper,
	InputIcon,
	LogoWrapper,
	H2,
	Label,
	ErrorWrapper,
} from "./pages/AuthForm";

const LoginWrapperNew = styled.div`
	//z-index: 10;

	//position: absolute;
	//top: ${(props) => (props.loginClicked ? "85px" : "-500px")};
	//right: 0;
	background-color: white;
	padding: 20px;
	transition: all 1s ease 0s;
	max-width: 60%;
`;

const CardNew = styled.div``;

const FormItem = styled.div`
	position: relative;
	margin: 0 0 38px 0;
	padding: 0;

	&:nth-child(2) {
		margin: 0 0 10px 0;
	}

	&:nth-child(3) {
		margin: 0 0 20px 0;
	}

	&:nth-child(4) {
		margin: 0 0 0 0;
	}
`;

const Input = styled.input`
	padding: 1rem;
	box-sizing: border-box;
	margin: 0px;
	width: 100%;
	height: 44px;
	padding-left: 50px;
	box-shadow: inset 0 1px 2px rgba(203, 203, 210, 0.4);

	padding-right: 8px;

	font-size: 14px;
	line-height: 1.42857;
	color: #3f3f44;
	background-color: #fff;
	background-image: none;
	border: 1px solid #cbcbd2;
	border-radius: 4px;

	filter: none;
`;

const CloseWindow = styled.a`
	position: absolute;
	line-height: 1.3em;
	top: 0px;
	right: 0px;
	border: 1px solid red;
	border-radius: 45px;
	font-size: 0.5rem;
	cursor: pointer;
	padding: 2px;
`;

const LogoWrapperNew = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
	position: relative;
`;
///////////////////////////////////  LOG_IN_PAGE //////////////////////////////
function Login(props) {
	console.log("==============Login===============");
	console.log("==============Login Props===============", props);
	const linker = useRef();
	const [state, setState] = React.useState({
		email: "",
		emailFieldActive: true,
		password: "",
		passwordFieldActive: true,
		rememberMe: false,
		status: "",
		errors: {},
	});

	useEffect(() => {
		console.log("Inside useeffect of admin login, to make new story", linker);

		if (linker.current) {
			setTimeout(() => {
				linker.current.click();
			}, 3000);
		}
	}, [state]);

	// to activate the input field while typing
	function activateField(e) {
		setState({
			...state,
			[e.target.name + "FieldActive"]: true,
		});
	}

	// to deactivate input only if it's empty
	function disableField(e) {
		if (e.target.value === "") {
			setState({
				...state,
				[e.target.name + "FieldActive"]: false,
			});
		}
	}

	function closeLoginWindow() {
		props.setLoginClicked(false);
		setState({
			...state,
			status: "",
			errors: {},
		});
	}

	///////////////////////////////////  HANDLE_SUBMIT ///////////////////////////
	function handleSubmit(event) {
		////send info into backend to Log IN/////
		event.preventDefault();
		//const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://floridablaze.io"
		axios
			.post(
				"/ziploker/verify",
				{
					user: {
						email: state.email,
						password: state.password,
						rememberMe: state.rememberMe,
					},
				},
				{ withCredentials: true }
			)
			.then((response) => {
				console.log("Log in submit Response", response);

				if (response.data.status == "green") {
					setState({
						...state,
						status: "green",
						errors: response.data.error,
					});

					//props.history.push("/")
				} else {
					setState({
						...state,
						status: "pink",
						errors: response.data.error,
					});
				}
			})
			.catch((error) => {
				console.log("LoginErrors", error);

				setState({
					...state,
					status: "pink",
					errors: { auth: [error] },
				});
			});
	}

	///////////////////////////////////  HANDLE_CHANGE /////////////////////////////
	function handleChange(event) {
		const value = event.target.value;
		console.log("#################");
		console.log("name", event.target.name);

		console.log("value", value);
		console.log("#################");

		if (event.target.name == "remember") {
			setState((prevState) => ({
				...prevState,
				rememberMe: !prevState.rememberMe,
			}));
		} else {
			setState({
				...state,
				[event.target.name]: value,
			});
		}
		//activateField(event);
	}

	///////////////////////////////////  SETUP ERRORMESSAGES //////////////////////
	let errorMessages = [];

	if (state.errors) {
		if (state.errors.success) {
			errorMessages.push(
				<ErrorMsg key="1"> {state.errors.success[0]} </ErrorMsg>
			);
		}

		if (state.errors.auth) {
			errorMessages.push(<ErrorMsg key="2"> {state.errors.auth[0]} </ErrorMsg>);
		}

		if (state.errors.password) {
			errorMessages.push(
				<ErrorMsg key="3"> {"Password " + state.errors.password[0]} </ErrorMsg>
			);
		}

		if (state.errors.password_confirmation) {
			errorMessages.push(
				<ErrorMsg key="4">
					{" "}
					{"Confirmation " + state.errors.password_confirmation[0]}{" "}
				</ErrorMsg>
			);
		}

		if (state.errors.green) {
			errorMessages.push(<ErrorMsg key="5"> {state.errors.green} </ErrorMsg>);
		}
	}

	/////////////////////////////////// JSX /////////////////////////////////////////

	return (
		<LoginWrapperNew loginClicked={props.loginClicked}>
			<CardNew>
				<LogoWrapperNew>
					<CloseWindow onClick={closeLoginWindow}>&#10060;</CloseWindow>
					<a href="/">
						<Logo src={userIcon} />
					</a>
					<H2>Log in </H2>
				</LogoWrapperNew>

				<Form onSubmit={handleSubmit}>
					<FormItem>
						<Label className={state.emailFieldActive ? "field-active" : ""}>
							email
						</Label>
						<InputIcon
							style={{ backgroundImage: `url(${tinyMan})` }}
						></InputIcon>

						<Input
							name="email"
							type="email"
							value={state.email}
							onChange={handleChange}
							onFocus={activateField}
							onBlur={disableField}
							required
						/>
					</FormItem>

					<FormItem>
						<Label className={state.passwordFieldActive ? "field-active" : ""}>
							password
						</Label>
						<InputIcon style={{ backgroundImage: `url(${lock})` }}></InputIcon>

						<Input
							name="password"
							type="password"
							value={state.password}
							onChange={handleChange}
							onFocus={activateField}
							onBlur={disableField}
							required
						/>
					</FormItem>

					<FormItem>
						<input
							name="remember"
							value={state.rememberMe}
							type="checkbox"
							onChange={handleChange}
						/>

						<label
							style={{
								marginLeft: "10px",
								fontSize: ".6em",
							}}
						>
							remember me:
						</label>
					</FormItem>

					<Button type="submit">Log In</Button>
				</Form>

				<ErrorWrapper>
					{/* <XorCheckIcon status={state.status} src={redX}/> */}
					<XorCheckIcon
						status={state.status}
						src={state.status === "pink" ? redX : greenCheck}
					/>
					{errorMessages}{" "}
					{state.status === "green" ? (
						<span style={{ fontSize: ".5em", fontWeight: "bold" }}>
							- you will be redirected in a few seconds, if anything click{" "}
							<a ref={linker} href="/ziploker">
								here
							</a>
						</span>
					) : null}
				</ErrorWrapper>
			</CardNew>
			
      <a style={{fontSize: ".5em", textDecoration: "underline"}} href="/signup">Dont have an account? </a><br/>
      <a style={{fontSize: ".5em", textDecoration: "underline"}} href="/forgot">Forgot password?? </a><br/>
      <a style={{fontSize: ".5em", textDecoration: "underline"}} href="/resend">Resend Email </a><br/>
     
		</LoginWrapperNew>
	);
}

//export default withRouter(Login);
export default Login;
