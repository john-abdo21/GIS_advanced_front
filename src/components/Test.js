import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import Child from './Child'
const Test = () => {
	const [value,setValue]=useState('HHHHH')
	const [childVal,setChildVal]=useState('tet')
	useEffect(()=>{
		// setChildVal(ddd)
		console.log(this);
	},[])
	return (
		<>
		<div>{childVal}</div>
		<Child 
		value={value}
		/>
		</>
	);
};
export default Test;
