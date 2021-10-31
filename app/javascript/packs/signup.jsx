import React, {useEffect, useState} from 'react';
import styled, { ThemeProvider } from 'styled-components'
//import { Parallax, Background } from 'react-parallax';

import {GoogleLogin} from 'react-google-login';
import FacebookLogin from 'react-facebook-login';



import flFists from '../../assets/images/flFists.png'





import {Link, useLocation} from 'react-router-dom'

import redX from '../../assets/images/redXmark'
import userIcon from '../../assets/images/signup2'
import greenCheck from '../../assets/images/greenCheck'
import dummy_avatar from '../../assets/images/dummy_avatar'

import { Card, Logo, Form, Input, Button, ErrorMsg, RedX, LoginWrapper, 
  InputIcon, LogoWrapper, H2, FormItem, Label, EmailLabel, ErrorWrapper} from './pages/AuthForm';

import axios from 'axios'
import $ from 'jquery';

import {gsap} from 'gsap'

import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
gsap.core.globals('ScrollTrigger', ScrollTrigger);

var Spinner = require('react-spinkit');
//var randomColor = require('randomcolor');

const SignupWrapper = styled.div`

  /* @media only screen and (max-width: 720px){

    grid-template-columns: minmax(20px, 1fr) 1fr minmax(20px, 1fr);
    min-width: 100%;
    //padding-left: 20px;
    //justify-self: center;


  }

  //padding: 45px 0px;
  
  //background-size: cover;
  display: grid;
  grid-template-columns: minmax(20px,1fr) minmax(335px,350px) minmax(350px,600px) minmax(20px,1fr);
  grid-column-gap: 0.5em;
  justify-items: center; */



  @media only screen and (max-width: 720px){

grid-template-columns: minmax(20px, 1fr) 1fr minmax(20px, 1fr);
min-width: 100%;
//padding-left: 20px;
//justify-self: center;


}
position: relative;
height: 100%;
//background-color: RGB(244, 244, 244);
background-color: #FFFFFF;
display: grid;

align-items: center;
justify-content: center;
//justify-self: start;
//grid-template-columns: minmax(170px,350px) minmax(340px,600px);
//grid-template-columns: minmax(20px, 1fr) minmax(300px, 350px) minmax(420px,600px) minmax(20px, 1fr);

grid-template-columns: minmax(20px, 40px) minmax(350px,450px) minmax(350px,1fr) minmax(20px,40px);

grid-area: 1/1/-1/-1;
grid-column-gap: 0.5em;
padding-top: 60px;
padding-bottom: 20px;
text-align: center;
//width: 100vw;


`;

const SignupWrapperInner = styled.div`

  @media only screen and (max-width: 720px){

    grid-template-columns: minmax(20px, 1fr) 1fr minmax(20px, 1fr);
    min-width: 100%;
    //padding-left: 20px;
    //justify-self: center;


  }
  position: relative;
  height: 100%;
  //background-color: RGB(244, 244, 244);
  background-color: #FFFFFF;
  display: grid;
  
  align-items: center;
  justify-content: center;
  //justify-self: start;
  //grid-template-columns: minmax(170px,350px) minmax(340px,600px);
  //grid-template-columns: minmax(20px, 1fr) minmax(300px, 350px) minmax(420px,600px) minmax(20px, 1fr);
  
  grid-template-columns: minmax(20px, 40px) minmax(250px,450px) minmax(350px,600px) minmax(40px, 1fr);
  
  grid-area: 1/1/-1/-1;
  grid-column-gap: 0.5em;
  padding-top: 60px;
  padding-bottom: 20px;
  text-align: center;
  //width: 100vw;
  

`;


