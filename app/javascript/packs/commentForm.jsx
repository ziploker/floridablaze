import React, { Component, useEffect, useState, useRef } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import $ from "jquery"
//import lilDownArrow from '../../../../'
//import '../components/fix.js'
import defaultManIcon from "../../assets/images/man3.png"

// const Section = styled.section`

//     //background: rgb(136,189,188);
//     //background: radial-gradient(circle, rgba(136,189,188,1) 0%, rgba(158,190,189,0.9612044646960347) 41%);
//     //background: #F7C562;
//     //height: 100vh;
//     //min-height: 400px;
//     position: relative;

// `;

const Form = styled.form`
	display: grid;
	//grid-template-columns: 90%;
	margin-top: 24px;
	grid-gap: 1.5rem;
	width: 96%;
`

const FormWrapper = styled.div`
	display: grid;
	grid-template-columns: 50px 1fr;
	grid-template-rows: minmax(min-content, max-content) minmax(min-content, max-content);
	grid-template-areas:
		"main_comment_img      main_comment_body      main_comment_body"
		".             .             main_comment_buttons";
`

const OptionWrapper = styled.div``

const CommentInput = styled.input`
	width: 100%;
	border: 0;
	border-bottom: 2px solid gray;
	outline: 0;
	// font-size: 1.3rem;

	//padding: 7px 0;
	background: transparent;
	transition: border-color 0.2s;
	margin-left: 10px;

	overflow-wrap: break-word;
	word-wrap: break-word;

	-ms-word-break: break-all;

	word-break: break-word;
`

const ErrorMsg = styled.div`
	height: 41px;
	display: inline-block;
	opacity: ${(props) =>
		props.state.comment.length > 3 && props.props.userState.loggedInStatus == "NOT_LOGGED_IN"
			? "1"
			: "0"};
	transition: all 0.3s ease;

	h4 {
		//color: blue;
		margin-left: 58px;
	}
`

const CButton = styled.button`
	margin-top: 3px;
	//width: 32%;
	justify-self: end;
	margin-top: 4px;
	grid-area: "main_comment_buttons";
	background: linear-gradient(to right, #e52d27 0%, #b31217 51%, #e52d27 100%);
	margin: 10px;
	padding: 15px 45px;
	text-align: center;
	text-transform: uppercase;
	transition: 0.5s;
	background-size: 200% auto;
	color: white;
	box-shadow: 0 0 20px #eee;
	border-radius: 10px;
	display: block;
	cursor: pointer;

	&:hover {
		background-position: right center; /* change the direction of the change here */
		color: #fff;
		text-decoration: none;
	}
`

const formData = new FormData()

function CommentForm(props) {
	const [state, setState] = React.useState({
		comment: "",
		error: "",
		//showErrorMsg: "false"
		//emailIsFocused: false,
		//company: '',
		//companyIsFocused: false,
		//zip: '',
		//zipIsFocused: false,
		//message: '',
		//messageIsFocused: false,
		//error: '',
		//activeIndex: null
	})

	const handleAdd = (e) => {
		e.preventDefault()

		if (validForm()) {
			if (props.userState.loggedInStatus == "NOT_LOGGED_IN") {
				return
			} else {
				formData.append("event[body]", state.comment)
				formData.append("event[story_id]", props.storyID)
				formData.append("event[comment_id]", props.commentID)
				formData.append("event[author_nick]", props.userState.user.nick)
				formData.append("event[author_avatar]", props.userState.user.avatar_url)
				formData.append("event[type]", "story")

				console.log("formdata from handle add in comment form")
				console.log(formData)

				//get token for form submission
				const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content")

				$.ajax({
					url: "/comments",
					headers: {
						"X-CSRF-Token": csrf,
					},
					method: "POST",
					data: formData,
					contentType: false,
					processData: false,

					success: function (data) {
						//props.handleAdd(data);
						//setState({setState

						//focussed: (props.focussed) || false,
						//comment: ''

						//});

						//props.setState("done")

						console.log(
							"rails reply in comment form ajax success= " + JSON.stringify(data, null, 4)
						)
						console.log("commentform...........................")
						props.setArtDataComments(data.comments)

						setState({ ...state, comment: "" })

						//props.setIsCommentsLoading(false)

						////props.addAllCommentsToStateForReplyButtonToWork(data.comments)
					},
					error: function (xhr, status, error) {
						alert("Comment did not reach server: ", error)
					},
				})
			}
		} else {
			alert("Please type a comment.")
		}
	}

	const validForm = () => {
		//console.log("in comment form")
		if (state.comment) {
			return true
		} else {
			return false
		}
	}

	const handleChange = (event) => {
		console.log("handle change from form")
		console.log(event)

		const v = event.target.value

		const { id } = props
		const value = event.target.value
		console.log("nameeeeee = " + event.target.name)
		console.log("valluuee = " + event.target.value)
		console.log("focus = " + event.target.tagger)

		setState({
			...state,
			[event.target.name]: v,
			error: "",
		})

		//return onChange(id, value);
		// }
	}

	const getClass = () => {
		if (state.focus === true) return "field focussed"
		else return "field"
	}

	const handleImageChange = (event) => {
		console.log("chd")
		console.log(event.target)
		formData.append("event[image]", event.target.files[0])
	}

	const { focussed, value, error, label } = state
	const { id, type, locked } = props
	//const fieldClassName = `field ${(locked ? focussed : focussed || value) && 'focussed'}`;
	//const fcn = state.nameIsFocused ? "xxxfocused" : "xxxNotfocused"

	return (
		<>
			<FormWrapper>
				<img
					style={{
						border: "1px solid gray",
						borderRadius: "50%",
						width: "50px",
						height: "50px",
						minWidth: "50px",
						gridArea: "main_comment_img",
					}}
					src={
						props.userState
							? props.userState.avatar_url == null
								? defaultManIcon
								: props.userState.avatar_url
							: defaultManIcon
					}
					alt=""
				></img>

				<Form
					style={{ gridArea: "main_comment_body" }}
					id="cform"
					className="form-inline"
					onSubmit={handleAdd}
					enctype="multipart/form-data"
				>
					<div className="field">
						<CommentInput
							type="text"
							index={1}
							className="form-control"
							name="comment"
							placeholder="add comment.."
							value={state.comment}
							onChange={handleChange}
						/>
					</div>
				</Form>
				<CButton form="cform" type="submit" className="btn btn-primary">
					COMMENT
				</CButton>
			</FormWrapper>
			<ErrorMsg state={state} props={props}>
				<h4>** Please login to comment **</h4>
			</ErrorMsg>
		</>
	)
}

//const ReCaptcha = styled.div``;

export default (props) => <CommentForm {...props} />
