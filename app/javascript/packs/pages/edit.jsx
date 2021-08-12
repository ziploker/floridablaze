import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
//import logoImg from "../../../assets/images/logoPlaceholder.jpg";
import redX from '../../../assets/images/redXmark.jpg'
import greenCheck from '../../../assets/images/greenCheck.png'

import dummy_avatar from '../../../assets/images/dummy_avatar.png'
import styled, { ThemeProvider } from 'styled-components'
import { Card, Logo, Form, Input, Button, ErrorMsg, RedX, LoginWrapper,
  InputIcon, LogoWrapper, H2, FormItem, Label, ErrorWrapper} from './AuthForm';

import axios from 'axios';

import $ from 'jquery';
var Spinner = require('react-spinkit');



const EditAccountWrapper = styled.div`

  /* @media only screen and (max-width: 720px){

    grid-template-columns: minmax(20px, 1fr) 1fr minmax(20px, 1fr);
    min-width: 100%;
    //padding-left: 20px;
    //justify-self: center;


  } */
  position: relative;
  height: 100%;
  background-color: #F4F4F4;
  display: grid;
  
  align-items: center;
  justify-content: center;
  //justify-self: start;
  //grid-template-columns: minmax(170px,350px) minmax(340px,600px);
  //grid-template-columns: minmax(20px, 1fr) minmax(300px, 350px) minmax(420px,600px) minmax(20px, 1fr);
  
  grid-template-columns: minmax(20px, 40px) 1fr minmax(20px, 40px);
  
  grid-area: 1/1/-1/-1;
  grid-column-gap: 0.5em;
  //padding-top: 60px;
  padding-bottom: 20px;
  text-align: center;
  //width: 100vw;
  

`;



const EditAccount = styled.div`

  /* @media only screen and (max-width: 720px){

    grid-area: 2/1/3/4;
    margin: 25px 0px 0px 0px;
    
    //width: 100%;


  } */
  position: relative;
  grid-area: 1/2/2/3;
  box-sizing: border-box;
  max-width: 600px;
  width: 99vw;
  //margin-left: 20px;
  //padding: 0 2rem;
  
  //margin-top: 100px;
  //padding: 20px 0px 0px 0px;

  background-color: #F4F4F4;
  border: 1px solid transparent;
  
  box-shadow: 0 1px 1px rgba(0,0,0,0.05);
  border-radius: 8px;

  justify-self: center;
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

const StyledLink = styled(Link)`

  
  font-size: .7em;

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


  

  const StatusSpinner = styled.div`

  max-height: ${ props => props.showStatusSpinner.toString() == "true" ? "100%" : "0px"};
  opacity: ${ props => props.showStatusSpinner.toString() == "true" ? "1" : "0"};
  transition: opacity .4s;
  transition-timing-function: ease-out;

  `;

