import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AndOrComponent from "./AndOrComponent";
import { Dropdown, Button, Space, Divider, Input, Row, Col, Form } from "antd";
import {
	DownOutlined,
	CloseCircleOutlined,
	PlusCircleOutlined,
	ZoomInOutlined,
} from "@ant-design/icons";
import classNames from "classnames";

import {
	setSideQuery,
	setQueriesFromComponents,
} from "../../../features/filter/ComplexOptionReducer";

import "./AddOrComponent.css";

const AddOrComponent = (props) => {
	const dispatch = useDispatch();

	const [restricted, setRestricted] = useState([]);
	const propsAndCount = props.andCount;
	const propsRestricted = props.restricted;
	const [currentCategory, setCurrentCategory] = useState(
		props.currentSelection
	);
	const [noSelection, setNoSelection] = useState(props.noSelection);
	const [sideOptions, setSideOptions] = useState({
		river: {
			distance: "",
			length: {
				min: "",
				max: "",
			},
			width: {
				min: "",
				max: "",
			},
		},
		forest: {
			distance: "",
			area: {
				min: "",
				max: "",
			},
		},
		lake: {
			distance: "",
			area: {
				min: "",
				max: "",
			},
		},
		others: {
			hospital: "",
			station: "",
			school: "",
		},
		and: null,
		or: null,
	});
	let storeQueries = useSelector(
		(state) => state.complex.queriesFromComponents
	);
	storeQueries = [...storeQueries];
	// console.log("storeQueries =>", storeQueries);
	const totalQuery = useSelector((state) => state.complex.totalQuery);
	let sideQuery = useSelector((state) => state.complex.sideQuery.query, []);

	//TODO: color of component
	const [componentColor, setComponentColor] = useState(false);

	useEffect(() => {
		let tempArray = propsRestricted;
		tempArray = tempArray.filter((item) => item.label !== currentCategory);
		setRestricted([...tempArray]);
		// console.log("num", props.queryKey);
	}, []);

	const [queryTreeState, setQueryTreeState] = useState({
		query: "",
		originalQuery: "",
		and: "",
		or: "",
		key: "A",
		sideoption: sideOptions,
	});

	const constants = {
		PLOT_TABLE_NAME: "test_pl_plot3857_small",
		RIVER_TABLE_NAME: "test_pl_river3857_small",
		FOREST_TABLE_NAME: "test_pl_forest3857_small",
		LAKE_TABLE_NAME: "test_pl_inlandwater3857_small",
		OTHERS_TABLE_NAME: "test_pl_hospital3857_small",
	};

	const handleMenuClick = (e) => {
		// console.log("When you clicked the item in dropdown menu", {
		// 	e,
		// 	items,
		// });
		let idx;
		items.map((indiv, index) => {
			if (indiv.key === e.key) {
				idx = index;
			}
		});
		setCurrentCategory(items[idx].label);
		setSideOptions({
			...sideOptions,
			and: null,
			or: null,
		});
		let tempArray = propsRestricted;
		tempArray = tempArray.filter((item) => item !== tempArray[idx]);
		setRestricted([...tempArray]);
	};

	const onChangeRMaxDistance = (e) => {
		setSideOptions({
			...sideOptions,
			river: { ...sideOptions.river, distance: e.target.value },
		});
	};

	const onChangeRMinLength = (e) => {
		setSideOptions({
			...sideOptions,
			river: {
				...sideOptions.river,
				length: {
					...sideOptions.river.length,
					min: e.target.value,
				},
			},
		});
	};

	const onChangeRMaxLength = (e) => {
		setSideOptions({
			...sideOptions,
			river: {
				...sideOptions.river,
				length: {
					...sideOptions.river.length,
					max: e.target.value,
				},
			},
		});
	};

	const onChangeRMinWidth = (e) => {
		setSideOptions({
			...sideOptions,
			river: {
				...sideOptions.river,
				width: {
					...sideOptions.river.width,
					min: e.target.value,
				},
			},
		});
	};

	const onChangeRMaxWidth = (e) => {
		setSideOptions({
			...sideOptions,
			river: {
				...sideOptions.river,
				width: {
					...sideOptions.river.width,
					max: e.target.value,
				},
			},
		});
	};

	const onChangeFMaxDistance = (e) => {
		setSideOptions({
			...sideOptions,
			forest: { ...sideOptions.forest, distance: e.target.value },
		});
	};

	const onChangeFMinArea = (e) => {
		setSideOptions({
			...sideOptions,
			forest: {
				...sideOptions.forest,
				area: {
					...sideOptions.forest.area,
					min: e.target.value,
				},
			},
		});
	};

	const onChangeFMaxArea = (e) => {
		setSideOptions({
			...sideOptions,
			forest: {
				...sideOptions.forest,
				area: {
					...sideOptions.forest.area,
					max: e.target.value,
				},
			},
		});
	};

	const onChangeIMaxDistance = (e) => {
		setSideOptions({
			...sideOptions,
			lake: { ...sideOptions.lake, distance: e.target.value },
		});
	};

	const onChangeIMinArea = (e) => {
		setSideOptions({
			...sideOptions,
			lake: {
				...sideOptions.lake,
				area: {
					...sideOptions.lake.area,
					min: e.target.value,
				},
			},
		});
	};

	const onChangeIMaxArea = (e) => {
		setSideOptions({
			...sideOptions,
			lake: {
				...sideOptions.lake,
				area: {
					...sideOptions.lake.area,
					max: e.target.value,
				},
			},
		});
	};

	const onChangeHospitalMaxDistance = (e) => {
		setSideOptions({
			...sideOptions,
			others: { ...sideOptions.others, hospital: e.target.value },
		});
	};

	const onChangeStationMaxDistance = (e) => {
		setSideOptions({
			...sideOptions,
			others: { ...sideOptions.others, station: e.target.value },
		});
	};

	const onChangeSchoolMaxDistance = (e) => {
		setSideOptions({
			...sideOptions,
			others: { ...sideOptions.others, school: e.target.value },
		});
	};

	const setBackUnsetToFalse = () => {
		setNoSelection(false);
	};

	const setBackUnsetToTrue = async () => {
		await setNoSelection(true);
		const storeQueries = [];
		dispatch(setQueriesFromComponents(storeQueries));
		setSideOptions({
			...sideOptions,
			and: null,
			or: null,
		});
		setQueryTreeState({
			...queryTreeState,
			query: "",
			originalQuery: "",
			and: "",
			or: "",
		});
	};

	const generateKey = (type) => {
		let tempKey = props.queryKey;
		return tempKey + type;
	};
	const andComponentToAnd = () => {
		// console.log("restricted", restricted);
		// console.log("props.restricted", props.restricted);
		setSideOptions({
			...sideOptions,
			and: (
				<AndOrComponent
					firstChild={false}
					removeThis={removeAndComponent}
					restricted={restricted}
					andCount={increasedAndCount(propsAndCount)}
					noSelection={false}
					currentSelection={restricted[0].label}
					componentType="and"
					setQueryState={(childState) =>
						setQueryTreeState({
							...queryTreeState,
							and: childState,
							key: generateKey("a"),
						})
					}
					queryKey={generateKey("a")}
					key={generateKey("a")}
				/>
			),
		});
	};

	const addComponentToOn = () => {
		setSideOptions({
			...sideOptions,
			or: (
				<AndOrComponent
					firstChild={false}
					removeThis={removeOnComponent}
					restricted={props.restricted}
					andCount={propsAndCount}
					noSelection={false}
					currentSelection={props.restricted[0].label}
					componentType="or"
					queryState={queryTreeState.or}
					setQueryState={(childState) =>
						setQueryTreeState({
							...queryTreeState,
							or: childState,
							key: generateKey("o"),
						})
					}
					queryKey={generateKey("o")}
					key={generateKey("o")}
				/>
			),
		});
	};
	useEffect(() => {
		let tempQuery = "";
		if (!noSelection) {
			if (currentCategory === "River" && sideOptions.river.distance) {
				let tempDistance = parseFloat(sideOptions.river.distance) * 1000;
				const tempMinLength = parseFloat(sideOptions.river.length.min);
				const tempMaxLength = parseFloat(sideOptions.river.length.max);
				const tempMinWidth = parseFloat(sideOptions.river.width.min);
				const tempMaxWidth = parseFloat(sideOptions.river.width.max);
				let subWhereQueryPart = "";
				if (parseFloat(tempDistance) <= 0) tempDistance = 0.1;
				tempQuery =
					"SELECT *, ST_AsGeoJson(ST_Transform(geom, 3857)) FROM " +
					constants.PLOT_TABLE_NAME +
					" ";
				tempQuery +=
					"WHERE ST_Intersects(ST_Transform(geom, 3857), (SELECT ST_Buffer(ST_Union(ST_Transform(geom, 3857)), " +
					tempDistance +
					") FROM " +
					constants.RIVER_TABLE_NAME +
					" ";
				if (!(tempMinLength < 0 || tempMaxLength < 0)) {
					if (tempMinLength && tempMaxLength) {
						if (tempMinLength <= tempMaxLength) {
							subWhereQueryPart +=
								"WHERE length >= " +
								tempMinLength +
								" AND length <= " +
								tempMaxLength +
								" ";
						}
					} else if (tempMinLength) {
						subWhereQueryPart += "WHERE length >= " + tempMinLength + " ";
					} else if (tempMaxLength) {
						subWhereQueryPart += "WHERE length <= " + tempMaxLength + " ";
					}
				}
				if (!(tempMinWidth < 0 || tempMaxWidth < 0)) {
					const prefix = subWhereQueryPart.includes("WHERE") ? "AND" : "WHERE";
					if (tempMinWidth && tempMaxWidth) {
						if (tempMinWidth <= tempMaxWidth) {
							subWhereQueryPart +=
								prefix +
								" width >= " +
								tempMinWidth +
								" AND width <= " +
								tempMaxWidth +
								" ";
						}
					} else if (tempMinWidth) {
						subWhereQueryPart += prefix + " width >= " + tempMinWidth + " ";
					} else if (tempMaxWidth) {
						subWhereQueryPart += prefix + " width <= " + tempMaxWidth + " ";
					}
				}
				tempQuery += subWhereQueryPart + "))";
			}
			if (currentCategory === "Forest" && sideOptions.forest.distance) {
				let tempDistance = parseFloat(sideOptions.forest.distance) * 1000;
				const tempMinArea = parseFloat(sideOptions.forest.area.min * 10000);
				const tempMaxArea = parseFloat(sideOptions.forest.area.max * 10000);
				let subWhereQueryPart = "";
				if (parseFloat(tempDistance) <= 0) tempDistance = 0;
				tempQuery =
					"SELECT *, ST_AsGeoJson(ST_Transform(geom, 3857)) FROM " +
					constants.PLOT_TABLE_NAME +
					" ";
				tempQuery +=
					"WHERE ST_Intersects(ST_Transform(geom, 3857), (SELECT ST_Buffer(ST_Union(ST_Transform(geom, 3857)), " +
					tempDistance +
					") FROM " +
					constants.FOREST_TABLE_NAME +
					" ";
				if (!(tempMinArea < 0 || tempMaxArea < 0)) {
					if (tempMinArea && tempMaxArea) {
						if (tempMinArea <= tempMaxArea) {
							subWhereQueryPart +=
								"WHERE area >= " +
								tempMinArea +
								" AND area <= " +
								tempMaxArea +
								" ";
						}
					} else if (tempMinArea) {
						subWhereQueryPart += "WHERE area >= " + tempMinArea + " ";
					} else if (tempMaxArea) {
						subWhereQueryPart += "WHERE area <= " + tempMaxArea + " ";
					}
				}
				tempQuery += subWhereQueryPart + "))";
			}
			if (currentCategory === "Lake" && sideOptions.lake.distance) {
				let tempDistance = parseFloat(sideOptions.lake.distance) * 1000;
				const tempMinArea = parseFloat(sideOptions.lake.area.min * 10000);
				const tempMaxArea = parseFloat(sideOptions.lake.area.max * 10000);
				let subWhereQueryPart = "";
				if (parseFloat(tempDistance) <= 0) tempDistance = 0;
				tempQuery =
					"SELECT *, ST_AsGeoJson(ST_Transform(geom, 3857)) FROM " +
					constants.PLOT_TABLE_NAME +
					" ";
				tempQuery +=
					"WHERE ST_Intersects(ST_Transform(geom, 3857), (SELECT ST_Buffer(ST_Union(ST_Transform(geom, 3857)), " +
					tempDistance +
					") FROM " +
					constants.LAKE_TABLE_NAME +
					" ";
				if (!(tempMinArea < 0 || tempMaxArea < 0)) {
					if (tempMinArea && tempMaxArea) {
						if (tempMinArea <= tempMaxArea) {
							subWhereQueryPart +=
								"WHERE area >= " +
								tempMinArea +
								" AND area <= " +
								tempMaxArea +
								" ";
						}
					} else if (tempMinArea) {
						subWhereQueryPart += "WHERE area >= " + tempMinArea + " ";
					} else if (tempMaxArea) {
						subWhereQueryPart += "WHERE area <= " + tempMaxArea + " ";
					}
				}
				tempQuery += subWhereQueryPart + "))";
			}
			if (currentCategory === "Others") {
				let tempHospitalDistance =
					sideOptions.others.hospital &&
					parseFloat(sideOptions.others.hospital) >= 0
						? parseFloat(sideOptions.others.hospital) * 1000
						: "";
				let tempStationDistance =
					sideOptions.others.station &&
					parseFloat(sideOptions.others.station) >= 0
						? parseFloat(sideOptions.others.station) * 1000
						: "";
				let tempSchoolDistance =
					sideOptions.others.school &&
					parseFloat(sideOptions.others.station) >= 0
						? parseFloat(sideOptions.others.school) * 1000
						: "";
				if (tempHospitalDistance) {
					let subWhereQueryPart = "";
					tempQuery =
						"SELECT *, ST_AsGeoJson(ST_Transform(geom, 3857)) FROM " +
						constants.PLOT_TABLE_NAME +
						" ";
					tempQuery +=
						"WHERE ST_Intersects(ST_Transform(geom, 3857), (SELECT ST_Buffer(ST_Union(ST_Transform(geom, 3857)), " +
						tempHospitalDistance +
						") FROM " +
						constants.OTHERS_TABLE_NAME +
						" ";
					tempQuery += subWhereQueryPart + "))";
				}
			}
			setQueryTreeState({
				...queryTreeState,
				originalQuery: tempQuery,
				sideoption: sideOptions,
			});
		}
	}, [currentCategory, sideOptions, noSelection]);

	useEffect(() => {
		// console.log("queries from " + props.queryKey + ":", queryTreeState);
		if (props.firstChild) {
			// console.log("query =>", queryTreeState);
			dispatch(setSideQuery(queryTreeState));
		} else {
			const parentFunciton = props.setQueryState;
			parentFunciton(queryTreeState);
		}
	}, [queryTreeState.query]);

	useEffect(() => {
		// if (queryTreeState.query) setComponentColor(true)
		let tempQuery = "";
		if (queryTreeState.originalQuery) {
			if (queryTreeState.and.query && queryTreeState.or.query) {
				tempQuery = `SELECT t1_${props.queryKey}.* FROM (${queryTreeState.originalQuery}) as t1_${props.queryKey} INNER JOIN (${queryTreeState.and.query}) as t2_${props.queryKey} ON (t1_${props.queryKey}.fid = t2_${props.queryKey}.fid)`;
				tempQuery = `SELECT tt_${props.queryKey}.* FROM (${tempQuery} UNION ${queryTreeState.or.query}) AS tt_${props.queryKey}`;
			} else if (queryTreeState.and.query) {
				tempQuery = `SELECT t1_${props.queryKey}.* FROM (${queryTreeState.originalQuery}) as t1_${props.queryKey} INNER JOIN (${queryTreeState.and.query}) as t2_${props.queryKey} ON (t1_${props.queryKey}.fid = t2_${props.queryKey}.fid)`;
			} else if (queryTreeState.or.query) {
				tempQuery = `SELECT tt_${props.queryKey}.* FROM (${queryTreeState.originalQuery} UNION ${queryTreeState.or.query}) AS tt_${props.queryKey}`;
			} else {
				tempQuery = queryTreeState.originalQuery;
			}
			setQueryTreeState({
				...queryTreeState,
				query: tempQuery,
			});
			console.log("originalQuery1", queryTreeState);

			const tempObject = {
				key: props.queryKey,
				query: queryTreeState.originalQuery,
			};
			storeQueries.forEach((element, index) => {
				if (element.key === props.queryKey) {
					storeQueries.splice(index, 1);
				}
			});
			storeQueries.push(tempObject);
			// setComponentColor(true)

			dispatch(setQueriesFromComponents(storeQueries));
			// console.log("after changing states " + props.queryKey + ":", queryTreeState);
		}
	}, [
		queryTreeState.originalQuery,
		queryTreeState.and.query,
		queryTreeState.or.query,
	]);

	const removeAndComponent = () => {
		const a = generateKey("a");
		storeQueries.forEach((element, index) => {
			if (element.key.includes(a)) {
				storeQueries.splice(index, 1);
			}
		});
		dispatch(setQueriesFromComponents(storeQueries));
		console.log(a);
		setSideOptions({
			...sideOptions,
			and: null,
		});
		setQueryTreeState({
			...queryTreeState,
			and: "",
		});
	};

	const removeOnComponent = () => {
		const o = generateKey("o");
		storeQueries.forEach((element, index) => {
			if (element.key.includes(o)) {
				storeQueries.splice(index, 1);
			}
		});
		dispatch(setQueriesFromComponents(storeQueries));
		setSideOptions({
			...sideOptions,
			or: null,
		});
		setQueryTreeState({
			...queryTreeState,
			or: "",
		});
	};

	const increasedAndCount = (propsAndCount) => {
		propsAndCount += 1;
		return propsAndCount;
	};

	const changeGiveToAndCategory = () => {
		const tempArray = props.restricted.filter(
			(element) => element !== currentCategory
		);
		if (tempArray.includes("River")) return "River";
		else if (tempArray.includes("Forest")) return "Forest";
		else if (tempArray.includes("Lake")) return "Lake";
		else if (tempArray.includes("Others")) return "Others";
	};

	const getStateFromComponent = () => {
		return sideOptions;
	};

	let items = [...props.restricted];

	const menuProps = {
		items: props.restricted,
		onClick: handleMenuClick,
	};

	const andButtonClass = classNames({
		"round-button": true,
		"and-button": true,
		"has-color": sideOptions.and !== null,
	});

	const orButtonClass = classNames({
		"round-button": true,
		"or-button": true,
		"has-color": sideOptions.or !== null,
	});

	const totalClassName = classNames({
		"total-container": true,
		"total-container-first": props.firstChild,
	});

	const complexOptionCardClass = classNames({
		"complex-option-card": true,
		"card":true,
		"background-reactive-river": currentCategory === "River",
		"background-reactive-forest": currentCategory === "Forest",
		"background-reactive-lake": currentCategory === "Lake",
		"background-reactive-others": currentCategory === "Others",
		"background-reactive-hasquery": componentColor,
	});

	return (
		<>
			{/* {props.firstChild && storeQueries.map((indiv) => <div>{JSON.stringify(indiv)}</div>)} */}
			{/* {props.firstChild && <div>{sideQuery}</div>} */}
			{/* {props.firstChild && (
				<div>
					{storeQueries
						.sort((a, b) => a - b)
						.map((item) => {
							return (
								<div>
									{item.key} : {item.query}
								</div>
							);
						})}
				</div>
			)} */}
			<div className="vertical-order h-[500px]">
				<div className="horizontal-order">
					<div className={totalClassName}>
						{sideOptions.or && <div className="back-vertical-line"></div>}
						<div className={complexOptionCardClass}>
							{noSelection && (
								<div className="unset-state">
									<div
										className="plus-sign-contaier"
										onClick={setBackUnsetToFalse}
									>
										<PlusCircleOutlined className="plus-icon" />
									</div>
								</div>
							)}
							{!noSelection && (
								<div className="main-dev">
									<Row gutter={[6]} className="category-center">
										<Col xs={24}>
											<Dropdown menu={menuProps} className="dropdown-box">
												<Button size="large">
													<Space>
														{currentCategory}
														<DownOutlined />
													</Space>
												</Button>
											</Dropdown>
										</Col>
									</Row>
									<Divider />
									{currentCategory === "River" && (
										<>
											<Row gutter={[3]} className="category-stretch">
												<Col xs={10}>
													<span>Distance: </span>
												</Col>
												<Col xs={14}>
													<Input
														type="number"
														onChange={onChangeRMaxDistance}
														placeholder="0.0"
														suffix={"Km"}
														value={sideOptions.river.distance}
													/>
												</Col>
											</Row>
											<Row gutter={[3]} className="category-stretch">
												<Col xs={12}>
													<Form.Item label={"Min Length"} name="R_Min_Length">
														<Input
															type="number"
															onChange={onChangeRMinLength}
															placeholder="0.0"
															suffix={"Km"}
															value={sideOptions.river.length.min}
														/>
													</Form.Item>
												</Col>
												<Col xs={12}>
													<Form.Item label={"Max Length"} name="R_Max_Length">
														<Input
															type="number"
															onChange={onChangeRMaxLength}
															placeholder="0.0"
															suffix={"Km"}
															value={sideOptions.river.length.max}
														/>
													</Form.Item>
												</Col>
											</Row>
											<Row gutter={[3]} className="category-stretch">
												<Col xs={12}>
													<Form.Item label={"Min Width"} name="R_Min_Width">
														<Input
															type="number"
															onChange={onChangeRMinWidth}
															placeholder="0.0"
															suffix={"m"}
															value={sideOptions.river.width.min}
														/>
													</Form.Item>
												</Col>
												<Col xs={12}>
													<Form.Item label={"Max Width"} name="R_Max_Width">
														<Input
															type="number"
															onChange={onChangeRMaxWidth}
															placeholder="0.0"
															suffix={"m"}
															value={sideOptions.river.width.max}
														/>
													</Form.Item>
												</Col>
											</Row>
										</>
									)}
									{currentCategory === "Forest" && (
										<>
											<Row gutter={[3]} className="category-stretch">
												<Col xs={10}>
													<span>Distance: </span>
												</Col>
												<Col xs={14}>
													<Input
														type="number"
														onChange={onChangeFMaxDistance}
														placeholder="0.0"
														suffix={"Km"}
														value={sideOptions.forest.distance}
													/>
												</Col>
											</Row>
											<Row gutter={[3]} className="category-stretch">
												<Col xs={12}>
													<Form.Item label={"Min Area"} name="F_Min_Area">
														<Input
															type="number"
															onChange={onChangeFMinArea}
															placeholder="0.0"
															suffix={"ha"}
															value={sideOptions.forest.area.min}
														/>
													</Form.Item>
												</Col>
												<Col xs={12}>
													<Form.Item label={"Max Area"} name="F_Max_Area">
														<Input
															type="number"
															onChange={onChangeFMaxArea}
															placeholder="0.0"
															suffix={"ha"}
															value={sideOptions.forest.area.max}
														/>
													</Form.Item>
												</Col>
											</Row>
										</>
									)}
									{currentCategory === "Lake" && (
										<>
											<Row gutter={[3]} className="category-stretch">
												<Col xs={10}>
													<span>Distance: </span>
												</Col>
												<Col xs={14}>
													<Input
														type="number"
														onChange={onChangeIMaxDistance}
														placeholder="0.0"
														suffix={"Km"}
														value={sideOptions.lake.distance}
													/>
												</Col>
											</Row>
											<Row gutter={[3]} className="category-stretch">
												<Col xs={12}>
													<Form.Item label={"Min Area"} name="I_Min_Area">
														<Input
															type="number"
															onChange={onChangeIMinArea}
															placeholder="0.0"
															suffix={"ha"}
															value={sideOptions.lake.area.min}
														/>
													</Form.Item>
												</Col>
												<Col xs={12}>
													<Form.Item label={"Max Area"} name="I_Max_Area">
														<Input
															type="number"
															onChange={onChangeIMaxArea}
															placeholder="0.0"
															suffix={"ha"}
															value={sideOptions.lake.area.max}
														/>
													</Form.Item>
												</Col>
											</Row>
										</>
									)}
									{currentCategory === "Others" && (
										<>
											<Row gutter={[3]} className="category-stretch">
												<Col xs={10}>
													<span>Hospital: </span>
												</Col>
												<Col xs={14}>
													<Input
														type="number"
														onChange={onChangeHospitalMaxDistance}
														placeholder="0.0"
														suffix={"Km"}
														value={sideOptions.others.hospital}
													/>
												</Col>
											</Row>
											<Row gutter={[3]} className="category-stretch">
												<Col xs={10}>
													<span>Station: </span>
												</Col>
												<Col xs={14}>
													<Input
														type="number"
														onChange={onChangeStationMaxDistance}
														placeholder="0.0"
														suffix={"Km"}
														value={sideOptions.others.station}
													/>
												</Col>
											</Row>
											<Row gutter={[3]} className="category-stretch">
												<Col xs={10}>
													<span>School: </span>
												</Col>
												<Col xs={14}>
													<Input
														type="number"
														onChange={onChangeSchoolMaxDistance}
														placeholder="0.0"
														suffix={"Km"}
														value={sideOptions.others.school}
													/>
												</Col>
											</Row>
										</>
									)}
								</div>
							)}
							{propsAndCount <= 3 && !noSelection && (
								<div className={andButtonClass} onClick={andComponentToAnd}>
									And
								</div>
							)}
							{!noSelection && (
								<div className={orButtonClass} onClick={addComponentToOn}>
									Or
								</div>
							)}
							{!noSelection && (
								<>
									{props.firstChild && (
										<div
											className="round-button close-button"
											onClick={setBackUnsetToTrue}
											getState={getStateFromComponent}
										>
											<CloseCircleOutlined />
										</div>
									)}
									{!props.firstChild && (
										<div
											className="round-button close-button"
											onClick={props.removeThis}
											getState={getStateFromComponent}
										>
											<CloseCircleOutlined />
										</div>
									)}
								</>
							)}
							<span class="incard top"></span>
							<span class="incard right"></span>
							<span class="incard bottom"></span>
							<span class="incard left"></span>
						</div>
					</div>

					{sideOptions.and && <div className="line-horizontal"></div>}
					{sideOptions.and}
				</div>
				{sideOptions.or && <div className="line-vertical"></div>}
				{sideOptions.or}
			</div>
		</>
	);
};

export default AddOrComponent;
