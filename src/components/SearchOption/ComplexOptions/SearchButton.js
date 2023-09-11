import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	fetchComplexReducer,
	setSideQuery,
	setTotalQueryFromComponents,
} from "../../../features/filter/ComplexOptionReducer";
import { hide } from "../../../features/filter/StateReducer";

import "./SearchButton.css";

const SearchButton = (props) => {
	const dispatch = useDispatch();

	const landQuery = useSelector((state) => state.complex.landQuery, []);
	let sideQuery = useSelector((state) => state.complex.sideQuery.query, []);

	let storeQueries = useSelector(
		(state) => state.complex.queriesFromComponents
	);
	storeQueries = [...storeQueries];

	const travelBinaryTree = (key, query, node) => {
		if (!node) {
			return;
		}
		if (node.key === key) {
			console.log("Found it");
			node = {
				...node,
				query,
			};
		}
		travelBinaryTree(node.and);
		travelBinaryTree(node.or);
	};

	let count = 0;
	const makeQuery = (val) => {
		console.log("storeQueries", val, storeQueries);
		let AndKey = val + "a";
		let OrKey = val + "o";
		let Query=''
		let InitialQuery = storeQueries.filter((item) => item.key === val)[0];
		let AndQuery = storeQueries.filter((item) => item.key === AndKey)[0];
		let OrQuery = storeQueries.filter((item) => item.key === OrKey)[0];
		console.log("storeQueries", val, Query);
		if(InitialQuery){
			Query = InitialQuery.query;
		}
		if (AndQuery) {
			let ReturnAndVal = makeQuery(AndKey);
			Query = `SELECT t1_${AndKey}.* FROM (${Query}) as t1_${AndKey} INNER JOIN (${ReturnAndVal}) as t2_${AndKey} ON (t1_${AndKey}.fid = t2_${AndKey}.fid)`;
		}
		if (OrQuery) {
			let ReturnOrVal = makeQuery(OrKey);
			Query = `SELECT tt_${OrKey}.* FROM (${Query} UNION ${ReturnOrVal}) AS tt_${OrKey}`;
		}
		dispatch(setTotalQueryFromComponents(Query));
		return Query;
	};

	const submitSearch = async () => {
		let TotalQuery = await makeQuery("plot_");
		let tempQuery = "";
		if (landQuery && TotalQuery) {
			tempQuery = `SELECT t_land.* FROM ((${landQuery}) AS t_land INNER JOIN (${TotalQuery}) AS t_side ON (t_land.fid = t_side.fid))`;
		} else if (landQuery) {
			tempQuery = landQuery;
		} else if (TotalQuery) {
			tempQuery = TotalQuery;
		} else {
			tempQuery = "";
		}
		dispatch(fetchComplexReducer(tempQuery));
		console.log("totalQUery =>", tempQuery);
		dispatch(hide());
		props.onSearchButtonClick();
	};

	return (
		<div className="submit-button" onClick={submitSearch}>
			Search
		</div>
	);
};

export default SearchButton;
