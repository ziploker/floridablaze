import React, { useState, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import axios from "axios";
//import logoImg from "../../../assets/images/logoPlaceholder.jpg";
import redX from "../../../assets/images/redX.png";
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
  console.log("==============Change_pw===============");
  console.log("==============Change_pw Props===============", props);
  const { token } = useParams();
  console.log("token", token);
  const [state, setState] = useState({
    change_password: "",
    change_passwordFieldActive: false,
    change_password_confirmation: "",
    change_password_confirmationFieldActive: false,
    status: "",
    errors: {},
  });

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

  ///////////////////////////////////  HANDLE_SUBMIT ///////////////////////////
  function handleSubmit(event) {
    ////send info into backend heyyohhhh/////
    event.preventDefault();
    //const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://www.floiridablaze.io"
    console.log("state.passwordstate.password, ", state.password);
    console.log(
      "schange_password_confirmation, ",
      state.change_password_confirmation
    );
    setState({
      ...state,
      status: "",
      errors: {},
    });

    axios
      .post(
        "/registrations/" + token + "/reset",
        {
          user: {
            change_password: state.change_password,
            change_password_confirmation: state.change_password_confirmation,
            test: "1234",
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("change_PW response", response);

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
          state: "pink",
          errors: { auth: [error] },
        });
      });
  }

  ///////////////////////////////////  HANDLE_CHANGE /////////////////////////////
  function handleChange(event) {
    const value = event.target.value;

    console.log("name", event.target.name);
    console.log("value", value);
    setState({
      ...state,
      [event.target.name]: value,
      [event.target.name + "FieldActive"]: true,
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
    console.log("useEffect");
    setState({
      ...state,
      change_password: "",
      change_password_confirmation: "",
    });
  }, []);

  /////////////////////////////////// JSX /////////////////////////////////////////
  return (
    <LoginWrapper>
      <Card>
        <LogoWrapper>
          <Link to="/">{/* <Logo src={logoImg} /> */}</Link>

          <H2>Reset your password</H2>
        </LogoWrapper>

        <Form onSubmit={handleSubmit}>
          <FormItem>
            <Label
              className={state.change_passwordFieldActive ? "field-active" : ""}
            >
              new password
            </Label>
            <Input
              name="change_password"
              type="password"
              autoComplete={"off"}
              value={state.password}
              onChange={handleChange}
              onFocus={activateField}
              onBlur={disableField}
              required
            />
          </FormItem>

          <FormItem>
            <Label
              className={
                state.change_password_confirmationFieldActive
                  ? "field-active"
                  : ""
              }
            >
              new password confirmation
            </Label>
            <Input
              name="change_password_confirmation"
              type="password"
              value={state.password_confirmation}
              onChange={handleChange}
              onFocus={activateField}
              onBlur={disableField}
              required
            />
          </FormItem>

          <Button type="submit">Make changes</Button>
        </Form>

        <ErrorWrapper>
          <XorCheckIcon
            status={state.status}
            src={state.status == "pink" ? redX : greenCheck}
            alt=""
          />
          {errorMessages}
        </ErrorWrapper>
      </Card>
      {/* <Link style={{ fontSize: ".5em" }} to="/forgot">
				Forgot password??{" "}
				<span style={{ textDecoration: "underline" }}>click here</span>
			</Link> */}
    </LoginWrapper>
  );
}

export default (props) => <Login {...props} />;