const LoginCard = styled.div`

  @media only screen and (max-width: 720px){

    grid-area: 2/1/3/4;
    margin: 25px 0px 0px 0px;
    
    //width: 100%;


  }
  position: relative;
  grid-area: 1/3/2/4;
  box-sizing: border-box;
  max-width: 600px;
  //width: 100%;
  //margin-left: 20px;
  //padding: 0 2rem;
  //margin-left: 20px;
  //margin-top: 100px;
  padding: 40px 0px 0px 0px;

  background-color: #fff;
  border: 1px solid transparent;
  
  box-shadow: 0 1px 1px rgba(0,0,0,0.05);
  border-radius: 8px;

  justify-self: start;
  align-self: center;

  overflow: hidden;
`;





  
///////////////////////////////////  HANDLE_CHANGE /////////////////////////////
// function handleChange(event){

//   //const value = event.target.value;
//   const target = e.target;
//   const value = target.type === 'checkbox' ? target.checked : target.value;
//   const name = target.name;
//   //const value = target.type === 'checkbox' ? !event.target.checked : event.target.value;
  
//   setState({
//     ...state,
//     [name]: value
//   });

// }

function handleImageChange(e){

  formData.append('user[avatar]', e.target.files[0]);
  
    setState({
      ...state,
      avatar: URL.createObjectURL(e.target.files[0])
    })
  
  //if (e.target.files[0]) setState({ ...state, avatar: e.target.files[0] });
}

  
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

const Span = styled.h4`

  font-size: .5em;
  padding: 5px 12px;
  margin-right: 5px;
  
  //transition: opacity 2s ease-in;
  
            

`;

const StatusSpinner = styled.div`
  
  max-height: ${ props => props.showStatusSpinner.toString() == "true" ? "100%" : "0px"};
  opacity: ${ props => props.showStatusSpinner.toString() == "true" ? "1" : "0"};
  transition: opacity .4s;
  transition-timing-function: ease-out;

`;

const LeftSection = styled.div`

  @media only screen and (max-width: 850px){

    margin-right: 0px;

  }

  @media only screen and (max-width: 720px){

    grid-area: 1/1/2/4;
    margin: 0px 0px 0px 0px;
    //padding-left: 20px;
    //width: 100vw;

  }

  @media only screen and (max-width: 940px){
  
    padding-left: 20px;
    padding-right: 20px;
    
  }
  
  align-self: start;
  
  text-align: left;
  grid-area: 1/2/2/3;
  //margin-right: 4.20em;
  padding-left: 60px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 800;

  h1{
    color: rgb(6, 7, 1, .9);
    margin-bottom: 30px;
    font-size: 3em;

  }

  sub{

    color: rgb(6, 7, 1, .9);
  }


`;


const RightSection = styled.div`

  background: #C4C4C4;
  grid-area: 1/3/2/-1;
  height: 100%;
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;


`;

const Spacer = styled.h2`

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 2.5vw;
  //line-height: 100%;

  
  z-index: -10;
  grid-area: 1/3/2/5;
  color: #e3b55a;
  margin: 0px 0px 8px 20px;

  @media only screen and (max-width: 720px){
    display: none;
  }

`;

const ActHeader = styled.h1`
  @media only screen and (max-width: 720px){

    grid-area: 1/1/2/-1;
    //justify-self: center;
    font-size: 15vw;

  } 

  font-family: Poppins;
  font-style: normal;
  font-weight: 800;
  font-size: 10vw;
  //line-height: 100px;
  /* identical to box height */

  letter-spacing: -0.08em;

  color: #ffffff;
  grid-area: 1/3/2/-1;
  align-self: end;

  //line-height: 100%;
  margin: -10px 0px 0px 20px;
  padding-top: 20px;
  //z-index: 1;

  opacity: ${(props) => (props.showCards || props.showLetter ? "0" : "1")};
`;

const formData = new FormData();
///////////////////////////////////  SIGN_UP_PAGE //////////////////////////////



