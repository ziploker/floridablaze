import React, { useEffect, useState, useRef, useCallback } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import Header from "./header";
import Home from "./home";
import Act from "./act";
import SignupSection from "./signup";
import Shop from "./shop";
import Footer from "./footer";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./global";
import Article from "./article";
import SideMenu from "./sidemenu";
import StoryFlipper from "./storyFlipper";
import Login from "./pages/login";
import Forgot from "./pages/forgot";
//import Signup from './pages/signup'
import Edit from "./pages/edit";
import Change from "./pages/change_pw";
import Resend from "./pages/resend";
import EditStory from "./EditStory";
import StoryFlipperOriginal from "./StoryFlipperOriginal";
//import "../packs/app.css";
import { useInView } from "react-intersection-observer";
//import ReactFontLoader from 'react-font-loader'

///////////////////////////////// MAIN APP STARTING POINT ///////////////
function App({ d }) {
  const current_user = d.current_user;
  const artData = d.artData;

  const [userState, setUserState] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    emailStatus: "EMAIL_NOT_VERIFIED",
    user: {},
  });

  const [openSideMenu, setOpenSideMenu] = useState("false");
  const [showOffer, setShowOffer] = useState("false");
  const [loginClicked, setLoginClicked] = useState("false");
  const [allStoriesPlaceholder, setAllStoriesPlaceholder] = useState(
    d.allStoriesPlaceholder
  );

  const [totalNumOfStoriesOnServer, setTotalNumOfStoriesOnServer] = useState(
    d.totalNumOfStoriesOnServer
  );
  const [allStories, setAllStories] = useState(d.stories);

  const allStoriesFromController = d.stories;
  const page = d.page;

  const theme = {
    white: "#ffffff",
    offWhite: "#f4f4f4",
    lightBlue: "#56c5cc", //(86,197,204)
    pink: "#f14f7b", //(241,79,123)
    orange: "#f7aa1c", //(247,170,28)
    darkBlue: "#000321", //(0,3,33)
    blueGray: "#0E2021",
    black: "#181818", //(0,0,0)
  };

  console.log("==============APP===============" + JSON.stringify(d));

  // reference for lookupSection to scroll to, when click on nav link
  const LookupScrollToRef = useRef();
  const LookupInputRef = useRef();

  const section2ScrollToRef = useRef();

  // when click on nav link, scrolls to LookupScrollToRef
  const scrollToRef = (ref) => {
    console.log("in scrollToRef ");
    console.log(ref);
    console.log(LookupInputRef);

    var scrollOptions = {
      left: 0,
      top: ref.current.offsetTop,
      behavior: "smooth",
    };

    window.scrollTo(scrollOptions);
    //window.scrollTo(0, ref.current.offsetTop)

    setOpenSideMenu("false");

    setTimeout(function () {
      LookupInputRef.current.focus();
    }, 420);
  };

  const scrollToRef2 = (ref) => {
    console.log("IN SCROLLTOREF2");
    console.log(ref);

    var scrollOptions = {
      left: 0,
      top: ref.current.offsetTop,
      behavior: "smooth",
    };

    window.scrollTo(scrollOptions);

    //window.scrollTo(0, ref.current.offsetTop)
  };

  const handleSuccessfulAuth = (data) => {
    setUserState({
      ...userState,
      loggedInStatus: "LOGGED_IN",
      user: data.user,
    });
  };

  const handleLogOutClick = () => {
    axios
      .delete(
        "/logout",
        {
          data: {
            user: "user",
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);

        //Server says logged_in but appState says not logged in
        //Server says logged_in but appState says not logged in

        setUserState({
          ...userState,
          loggedInStatus: "NOT_LOGGED_IN",
          user: {},
        });
      })
      .catch((error) => {
        console.log("Logout? error", error);
      });
  };

  const executeScrollForLookupSection = (e) => {
    console.log("in executeScrollForLookupSection ");
    e.preventDefault();
    scrollToRef(LookupScrollToRef);
    setOpenSideMenu("false");
  };

  const executeScrollForSection2 = (e) => {
    e.preventDefault();

    setOpenSideMenu("false");
    setLoginClicked("false");
    scrollToRef2(section2ScrollToRef);
  };

  const executeScrollForLookupSectionTwo = () => {
    scrollToRef2(section2ScrollToRef);
    setOpenSideMenu("false");
  };

  useEffect(() => {
    //const mode = process.env.NODE_ENV == "development" ? "http://127.0.0.1:3000" : "https://www.floiridablaze.io"

    console.log("==============APP useEffects===============");
    if (current_user != null) {
      console.log("currentUser exists, so bypass session logged_in call");

      setUserState({
        ...userState,
        loggedInStatus: "LOGGED_IN",
        user: current_user,
        emailStatus:
          current_user.email_confirmed == "true"
            ? "EMAIL_VERIFIED"
            : "EMAIL_NOT_VERIFIED",
      });
    } else {
      console.log(
        "currentUser did not exist, so run logged_in call from server"
      );
      axios
        .get("/logged_in", { withCredentials: true })
        .then((response) => {
          //Server says logged_in but appState says not logged in
          //   setAppState({
          //     ...appState,
          //     loggedInStatus:
          //       response.data.logged_in &&
          //       appState.loggedInStatus == "NOT_LOGGED_IN"
          //         ? "LOGGED_IN"
          //         : "NOT_LOGGED_IN",
          //     user: response.data.user,
          //     emailStatus:
          //       response.data.user && response.data.user.email_confirmed == "true"
          //         ? "EMAIL_VERIFIED"
          //         : "EMAIL_NOT_VERIFIED",
          //   });
          //Server says not logged in but appState says logged_in
          //}else if (!response.data.logged_in && appState.loggedInStatus == "LOGGED_IN"){
          //    setAppState({
          //        ...appState,
          //        loggedInStatus: "NOT_LOGGED_IN",
          //        user: {}
          //    })
          //    console.log("WTTFFF", "BBBBBBB")
          //Check if email has been confirmed
          //if (response.data.user && response.data.user.email_confirmed == true){
          //    setAppState({
          //        ...appState,
          //          emailStatus: "EMAIL_VERIFIED"
          //    })
          //    console.log("WTTFFF", "cccccc")
          // }
        })
        .catch((error) => console.log("Logged in? error", error));
    }
  }, []);

  useEffect(() => {
    //console.log("1111111111111111111111111111111111111111111111111===");
    if (typeof window != "undefined" && window.document) {
      if (openSideMenu == "true") {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }
  }, [openSideMenu]);

  const initialOptions = {
    "client-id":
      "ARoxFsYDjhh3TqvSuq-WCN4jIEIFuyTm_HUPob8uDtr0H8c-A4ko4Tb2X1A9Sl2pwTRERBClsNWrleR6",
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* <ReactFontLoader url='https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;800&family=PT+Serif&family=Permanent+Marker&display=swap' /> */}

      <Router>
        <Header
          userState={userState}
          handleLogOutClick={handleLogOutClick}
          set_login_clicked={setLoginClicked}
          open_side_menu={openSideMenu}
          set_open_side_menu={setOpenSideMenu}
          executeScrollForSection2={executeScrollForSection2}
          executeScrollForLookupSection={executeScrollForLookupSection}
          handleSuccessfulAuth={handleSuccessfulAuth}
          login_clicked={loginClicked}
        />

        <Routes>
          <Route
            exact
            path="/"
            element={
              // <Home
              //   //handleSuccessfulAuth={handleSuccessfulAuth}
              //   login_clicked={loginClicked}
              //   set_login_clicked={setLoginClicked}
              //   allStoriesFromController={allStoriesFromController}
              //   allStories={allStories}
              //   setAllStories={setAllStories}
              //   allStoriesPlaceholder={allStoriesPlaceholder}
              //   totalNumOfStoriesOnServer={totalNumOfStoriesOnServer}
              //   show_offer={showOffer}
              //   //stories={d.stories}
              //   // lastStory={lastStory}
              //   // secondToLastStory={secondToLastStory}
              //   // thirdToLastStory={thirdToLastStory}
              //   // fourthToLastStory={fourthToLastStory}
              //   // setLastStory={setLastStory}
              //   // setSecondToLastStory={setSecondToLastStory}
              //   // setThirdToLastStory={setThirdToLastStory}
              //   // setFourthToLastStory={setFourthToLastStory}
              //   page={page}
              // />
              <h1>............</h1>
            }
          />
          <Route
            path="/forgot"
            element={
              <Forgot
                login_clicked={loginClicked}
                set_login_clicked={setLoginClicked}
              />
            }
          />
          <Route
            path="/resend"
            element={
              <Resend
                login_clicked={loginClicked}
                set_login_clicked={setLoginClicked}
              />
            }
          />
          <Route
            exact
            path="/change_pw/:token"
            element={
              <Change
                login_clicked={loginClicked}
                set_login_clicked={setLoginClicked}
              />
            }
          />

          <Route
            exact
            path="/edit"
            element={
              <Edit
                user={userState.user}
                executeScrollForLookupSection={executeScrollForLookupSection}
                LookupScrollToRef={LookupScrollToRef}
              />
            }
          />
          <Route path="/story_editor/:storyId" element={<EditStory />} />
          <Route
            exact
            path="/blog/:id"
            element={
              <Article
                tester="testing123"
                userState={userState}
                artData={artData}
              />
            }
          />
        </Routes>
        <PayPalScriptProvider options={initialOptions}>
          <Act
            ref={{
              LookupScrollToRef: LookupScrollToRef,
              LookupInputRef: LookupInputRef,
            }}
            executeScrollForSection2={executeScrollForSection2}
            userState={userState}
            set_login_clicked={setLoginClicked}
            set_open_side_menu={setOpenSideMenu}
            executeScrollForLookupSection={executeScrollForLookupSection}
            executeScrollForLookupSectionTwo={executeScrollForLookupSectionTwo}
            show_offer={showOffer}
            set_show_offer={setShowOffer}
          />
        </PayPalScriptProvider>
        <SignupSection
          ref={{ section2ScrollToRef: section2ScrollToRef }}
          handleSuccessfulAuth={handleSuccessfulAuth}
          show_offer={showOffer}
        />

        {/* <Footer intersectionObserverRef={intersectionObserverRef} /> */}
        <Footer show_offer={showOffer} />

        {/* <StoryFlipper
          //inView={inView}
          allStories={allStories}
          setAllStories={setAllStories}
          show_offer={showOffer}
        /> */}

        {/* <LookupSection appState={appState} ref={{LookupScrollToRef: LookupScrollToRef, LookupInputRef: LookupInputRef}}/>
                <Section2 ref={{section2ScrollToRef: section2ScrollToRef}} stories={appState.stories} appState={appState} setAppState={setAppState} handleSuccessfulAuth={handleSuccessfulAuth} />
               <Footer/> */}
      </Router>
    </ThemeProvider>
  );
}

// export default props => <App {...props} />;
export default App;
