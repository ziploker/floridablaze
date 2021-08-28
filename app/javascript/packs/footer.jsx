import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import styled from 'styled-components'

import axios from 'axios'

import footerImage from '../../assets/images/footerImage'


const FooterWrapper = styled.div`

    @media only screen and (max-width: 575px) {

        grid-template-columns: minmax(20px, 100px) minmax(133px, 1fr) minmax(133px, 1fr) minmax(20px, 100px);
        grid-template-rows: minmax(160px, 40%) 1fr;
        height: auto
        
    }
    /* background: pink;
    background-image: url(${footerImage});
    
    background-position: contain;
    background-repeat: no-repeat;
    
    min-height: 200px; */
    //background-color: RGB(244, 244, 244);
    background-color: #FFFFFF;

    overflow: hidden;

    display: grid;
    //grid-template-columns: 1fr;

    grid-template-columns: minmax(20px,1fr) minmax(min-content, 200px) minmax(min-content, 200px) minmax(min-content, 250px) minmax(20px,1fr);
    grid-template-rows: minmax(150px, 40%) 1fr;
    /* grid-template-areas:
        "spacer"
        "footerLeaf"; */
    height: 350px;

    

`;

const FooterImage = styled.img`

    @media only screen and (max-width: 575px) {

        grid-area: 1/1/3/-1;
        
    }


    //grid-area: footerLeaf;
    grid-area: 1/1/6/-1;
    height: 100%;
    width: 100%;
    min-width: 500px;
    

`;

const SubscribeSection = styled.div`

    @media only screen and (max-width: 575px) {

        grid-area: 3/2/4/4;
        justify-self: start;
        align-self: start;

    }


    //margin: 25px 0px 40px 0px;
    z-index: 1;
    background: black;
    grid-area: 2/4/-1/5;
    justify-self: end;
    align-self: start;
    margin-bottom: 20px;

    h2{

        margin: 0px 0px 10px 0px;

        span{
            color: white;
            font-size: 12px;
            
            letter-spacing: normal;
            line-height: 19px;
            line-height: 22px;
            font-style: normal;
            font-weight: 400;
            font-family: poppins;

            svg{
                margin: 0px 8px 0px 0px;
            }
        }

    }

    input{

        background: 0 0;
        border-color: #7F7F7F;
        border-style: solid;
        border-width: 0 0 1px;
        margin-bottom: 15px;
        padding: 0 0 9px;
        font-size: 14px;
        color: #7F7F7F;
        width: 100%;
        center
        ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: #7F7F7F;
            opacity: 1; /* Firefox */
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #7F7F7F;
        }

        ::-ms-input-placeholder { /* Microsoft Edge */
            color:#7F7F7F;
        }
    }

    button{

        font-style: normal;
        font-weight: 400;
        min-width: 200px;
        background-color: #c33;
        color: #fff;
        letter-spacing: 0;
        line-height: 26px;
        text-decoration: none;
        -webkit-transition: all .2s;
        transition: all .2s;
        overflow: visible;
        text-align: center;
        text-transform: capitalize;
        white-space: nowrap;
        padding: 12px 45px;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-radius: 0;
        border: 0;

    }
`;

const Follow = styled.div`


    @media only screen and (max-width: 575px) {

        grid-area: 1/3/2/4;
        
        padding-top: 80px;

    }

    
    grid-area: 2/3/-1/4;
    color: white;
    justify-self: start;
    align-self: start;
    margin-bottom: 20px;
    

    h1{
        font-family: poppins;
        font-size: 1.5em;
        margin-bottom: 5px;

    }

    ul{

        list-style-type: none;
        
        a{
            font-size: 12px;
            
            letter-spacing: normal;
            line-height: 19px;
            line-height: 22px;
            font-style: normal;
            font-weight: 400;
            font-family: poppins;
            color: white;


        }
    }
`;


const Explore = styled.div`

    @media only screen and (max-width: 575px) {

        grid-area: 1/2/2/3;
        
        padding-top: 80px;

    }
    grid-area: 2/2/-1/3;
    color: white;
    justify-self: start;
    align-self: start;
    margin-bottom: 20px;
    

    h1{
        font-family: poppins;
        font-size: 1.5em;
        margin-bottom: 5px;

    }

    ul{

        list-style-type: none;
        
        a{
            font-size: 12px;
            
            letter-spacing: normal;
            line-height: 19px;
            line-height: 22px;
            font-style: normal;
            font-weight: 400;
            font-family: poppins;
            color: white;


        }
    }
`;