function Signup(props, ref) {

  console.log("==============Signup Section===============")
  console.log("============= Signup Section Props===============", props)
  
  const locationFromHook = useLocation();

  const {section2ScrollToRef} = ref

  const [state, setState] = React.useState({
    full_name: "",
    full_nameFieldActive: false,
    
    email: "",
    emailFieldActive: false,
    
    password: "",
    passwordFieldActive: false,
  
    opt_in: false,
    
    status: "",

    showErrorBackground: false,
    
    errors: {},
    color: "#45B5644",
    isBtnDisabled: false,
    showStatusSpinner: false,
    waitMessage: ""
  })



  const responseGoogle = async response => {
    
    
    
    //send googles response to registrations#google
    //console.log("google_response", response);

    axios.post("/auth/rgsi", {
          
      data: { 
        gtoken: "test_data"
        
      }
    }, {
      headers: {
        'Authorization': response.tokenId 
      }
    },{withCredentials: true})
    .then(response => {

      //console.log("rgsi response", response.data.status)
      if (response.data.status == "green"){

        props.handleSuccessfulAuth(response.data)
        console.log("result from google signin axios call", response.data.error)
      
      }else if (response.data.status == "pink"){

        console.log("result from google signin axios call", response.data.error)

      }else{

        console.log("result from google signin axios call, this should never happen")
      }
        
        
    }).catch(error => {
      
      //console.log("articleErrors", error)
    })
  }






  const responseFacebook = async response => {
    console.log("About to make axios call to send info to server", response);

    //send googles response to registrations#google
    //console.log("google_response", response);

    axios.post("/auth/rfsi", {
          
      data: { 
        gtoken: "test_data"
        
      }
    }, {
      headers: {
        'Authorization': JSON.stringify(response)
      }
    },{withCredentials: true})
    .then(response => {

      //console.log("rgsi response", response.data.status)
      if (response.data.status == "green"){

        props.handleSuccessfulAuth(response.data)
        console.log("result from google signin axios call", response.data.error)
      
      }else if (response.data.status == "pink"){

        console.log("result from google signin axios call", response.data.error)

      }else{

        console.log("result from google signin axios call, this should never happen")
      }
        
        
    }).catch(error => {
      
      //console.log("articleErrors", error)
    })
  }
  



  useEffect(() => {

    console.log("==============Signup section useEffect===============")
    

    let homeWrapper = document.querySelectorAll(".homeWrapper");
    let formItem = document.querySelectorAll(".formItem");
    let formWrapper = document.querySelectorAll(".formWrapper");
    
    let tl = gsap.timeline({
         
      duration: ".1",
      scrollTrigger: {
        //markers: {startColor: "green", endColor: "red", fontSize: "12px"},
        trigger: homeWrapper,
        start: "25% 87%",
        end: "bottom bottom",
        toggleActions: "play none none none",
      }
    });

    tl.from(formWrapper, 
        
      {
        
        opacity: 0,
        
        
        
        
      });  

    tl.from(formItem, 
        
      {
        x: 100,
        opacity: 0,
        ease: "back",
        stagger: 0.1
        
        
      },"<.1");

      





  },[]);

  const validForm = () => {
    if (state.full_name ) {
      return true;
    } else {
      return true;
    }
  }

  const handleChange = (e) => {

    
   
    

    const target = e.target;
    
   
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;


    console.log("TARGET_CHECKED " + target.checked.toString())
    console.log("target_name " + target.name.toString())
    console.log("value " + value.toString())
    //const value = target.type === 'checkbox' ? !event.target.checked : event.target.value;
    setState({
      ...state,
      [name]: value
    });
  

}



    //const value = event.target.value;

    

  

  
  ////////////////////// Handlev Submit V2 //////////////////////////
const handleAdd = e => {
    
  e.preventDefault();

  setState({
    ...state,
    status: "",
    errors: {},
    showErrorBackground: true,
    waitMessage: "...one moment",
    showStatusSpinner: true,
    isBtnDisabled: true
  });
    
  if (validForm()) {


    
    
    formData.append('user[full_name]', state.full_name);
    
    formData.append('user[email]', state.email);
    formData.append('user[password]', state.password);
    formData.append('user[opt_in]', state.opt_in);
    
    

    console.log("formdata from handle add in signup");
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
          full_name: "",
          full_nameFieldActive: false,
         
          email: "",
          emailFieldActive: false,
          password: "",
          passwordFieldActive: false,
          
          opt_in: false,
          showErrorBackground: true,
          status: response.status,
          
          errors: response.error
          
        });
          
          
      
          
          props.handleSuccessfulAuth(response)
          //props.history.push("/")
        
        }else{
          
          //update error state
          setState({
            ...state,
            showErrorBackground: true,
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
  
  if (locationFromHook.pathname === "/edit"){

    return null

  } 
  

  

  const componentClicked = () => {
    console.log("clickedd");
  }

  

  return (
            
         
    <SignupWrapper className="homeWrapper" ref={section2ScrollToRef}>
          
      

        <LeftSection>

          {/* <img style={{width: "50px"}} src={userIcon}/> */}
          <h1>Sign Up!</h1>
          
          <LoginCard className="formWrapper" >
       
                
          <Form onSubmit = {handleAdd}>

            <FormItem className="formItem">
                <Label className={state.full_nameFieldActive ? "field-active" : ""}> full name </Label>
                <Input 
                name="full_name" 
                type="text" 
                
                value={state.full_name} 
                onChange={handleChange} 
                onFocus={activateField}
                onBlur={disableField}
                required/>
            </FormItem>

                    
            <FormItem className="formItem">
                <EmailLabel className={state.emailFieldActive ? "field-active" : ""}>email</EmailLabel>
                <Input 
                name="email" 
                type="email" 
                
                value={state.email} 
                onChange={handleChange} 
                onFocus={activateField}
                onBlur={disableField}
                required/>
            </FormItem>

            <FormItem className="formItem">
                <Label className={state.passwordFieldActive ? "field-active" : ""}>password</Label>
                <Input 
                name="password" 
                type="password" 
                autocomplete="off"
                value={state.password} 
                onChange={handleChange} 
                onFocus={activateField}
                onBlur={disableField}
                required/>
            </FormItem>

            

            
 

            
            <Button className="formItem" type="submit" disabled={state.isBtnDisabled}>Sign Up</Button>
            
            <div  style={{display: "flex", justifyContent: "center"}}>
                
                
                <input
                name="opt_in" 
                type="checkbox" 
                id="opt_in"
                checked={state.opt_in}
                 
                onChange={handleChange} 
                
                />
                
                <h3 style={{marginLeft: "5px", fontSize: ".6em", color: "gray"}} htmlFor="opt_in" >Opt In to receive e-mails from FloridaBlaze </h3>
            </div>
          
          </Form>

          
          
          <ErrorWrapper showErrorBackground={state.showErrorBackground}>   
              <Span waitMessage={state.waitMessage}> {state.waitMessage}</Span>     
              <RedX status={state.status} src={state.status === "pink" ? redX : greenCheck}/>
              {errorMessages}

              <StatusSpinner showStatusSpinner={state.showStatusSpinner}>
                  <Spinner name='wave' color='#56c5cc' />
              </StatusSpinner>

          </ErrorWrapper>

          <GoogleLogin
        render={renderProps => (
          <button className="loginBtn loginBtn--google" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        
      
      />


      
      <FacebookLogin
        appId="293426502140339"
        autoLoad={false}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook} 
        cssClass="loginBtn loginBtn--facebook"/>
        
        </LoginCard>

        </LeftSection>

        <RightSection>

          <img src={flFists}/>


        </RightSection>
            
        

        {/* <Spacer>
        Contact Your State Representatives

        </Spacer> */}
            
      

      
     
 

    </SignupWrapper>
      
  );  
}










const Wtf = React.forwardRef(Signup);
export default Wtf;

