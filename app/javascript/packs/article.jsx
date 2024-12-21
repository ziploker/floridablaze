import React, { useEffect, useState, useRef, usePrevious } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useMatch, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
//import { useLocation } from "react-router-dom";

// import TimeAgo from 'javascript-time-ago'
// TimeAgo.addDefaultLocale(en)
import ReactTimeAgo from "react-time-ago";
//import en from "javascript-time-ago/locale/en";
import CommentForm from "./commentForm";
//import CommentReplyForm from './commentReplyForm'  const query = useQuery({ queryKey:
import CommentReplyForm from "./commentReplyForm";
import defaultAvatar from "../../assets/images/man3.png";

//import './article.styled.scss'

//import '../../assets/stylesheets/article_styled.scss'

import Comments from "./comments.jsx";

//import LookupSection from './lookupSection.jsx'

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const ArticleSection = styled.div`
  /* display: grid;
    
    grid-template-columns: minmax(200px, 700px);
   
    justify-content: center;
    justify-items: center;
    margin: 50px auto 0px auto; */

  display: grid;
  grid-template-columns: minmax(555px, 730px) 300px;
  justify-content: center;
  margin: 20px 14px 0px 14px;
  grid-column-gap: 28px;

  @media only screen and (max-width: 900px) {
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
  grid-area: 1/1/2/2;
  //margin: 16px;
  padding-bottom: 15px;
  justify-self: start;
`;

const StoryTitle = styled.h1`
  color: #303030;

  // font-size: 50px;
  font-weight: 700;
  line-height: 1.1em;
  //letter-spacing: -2px;

  color: #111111;

  /* @media only screen and (max-width: 800px){

        // font-size: 50px;


    }

    */
  @media only screen and (max-width: 300px) {
    font-size: 1rem;
  }
`;

const InfoBar = styled.div`
  display: grid;
  overflow: hidden;
  grid-area: 4/1/5/2;
  /* grid-template-columns: minmax(0px, min-content) 1fr minmax(0px, min-content);
	grid-auto-rows: 1fr minmax(0px, min-content); */

  grid-template-columns: 1fr min-content;
  grid-template-areas: "flexbox    social ";

  margin-top: 25px;
  align-content: center;
  //padding: 0px 20px;

  @media only screen and (max-width: 420px) {
    grid-template-columns: minmax(100px, min-content);
    grid-auto-rows: 1fr 1fr;
    margin-top: 0px;
    grid-template-areas:
      "social social "
      "flexbox flexbox ";
  }
`;

const FlexBar = styled.div`
  display: grid;
  grid-area: flexbox;
  align-items: center;

  grid-template-columns: 40px max-content min-content 1fr;

  @media only screen and (max-width: 420px) {
    justify-content: start;
    margin-top: 8px;
  }
  @media only screen and (max-width: 265px) {
    grid-template-columns: 40px max-content 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const ArticleDate = styled.h4`
  font-family: serif;
  color: #777777;
  font-size: 0.7rem;
  line-height: normal;
  margin-right: 8px;

  @media only screen and (max-width: 265px) {
    grid-area: 2/2/3/-1;
    margin-left: 10px;
  }
`;

const ArticleSpacer = styled.div`
  margin: 0px 3px;

  @media only screen and (max-width: 265px) {
    display: none;
  }
`;

const StoryImageWrapper = styled.div`
  width: 100%;
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
  // font-size: 13px;
  line-height: 1.7;
  font-style: italic;
  color: #999999;
  padding: 5px 0 0 0;
  //margin: 0 20px;
  border-bottom: 1px solid #c0c0c0;
  grid-area: 3/1/4/2;
`;
const StoryShareButtons = styled.div`
  display: flex;
  justify-content: end;
  grid-area: social;
  align-self: center;

  @media only screen and (max-width: 420px) {
    //justify-self: center;
  }

  button {
    width: 25px;
    height: 25px;
    margin-bottom: 3px;
  }
`;

const PWrapper = styled.div`
  //// font-size: .9rem;
  line-height: 1.9em;
  grid-area: 5/1/6/2;
  //text-indent: 45px;
  margin-top: 50px;
  //padding: 0px 20px;

  h1 {
    margin: 20px 0;
  }

  h2 {
    margin-bottom: 25px;
  }

  p {
    margin: 20px 0 40px 0;
  }

  @media only screen and (max-width: 250px) {
    h2 {
      font-size: 1rem;
    }
    p {
      font-size: 0.7rem;
    }
  }
`;

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    margin: 0 auto;
    line-height: 100vh;
    vertical-align: middle;
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

const CommentReply = styled.div``;

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
  //grid-area: image;
  border: 1px solid gray;
  border-radius: 50%;
  margin-right: 8px;
`;

