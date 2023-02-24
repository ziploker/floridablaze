// Burger.js
import React from "react";

import StyledBurger from "./burger.styled";

const Burger = (props) => {
	return (
		<StyledBurger
			openSideMenu={props.openSideMenu}
			hamburgerScrolled={props.hamburgerScrolled}
			onClick={() => {
				props.setOpenSideMenu(!props.openSideMenu);
			}}
		>
			<div />
			<div>MENU</div>
			<div />
		</StyledBurger>
	);
};

export default Burger;
