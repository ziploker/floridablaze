import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NewForm from '../packs/form.jsx'




function Admin(props){
    
    
    
    return (

        <div style={{marginTop: "50px"}}>
            
           
           <NewForm/>
           
           {props.loggedInStatus}

        </div>
        
    );
}


export default props => <Admin {...props} />;