const Reply = styled.div`
  //grid-area: reply;
  color: rgba(7, 7, 7, 0.65);
  cursor: pointer;
  padding: 8px 8px 8px 0px;
  // font-size: 14px;

  &:hover {
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

  &:hover {
    background-color: #e5f4fb;
  }

  svg {
    width: 16px;
    height: 15px;
    margin-right: 4px;
  }

  span {
    // font-size: 13px;
  }
`;

const VoteDown = styled.div`
  cursor: pointer;
  padding: 8px;

  &:hover {
    background-color: #e5f4fb;
  }

  svg {
    width: 16px;
    height: 15px;
    margin-right: 4px;
  }

  span {
    // font-size: 13px;
  }
`;

const SideAds = styled.div`
  border: 10px solid white;
  background-color: pink;
  opacity: 0.45;

  grid-area: 1/2/7/3;

  width: 100%;
  height: 100%;

  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

function Article({ userState }) {
  const params = useParams();

  const { data: storyFromRails, isLoading } = useQuery({
    queryFn: () =>
      axios.get(`${params.id}/get_story_info_v2`).then((res) => res.data.story),
    queryKey: ["story"],
  });

  if (isLoading) {
    return (
      <Loading>
        {" "}
        <h1>Loading......</h1>{" "}
      </Loading>
    );
  }

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${storyFromRails.slug}`,
    },
    description: `${storyFromRails.description}`,
    image: [`${storyFromRails.urls[0]}`],
    inLanguage: "en-US",

    dateCreated: `${storyFromRails.created_at}`,
    dateModified: `${storyFromRails.updated_at}`,
    author: {
      "@type": "Person",
      name: "FloridaBlaze Staff",
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "FloridaBlaze",
      logo: {
        "@type": "ImageObject",
        url: "https://weedblogimages.s3.amazonaws.com/company_logo.png",
        height: 35,
        width: 285,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />

      {Object.keys(userState.user).length > 0 &&
      userState.user.isAdmin == true ? (
        <Link
          key={"b"}
          to={"/story_editor/" + storyFromRails.id}
          state={{ art: storyFromRails }}
        >
          edit STORY
        </Link>
      ) : null}

      <Helmet>
        <title>{storyFromRails.title}</title>
        <link
          rel="canonical"
          href={`https://floridablaze.io/blog/${storyFromRails.slug}`}
        ></link>
        <meta property="og:title" content={storyFromRails.title} />
        <meta property="og:description" content={storyFromRails.description} />
        <meta property="og:image" content={storyFromRails.urls[0]} />
        <meta
          property="og:url"
          content={`https://floridaBlaze.io/blog/${storyFromRails.urls[0]}`}
        />
        <meta property="og:site_name" content="FloridaBlaze" />
        <meta property="og:type" content="article" />
      </Helmet>

      <ArticleSection>
        <StoryTitleWrapper>
          <StoryTitle>{storyFromRails.title}</StoryTitle>
        </StoryTitleWrapper>

        <Caption
          dangerouslySetInnerHTML={{ __html: storyFromRails.caption }}
        ></Caption>

        <InfoBar>
          <FlexBar>
            <AuthorAvartar src={storyFromRails.author_avatar} alt="" />

            <h4
              style={{
                fontSize: ".7rem",
                lineHeight: "normal",
                marginLeft: "10px",
              }}
            >
              by FloridaBlaze
            </h4>
            <ArticleSpacer>|</ArticleSpacer>
            <ArticleDate>{storyFromRails.date}</ArticleDate>
          </FlexBar>

          <StoryShareButtons>
            <FacebookShareButton
              children={
                <FacebookIcon size={20} round={false} borderRadius={90} />
              }
              url={`https://floridablaze.io/blog/${storyFromRails.slug}`}
              style={{ marginRight: "3px" }}
            />
            <TwitterShareButton
              children={
                <TwitterIcon size={20} round={false} borderRadius={90} />
              }
              url={`https://floridablaze.io/blog/${storyFromRails.slug}`}
              style={{ marginRight: "3px" }}
            />
            <WhatsappShareButton
              children={
                <WhatsappIcon size={20} round={false} borderRadius={90} />
              }
              url={`https://floridablaze.io/blog/${storyFromRails.slug}`}
            />
          </StoryShareButtons>
        </InfoBar>

        <StoryImageWrapper>
          <StoryImage src={storyFromRails.urls[0]} alt={storyFromRails.alt} />
        </StoryImageWrapper>

        <PWrapper
          dangerouslySetInnerHTML={{ __html: storyFromRails.body }}
        ></PWrapper>

        <Comments
          userState={userState}
          artData={storyFromRails}
          slug={storyFromRails.slug}
        />
        {/* 
        <SideAds /> */}
      </ArticleSection>
    </>
  );
}

export default Article;
