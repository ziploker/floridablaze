import React from 'react';
import styled, { ThemeProvider } from 'styled-components'


const ProgressBarWrapper = styled.div`

    position: absolute;
    left: 0;
    right: 0;
    bottom: 100px;
    margin: 0 auto;
    width: 200px;
    justify-self: center;
    align-self: center;
    display: grid;
    justify-content: center;

    grid-template-rows: 10px;
    grid-template-columns: 10px 5px 10px 5px 10px;
    grid-template-areas:
        "circle1     .   circle2    .    circle3";

    @media screen and (min-width: 500px){

        bottom: 60px;
        


    }
`;

const Circle1 = styled.div`
    grid-area: circle1;
    border-radius: 50%;
    background-color: ${props => props.slideCount == 0 ? "white" : "transparent"};
    border: 2px solid white;
    width: 100%;
    height: 100%;
    transition: background-color 0.5s ease;
`;
const Circle2= styled.div`
    grid-area: circle2;
    border-radius: 50%;
    background-color: ${props => props.slideCount == 1 ? "white" : "transparent"};
    border: 2px solid white;
    width: 100%;
    height: 100%;
    transition: background-color 0.5s ease;
`;
const Circle3 = styled.div`
    grid-area: circle3;
    border-radius: 50%;
    background-color: ${props => props.slideCount == 2 ? "white" : "transparent"};
    border: 2px solid white; 
    width: 100%;
    height: 100%;
    transition: background-color 0.5s ease;

`;

const Bar1 = styled.div`
    grid-area: bar1;
    //height: 5px;
    background: white;
`;

const Bar2 = styled.div`
    grid-area: bar2;
    background: white;
    //height: 5px;
`;



function ProgressBar(props){

   
    
    
    
    
    

    
    return (
        
        
        <ProgressBarWrapper>

            
            <Circle1 slideCount={props.slideCount}>

            </Circle1>

            <Bar1>

            </Bar1>

            <Circle2 slideCount={props.slideCount}>
                
            </Circle2>

            <Bar2>

            </Bar2>

            <Circle3 slideCount={props.slideCount}>
                
            </Circle3>



        </ProgressBarWrapper>
        
        
        
    );  
}


export default ProgressBar;