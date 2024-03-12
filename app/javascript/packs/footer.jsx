import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";

import footerImage from "../../assets/images/footerImageCrop.png";

const FooterWrapper = styled.div`
  /* grid-template-columns:
		minmax(20px, 100px) minmax(133px, 1fr) minmax(133px, 1fr)
		minmax(20px, 100px); */

  //grid-template-columns: 1fr 1.5fr 1fr 1.5fr 1fr;
  grid-template-columns: 8% 1fr 1fr 2fr 8%;
  grid-template-rows: 125px min-content min-content;
  grid-template-areas:
    ".    .     .       .      ."
    ". colOne colTwo colThree ."
    " . . . legal legal";
  //grid-template-rows: minmax(160px, 40%) 1fr;
  //grid-template-rows: initial;
  //grid-template-rows: 0px 1fr;
  height: auto;

  /* background: pink;
    background-image: url(${footerImage});
    
    background-position: contain;
    background-repeat: no-repeat;
    
    min-height: 200px; */
  //background-color: RGB(244, 244, 244);
  background-color: #ffffff;

  overflow: hidden;

  display: ${(props) => (props.show_offer == "true" ? "none" : "grid")};
  //grid-template-columns: 1fr;
  position: relative;

  //grid-template-columns: 2% 1fr 1fr 2fr 2%;
  //grid-template-rows: 100px min-content min-content;
  /* grid-template-areas:
        "spacer"
        "footerLeaf"; */
  //height: 350px;

  //z-index: 4;
  z-index: 1;

  @media only screen and (max-width: 985px) {
    grid-template-columns: 8% 1fr 1fr 8%;
    grid-template-rows: 125px min-content min-content;
    grid-template-areas:
    ".    .     .       . "
    ". colOne colTwo  ."
    " . colThree colThree ."
    " . legal legal . ";
  }
`;

const FooterImage = styled.img`
  //@media only screen and (max-width: 985px) {
  grid-area: 1/1/3/-1;
  // }

  //grid-area: footerLeaf;
  //grid-area: 1/1/-1/-1;
  height: 100%;
  width: 100%;
  min-width: 500px;
  align-self: end;

  z-index: 3;
`;

const SubscribeSection = styled.div`
  //@media only screen and (max-width: 985px) {
  //grid-area: 2/2/3/-1;
  grid-area: colThree;
  justify-self: start;
  align-self: start;
  //}

  //margin: 25px 0px 40px 0px;
  z-index: 3;
  background: black;
  //grid-area: 2/4/3/5;
  //justify-self: end;
  //align-self: start;
  //margin: 40px 0 20px 0;

  h2 {
    margin: 0px 0px 40px 0px;

    span {
      color: white;
      font-size: 12px;

      letter-spacing: normal;
      line-height: 19px;
      line-height: 22px;
      font-style: normal;
      font-weight: 400;

      svg {
        margin: 0px 8px 0px 0px;
      }
    }
  }

  input {
    display: ${(props) =>
      props.signupcomplete == "true" ? "none" : "initial"};
    background: 0 0;

    border: 1px solid #deb15c;

    margin-bottom: 15px;
    padding: 10px;
    font-size: 1.2rem;
    color: #e4e4e4;
    width: 100%;
    height: 60px;
    center ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #e3e3e3;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #7f7f7f;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: #7f7f7f;
    }
  }

  button {
    font-style: normal;
    font-weight: 400;
    min-width: 200px;
    background-color: #deb15c;
    color: #000000;
    letter-spacing: 0;
    line-height: 26px;
    text-decoration: none;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
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
  //@media only screen and (max-width: 985px) {
  //grid-area: 1/4/2/5;
  grid-area: colTwo;

  //padding-top: 170px;
  //}

  //grid-area: 2/3/3/4;
  color: white;
  justify-self: start;
  align-self: start;
  margin-bottom: 20px;
  z-index: 3;

  h1 {
    font-size: 2rem;
    margin-bottom: 15px;
  }

  ul {
    list-style-type: none;
    li {
      margin-bottom: 5px;
    }
    a {
      font-size: 1rem;

      letter-spacing: normal;
      line-height: 19px;
      line-height: 22px;
      font-style: normal;
      font-weight: 400;
      color: white;
    }
  }
`;

const Explore = styled.div`
  //@media only screen and (max-width: 985px) {
  //grid-area: 1/2/2/3;
  grid-area: colOne;
  //padding-top: 170px;
  //}
  //grid-area: 2/2/3/3;
  color: white;
  justify-self: center;
  align-self: start;
  margin-bottom: 20px;
  z-index: 3;
  //min-width: 360px;

  @media only screen and (max-width: 985px) {
  
    justify-self: start;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 15px;
  }

  ul {
    list-style-type: none;

    li {
      margin-bottom: 5px;
    }

    a {
      font-size: 1rem;

      letter-spacing: normal;
      line-height: 19px;
      line-height: 22px;
      font-style: normal;
      font-weight: 400;
      color: white;
    }
  }
`;

