import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
const Child = (props) => {

	const changeTest=() => {
		// this	
	}
	return (
		<div onClick={changeTest}>{props.value}</div>
	);
};
export default Child;
