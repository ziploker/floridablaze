import React, {useState} from "react";
import { Link } from 'react-router-dom';
//import logoImg from "../../../assets/images/logoPlaceholder.jpg";
import redX from '../../../assets/images/redXmark.jpg'
import greenCheck from '../../../assets/images/greenCheck.png'
import dummy_avatar from '../../../assets/images/dummy_avatar.png'
import { Card, Logo, Form, Input, Button, ErrorMsg, RedX, LoginWrapper, 
  InputIcon, LogoWrapper, H2, FormItem, Label, ErrorWrapper} from './AuthForm';

import axios from 'axios';
import $ from 'jquery';
import styled, { ThemeProvider } from 'styled-components'
var Spinner = require('react-spinkit');


const Login = styled.div`

  @media only screen and (max-width: 720px){

    grid-area: 2/1/3/4;
    margin: 25px 0px 0px 0px;
    
    //width: 100%;


  }
  position: relative;
  grid-area: 1/3/2/4;
  box-sizing: border-box;
  max-width: 600px;
  width: 100%;
  //margin-left: 20px;
  //padding: 0 2rem;
  
  //margin-top: 100px;
  padding: 40px 0px 0px 0px;

  background-color: #fff;
  border: 1px solid transparent;
  
  box-shadow: 0 1px 1px rgba(0,0,0,0.05);
  border-radius: 8px;

  justify-self: start;
  align-self: center;
`;


const ProfilePicWrapper = styled.div`

  position: relative;


`;

const ProfilePic = styled.img`
  
  border-radius: 50px;
  border: 1px gray solid;
  position: relative;
  width: 70px;
  height: 70px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  


`;

const LabelForFile = styled.label`
    
    text-align: center;
    display: inline-block;
    font-size: 12px;
    position: absolute;
    right: -15px;
    bottom: -13px;
    z-index: 5;
    border-radius: 50px;
    //background-color: orange;
    padding: 5px;
    margin: 0 auto;
  
    //background-color: orange;
    cursor: pointer;
    
    &:hover{
      //background-color: #fce1b3;

    }
  
  
  `;


const Span = styled.span`

  height: 100%;
  margin-right: 5px;
  font-size: .75em;
  transition: opacity 2s ease-in;
  opacity: ${props => props.waitMessage.toString() == "...one moment" ? "1" : "0"};
            

`;

const StatusSpinner = styled.div`
  
  max-height: ${ props => props.showStatusSpinner.toString() == "true" ? "100%" : "0px"};
  opacity: ${ props => props.showStatusSpinner.toString() == "true" ? "1" : "0"};
  transition: opacity .4s;
  transition-timing-function: ease-out;

`;

