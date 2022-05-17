import React, {useEffect, useState, useRef} from 'react'
import {Link, useLocation} from 'react-router-dom'


//import useDocumentScrollThrottled from './useDocumentScrollThrottled.jsx'
import styled from 'styled-components'
import headerLeaf from "../../assets/images/headerLeafv2.png"
import headerLogo from '../../assets/images/leafTripple.png'
//import headerLogo from '../../assets/images/logo.png'
import newLeaf from '../../assets/images/mainLogo2.png'

import Burger from './burger'
import SideMenu from './sidemenu'


const HeaderWrapper = styled.div`

    /* background-image: url(${headerLeaf});
    background-position: right;
    background-repeat: no-repeat;
    background-size: contain;
    min-height: 85px;
    min-width: 80vw; */

    /* @media only screen and (max-width: 500px){

        position: ${ props => props.scrolled ? "fixed" : "initial"};
        top: ${ props => props.scrolled ? "0" : "initial"};

        left: ${ props => props.scrolled ? "0" : "initial"};
        background-color: ${ props => props.scrolled ? "white" : "initial"};
        grid-template-rows: ${ props => props.scrolled ? "initial" : "85px"};

        
           

    } */
    
    
    //min-height: ${ props => props.scrolled ? "initial" : "85px"};

    //margin: 0 20px;
    min-width: 100vw;;
    max-width: 3000px;
    //margin: 10px auto 0px auto;
    //overflow: ${props => props.openSideMenu ? "visible" : "hidden"};
    
    //position: relative;
   
    display: grid;
    //grid-template-columns: minmax(95px, 20vw) minmax(400px, 80vw);

    /* grid-template-columns: minmax(0px, 150px) 1fr minmax(0px, 800px) 1fr; */

    grid-template-columns: minmax(100px, min-content) 1fr minmax(100px, max-content);
    
    //grid-template-columns: 1fr minmax(0px, 15vw) minmax(0px, 82.100vw) 1fr;
    grid-template-rows: 85px;
    overflow: hidden;
    
    

    grid-template-areas:

        "headerLogo . headerLeaf ";
        
    grid-gap: 8px;


    z-index: 2;
    position: relative
    
`;

const Package = styled.div`

display: flex;
justify-content: center;
grid-area: headerLogo;


`;


const Logo = styled.img`

    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 96px;
    line-height: 144px;
    letter-spacing: -5px;
    color: #010101;
    grid-area: headerLogo;
    

    
    justify-self: start;
    align-self: center;
    
    
    height: 100%;
    width: 100px;
    padding: 15px;
    //margin-left: 40px;

    
`;


const LogoText = styled.h1`

    //@media only screen and (max-width: 500px){

        position: ${ props => props.scrolled ? "fixed" : "initial"};
        top: ${ props => props.scrolled ? "0" : "initial"};

        left: ${ props => props.scrolled ? "0" : "initial"};
        //background-color: ${ props => props.scrolled ? "white" : "initial"};
        //grid-template-rows: ${ props => props.scrolled ? "initial" : "85px"};


    

    //}

    /* @media only screen and (max-width: 500px){

        line-height: ${ props => props.scrolled ? "initial" : "85px"};

    } */
    animation: 500ms ease-in-out 0s normal none 1 running fadeInDown;
    font-family: 'Permanent Marker', cursive;
    font-style: normal;
    font-weight: normal;
    font-size: 22px;
    //line-height: 85px;

    letter-spacing: -1px;
    color: #010101;
    grid-area: headerLogo;
    
    padding: 0 0 0 15px;
    
    justify-self: start;
    align-self: center;
    margin-bottom: -1px;
    
    //height: 100%;
    width: 100px;
    //padding: 15px;

    span{

        color: red;
    }


`;


const HeaderLeafImage = styled.img`




    @media only screen and (max-width: 500px){
        
        //display: none; 
        margin-right: -90px;    
        //min-width: 475px;

    }

    @media only screen and (max-width: 400px){
        
        //display: none; 
        margin-right: -190px;    
        //min-width: 475px;

    }

    @media only screen and (max-width: 305px){
        
        //display: none; 
        margin-right: -222px;    
        //min-width: 475px;

    }

    @media only screen and (max-width: 265px){
        
        display: none; 
        //margin-right: -222px;    
        //min-width: 475px;

    }


    /* @media only screen and (max-width: 420px){
        
        //display: none; 
        margin-right: -150px;    
        //min-width: 475px;

    } */
    //max-width: 95%;
    min-width: 400px;
    
    max-height: 100%;
    
    max-width: 95%;     
    
    grid-area: headerLeaf;
    justify-self: end;
    align-self: center;

`;


