import React, { Component, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import $ from "jquery";
//import lilDownArrow from '../../../../'
//import '../components/fix.js'
import slugify from "react-slugify";
//import TipTapEditStory from "./myComponents/TipTapEditStory.jsx";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
const StoryPicWrapper = styled.div`
  position: relative;
`;

const StoryPic = styled.img`
  //border-radius: 50px;
  border: 1px gray solid;
  position: relative;
  width: 70px;
  height: 70px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const LabelForFile = styled.label`
  text-align: center;
  display: inline-block;
  // font-size: 12px;
  position: absolute;
  right: -15px;
  bottom: -13px;
  z-index: 5;
  border-radius: 50px;
  //background-color: orange;
  padding: 5px;
  margin: 0 auto;

  //background-color: orange;
  cursor: pointer;

  &:hover {
    //background-color: #fce1b3;
  }
`;

const Section = styled.section`
  //background: rgb(136,189,188);
  //background: radial-gradient(circle, rgba(136,189,188,1) 0%, rgba(158,190,189,0.9612044646960347) 41%);
  //background: #F7C562;
  //height: 100vh;
  //min-height: 400px;
  position: relative;
`;

const Form = styled.form`
  display: grid;
  //grid-template-columns: 90%;
  grid-gap: 1.5rem;
  width: 100vw;
`;

const FormWrapper = styled.div`
  display: grid;
  justify-content: center;
  padding: 20px;
`;

const Input = styled.input`
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 78vh;
  overflow: hidden;
`;

const OptionWrapper = styled.div``;

const formData = new FormData();

function EditStory(props) {
  console.log("EDIT STORY START +++++++++++++++");
  console.log("EDIT STORY START +++++++++++++++", props);
  //const [artBody, setArtBody] = React.useState("");

  const [state, setState] = React.useState({
    title: "",
    slug: "",
    alt: "",
    body: "",
    //nameIsFocused: false,
    keywords: "",
    topic: "",
    //phoneIsFocused: false,

    caption: "",

    urls: "",
    //emailIsFocused: false,
    //company: '',
    //companyIsFocused: false,
    //zip: '',
    //zipIsFocused: false,
    //message: '',
    //messageIsFocused: false,
    //error: '',
    //activeIndex: null
  });

  //const { storyId } = useParams();
  const { storyId } = useParams();

  useEffect(() => {
    axios
      .post(
        "/blog/get_story_info",
        {
          data: {
            storyID: storyId,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("resoooooooooooooooonse = " + JSON.stringify(response));
        console.log("resoooooooooooooooonse = " + response.data.story.title);

        setState({
          title: response.data.story.title,
          body: response.data.story.body,
          slug: response.data.story.slug,
          keywords: response.data.story.keywords,
          topic: response.data.story.topic,
          alt: response.data.story.alt,
          caption: response.data.story.caption,
          urls: response.data.story.urls,
        });

        //setArtBody(response.data.story.body);
      })
      .catch((error) => {
        console.log("editStoryErrors", error);
      });
  }, []);

  const Images = () => {
    return Object.keys(state.urls).map((item) => {
      console.log("map insert pics", state.urls[item]);
      return (
        <div key={item}>
          <img style={{ width: "150px" }} src={state.urls[item]} alt="" />
          <div
            style={{
              width: "150px",
              height: "25px",
              marginBottom: "15px",
              cursor: "pointer",
            }}
            onClick={() =>
              sendPicToRailsToDelete(state.urls[item], state.title)
            }
          >
            delete
          </div>
        </div>
      );
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    //console.log("________________ARTBOADY___________________", artBody);

    if (validForm()) {
      formData.append("event[title]", state.title);
      formData.append("event[slug]", state.slug);
      formData.append("event[keywords]", state.keywords);
      formData.append("event[topic]", state.topic);
      formData.append("event[alt]", state.alt);
      formData.append("event[body]", state.body);
      formData.append("event[caption]", state.caption);

      console.log("formdata from handle add in form");
      console.log(formData);

      //get token for form submission
      const csrf = document
        .querySelector("meta[name='csrf-token']")
        .getAttribute("content");
      $.ajax({
        url: "/stories/" + storyId + "/edit",
        headers: {
          "X-CSRF-Token": csrf,
        },
        method: "POST",
        data: formData,
        contentType: false,
        processData: false,

        success: function (data) {
          //props.handleAdd(data);
          setState({
            //focussed: (props.focussed) || false,
            title: "",
            slug: "",
            alt: "",
            keywords: "",
            topic: "",
            body: "",
            caption: "",
            images: null,
          });
          alert("Upload worked");
        },
        error: function (xhr, status, error) {
          alert("Message did not reach server: ", error);
        },
      });
    } else {
      alert("Please fill all fields.");
    }
  };

  const validForm = () => {
    if (state.title && state.keywords && state.topic && state.body) {
      return true;
    } else {
      return true;
    }
  };

  const handleChange = (event) => {
    console.log("handle change from form");
    console.log(event);

    const v = event.target.value;

    const { id } = props;
    const value = event.target.value;
    console.log("nameeeeee = " + event.target.name);
    console.log("valluuee = " + event.target.value);
    console.log("focus = " + event.target.tagger);

    if (event.target.name == "title") {
      setState({
        ...state,
        slug: slugify(v),
        [event.target.name]: v,
        error: "",
      });
    } else {
      setState({
        ...state,
        [event.target.name]: v,
        error: "",
      });
      //return onChange(id, value);
    }
  };

  const getClass = () => {
    if (state.focus === true) return "field focussed";
    else return "field";
  };

  const handleImageChange = (event) => {
    console.log(
      "handleImageChange_EVENTTTTTTTTTTTTTTTTTTTTTTTT",
      event.target.files
    );

    let imageArray = [];

    Object.keys(event.target.files).map((item) => {
      console.log("insideHHHH KEY", event.target.files[item]);
      imageArray.push(event.target.files[item]);
    });

    // event.target.files.map((file) => {
    // 	console.log("insideMAP", file);
    // 	imageArray.push(file);
    // });
    console.log("AFTER_M<AP");
    //imageArray.push(event.target.files[0]);

    //console.log("full imageArray[0]  is ", imageArray[0]);

    //formData.append("event[images]", event.target.files[0]);
    //formData.append("event[images]", JSON.stringify(imageArray));

    for (const a of imageArray) {
      formData.append("images[]", a);
    }
    console.log("AFTER_for loop");
    console.log(...formData);

    // setState({
    // 	...state,
    // 	images: URL.createObjectURL(event.target.files[0]),
    // });

    //     setState({
    //       ...state,
    //       images: [...prevState.images, URL.createObjectURL(event.target.files[0])],
    //     };
    // 	setState((prevState) => ({
    // 		...state,
    // 		images: [...prevState.images, URL.createObjectURL(event.target.files[0])],
    // 	  }));
  };

  const InsertPictures = () => {
    //urlArray = JSON.parse(state.urls);
    console.log("bringBackArrayCheck", state.urls);

    // state.urls.map((url) => {
    // 	<img src={url} />;
    // });
    return Object.keys(state.urls).map((item) => {
      console.log("map insert pics", state.urls[item]);
      <img src={state.urls[item]} />;
    });
  };

  const sendPicToRailsToDelete = (picUrl, storyTitle) => {
    axios
      .post(
        "/blog/delete_pic",
        {
          data: {
            picUrl: picUrl,
            storyTitle: storyTitle,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(
          "resoooooooooooooooonseFromDeletePic = " +
            JSON.stringify(response.data)
        );

        console.log(
          "resoooooooooooooooonseFromDeletePic = " + JSON.stringify(state)
        );

        // const na = state.urls.map((x) => {
        // 	console.log(x + "123123123");
        // });

        // nb = state.urls.filter(url => url.includes(picUrl))
        // console

        // console.log("does ", na);
        console.log("OLDURLS", JSON.stringify(state.urls)); // ['hi' 'bye' 'okay]
        let newUrls = state.urls.filter(function (url) {
          return url != picUrl;
        });
        console.log("NEWURLS", newUrls); // ['hi' 'bye' 'okay]

        setState({ ...state, urls: newUrls });
      })
      .catch((error) => {
        console.log("delete_pic", error);
      });
  };

  const { focussed, value, error, label } = state;
  const { id, type, locked } = props;
  //const fieldClassName = `field ${(locked ? focussed : focussed || value) && 'focussed'}`;
  //const fcn = state.nameIsFocused ? "xxxfocused" : "xxxNotfocused"

  return (
    <FormWrapper>
      {console.log("PREEEHiTT", state)}

      {state.urls != null ? <Images /> : null}

      <Form
        className="form-inline"
        onSubmit={handleAdd}
        enctype="multipart/form-data"
      >
        <div className="field">
          <Input
            type="text"
            index={1}
            className="form-control"
            name="title"
            placeholder="title of the story...."
            value={state.title}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <Input
            type="text"
            index={2}
            className="form-control"
            name="title"
            placeholder="slug for story (automatic)"
            value={slugify(state.title)}
            //onChange={handleChange}
            readOnly
          />
        </div>

        <div className="field">
          <Input
            type="text"
            index={3}
            className="form-control"
            name="alt"
            placeholder="alt text for image"
            value={state.alt}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <Input
            type="text"
            index={4}
            className="form-control"
            name="keywords"
            //focus="phoneIsFocused"
            placeholder="tags keywords etc..."
            value={state.keywords}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <Input
            type="text"
            index={5}
            className="form-control"
            name="topic"
            //focus="phoneIsFocused"
            placeholder="Local or National etc.."
            value={state.topic}
            onChange={handleChange}
          />
        </div>

        <StoryPicWrapper>
          {/* <StoryPic src={state.image !=null && state.image.length != 0 ? state.image : "nadaa"}/> */}
          <LabelForFile htmlFor="images">&#128393;</LabelForFile>
        </StoryPicWrapper>

        <div className="field">
          <Input
            type="text"
            index={6}
            className="form-control"
            name="caption"
            //focus="phoneIsFocused"
            placeholder="photo caption HTML"
            value={state.caption}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <Input
            style={{
              width: "111px",
              height: "111px",
              opacity: "0",
              overflow: "hidden",
              position: "absolute",
              zIndex: "-1",
            }}
            id="images"
            type="file"
            index={7}
            accept="image/*"
            className="form-control"
            name="images"
            multiple
            //focus="phoneIsFocused"
            //placeholder="tags keywords etc..."

            onChange={handleImageChange}
          />
        </div>

        <div className="field">
          <TextArea
            type="text"
            index={8}
            className="form-control"
            name="body"
            placeholder="Story HTML..."
            value={state.body}
            //readOnly
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </Form>

      {/* <TipTapEditStory artBody={artBody} setArtBody={setArtBody} /> */}
    </FormWrapper>
  );
}

//const ReCaptcha = styled.div``;

export default (props) => <EditStory {...props} />;