const formData = new FormData();
///////////////////////////////////  SIGN_UP_PAGE //////////////////////////////
function Signup(props) {
  const color = "#45B5644";

  

  const [state, setState] = React.useState({
    first: "",
    firstFieldActive: false,
    last: "",
    lastFieldActive: false,
    email: "",
    emailFieldActive: false,
    password: "",
    passwordFieldActive: false,
    password_confirmation: "",
    password_confirmationFieldActive: false,
    nick: "",
    nickFieldActive: false,
    status: "",
    avatar: [],
    errors: {},
    color: "#45B5644",
    isBtnDisabled: false,
    showStatusSpinner: false,
    waitMessage: ""
  })

  

  // to activate the input field while typing
  function activateField(e) {
    
    setState({
      ...state,
      [e.target.name+"FieldActive"]: true
    })
  }

  

  // to deactivate input only if it's empty
  function disableField(e) {
    if (e.target.value === "") {
      setState({
        ...state,
        [e.target.name+"FieldActive"]: false
      })
    }
  }
  
  
  ///////////////////////////////////  HANDLE_SUBMIT ///////////////////////////
  function handleSubmit(event){
    
    ////send info into backend heyyohhhh/////
    event.preventDefault();
    //const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://www.floiridablaze.io"
    axios.post("/registrations", {
      
      user: { 
        first: state.first,
        last: state.last,
        email: state.email,
        password: state.password,
        password_confirmation: state.password_confirmation,
        avatar: state.avatar,
        nick: state.nick

      }
    },
    {withCredentials: true})
    .then(response => {
      
      console.log("Sign up submit Response", response)
      
      if (response.data.status === "green"){
        
        setState({
          ...state,
          status: response.data.status,
          errors: response.data.error
        });
        
        props.handleSuccessfulAuth(response.data)
        props.history.push("/")
      
      }else{
        
        //update error state
        setState({
          ...state,
          status: response.data.status,
          errors: response.data.error
        });
      }
    }).catch(error => {
      
      console.log("Sign_up Errors", error)
      setState({
        ...state,
        status: response.data.status,
        errors: response.data.error
      });
    
    })
  }


  ////////////////////// Handlev Submit V2 //////////////////////////
  const handleAdd = e => {
    
    e.preventDefault();

    setState({
      ...state,
      waitMessage: "...one moment",
      showStatusSpinner: true,
      isBtnDisabled: true
    });
    
    if (validForm()) {


     
     
     formData.append('user[first]', state.first);
     formData.append('user[last]', state.last);
     formData.append('user[email]', state.email);
     formData.append('user[password]', state.password);
     formData.append('user[password_confirmation]', state.password_confirmation);
     formData.append('user[nick]', state.nick);
     
     

     console.log("formdata from handle add");
     console.log(formData);

      
      //get token for form submission
      const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");  
      $.ajax({
          
        url: '/registrations',
        headers: {
          
          'X-CSRF-Token': csrf
        },
        method: 'POST',
        data: 
          formData,
          contentType: false,
          processData: false
            
          
        ,
        success: function(response) {
          //props.handleAdd(data);


          if (response.status === "green"){

            setState({
              ...state,
              //focussed: (props.focussed) || false,
              first: "",
              firstFieldActive: false,
              last: "",
              lastFieldActive: false,
              email: "",
              emailFieldActive: false,
              password: "",
              passwordFieldActive: false,
              password_confirmation: "",
              password_confirmationFieldActive: false,
              nick: "",
              status: response.status,
              avatarFieldActive: false,
              avatar: [],
              errors: response.error
              
            });
            
            
        
            
            props.handleSuccessfulAuth(response)
            //props.history.push("/")
          
          }else{
            
            //update error state
            setState({
              ...state,
              status: response.status,
              errors: response.error
            });
          }
          
    
        },
        error: function(xhr, status, error) {
          //alert('Message did not reach server: ', error);
        }
      })
    } else {
      //alert('Please fill all fields.');
    }
  }


  const validForm = () => {
    if (state.first ) {
      return true;
    } else {
      return true;
    }
  }


  
  ///////////////////////////////////  HANDLE_CHANGE /////////////////////////////
  function handleChange(event){

    const value = event.target.value;

    setState({
      ...state,
      [event.target.name]: value
    });

  }

  function handleImageChange(e){

    formData.append('user[avatar]', e.target.files[0]);
   
      setState({
        ...state,
        avatar: URL.createObjectURL(event.target.files[0])
      })
    
    //if (e.target.files[0]) setState({ ...state, avatar: e.target.files[0] });
  };

  
  
  
  ///////////////////////////////////  SETUP ERRORMESSAGES //////////////////////
  let errorMessages = [];
    

  if (state.errors){

    if (state.errors.success) {
      errorMessages.push(<ErrorMsg> {state.errors.success[0]} </ErrorMsg>)
    }
       
    if (state.errors.auth) {
      errorMessages.push(<ErrorMsg> {state.errors.auth[0]} </ErrorMsg>)
    } 

    if (state.errors.password) {
      errorMessages.push(<ErrorMsg> {"Password " + state.errors.password[0]} </ErrorMsg>)
    } 

    if (state.errors.password_confirmation) {
      errorMessages.push(<ErrorMsg> {"Confirmation " + state.errors.password_confirmation[0]} </ErrorMsg>)
    } 

    if (state.errors.green) {
      errorMessages.push(<ErrorMsg> {state.errors.green} </ErrorMsg>)
    }
  }

  
  /////////////////////////////////// JSX /////////////////////////////////////////
  return (
    
    <LoginWrapper>
      <Login>
        
        <LogoWrapper>
          
          <ProfilePicWrapper>
              <ProfilePic src={state.avatar.length != 0 ? state.avatar : dummy_avatar}/>
              <LabelForFile htmlFor="avatar">&#128393;</LabelForFile>
          </ProfilePicWrapper> 
          
          
          
          <H2>Create an account</H2>
        
        </LogoWrapper>
        
        <Form onSubmit = {handleAdd}>
          
          <FormItem >
            <Label className={state.firstFieldActive ? "field-active" : ""}>first name</Label>
            <Input 
              name="first" 
              type="text" 
              
              value={state.first} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
              required/>
          </FormItem>
          
          <FormItem >
            <Label className={state.lastFieldActive ? "field-active" : ""} >last name</Label>
            <Input 
              name="last" 
              type="text" 
              
              value={state.last} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
              required/>
          </FormItem>

          <FormItem >
            <Label className={state.emailFieldActive ? "field-active" : ""}>email</Label>
            <Input 
              name="email" 
              type="email" 
              
              value={state.email} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
              required/>
          </FormItem>

          <FormItem >
            <Label className={state.passwordFieldActive ? "field-active" : ""}>password</Label>
            <Input 
              name="password" 
              type="password" 
              
              value={state.password} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
              required/>
          </FormItem>
          
          <FormItem >
            <Label className={state.password_confirmationFieldActive ? "field-active" : ""}>password confirmation</Label>
            <Input 
              name="password_confirmation" 
              type="password" 
              
              value={state.password_confirmation} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
              required/>
          </FormItem>
          
          <FormItem >
            <Label className={state.nickFieldActive ? "field-active" : ""}>Display name</Label>
            <Input 
              name="nick" 
              type="text" 
              
              value={state.nick} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
            />
          </FormItem>
            
            
            <input 
              style={{
                width: ".1px",
                height: ".1px",
                opacity: "0",
                overflow: "hidden",
                position: "absolute",
                zIndex: "-1"


              }}
              id="avatar"
              type="file" 
              name="avatar"
              
              accept="image/*"
              onChange={handleImageChange}/>
              
              

          
          

          <Button type="submit" disabled={state.isBtnDisabled}>Create Account</Button>
        </Form>
        
        <ErrorWrapper>   
          <Span waitMessage={state.waitMessage}> {state.waitMessage}</Span>     
          <RedX status={state.status} src={state.status === "pink" ? redX : greenCheck}/>
          {errorMessages}

          <StatusSpinner showStatusSpinner={state.showStatusSpinner}>
            <Spinner name='wave' color='#56c5cc' />
          </StatusSpinner>

        </ErrorWrapper>



        
      
      </Login>
      <Link to="/login">Already have an account?</Link>
    </LoginWrapper>
  );
}

export default props => <Signup {...props}/>;