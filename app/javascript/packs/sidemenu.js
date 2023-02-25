import React from "react";

import StyledSideMenu from "./sidemenu.styled";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UL = styled.ul`
	li {
		cursor: pointer;
	}
`;

function Menu(props) {
	return (
		<StyledSideMenu
			openSideMenu={props.openSideMenu}
			hamburgerScrolled={props.hamburgerScrolled}
		>
			<UL>
				<li key={1} style={{ borderBottom: "2px orange solid" }}>
					<a href="/">Home</a>
				</li>
				<li key={2} style={{ borderBottom: "2px orange solid" }}>
					<a onClick={props.executeScrollForLookupSection}>Act</a>
				</li>
				<li key={3} style={{ borderBottom: "2px orange solid" }}>
					<a href="#">Shop</a>
				</li>

				<li key={4}>
					{props.userState.loggedInStatus == "LOGGED_IN"
						? [
								<a
									style={{ fontSize: "4vw" }}
									key={"a"}
									onClick={props.handleLogOutClick}
								>
									{" "}
									Logout{" "}
								</a>,
								<span style={{ fontSize: "4vw" }}>| </span>,
								<Link style={{ fontSize: "4vw" }} key={"b"} to="/edit">
									edit{" "}
								</Link>,
						  ]
						: [
								<a
									style={{ fontSize: "4vw" }}
									key={"c"}
									onClick={props.doSomething}
								>
									{" "}
									Login |
								</a>,
								<a
									style={{ fontSize: "4vw" }}
									key={"d"}
									onClick={props.executeScrollForSection2}
								>
									{" "}
									Signup
								</a>,
						  ]}{" "}
				</li>

				{/* 
        <li key={5}>

            <li key={4}>{props.userState.loggedInStatus == "LOGGED_IN" ? [<Link key={"a"} to="/"> Logout | </Link>, <Link key={"b"} to="/edit">edit </Link>] :   [<Link key={"c"} to="/login"> Login |</Link>, <Link key={"d"} to="/signup"> Signup</Link>]  } </li>

        </li>
        */}
			</UL>
		</StyledSideMenu>
	);
}

export default Menu;

/*

<a href="/">
        <span role="img" aria-label="about us"></span>
        About us
      </a>
      <a href="/">
        <span role="img" aria-label="price"></span>
        Pricing
        </a>
      <a href="/">
        <span role="img" aria-label="contact"></span>
        Contact
        </a>

*/
