import React, {useEffect, useState, useRef, usePrevious} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import {useLocation} from "react-router-dom";


// import TimeAgo from 'javascript-time-ago'
// TimeAgo.addDefaultLocale(en)
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en'
import CommentForm from './commentForm'
//import CommentReplyForm from './commentReplyForm'
import CommentReplyForm from './commentReplyForm'
import defaultAvatar from '../../assets/images/man3'

//import './article.styled.scss' 

//import '../../assets/stylesheets/article_styled.scss'

import Comments from './comments.jsx'


//import LookupSection from './lookupSection.jsx'

import {
    
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
  
} from "react-share";



import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



const ArticleSection = styled.div`


    
    
    /* display: grid;
    
    grid-template-columns: minmax(200px, 700px);
   
    justify-content: center;
    justify-items: center;
    margin: 50px auto 0px auto; */

    
    display: grid;
    grid-template-columns: minmax(651px, 1100px) 300px;
    justify-content: center;
    margin-top: 20px;
    margin-left: 14px;
    margin-right: 14px;
    grid-column-gap: 28px;

    @media only screen and (max-width: 600px){

        grid-template-columns: 1fr;


    }
        

        
    
`;






const NewsWrapper = styled.div`

    display: grid;
    grid-template-columns: 100%;
    justify-content: center;
    position: relative;
    grid-area: 2/1/3/2;
    max-width: 770px;

    grid-template-areas:

        
        "info"
        
        "image"
        
        "body"
        "comments";

`;

const StoryTitleWrapper = styled.div`

    grid-area: 1/1/2/3;
    margin: 16px;
    justify-self: start;


`;

const StoryTitle = styled.h1`

    color: #303030;
   
    font-size: 60px;
    font-weight: 700;
    line-height: 1.2em;


    color: #111111;
    
    @media only screen and (max-width: 800px){

        font-size: 50px;


    }
    @media only screen and (max-width: 600px){

        font-size: 30px;


    }




`;

const InfoBar = styled.div`


    display: grid;
    overflow: hidden;
    grid-area: 4/1/5/2;
    grid-template-columns: minmax(0px, min-content) 1fr minmax(0px, min-content);
    grid-auto-rows: 1fr minmax(0px, min-content);
    grid-template-areas:

        "flexbox    flexbox    social "
        "flexbox    flexbox    social ";

    margin-top: 25px;
    align-content: center;
    padding: 0px 20px;

    @media only screen and (max-width: 420px){


        grid-template-columns: minmax(100px, min-content) ;
        grid-auto-rows: 1fr 1fr;
        margin-top: 0px;
        grid-template-areas:

        "social social "
        "flexbox flexbox ";


    }

    

`;

const FlexBar = styled.div`
    display: flex;
    grid-area: flexbox;
    align-items: center;

    @media only screen and (max-width: 420px){

        justify-content: start;
        margin-top: 8px;

    }
    


`;

const StoryImageWrapper = styled.div`

    width:100%;
    height: 0px;
    //min-height: 90px;
    //max-height: 300px;
    
    padding-top: 60%;
    position: relative;
    
    
    
    grid-area: 2/1/3/2;
    
    
    
`;



const StoryImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;


`;

const Caption = styled.div`

    font-size: 13px;
    line-height: 1.7;
    font-style: italic;
    color: #999999;
    padding: 12px;
    margin: 0 20px;
    border-bottom: 1px solid #c0c0c0;
    grid-area: 3/1/4/2;

`;
const StoryShareButtons = styled.div`

    
    display: flex;
    justify-content: end;
    grid-area: social;
    align-self: center;

    @media only screen and (max-width: 420px){

        //justify-self: center;

    }

    button{

        width: 25px;
        height: 25px;
        margin-bottom: 3px;
    }
    


`;

const PWrapper = styled.div`

    //font-size: .9em;
    line-height: 1.9em;
    grid-area: 5/1/6/2;
    //text-indent: 45px;
    margin-top: 16px;
    padding: 0px 20px;
    font-family: 'IBM Plex Serif', serif;

    p{

        margin-bottom: 20px;
    }