const formData = new FormData();
///////////////////////////////////  EDIT ACCOUNT //////////////////////////////
function Edit(props) {

  console.log("==============Edit===============")
  console.log("==============Edit Props===============", props)
  const [state, setState] = React.useState({
    loggedInStatus: "NOT_LOGGED_IN",
    full_name: '',
    full_nameFieldActive: true,
    
    email: '',
    emailFieldActive: true,
    
    //oldPassword: '',
    //oldPasswordFieldActive: false,
    
    password: "",
    passwordFieldActive: false,
    opt_in: false,
    nick: "",
    nickFieldActive: true,
    status: "",
    avatar: [],
    errors: {},
    avatar_url: "",
    nick: "",
    id: '',
    isBtnDisabled: false,
    showStatusSpinner: false


    
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
    axios.put("/registrations/"+props.user.id, {
      
      user: { 
        full_name: state.full_mame,
        
        email: state.email,
        //oldPassword: state.oldPassword,
        password: state.password,
        password_confirmation: state.password_confirmation

      }
    },
    {withCredentials: true})
    .then(response => {
      console.log("EDIT Response", response)
      
      if (response.data.status == "green"){
        
        setState({
          ...state,
          state: response.data.status,
          errors: response.data.error
        });
        
        props.handleSuccessfulAuth(response.data)
        
        
      }else{
        
        setState({
          ...state,
          status: response.data.status,
          errors: response.data.error
        });
      }
      
    }).catch(error => {
      
      setState({
        ...state,
        status: "pink",
        errors: {auth: [error]}
      });
      
    })
  }


  ////////////////////// Handlev Submit V2 //////////////////////////
  const handleAdd = e => {


    setState({
      ...state,
      waitMessage: "...one moment",
      showStatusSpinner: true,
      isBtnDisabled: true
    });
    
    e.preventDefault();
    
    


     
     
     formData.append('user[full_name]', state.full_name);
    
     formData.append('user[email]', state.email);
     //formData.append('user[oldPassword', state.oldPassword);
     formData.append('user[password]', state.password);
     
     formData.append('user[nick]', state.nick);
     formData.append('user[opt_in]', state.opt_in);
     
     

     console.log("formdata from handle add");
     console.log(formData);

      
      //get token for form submission
      const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");  
      //const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://www.floiridablaze.io"
      
      $.ajax({
          
        url: '/registrations/'+state.id,
        headers: {
          
          'X-CSRF-Token': csrf
        },
        method: 'PUT',
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
              //first: "",
              //firstFieldActive: false,
              //last: "",
              //lastFieldActive: false,
              //email: "",
              //emailFieldActive: false,
              //password: "",
              //passwordFieldActive: false,
              //password_confirmation: "",
              //password_confirmationFieldActive: false,
              //nick: "",
              status: response.status,
              //avatarFieldActive: false,
              //avatar: [],
              errors: response.error
              
            });
            
            const timer = setTimeout(() => {
              setState({
                ...state,
                waitMessage: "",
                showStatusSpinner: false,
                isBtnDisabled: false
              });
            }, 3000);
            return () => clearTimeout(timer);
        
            
            //props.handleSuccessfulAuth(response)
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
    
  }


  ///////////////////////////////////  HANDLE_CHANGE /////////////////////////////
  const handleChange = (e) => {

    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;


    console.log("TARGET_CHECKED " + target.checked.toString())
    console.log("TARGET_VALUE " + target.value.toString())
    //const value = target.type === 'checkbox' ? !event.target.checked : event.target.value;
    setState({
      ...state,
      [name]: value
    });
  





  }


  ///////////////////////////////////  HANDLE_IMAGE_CHANGE /////////////////////////////
  function handleImageChange(e){

    formData.append('user[avatar]', e.target.files[0]);
   
      setState({
        ...state,
        avatar: URL.createObjectURL(e.target.files[0])
      })
    
    //if (e.target.files[0]) setState({ ...state, avatar: e.target.files[0] });
  };

  ///////////////////////////////////  SETUP ERRORMESSAGES //////////////////////
  let errorMessages = [];
    

  if (state.errors){

    if (state.errors.success) {
      errorMessages.push(<ErrorMsg key="1"> {state.errors.success[0]} </ErrorMsg>)
    }
       
    if (state.errors.auth) {
      errorMessages.push(<ErrorMsg key="2"> {state.errors.auth[0]} </ErrorMsg>)
    } 

    if (state.errors.password) {
      errorMessages.push(<ErrorMsg key="3"> {"Password " + state.errors.password[0]} </ErrorMsg>)
    } 

    if (state.errors.password_confirmation) {
      errorMessages.push(<ErrorMsg key="4"> {"Confirmation " + state.errors.password_confirmation[0]} </ErrorMsg>)
    } 

    if (state.errors.green) {
      errorMessages.push(<ErrorMsg key="5"> {state.errors.green} </ErrorMsg>)
    }
  }
  
  
  ///////////////////////////////////  USE_EFFECT //////////////////////
  useEffect(() => {
    
    //const mode = process.env.NODE_ENV == "development" ? "http://127.0.0.1:3000" : "https://www.floiridablaze.io"
    axios.get("/logged_in", {withCredentials: true})
      .then(response => {

        if (response.data.logged_in && state.loggedInStatus == "NOT_LOGGED_IN"){
            
          console.log("theResults", response)
          setState({
            ...state,
            loggedInStatus: "LOGGED_IN",
            full_name: response.data.user.full_name,
            
            email: response.data.user.email,
            //oldPassword: "",
            password: "",
            password_confirmation: "",
            opt_in: response.data.user.opt_in,
            errors: {},
            avatar_url: response.data.user.avatar_url,
            nick: response.data.user.nick,
            id: response.data.user.id
          })
            
        }else if (!response.data.logged_in && state.loggedInStatus == "LOGGED_IN"){
              
          setState({
              loggedInStatus: "NOT_LOGGED_IN",
              user: {}
          })

        }
      
      })
      .catch(error => {
        
        console.log("Logged in? error", error)

        setState({
          ...state,
          status: "pink",
          errors: {auth: [error]}
        });


      }
    )

    
  },[]);

  
  /////////////////////////////////// JSX /////////////////////////////////////////
  return (
    <EditAccountWrapper>
      <EditAccount>
      <LogoWrapper>
          
          <ProfilePicWrapper>
              <ProfilePic src={state.avatar.length != 0 ? state.avatar : state.avatar_url ? state.avatar_url : dummy_avatar}/>
              <LabelForFile htmlFor="avatar">&#128393;</LabelForFile>
          </ProfilePicWrapper> 
          
          
          
          <H2>Edit account</H2>
        
        </LogoWrapper>
        
        <Form onSubmit = {handleAdd}>
          
          <FormItem>
            <Label className={state.full_nameFieldActive ? "field-active" : ""}>full name</Label>
            <Input 
                name="full_name" 
                type="text" 
                value={state.full_name || ''} 
                onChange={handleChange} 
                onFocus={activateField}
                onBlur={disableField}
                required />
          </FormItem>
          
          
          <FormItem>
            <Label className={state.emailFieldActive ? "field-active" : ""}>email</Label>
            <Input 
              disabled= "disabled"
              name="email" 
              type="email" 
              value={state.email || ''} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
              required/>
          </FormItem>
          
          {/* <FormItem>
            <Label className={state.oldPasswordFieldActive ? "field-active" : ""}>current password</Label>
            <Input 
              name="oldPassword" 
              type="password" 
              value={state.oldPassword || ''} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
              required/>
          </FormItem> */}


          <FormItem>
            <Label className={state.passwordFieldActive ? "field-active" : ""}>new password </Label>
            <Input 
              name="password" 
              type="password" 
              value={state.password} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}/>
          </FormItem>
          

          
          <FormItem >
            <Label className={state.nickFieldActive ? "field-active" : ""}>Display name for comments</Label>
            <Input 
              name="nick" 
              type="text" 
              
              value={state.nick} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
              required/>
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
              
              

          <Button type="submit" disabled={state.isBtnDisabled}>Save Changes</Button>

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
        
        <ErrorWrapper>

          
          <RedX status={state.status} src={state.status == "" ?  "" : state.status == "pink" ? redX : greenCheck}/>
          {errorMessages}

          <StatusSpinner showStatusSpinner={state.showStatusSpinner}>
            <Spinner name='wave' color='#56c5cc' />
          </StatusSpinner>

        </ErrorWrapper>

        
        {/* <StyledLink to="/login">Already have an account? Log in</StyledLink> */}
      </EditAccount>
      
      
    </EditAccountWrapper>
  );
}

export default props => <Edit {...props}/>;