const Legal = styled.div`

    @media only screen and (max-width: 575px) {

        grid-area: 4/2/5/4;
        justify-self: start;
        align-self: end;
        padding: 8px 0px 16px 0px;

    }

    padding: 20px 0px;
    background-color: black;
    z-index: 1;
    font-size: .2em;
    grid-area: 4/1/5/5;
    align-self: end;
    justify-self: center;
    color: white;
    
    font-family: poppins;
    padding-bottom: 20px;

`;

const BlackBG = styled.div`

    @media only screen and (max-width: 575px) {

        grid-area: 3/1/5/-1;
        background-color: black;

    }

`;


const formData = new FormData();

function Footer(props) {

   
   
    console.log("==============Footer===============")
    console.log("==============Footer Props===============", props)
    //console.log("HEADER_PROPS solo", location.pathname)


    


    const [newsletterEmail, setNewsletterEmail] = useState("")

    useEffect(() => {

        
        console.log("==============Footer useEffect===============")
    
        window.addEventListener('keydown', handleFirstTab);
        
        
        
    },[]);



    function handleNewsletter(e){

        e.preventDefault();

        console.log("currentstateis = ", newsletterEmail)

        formData.append('data[email]', newsletterEmail);
        formData.append('ziploker', "wtfff");

        console.log("currentFormDatais = ", formData)

        axios.post("/registrations/newsletter", {
          
            body: { 
              payload: newsletterEmail,
              
              
            }
          },
          {withCredentials: true})
          .then(response => {
  
  
            console.log("response from newsletter", response)
              
  
              
              
          }).catch(error => {
            
            console.log("handlenewsletter errors if any are ", error)
          })



    }

    function handleNewsletterChange(e){

        setNewsletterEmail(e.target.value)

        console.log("inHandleNewsLetter", e)



    }



    function handleFirstTab(e) {

        console.log("IN TAB thing..................")
        if (e.keyCode === 9) { // the "I am a keyboard user" key
            document.body.classList.add('user-is-tabbing');
            window.removeEventListener('keydown', handleFirstTab);
        }
    }
      
    return (
        
        <FooterWrapper>

            <FooterImage src={footerImage}/>


            <SubscribeSection>
                <h2>
                    <span>
                        <svg width="19px" height="13px" viewBox="0 0 19 13">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g fill="#fff">
                                    <g>
                                        <polygon points="0 9.1842 4.103 5.0812 0 0.9792"></polygon>
                                        <polygon points="0.4365 -0.0003 9.0415 8.6057 17.6475 -0.0003"></polygon>
                                        <polygon points="14.0445 5.0163 18.0835 9.0553 18.0835 0.9773"></polygon>
                                        <polygon points="9.0414 10.0194 4.8104 5.7884 0.0004 10.5994 0.0004 12.7504 18.0834 12.7504 18.0834 10.4694 13.3384 5.7234"></polygon>
                                    </g>
                                </g>
                            </g>
                        </svg>

                    </span>

                    <span>
                        Stay up to date on the latest from FloridaBlaze.
                    </span>
                </h2>

                <form><strong style={{ display: "none"}}>Thank you for signing up! You are now subscribed.</strong>
                    <div>

                        <input onChange={handleNewsletterChange} value={newsletterEmail} type="email" required="" spellCheck="false" autoComplete="off" autoCapitalize="none" placeholder="Enter your e-mail address"/>

                        
                    </div>
                    <button type="submit" name="submint" onClick={handleNewsletter}>
                        Sign Up
                        </button>
                </form>
   
            </SubscribeSection>

            <Follow>

                <ul>
                    <h1>Follow</h1>
                    <li><a href="#">facebook</a></li>
                    <li><a href="#">twitter</a></li>
                    <li><a href="#">instagram</a></li>

                </ul>

            </Follow>


            <Explore>

                <ul>
                    <h1>Explore</h1>
                    <li><a href="#">home</a></li>
                    <li><a href="#">act</a></li>
                    <li><a href="#">shop</a></li>
                    <li><a href="#">about</a></li>
                    <li><a href="#">contact</a></li>

                </ul>

            </Explore>

            <Legal>

                <h1>&#169; 2021 FloridaBlaze, All Rights Reserved</h1>
            </Legal>

            <BlackBG></BlackBG>


        </FooterWrapper>
    )
}





export default Footer;