`;

const Loading = styled.div`

    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    
    h1{
        margin:0 auto;
        line-height:100vh;
        vertical-align:middle;

    }

`;

// const Comments = styled.div`


//     grid-area: 6/1/7/2;

   


// `;








const BorderDiv = styled.div`


        
        

    position: absolute;
    border-left: 1px solid gray;

    height: calc(100% - 34px);
    width: 100%;

    margin-left: 12px;

    bottom: 0px;
    pointer-events: none;



`;








const CommentReply = styled.div`



`;

const CommentBody = styled.p`
    overflow-wrap: break-word;
    word-wrap: break-word;

    -ms-word-break: break-all;

    word-break: break-word;
    padding-left: 35px;



`;

const AuthorAvartar = styled.img`

    width: 40px;
    height: 40px;
    align-self: end;
    grid-area: image; 
    border: 1px solid gray;
    border-radius: 50%;
    margin-right: 8px;

    

`;

const AvatarTest = styled.img`

    display: none;

`;

const Reply = styled.div`
    //grid-area: reply;
    color: rgba(7, 7, 7, 0.65);
    cursor: pointer;
    padding: 8px 8px 8px 0px;
    font-size: 14px;

    &:hover{

        color: black;
    }

`;

const TopBarWrapper = styled.div`

    display: flex;
    position: relative;
    z-index: -1;

`;

const BottomBarWrapper = styled.div`

    grid-area: bottomBar;
    display: flex;
    flex-direction: row;
    padding-left: 35px;
`;

const VoteUp = styled.div`
    
    cursor: pointer;
    padding: 8px;

    &:hover{

        background-color: #e5f4fb;
    }

    svg{
        width: 16px;
        height: 15px;
        margin-right: 4px;
    }

    span{

        font-size: 13px;
    }
`;


const VoteDown = styled.div`
    
    cursor: pointer;
    padding: 8px;

    &:hover{

        background-color: #e5f4fb;
    }

    svg{
        width: 16px;
        height: 15px;
        margin-right: 4px;
    }

    span{

        font-size: 13px;
    }
`;




