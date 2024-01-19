import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';
// import man from '../../assets/images/man.png'
// import elephant from '../../assets/images/elephant.png'
// import donkey from '../../assets/images/donkey.png'
// import star from '../../assets/images/star.png'
// import useFitText from "use-fit-text";



const ResultCardWrapper = styled.div`
  background-color: transparent;
  grid-area: cardOne;
  justify-content: center;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;
  min-width: 140px;
  
  max-height: ${ props => props.showCards.toString() == "false" ? "0px" : "100%"};
  opacity: ${ props => props.showCards.toString() == "false" ? "0" : "1"};
  transition: opacity .4s;
  transition-timing-function: ease-out;
  


`;

const Card = styled.div`

  --borderWidth: 6px;
  

  border-top: var(--borderWidth) solid #0E2021;
  border-left: var(--borderWidth) solid #0E2021;
  border-bottom: var(--borderWidth) solid #0E2021;
  border-right: var(--borderWidth) solid #0E2021;
  position: relative;
  
  width: 100%;
  height:100%;
  
  display: grid;
  grid-template-columns: 5px minmax(10px, min-content) 1fr 5px;
  grid-template-rows: 5px 25px 5px 1fr;
  //grid-column-gap: 5px;
  grid-template-areas:
    " .   .     .    ."
    " . logo  title  ."
    " .  .      .    ."
    " . bottomHalf bottomHalf .";



`;

const TopBar = styled.div`
  grid-area: logo;
  justify-self: center;
  align-self: center;
  width: 25px;
  height:25px;
  border-radius: 50%;
  z-index:1;
  background: ${props => props.theme.offWhite};
  margin: 0px 10px;

`;

const BottomBar = styled.div`
  position: absolute;
  bottom: 0px;
  left: 3px;
  right: 3px;
  z-index: 0;
  //width: 100%;
  //opacity: .7;
  transform: skew(-15deg);
  background: rgba(14, 32, 33, 0.7);
  border: 1px solid ${props => props.theme.offWhite};
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 40px 1fr;
  grid-row-gap: 5px;
  padding: 3px;

  grid-template-areas:
    "name name";

`;

const Logo = styled.img`

  width: 15px; 
  height: 15px; 
  grid-area: logo;
  z-index:2;
  align-self: center;
  justify-self: center;



`;

const Title = styled.h6`

   
  //max-width: 140px;
  justify-self: start;
  align-self: center;
  margin: 0;
  color: white;
  font-size: .8rem;
  grid-area: title;
  z-index: 1;
  

`;

const Dimmer = styled.div`
  background: rgba(14, 32, 33, 0.7);
  z-index: 1;
  grid-area: 1/1/4/7;
  
`;


function ResultCardOne(props){

  //const { fontSize, ref } = useFitText({maxFontSize: 90, minFontSize: 50});

  return (
    
    <ResultCardWrapper showCards={props.showCards} results={props.results}>
      
      <Card>
        
        <Dimmer/>

        <TopBar/>
            

{/*         
          <Logo src={props.results.one.party ? props.results.one.party === "Democrat" ? donkey : elephant : star}></Logo>
         */}
          <Title >{props.results.one.chamber ? props.results.one.chamber === "Senate" ? "Senator": "Representative" : ""}</Title>

{/*         
        <img src={props.results.one.image ? props.results.one.image : man} style={{width: "100%", height: "100%", gridArea: "1/1/7/7"}}/>
         */}
        <BottomBar>

        
          
        

        
        <h6 style={{width: "100%", gridArea: "name", margin: "0", color: "white", padding: "5px", lineHeight: "90%"}}>{props.results.one.name ? props.results.one.name : ""} </h6>
        


      



      </BottomBar>




      </Card>
      
      
      
      
      
      
      
      
      
      
    </ResultCardWrapper>

/*
<h3 style={{margin: "0"}}>{props.results.one.chamber ? props.results.one.chamber === "Senate" ? "Senator": "Representative" : ""}</h3>
<h2 style={{margin: "0", textAlign: "center"}}>{props.results.one.name ? props.results.one.name : ""} {props.results.one.party ? props.results.one.party === "Democrat" ? "(D)" : "(R)" : ""}</h2>

<img src={props.results.one.image ? props.results.one.image : man} style={{width: "143px", height: "200px", borderRadius: "15px", marginBottom: "15px", focus: "blur(1.7rem)"}}/>
<h4>{props.results.one.fullDistrictTrunk ? props.results.one.fullDistrictTrunk : ""} </h4>

<h3 style={{margin: "0"}}>{props.results.one.district ? "District " + props.results.one.district   : ""}</h3>
*/

  )
    
}


export default props => <ResultCardOne {...props} />;