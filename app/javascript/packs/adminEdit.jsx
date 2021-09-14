import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import EditForm from '../packs/formEdit'



function AdminEdit(props){
    
    
    
    return (

        <div style={{marginTop: "50px"}}>
            
           
           <EditForm data={props.story2edit} />

          
            {props.loggedInStatus}
            {props.story2edit.id}
            <br/>
            <a href={"/blog/" + props.story2edit.slug}> go2Story </a>
        
        </div>
        
        
        
    ); 
}


export default props => <AdminEdit {...props} />;