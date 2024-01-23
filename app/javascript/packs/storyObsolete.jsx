import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';
//import useFitText from "use-fit-text";
import slugify from 'react-slugify'

import {
    
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
  
} from "react-share";

import {
    
    Link
} from "react-router-dom";
  
const LinkWrapper = styled(Link)`

    display: flex;
    justify-content: center;
    align-items: center;

    //max-width:450px;
    width: 100%;

    @media screen and (min-width: 750px) and (max-width: 1111px){

        width: 88%;
        max-width:100%;
    }


`;
const StorySection = styled.section`

    
    width: 100%;
    max-width:450px;
    border: 3px double ${props => props.theme.pink};
   
    //padding: 15px;
    background-color: white;
    display: grid;
    //grid-template-columns: minmax(250px, 1fr);
    //grid-template-rows: auto;  

    grid-template-areas:
        "picture"
        "grayArea"
        "body"
        "time"
    ;

    @media screen and (min-width: 750px) and (max-width: 1111px){

        max-width: 100%;
        width: 100%;
        height: 110px;

        padding: 0px;
        display: grid;
        grid-gap: 10px;
        grid-template-columns: 110px 1fr;
        //grid-auto-rows: min-content;
        grid-template-rows: 70px 24px;
        justify-content: center;
        align-items: center;
        
        grid-template-areas:
            "picture body"
            "picture time"
        ;
    }

   
`;


const StoryImageWrapper = styled.div`

    width:100%;
    height: 0px;
    //min-height: 90px;
    //max-height: 300px;
    grid-area: 1 /1 /3 /-1;
    padding-top: 60%;
    position: relative;
    
    
    @media screen and (min-width: 750px) and (max-width: 1111px){
        width: 100%;
        height: 100%;

        grid-area: picture;
        
        padding:0;
        
        align-self: center;
        justify-self: center;
        //border: 5px solid white;

    }
`;

const StoryImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;


`;


const StoryImageOverlayWrapper = styled.div`

    grid-area: 1 /1 /3 /-1;
    width: 100%;
    height: 0px;
    padding-top: 60%;
    
    position: relative;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#ffffff+0,ffffff+100&0+67,1+100 */
    background: -moz-linear-gradient(top,  rgba(255,255,255,0) 0%, rgba(255,255,255,0) 67%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,0) 67%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,0) 67%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
    
    
    
    @media screen and (min-width: 750px) and (max-width: 1111px){


        display: none;
    }
    
`;

const StoryImageOverlay = styled.div`

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

`;




const LeftWrapper = styled.div`


    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;

`;

const StoryInfoWrapper = styled.div`

    

    

    
    grid-area: grayArea;
    text-align: start;

    display: flex;
    justify-content: space-between;
    align-items: center;

    


`;

const StoryShareButtons = styled.div`

    
    display: flex;
    justify-content: space-between;

    


`;




const StoryTags = styled.div`

    font-size: .7rem;
    width: 80px;
    height: 23px;
    border-radius: 4px;
    background-color: orange;
    opacity: .9;

    grid-area: grayArea;
    justify-self: center;

    @media screen and (min-width: 750px) and (max-width: 1111px){


        display: none;
    }
    
    


`;


const Tag = styled.h3`

    font-weight: 900;
    color: black;
    margin: 0px;
    text-align: center;
    line-height: 23px;
    font-size: .9rem;
    //padding: 5px 10px;

    @media screen and (min-width: 750px) and (max-width: 1111px){


        display: none;
    }
  
    

`;


const StoryBody = styled.div`

    
    //font-weight: 700;
    grid-area: body;
    //margin: 0px;
    //padding: 5px 9px 0px 9px;
    //text-align: center;
    //line-height: 1.2em;
    //margin-bottom: 15px;

    h1{
        font-weight: 700;
        padding: 0px 15px 0px 15px;
        text-align: center;
        line-height: 1.2em;
        margin-bottom: 15px;
    }
    
    @media screen and (min-width: 750px) and (max-width: 1111px){

        //margin: 0;
        //padding: 5px 10px 0px 10px;
        //font-size: 1rem;
        //text-align: left;
        //justify-self: start;
        
        h1{
            margin: 0;
            padding: 5px 10px 0px 10px;
            
            
    }

    }

    

`;


const StoryInfo = styled.h3`

    
    margin: 0px;
    padding: 0px;
    font-size: .9rem;
    
    
    color: #818080;
    grid-area: "time";
    justify-self: center;

    @media screen and (min-width: 750px) and (max-width: 1111px){


        justify-self: end;
        align-self: flex-end;
        //font-size: .9rem;
        padding: 0px 10px 0px 0px;
    }

`;

  
  

function Story(props){

    const { fontSize, ref } = useFitText();
    
    
    return (

        <LinkWrapper 
        
        
            to={{
                pathname: "/blog/" + slugify(props.info.title),
                
                //state: { 
                //    body: props.info.body,
                //    created_at: props.info.created_at,
                //    date: props.info.date,
                //    keywords: props.info.keywords,
                //    title: props.info.title,
                //    topic: props.info.topic,
                //    image_url: props.info.url,
                //    appState: props.appState
                //    //handleLogOutClick: props.handleLogOutClick

                
                //}
            }}
            
        >
            <StorySection>
                
                <StoryImageWrapper>
                    <StoryImage src={props.info ? props.info.url : null}  />
                </StoryImageWrapper>
                
                
                <StoryImageOverlayWrapper>
                    <StoryImageOverlay/>
                </StoryImageOverlayWrapper>
                    
                
                
                
                
                
                    
                {/*}
                <StoryShareButtons>
                    <FacebookShareButton children={<FacebookIcon size={25} round={false} borderRadius={17} />} url={"www.420.com"} style={{marginRight: "3px"}} />
                    <TwitterShareButton children={<TwitterIcon size={25} round={false} borderRadius={17}/>} url={"www.420.com"} style={{marginRight: "3px"}}/>
                    <WhatsappShareButton children={<WhatsappIcon size={25} round={false} borderRadius={17}/>} url={"www.420.com"} />
                </StoryShareButtons>
                */}
                
                <StoryTags>
                    <Tag>
                        {props.info ? props.info.topic : null}
                    </Tag>
                </StoryTags>
                
                
                
                <StoryBody ref={ref} style={{ fontSize, height: 70 }}>

                    
                    
                        <h1>{props.info ? props.info.title :  null }</h1>
                    

                </StoryBody>
                

                

                <StoryInfo>

                    {props.info ? props.info.date : "nada"}
                    
                </StoryInfo>

                
                
                
                
                

                </StorySection>
       </LinkWrapper>
    );
}


export default props => <Story {...props} />;