const SideMenuWrapper = styled.div`

    position: relative;

`;


const LongNav = styled.nav`

    @media only screen and (max-width: 500px){
        
        display: none;     

    }   

    
    
    grid-area: headerLeaf;
    color: white;
    align-self: center;
    justify-self: end;
    margin: 0 -25px;
    //transform: translate(-30px,-30px);
    //opacity: 0;
    //height: 100%;

    display: flex;
    position: ${ props => props.longNavScrolled ? "fixed" : "initial"};
    top: ${ props => props.longNavScrolled ? "7px" : "initial"};
    color: ${ props => props.longNavScrolled ? "black" : "white"};
    



    ul{
        
        list-style: none;
        margin-right: 40px;
        display: flex;
        align-items: baseline;
        color: inherit;
        

        
    
        li{
            @media only screen and (max-width: 666px){
        
                padding: 0px 12px;     

            }
            
            display: inline-block;
            padding: 0px 20px;

            font-weight: 500;
            font-size: 16px;
            line-height: 45px;
            //color: ${props => props.theme.white};
            //background: ${ props => props.hamburgerScrolled ? "black" : "white"};
            color: inherit;
            
            text-decoration: none;
            cursor: pointer;

        
            a{
                transition: all 0.3s ease 0s;
                font-weight: 500;
                font-size: 12px;
                line-height: 45px;
                //color: ${props => props.theme.white};
                color: inherit;
                /* &:hover{

                    color: ${props => props.theme.lightBlue};;

                } */
            
            }
        
        }
    
    
    
    }
    



`;


const Wrap = styled.div`
    
        //position: relative;
        width: 100vw;
        //height: 100vh;
        overflow: hidden;
    `;


const Outter = styled.div`
//overflow: hidden;
width: 100%;
//height: 100%;
position: relative;
`;


const HamburgerMenu = styled.div`

    position: relative; 
    grid-area: 1/3/2/4;
    justify-self: end;
    align-self: center;
    padding-right: 1em; 

    @media only screen and (max-width: 500px){

        position: ${ props => props.hamburgerScrolled ? "fixed" : "initial"};
        top: ${ props => props.hamburgerScrolled ? "7px" : "initial"};

        //left: ${ props => props.ref ? "0" : "initial"};
        //background-color: ${ props => props.scrolled ? "white" : "initial"};
        //grid-template-rows: ${ props => props.scrolled ? "initial" : "85px"};




    }

    button{

        div{

            background: ${ props => props.hamburgerScrolled ? "black" : "white"};
            color: ${ props => props.hamburgerScrolled ? "black" : "white"};
        }
    }




`;

const TopBackgroundBar = styled.div`



//@media only screen and (max-width: 500px){

    display: ${ props => props.hamburgerScrolled || props.scrolled ? "inital" : "none"} ;

    position: ${ props => props.hamburgerScrolled || props.scrolled ? "fixed" : "initial"} ;
    width: 100%;
    height: 40px;
    background-color: white;
    transition: all 0.3s linear;
    z-index: 1;

//}




`;