const Legal = styled.div`
  //@media only screen and (max-width: 985px) {
  /* grid-area: 4/2/5/-1; */
  grid-area: legal;
  align-self: end;
  justify-self: start;
  padding: 20px 0px;
  background-color: black;
  z-index: 3;
  font-size: 0.8rem;
  //grid-area: 3/3/4/5;
  //align-self: end;

  color: white;
  //width: 100%;
  text-align: center;
  //padding-bottom: 20px;
`;

const BlackBG = styled.div`
  //@media only screen and (max-width: 985px) {
  grid-area: 3/1/5/-1;
  background-color: black;
  //}
`;

const TopSectionWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(min-content, max-content) 1fr;
  grid-column-gap: 8px;

  span {
    //margin-top: 4px;
  }

  h2 {
    font-size: 2rem;
    color: white;
    //margin-top: 4px;
  }

  form {
    grid-area: 2/1/3/3;
  }
`;

const formData = new FormData();

function Footer(props) {
  console.log("--==============Footer===============");
  console.log("--==============Footer Props===============", props);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [signupComplete, setSignupComplete] = useState("false");

  useEffect(() => {
    console.log("---------------------------Footer useEffect===============");

    //window.addEventListener('keydown', handleFirstTab);
  }, []);

  function handleNewsletter(e) {
    e.preventDefault();

    console.log("currentstateis = ", newsletterEmail);

    formData.append("data[email]", newsletterEmail);
    formData.append("ziploker", "wtfff");

    console.log("currentFormDatais = ", formData);

    axios
      .post(
        "/registrations/newsletter",
        {
          body: {
            payload: newsletterEmail,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("response from newsletter", response);
        setSignupComplete("true");
      })
      .catch((error) => {
        console.log("handlenewsletter errors if any are ", error);
      });
  }

  function handleNewsletterChange(e) {
    setNewsletterEmail(e.target.value);

    console.log("inHandleNewsLetter", e);
  }

  // function handleFirstTab(e) {

  //     console.log("IN TAB thing..................")
  //     if (e.keyCode === 9) { // the "I am a keyboard user" key
  //         document.body.classList.add('user-is-tabbing');
  //         window.removeEventListener('keydown', handleFirstTab);
  //     }
  // }

  return (
    <FooterWrapper show_offer={props.show_offer}>
      <FooterImage src={footerImage} />

      <SubscribeSection>
        <div>
          <TopSectionWrapper>
            <span>
              <svg width="45px" height="40px" viewBox="0 0 19 13">
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

            <h2>stay up to date</h2>

            <form>
              <strong
                style={{
                  display: signupComplete == "true" ? "initial" : "none",
                }}
              >
                Thank you for signing up!
              </strong>

              {/* <div style={{ display: signupComplete ? "none" : "initial" }}> */}
              <input
                signupcomplete={signupComplete}
                onChange={handleNewsletterChange}
                value={newsletterEmail}
                type="email"
                required=""
                spellCheck="false"
                autoComplete="off"
                autoCapitalize="none"
                placeholder="Enter your e-mail address"
              />
              {/* </div> */}

              <button
                style={{
                  display: signupComplete == "true" ? "none" : "initial",
                  color: "black",
                }}
                type="submit"
                name="submint"
                onClick={handleNewsletter}
              >
                Sign Up
              </button>
            </form>
          </TopSectionWrapper>
        </div>
      </SubscribeSection>

      <Follow>
        <ul>
          <h1>Follow</h1>
          <li>
            <a href="#">facebook</a>
          </li>
          <li>
            <a href="#">twitter</a>
          </li>
          <li>
            <a href="#">instagram</a>
          </li>
        </ul>
      </Follow>

      <Explore>
        <ul>
          <h1>Explore</h1>
          <li>
            <a href="#">home</a>
          </li>
          <li>
            <a href="#">act</a>
          </li>
          <li>
            <a href="#">shop</a>
          </li>
          <li>
            <a href="#">about</a>
          </li>
          <li>
            <a href="#">contact</a>
          </li>
        </ul>
      </Explore>

      <Legal>
        <h1>&#169; 2021 FloridaBlaze, All Rights Reserved</h1>
      </Legal>

      <BlackBG></BlackBG>
    </FooterWrapper>
  );
}

export default Footer;
