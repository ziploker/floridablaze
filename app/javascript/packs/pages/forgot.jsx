import React, { useState, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import axios from "axios";
//import logoImg from "../../../assets/images/logoPlaceholder.jpg";
import redX from "../../../assets/images/redXmark.jpg";
import greenCheck from "../../../assets/images/greenCheck.png";
import tinyMan from "../../../assets/images/tinyManLogo.png";
import lock from "../../../assets/images/lockIcon.png";

import {
  Card,
  Logo,
  Form,
  Input,
  Button,
  ErrorMsg,
  XorCheckIcon,
  LoginWrapper,
  InputIcon,
  LogoWrapper,
  H2,
  FormItem,
  Label,
  ErrorWrapper,
} from "./AuthForm";

///////////////////////////////////  LOG_IN_PAGE //////////////////////////////
function Login(props) {
  console.log("==============Forget===============");
  console.log("==============Forget Props===============", props);

  const location = useLocation();

  const [state, setState] = React.useState({
    email: "",
    emailFieldActive: false,
    status: "",
    errors: {},
  });

  const [onHover, setOnHover] = React.useState(false);

  var linkStyle;

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

  // to deactivate input only if it's empty
  function disableField(e) {
    if (e.target.value === "") {
      setState({
        ...state,
        [e.target.name + "FieldActive"]: false,
      });
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
      border: "1px solid #f4f4f4",
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

  ///////////////////////////////////  HANDLE_SUBMIT ///////////////////////////
  function handleSubmit(event) {
    ////send info into backend heyyohhhh/////
    event.preventDefault();
    //const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://www.floiridablaze.io"
    props.set_login_clicked("false");
    axios
      .post(
        "/registrations/forgot",
        {
          user: {
            email: state.email,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Forgot PW Response", response);

        if (response.data.status == "green") {
          setState({
            ...state,
            status: response.data.status,
            errors: response.data.error,
          });

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

  ///////////////////////////////////  HANDLE_CHANGE /////////////////////////////
  function handleChange(event) {
    const value = event.target.value;

    setState({
      ...state,
      [event.target.name]: value,
    });
  }

  ///////////////////////////////////  SETUP ERRORMESSAGES //////////////////////
  let errorMessages = [];

  if (state.errors) {
    if (state.errors.success) {
      errorMessages.push(<ErrorMsg> {state.errors.success[0]} </ErrorMsg>);
    }

    if (state.errors.auth) {
      errorMessages.push(<ErrorMsg> {state.errors.auth[0]} </ErrorMsg>);
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
  useEffect(() => {
    props.set_login_clicked("false");
  }, [location]);

  /////////////////////////////////// JSX /////////////////////////////////////////
  return (
    <LoginWrapper>
      <Card>
        <LogoWrapper>
          <Link
            style={linkStyle}
            onMouseEnter={toggleHoverEnter}
            onMouseLeave={toggleHoverLeave}
            to="/"
          >
            &#10060;
          </Link>
          <H2>Reset your password</H2>
        </LogoWrapper>

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

          <Button type="submit">Reset</Button>
        </Form>

        <ErrorWrapper>
          <XorCheckIcon
            status={state.status}
            src={state.status === "pink" ? redX : greenCheck}
            alt=""
          />
          {errorMessages}
        </ErrorWrapper>
      </Card>

      {/* <Link
        style={{ fontSize: ".5em", textDecoration: "underline" }}
        to="/login"
      >
        Already have an account?
      </Link> */}
    </LoginWrapper>
  );
}

export default (props) => <Login {...props} />;
