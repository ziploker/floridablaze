import React, { useState } from "react";
//import { Link, Redirect, withRouter } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
//import logoImg from "../../../assets/images/logoPlaceholder.jpg";
import redX from "../../../assets/images/redXmark.jpg";
import greenCheck from "../../../assets/images/greenCheck.png";
import tinyMan from "../../../assets/images/tinyManLogo.png";
import lock from "../../../assets/images/lockIcon.png";
import styled from "styled-components";
import userIcon from "../../../assets/images/signup2.svg";
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
} from "./AuthForm";

const LoginWrapperNew = styled.div`
  z-index: 11;
  width: 35vw;
  position: fixed;
  top: ${(props) => (props.login_clicked == "true" ? "0px" : "-555px")};
  right: 0;
  background-color: white;
  padding: 140px 20px 20px 20px;
  transition: all 0.3s ease 0s;

  @media only screen and (max-width: 480px) {
    width: 100vw;
  }
`;

const CardNew = styled.div`
  margin-bottom: 15px;
`;

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

  // font-size: 14px;
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
  // font-size: 0.5rem;
  cursor: pointer;
  padding: 2px;
`;

const LogoWrapperNew = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  position: relative;
`;

///////////////////////////////////  LOG_IN_PAGE //////////////////////////////
function Login(props) {
  console.log("==============Login===============");
  console.log("==============Login Props===============", props);

  const [state, setState] = React.useState({
    email: "",
    emailFieldActive: true,
    password: "",
    passwordFieldActive: true,
    rememberMe: false,
    status: "",
    errors: {},
  });

  const [onHover, setOnHover] = React.useState(false);

  var linkStyle;

  const navigate = useNavigate();

  function toggleHoverEnter() {
    setOnHover(true);
  }
  function toggleHoverLeave() {
    setOnHover(false);
  }

  // to activate the input field while typing
  function activateField(e) {
    setState({
      ...state,
      [e.target.name + "FieldActive"]: true,
    });
  }

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
    props.set_login_clicked("false");
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
        "/sessions",
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
            status: response.data.status,
            errors: response.data.error,
          });

          setTimeout(function () {
            props.set_login_clicked("false");
          }, 3000);

          props.handleSuccessfulAuth(response.data);

          //props.history.push("/")
        } else {
          setState({
            ...state,
            status: response.data.status,
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

  function goToResend() {
    navigate("/resend");
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
      errorMessages.push(<ErrorMsg> {state.errors.success[0]} </ErrorMsg>);
    }

    if (state.errors.auth) {
      // errorMessages.push(<ErrorMsg> {state.errors.auth[0]} </ErrorMsg>);

      if (state.status == "orange") {
        errorMessages.push(
          <>
            <ErrorMsg> {state.errors.auth[0]} </ErrorMsg>
            <span
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "12px",
                padding: "5px 0px 9px 3px",
              }}
              onClick={goToResend}
            >
              resend link
            </span>
          </>
        );
      } else {
        errorMessages.push(<ErrorMsg> {state.errors.auth[0]} </ErrorMsg>);
      }
    }

    if (state.errors.password) {
      errorMessages.push(
        <ErrorMsg> {"Password " + state.errors.password[0]} </ErrorMsg>
      );
    }

    if (state.errors.password_confirmation) {
      errorMessages.push(
        <ErrorMsg>
          {" "}
          {"Confirmation " + state.errors.password_confirmation[0]}{" "}
        </ErrorMsg>
      );
    }

    if (state.errors.green) {
      errorMessages.push(<ErrorMsg> {state.errors.green} </ErrorMsg>);
    }
  }

  if (onHover) {
    linkStyle = {
      border: "1px solid #fcacac",
      //borderRadius: "20px",
      transition: "all .4s ease-out",
      fontSize: ".9em",
      cursor: "pointer",
      position: "absolute",
      top: "0",
      right: "0",
      textDecoration: "none",
      padding: "6px",
    };
  } else {
    linkStyle = {
      border: "1px solid white",
      transition: "all .4s ease-out",
      fontSize: ".9em",
      cursor: "pointer",
      position: "absolute",
      top: "0",
      right: "0",
      textDecoration: "none",
      padding: "6px",
    };
  }

  /////////////////////////////////// JSX /////////////////////////////////////////

  return (
    <LoginWrapperNew login_clicked={props.login_clicked}>
      <CardNew>
        <LogoWrapperNew>
          <div
            onClick={closeLoginWindow}
            style={linkStyle}
            onMouseEnter={toggleHoverEnter}
            onMouseLeave={toggleHoverLeave}
            to="#"
          >
            &#10060;
          </div>
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
                fontSize: ".8em",
              }}
            >
              remember me:
            </label>
          </FormItem>

          {/* <%= check_box_tag :remember_me, 1, params[:remember_me] %>
          <%= label_tag :remember_me %> */}

          <Button type="submit">Log In</Button>
        </Form>

        <ErrorWrapper>
          <XorCheckIcon
            status={state.status}
            style={{ display: state.status == "" ? "none" : "initial" }}
            src={state.status == "green" ? greenCheck : redX}
            alt=""
          />
          <h1 style={{ display: "none" }}>ss={state.status}</h1>
          {errorMessages}
        </ErrorWrapper>
      </CardNew>

      {/* <a style={{fontSize: ".5em", textDecoration: "underline"}} href="/signup">Dont have an account? </a><br/>
      <a style={{fontSize: ".5em", textDecoration: "underline"}} href="/forgot">Forgot password?? </a><br/>*/}
      {/* <a style={{fontSize: ".5em", textDecoration: "underline"}} href="/resend">Resend Confirmation Email </a><br/>  */}
      <Link style={{ textDecoration: "none", fontSize: "12px" }} to="/forgot">
        Forgot Password
      </Link>
    </LoginWrapperNew>
  );
}

export default Login;
