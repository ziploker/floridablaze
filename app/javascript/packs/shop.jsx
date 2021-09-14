import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import styled from 'styled-components'

const ShopWrapper = styled.div`

    display: grid;
    min-height: 75vh;
    width: 100vw;
    //background: pink;

    

`;


function Shop(props) {

   
    console.log("SHOP_________________PROPS", location.pathname)
    //console.log("HEADER_PROPS solo", location.pathname)

    

    
      
    return (
        
        <ShopWrapper>

            {/* <h1 style={{
                justifySelf: "center",
                alignSelf: "center"


            }}></h1> */}

        </ShopWrapper>
    )
}





export default Shop;
