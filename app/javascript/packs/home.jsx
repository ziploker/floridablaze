import React, {useEffect, useState} from 'react'
import styled, { ThemeProvider } from 'styled-components'
//import { Parallax, Background } from 'react-parallax';
import Login from './pages/login'
import defaultImage from '../../assets/images/defaultImage'
import slugify from 'react-slugify'
import {
    
    Link
} from "react-router-dom";
  
const LinkWrapper = styled(Link)`

    display: flex;
    justify-content: center;
    align-items: center;

    //max-width:450px;
    width: 100%;

    /* @media screen and (min-width: 750px) and (max-width: 1111px){

        width: 88%;
        max-width:100%;
    } */

    
`;

const HomeWrapper = styled.div`

    //background: pink;

    //height: calc(100vh - 85px);
    //max-height: 500px;
    overflow: hidden;
    //min-width: 500px;

`;



const News = styled.div`

    @media only screen and (max-width: 866px){

        //margin-top: 0px;
        margin-bottom: 25px;
        grid-template-columns: 1fr;
        //padding: 0px 20px;

        grid-template-rows:max-content max-content max-content max-content 1fr;
        grid-template-areas:

            "one"
            "two"
            "three"
            "four"
            ".";

    }


    @media only screen and (min-width: 867px) and (max-width: 1111px){

        grid-template-columns: minmax(20px, 1fr) minmax(200px, 600px) minmax(200px, 600px) minmax(20px, 1fr);

        grid-template-rows: 340px 170px 120px 50px minmax(100px, 1fr);
        grid-template-areas:

            ".      one      two   ."
            ".     three     four  ."
            ".     three     four  ."
            ".     three     four  ."
            ".       .        .    .";

    }



    min-height: 100%;

    display: grid;
    justify-content: center;
    //grid-template-columns: 1fr minmax(0px, 350px) minmax(0px, 600px) 1fr;

    //grid-template-columns: minmax(20px, 1fr) minmax(170px, 350px)  minmax(340px, 600px)  minmax(20px, 1fr);

    //grid-template-columns: 5px 1fr 1fr 1fr 5px;
    grid-template-columns: minmax(20px, 1fr) minmax(200px, 600px) minmax(200px, 600px) minmax(200px, 600px) minmax(20px, 1fr);

    //grid-template-rows: 80px 120px 50px 1fr;
    grid-template-areas:

        ".   one two three   ."
        ".   one two three   ."
        ".   one two three   ."
        ".    .   .    .     .";
    grid-gap: 20px;

    margin-top: 30px;

    /* display: grid;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
        "featured one two  ." */


        /* @media only screen and (min-width: 2000px){
        grid-template-columns: 10vw 1fr 1fr 1fr 10vw;

    } */

    @media only screen and (min-width: 1850px){

        grid-template-columns: minmax(20px, 1fr) minmax(600px, 700px) minmax(600px, 700px) minmax(600px, 700px) minmax(20px, 1fr);



    }


`;


const StoryImageWrapper = styled.div`

    width:100%;
    height: 0px;
    //min-height: 90px;
    //max-height: 300px;
    grid-area: 1 /1 /2 /2;
    padding-top: 60%;
    position: relative;


    /* @media screen and (min-width: 750px) and (max-width: 1111px){
        width: 100%;
        height: 100%;

        grid-area: picture;

        padding:0;

        align-self: center;
        justify-self: center;
        //border: 5px solid white;

    } */
`;

const StoryImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;


`;


const Div1OverlayWrapper = styled.div`

    pointer-events: none;
    grid-area: one;
    border-radius: 10px;
    //border: 5px solid #e8e5e5;
    //box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);
    overflow: hidden;
    min-height: 290px;
    max-width: 600px;
    width: 100%;
    justify-self: center;
    min-height: 290px;
    max-width: 600px;
    position: relative;
    background: rgb(0,0,0);
    background: -moz-linear-gradient(0deg, rgba(0,0,0,1) 10%, rgba(255,145,145,0) 34%);
    background: -webkit-linear-gradient(0deg, rgba(0,0,0,1) 10%, rgba(255,145,145,0) 34%);
    background: linear-gradient(0deg, rgba(0,0,0,1) 10%, rgba(255,145,145,0) 34%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#ff9191",GradientType=1);
    

`;

const Div2OverlayWrapper = styled(Div1OverlayWrapper)`

    grid-area: two;
`;

const Div3OverlayWrapper = styled(Div1OverlayWrapper)`

    grid-area: three;
`;

const Div4OverlayWrapper = styled(Div1OverlayWrapper)`


    @media only screen and (max-width: 1111px){

        grid-area: four;
        display: inherit;
    }

    display: none;
`;

const StoryImageOverlay = styled.div`

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

`;

const StoryOneTitle = styled.h1`

    grid-area: 1 /1 /2/2;
    font-size: 20px;
    align-self: end;
    justify-self: start;
    text-align: left;
    color: white;
    line-height: 1em;
    //letter-spacing: 2px;
    z-index: 1;
    padding: 0px 15px 8px 15px;

`;


const Div1 = styled.div`
    //background: blue;
    box-shadow: 0 2px 5px 0 rgba(227, 181, 90, 0.2);
    grid-area: one;
    border-radius: 10px;
    overflow: hidden;
    display: grid;
    justify-self: center;
    min-height: 290px;
    max-width: 600px;
    width: 100%;
    background-image: url( ${props => props.imageURL});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    //border: 5px solid #e8e5e5;
    //grid-template-columns: minmax(250px, 1fr);
    //grid-template-rows: auto;

    &:hover{
        box-shadow: 0 0 0 5px #E3B55A;
        transition: box-shadow 80ms;
        border-radius: 4px;
        outline: none;

    }




    /* &:before{
        content: '';
        display: block;
        width: 0;
        height: 0;
        padding-top: calc(100% / (16/9));



    } */

`;

const Div2 = styled.div`

    box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);
    background: orange;
    grid-area: two;
    border-radius: 10px;
    overflow: hidden;
    display: grid;
    min-height: 290px;
    max-width: 600px;
    width: 100%;
    justify-self: center;
    background-image: url( ${props => props.imageURL});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    //border: 5px solid #e8e5e5;
    //margin-right: 25px;
    /* &:before{
        content: '';
        display: block;
        width: 0;
        height: 0;
        padding-top: calc(100% / (16/9));



    } */

    &:hover{
        box-shadow: 0 0 0 5px #E3B55A;
        transition: box-shadow 80ms;
        border-radius: 4px;
        outline: none;

    }

