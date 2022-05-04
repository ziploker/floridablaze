import styled from 'styled-components';

const Card = styled.div`

  @media only screen and (max-width: 720px){

    grid-area: 2/1/3/4;
    margin: 25px 0px 0px 0px;
    
    //width: 100%;


  }
  position: relative;
  grid-area: 1/3/2/4;
  box-sizing: border-box;
  max-width: 600px;
  width: 99vw;
  margin-left: 20px;
  //padding: 0 2rem;
  
  //margin-top: 100px;
  padding: 40px 0px 0px 0px;

  background-color: #fff;
  border: 1px solid transparent;
  
  box-shadow: 0 1px 1px rgba(0,0,0,0.05);
  border-radius: 8px;

  justify-self: start;
  align-self: center;
`;

const H2 = styled.h2`

  margin: 0 20px;
  line-height: 1.5;
  font-size: 24px;
       

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* padding: 0 20px 0px 20px; */
  box-sizing: border-box;

  /* @media only screen and (max-width: 1111px){
    padding: 0 20px 0px 8px;


  } */
`;

const FormItem = styled.div`

  position: relative;
  margin: 0 0 38px 0;
  padding: 0;

  



`;

const FormItemSqueeze = styled.div`

  position: relative;
  margin: 0 0 30px 0;
  padding: 0;

  



`;


const FormItemEmail = styled.div`

  position: relative;
  margin: 0 0 38px 0;
  padding: 20px;



`;

const Label = styled.label`

  //height: 100%;
  //line-height: 44px;
  
  color: #62748e;
  
  font-weight: bold;
  


  display: inline-block;
  position:absolute;
  top: -11px;
  left: 42px;
  //border-top: 1px solid #cbcbd2;
  //border-left: 1px solid #cbcbd2;
  //border-right: 1px solid #cbcbd2;
  transition: all 150ms ease-in;
  //color: #9FA5C4;
  pointer-events: none;

  
  
  
  //transform: ${props => props.className == "field-active" ? "translateY(-22px)" : 0};
  transform: translateY(-11px);
  padding: 2px 2px;
  //background-color: white;
  border-radius: 5px;

  font-size: .7em;
  
  text-shadow: 1px 0 0 #fff, -1px 0 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff, 0 1px 0 #fff, 0 -1px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff;
          
              

`;
const EmailLabel = styled(Label)`

  left: 48px;

`;

const Input = styled.input`
  padding: 1rem;
  box-sizing: border-box;
  margin: 0px;
  width: 100%;
  height: 44px;
  padding-left: 20px;
  box-shadow: inset 0 1px 2px rgba(203,203,210,0.4);

  padding-right: 8px;

  font-size: 14px;
  line-height: 1.42857;
  color: #3f3f44;
  background-color: #fff;
  background-image: none;
  border: 1px solid #cbcbd2;
  border-radius: 4px;
  
  filter: none;
  
  
`;

const Button = styled.button`
  
  border-color: ${props => props.isBtnDisabled ? "#cccccc" : "#3f4eae"} ;
  border-radius: 3px;
  padding: 1rem;
  color: white;
  font-weight: 700;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  
  cursor: pointer;



  background: linear-gradient(to bottom, #5FCC61, #318e33);
  /* border-color: ${props => props.isBtnDisabled ? "#cccccc" : "#3f4eae"} ;*/
  
  
  
  
  
 

  
  border-color: #5FCC61;
  
`;

const Logo = styled.img`
  width: 51px;
  height: 51px;
  
  //margin: 0 0 40px;
  justify-self: center;
`;

const ErrorWrapper = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px 0px 0px;
  line-height: .7em;
  height: 20px;


`;
const ErrorMsg = styled.h4`
  
  font-size: .5em;
  padding: 5px 12px;
  
`;

const XorCheckIcon = styled.img`

  display: ${props => props.status == "" ? "none" : "initial"};
  height: 15px;


`;
const LoginWrapper = styled.div`

  @media only screen and (max-width: 720px){

    grid-template-columns: minmax(20px, 1fr) 1fr minmax(20px, 1fr);
    min-width: 100%;
    //padding-left: 20px;
    //justify-self: center;


  }
  position: relative;
  height: 100%;
  background-color: RGB(244, 244, 244);
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

const LogoWrapper = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 10px 15px;
  margin-bottom: 30px;
  

`;

const InputIcon = styled.div`

position: absolute;
bottom: 13px;
margin-top: -9px;
left: 12px;
width: 18px;
height: 18px;

&::after{

  content: '';
  position: absolute;
  right: -11px;
  top: -10px;
  bottom: -10px;
  width: 1px;
  opacity: .5;
  background-color: rgba(212,212,212,0);
  background-image: linear-gradient(to top,rgba(212,212,212,0) 0,#d4d4d4 30%,#d4d4d4 70%,rgba(212,212,212,0) 100%);
}
  
`;

export { Form, Input, Button, Logo, Card, XorCheckIcon, LoginWrapper, 
  InputIcon, LogoWrapper, H2, FormItem, FormItemSqueeze, Label, EmailLabel, ErrorMsg, ErrorWrapper };