function Article(props){

    let artData
    
    console.log("==============Article===============")
    console.log("==============Article Props===============", props)

    if (props.location.art && props.location.art != null){
        artData = props.location.art
        console.log("artData set via props.location.art - link via home page")

    }else if (props.artData && props.artData != null){

        artData = props.artData
        console.log("artData set via props.artData - direct link to article - sparks#index")
    }
    
    

    
    // if (props.location){

    //     let dater = useLocation()
    //     console.log("dater", dater); //state would be in data.state//

    //     artData = dater.art

    // }else if (props.artData){
        
    //     artData = props.artData

    // }

    
    
   

    //const artData = typeof dater.art == 'undefined' ? "empty" : dater.art

   

    //console.log("is artData good?", JSON.stringify(artData))

    
    //const [userData, setUserData] = useState({});
    //const [isArtLoading, setIsArtLoading] = useState(true);
    //const [artData, setArtData] = useState({})

    //const [artDataComments, setArtDataComments] = useState([])
    //const [avatarLoaded, setAvatarLoaded] = useState(false)
    //const [rows, setRows] = useState({})
    //const [showMore, setShowMore] = useState({})
    
    //const showMoreButtonRefs = useRef([])
    //showMoreButtonRefs.current = []

    
    

    //const [isCommentsLoading, setIsCommentsLoading] = useState(true);

    let obj = {};


    //const usersFromController = props.users;
    //const articleFromController = props.article;
    //const commentsFromController = props.comments;
    //const slug = props.match.params.id
    

    const slug = props.match ?  props.match.params.id : props.d.slug

    // artData == "empty" ?
        
    //     useEffect (() => {


    //         console.log("==============Article useEffect===============")

    //         const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://www.floiridablaze.io"
    //         console.log(artData == "empty" ? "artData is empty" : "artData is fuLL")
        
        
       

    //         axios.post("/blog/get_article_info", {
            
    //         data: { 
    //             slug: slug
                
    //         }
    //         },
    //         {withCredentials: true})
    //         .then(response => {


    //             //console.log("resoooooooooooooooonse = " + response.inspect)
            
    //                 //addAllCommentsToStateForReplyButtonToWork(response.data.comments)
    //                 //addAllCommentsToStateForShowMoreButtonToWork(response.data.comments)

                
                    
    //                 setArtData(response.data.article)
    //                 //setArtDataComments(response.data.comments)
                    
    //                 setIsArtLoading(false)
                
    //                 //setIsCommentsLoading(false)

    //                 //setCurrentUser(@current_user)
                
                

                
                
    //         }).catch(error => {
            
    //         //console.log("articleErrors", error)
    //         })
    //     },[])

    //     :

    //     null
    // // //const prevRows = usePrevious(rows)


    // let editLink = null;
    
    // if(userData && userData.isAdmin)
    // {
    //     editLink = <a href={`/ziploker/edit/${artData.id}`}>edit</a>;
    // }

    //console.log("Article_PROPS", props)
    
    

    


    

    
            


    
    const returnFirstItemOfArray = (id) => {

        
        //console.log("returnFirstItemOfArrayxxxxreturnFirstItemOfArray is = " + id);
        //console.log("LengthnnnLengthnnnLengthnnnLength is = " + id.length.toString());
        
        if (id.length > 0){
            //console.log("LengthnnnLengthnnnLengthnnnLength is = " + id[0].toString());
            return id[0]
        }

       
       

       

        
        
    }



    const getReplyArray = (childrenCommentArray) => {

        let tempArray = []

        childrenCommentArray.map( (x, i) => {
                            
                        
            x.id

            tempArray.push(x.id + ", ")
            

      
        })

        return tempArray

        //console.log("getReplyArraydfdfdfdfdfdfdfgetReplyArray = " + JSON.stringify(childrenCommentArray, null, 4))


          
      
      
      
    


    }
    



    

    function addAllCommentsToStateForReplyButtonToWork(c) {


        //{console.log("the addAllCommentsToStateForReplyButtonToWork Object about to be mapped is " + JSON.stringify(c, null, 4))}
        

        
       
        let newArray = [];
        let newState = {}

        function getAllId(arr, key) {
            
            //console.log("================ in getAllId =======================")
            // console.log("array = " + JSON.stringify(arr, null, 4))
            // console.log("key = " + JSON.stringify(key, null, 4))
            
            arr.forEach(function(item) {
                
                //console.log("================ in arr.forEach =======================")
                // console.log("item = " + JSON.stringify(item, null, 4))
                // console.log("key = " + JSON.stringify(key, null, 4))
                
                for (let keys in item) {
                    
                    //console.log("================ in for loop =======================")
                    // console.log("keys = " + JSON.stringify(keys, null, 4))
                    // console.log("key = " + JSON.stringify(key, null, 4))
                    // console.log("item = " + JSON.stringify(item, null, 4))


                    if (keys === key) {
                        newArray.push(item[key])
                    } else if (Array.isArray(item[keys])) {
                        getAllId(item[keys], key)
                    }
                }

            })

            //console.log("================ OUT getAllId =======================")
        }
        
        getAllId(c, 'id')
        //console.log(newArray)

        
        newArray.forEach(function(item) {

            //console.log("xxxitemx = " + item)
            
            
            newState[item] = "false"

            


        })




        //console.log("newState = " + JSON.stringify(newState, null, 4))

        setRows(newState);

    }  



    function addAllCommentsToStateForShowMoreButtonToWork(c) {


        //{console.log("the addAllCommentsToStateForReplyButtonToWork Object about to be mapped is " + JSON.stringify(c, null, 4))}
        

        
       
        let newArray = [];
        let newState = {}

        function getAllId(arr, key) {
            
            //console.log("================ in getAllId =======================")
            // console.log("array = " + JSON.stringify(arr, null, 4))
            // console.log("key = " + JSON.stringify(key, null, 4))
            
            arr.forEach(function(item) {
                
                //console.log("================ in arr.forEach =======================")
                // console.log("item = " + JSON.stringify(item, null, 4))
                // console.log("key = " + JSON.stringify(key, null, 4))
                
                for (let keys in item) {
                    
                    //console.log("================ in for loop =======================")
                    // console.log("keys = " + JSON.stringify(keys, null, 4))
                    // console.log("key = " + JSON.stringify(key, null, 4))
                    // console.log("item = " + JSON.stringify(item, null, 4))


                    if (keys === key) {
                        newArray.push(item[key])
                    } else if (Array.isArray(item[keys])) {
                        getAllId(item[keys], key)
                    }
                }

            })

            //console.log("================ OUT getAllId =======================")
        }
        
        getAllId(c, 'id')
        //console.log(newArray)

        
        newArray.forEach(function(item) {

            //console.log("xxxitemx = " + item)
            
            
            newState[item] = "NO_SHRINK"

            


        })




        //console.log("newState = " + JSON.stringify(newState, null, 4))

        //setShowMore(newState);

        //console.log("right before saving ref", newState)
        //console.log(typeof newState)
        //showMoreButtonRefs.current.push(newState) 
        //console.log("right after saving ref", showMoreButtonRefs)


    }

    


    
    
    
    
    
    
    
    // /////////////////////////  do not load page until info lodes from server /////////////
    // if (isArtLoading) {
        
    //     return <Loading> <h1>Loading......</h1> </Loading>;
    // }



        
    
    return (
    
        <>

            {/* <AvatarTest src={artData.author_avatar}
                onLoad={() => setAvatarLoaded(true)}></AvatarTest> */}
            
            <ArticleSection>
                
            
                <StoryTitleWrapper>
                    <StoryTitle>{artData.title}</StoryTitle>
                </StoryTitleWrapper>

                <Caption>
                    {artData.caption}
                </Caption>
                
                
                
                <InfoBar>

                    <FlexBar>
                        {/* <AuthorAvartar src={avatarLoaded ? artData.author_avatar : defaultAvatar } /> */}
                        <AuthorAvartar src={artData.author_avatar } />

                        <h4 style={{fontSize: ".7rem", lineHeight: "normal"}}>by FloridaBlaze</h4>
                        <div style={{margin: "0px 5px"}}>|</div>
                        <h4 style={{fontFamily: "serif", color: "#777777", fontSize: ".7rem", lineHeight: "normal", marginRight: "8px"}}>{artData.date}</h4>
                    </FlexBar>
                    
                    <StoryShareButtons>
                        <FacebookShareButton children={<FacebookIcon size={25} round={false} borderRadius={17} />} url={"www.420.com"} style={{marginRight: "3px"}} />
                        <TwitterShareButton children={<TwitterIcon size={25} round={false} borderRadius={17}/>} url={"www.420.com"} style={{marginRight: "3px"}}/>
                        <WhatsappShareButton children={<WhatsappIcon size={25} round={false} borderRadius={17}/>} url={"www.420.com"} />
                    </StoryShareButtons>
                    
                    
                </InfoBar>

                    
                    
                <StoryImageWrapper>
                
                    <StoryImage src={artData.url}/>
                
                </StoryImageWrapper>
                
                    
                    

                <PWrapper dangerouslySetInnerHTML={{ __html: artData.body }}></PWrapper>

                    
                    
                {/* <CommentFormWrapper>

                    <CommentForm addAllCommentsToStateForReplyButtonToWork={addAllCommentsToStateForReplyButtonToWork} userState={props.userState} storyID={artData.id} setIsCommentsLoading={setIsCommentsLoading}/>

                </CommentFormWrapper> */}

    


                
            </ArticleSection>
           

            {/* {isCommentsLoading ? 
                   
                   <h1>comments loading==============================</h1>
               
               
               : */}

                   <Comments 
                   //showMoreButtonRefs={showMoreButtonRefs}
                    //artDataComments={artDataComments} 
                    //showMore={showMore}
                    //setShowMore={setShowMore}
                    userState={props.userState}
                    artData={artData}
                    //setArtDataComments={setArtDataComments}
                    //rows={rows}
                    //setRows={setRows}
                    slug={slug}


                    
                    
                    
                    
                    />
                    
               {/* } */}
        </>
    );
}


export default Article;