`;

const Div3 = styled.div`
    box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);
    background: green;
    grid-area: three;
    border-radius: 10px;
    overflow: hidden;
    display: grid;
    min-height: 290px;
    max-width: 600px;
    width: 100%;
    justify-self: center;
    background-image: url( ${props => props.imageURL});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    //border: 5px solid #e8e5e5;
    //margin-right: 25px;
    /* &:before{
        content: '';
        display: block;
        width: 0;
        height: 0;
        padding-top: calc(100% / (16/9));



    } */

    &:hover{
        box-shadow: 0 0 0 5px #E3B55A;
        transition: box-shadow 80ms;
        border-radius: 4px;
        outline: none;

    }

`;

const Div4 = styled.div`

    @media only screen and (max-width: 1111px){

        box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);
        display: initial;
        background: red;
        grid-area: four;
        border-radius: 10px;
        overflow: hidden;
        display: grid;
        min-height: 290px;
        max-width: 600px;
        width: 100%;
        justify-self: center;
        background-image: url( ${props => props.imageURL});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        //border: 5px solid #e8e5e5;
        //margin-right: 25px;
        /* &:before{
            content: '';
            display: block;
            width: 0;
            height: 0;
            padding-top: calc(100% / (16/9));



        } */

        &:hover{
            box-shadow: 0 0 0 5px #E3B55A;
            transition: box-shadow 80ms;
            border-radius: 4px;
            outline: none;

        }
    }

    display: none;

`;

const BackgroundGray = styled.div`

    @media only screen and (max-width: 866px){
        display: none;
    }
    background: #C4C4C4;
    grid-area: 3/1/-1/-1;
    z-index: -1;
    padding: 75px 0px;

    @media only screen and (max-width: 1000px){
        grid-area: 4/1/-1/-1;
    }



`;



function Home(props){

    console.log("==============Home===============")
    console.log("==============Home Props===============", props)

    // const [screenIsAtTop, setScreenIsAtTop] = React.useState(true);




    return (
        <>
            <HomeWrapper>

                    <News>

                        <Div1 imageURL={props.lastStory ? props.lastStory.url : defaultImage} >

                            <LinkWrapper 
                                to={{
                                    pathname: "/blog/" + slugify(props.lastStory ? props.lastStory.title : "nada"),
                                }}
                            >
                                
                                <StoryOneTitle>
                                    {props.lastStory ? props.lastStory.title : "Place golder for title. place golder for title."}
                                </StoryOneTitle>
                                
                                
                            
                            </LinkWrapper> 

                        </Div1>
                        
                        <Div1OverlayWrapper>
                            <StoryImageOverlay/>
                        </Div1OverlayWrapper>
                        
                        <Div2 imageURL={props.secondToLastStory ? props.secondToLastStory.url : defaultImage} >

                            <LinkWrapper 
                                to={{
                                    pathname: "/blog/" + slugify(props.secondToLastStory ? props.secondToLastStory.title : "nada"),
                                }}
                            >
                                
                                <StoryOneTitle>
                                    {props.secondToLastStory ? props.secondToLastStory.title : "Place holder for title, place holder for title"}
                                </StoryOneTitle>
                                
                                
                            
                            </LinkWrapper> 

                        </Div2>
                        <Div2OverlayWrapper>
                            <StoryImageOverlay/>
                        </Div2OverlayWrapper>
                        
                        
                        <Div3 imageURL={props.thirdToLastStory ? props.thirdToLastStory.url : defaultImage} >

                            <LinkWrapper 
                                to={{
                                    pathname: "/blog/" + slugify(props.thirdToLastStory ? props.thirdToLastStory.title : "nada"),
                                }}
                            >
                                
                                <StoryOneTitle>
                                    {props.thirdToLastStory ? props.thirdToLastStory.title : "Place golder for title. place golder for title."}
                                </StoryOneTitle>
                                
                                
                            
                            </LinkWrapper> 

                        </Div3>
                        <Div3OverlayWrapper>
                            <StoryImageOverlay/>
                        </Div3OverlayWrapper>

                        <Div4 imageURL={props.fourthToLastStory ? props.fourthToLastStory.url : defaultImage} >

                            <LinkWrapper 
                                to={{
                                    pathname: "/blog/" + slugify(props.fourthToLastStory ? props.fourthToLastStory.title : "nada"),
                                }}
                            >
                                
                                <StoryOneTitle>
                                    {props.fourthToLastStory ? props.fourthToLastStory.title : ""}
                                </StoryOneTitle>
                                
                                
                            
                            </LinkWrapper> 

                        </Div4>
                        <Div4OverlayWrapper>
                            <StoryImageOverlay/>
                        </Div4OverlayWrapper>


                        <BackgroundGray></BackgroundGray>


                    </News>


            </HomeWrapper>

            

        </>
    );
}


export default Home;