////////////////////////////////////////////////////////////Header Function
function Header(props) {

   
    console.log("==============Header===============")
    console.log("==============Header Props===============", props)


    ///// sticky nav start

    const [scrolled,setScrolled]=React.useState(false);
    const [hamburgerScrolled,setHamburgerScrolled]=React.useState(false);
    const [longNavScrolled,setLongNavScrolled]=React.useState(false);
    
    
    const [pixlesFromLogoToTop, setPixlesFromLogoToTop] = useState(0);
    const [pixlesFromHamburgerToTop, setPixlesFromHamburgerToTop] = useState(0);
    const [pixlesFromLongNavToTop, setPixlesFromLongNavToTop] = useState(0);
    
    const logoTextRef = useRef();
    
    //ref for hamburger nav menu
    const ref = React.useRef();

    const longNavRef = React.useRef();
   
    
    const handleScroll=() => {
        
        // const offset=window.scrollY;
        
        // if(offset > 50 ){
        //     setScrolled(true);
        // }
        // else{
        //     setScrolled(false);
        // }
        console.log("scrollY = ", window.scrollY)
        console.log("logoTextRef = ", pixlesFromLogoToTop)

        //console.log("scrollY = ", window.scrollY)
        console.log("hamburgeRef = ", pixlesFromHamburgerToTop)

        window.scrollY >= pixlesFromLogoToTop - 1
      ? setScrolled(true)
      : setScrolled(false);


      window.scrollY >= pixlesFromHamburgerToTop - 7
      ? setHamburgerScrolled(true)
      : setHamburgerScrolled(false);

      window.scrollY >= pixlesFromLongNavToTop - 7
      ? setLongNavScrolled(true)
      : setLongNavScrolled(false);
    }

    useEffect(() => {
        window.addEventListener('scroll',handleScroll)
    })

    useEffect(() => {
        
        setPixlesFromLogoToTop(logoTextRef.current.getBoundingClientRect().top);
        setPixlesFromHamburgerToTop(ref.current.getBoundingClientRect().top);
        setPixlesFromLongNavToTop(ref.current.getBoundingClientRect().top);
      }, []);
    
    

    
    ////sticky nav end

    useEffect(() => {

        console.log("==============Header useEffects===============")
        

        if (
    
            locationFromHook.pathname === "/login" || 
            locationFromHook.pathname === "/signup" ||
            locationFromHook.pathname === "/forgot" ||
            locationFromHook.pathname === "/edit" ||
            locationFromHook.pathname === "/change") {
        
                return;
            
        }else{
            
            listener = event => {

                //if you click in the menu,  dont close it
                if (ref.current.contains(event.target)) {
        
                    return;
                }
                
                //if you click anywhere outside the side menu, close it.    
                mouseDownHandler();
            };


        }
       
  
        
        //resize and/or orientationchange listener
        const handleResize = () => {
          
            console.log(window.innerWidth);
            
            //closed sideMenu on orientation change, if it gets bigger than 850px
            if (window.innerWidth > 850){
                props.setOpenSideMenu(false);
            }
        }
  
        //set up event listeners
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);
        document.addEventListener('mousedown', listener);
        
        
        return () => {
          
          document.removeEventListener('mousedown', listener);
          console.log("cleanup");
          console.log("cleanup done, openSideMenu = " + props.openSideMenu);
        };
      },
      [ref, mouseDownHandler],
    );

    
    const locationFromHook = useLocation();
    
    
    
    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    
    function mouseDownHandler(){
        
        props.setOpenSideMenu(false);
        console.log("mouseDownEventTriggered & openSideMenu = " + props.openSideMenu);
    }

    function doSomething(){

        scrollToTop();
        props.setLoginClicked(true)
        props.setOpenSideMenu(false)
    }

    


    let listener;
    
    if (locationFromHook.pathname === "/edit"){

        return null
    
      } else{

    return (

        <>
            <TopBackgroundBar hamburgerScrolled={hamburgerScrolled} scrolled={scrolled}/>
        
            <HeaderWrapper openSideMenu={props.openSideMenu} scrolled={scrolled}>
            
                
                {/* <Logo src={newLeaf}></Logo> */}
                <LogoText ref={logoTextRef} scrolled={scrolled}>Florida<span>Blaze</span></LogoText>
               
                    <h1 style={{display: "none"}}> {scrolled ? "TRUE" : "FALSE"} </h1>
               

                <HeaderLeafImage src={headerLeaf}></HeaderLeafImage>
                <LongNav ref={longNavRef} longNavScrolled={longNavScrolled}>
                    <ul>
                        <li key={0}>news</li>
                        <li key={1}>
                            
                            <a onClick={props.executeScrollForLookupSection}>Act</a>
                        
                        </li>
                        <li key={2}>shop</li>

                        <li key={3}>{props.userState.loggedInStatus == "LOGGED_IN" ? [<a key={"a"} onClick= {props.handleLogOutClick}> Logout | </a>, <Link key={"b"} to="/edit">edit </Link>] :   [<a key={"c"} onClick={doSomething}> Login |</a>, <a key={"d"} onClick={props.executeScrollForSection2}> Signup</a>]  } </li>
                    

                    </ul>


                </LongNav>
                
                <HamburgerMenu 
                    hamburgerScrolled={hamburgerScrolled}
                    ref={ref}>
                    
                    <Burger openSideMenu={props.openSideMenu} setOpenSideMenu={props.setOpenSideMenu}/>
                    
                </HamburgerMenu>
            
                    
            </HeaderWrapper>
        
        
            <Outter>

                <SideMenu 
                    //doSomething={doSomething} 
                    openSideMenu={props.openSideMenu} 
                    setOpenSideMenu={props.setOpenSideMenu}
                    //executeScroll={executeScroll} 
                    userState={props.userState} 
                    executeScrollForLookupSection={props.executeScrollForLookupSection} 
                    executeScrollForSection2={props.executeScrollForSection2}
                />
                
                
            </Outter>
        

        </>
    )
                }
}





export default Header;
