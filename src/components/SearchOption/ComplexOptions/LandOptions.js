import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Input, Form, Divider } from "antd";
import { setLandQuery } from "../../../features/filter/ComplexOptionReducer";
// import constants from "./costants.json"

const LandOptions = () => {
	const dispatch = useDispatch();
	const [landOption, setLandOption] = useState({
		area: {
			min: "",
			max: "",
		},
		aed: {
			min: "",
			max: "",
		},
	});
	const currentQuery = useSelector((state) => state.complex.query, []);
	const [queryHead, setQueryHead] = useState(currentQuery);

	const constants = {
		PLOT_TABLE_NAME: "test_pl_plot3857_small",
	};

	let tempQuery = queryHead
		? queryHead
		: "SELECT *, ST_AsGeoJson(ST_Transform(geom, 3857)) FROM " + constants.PLOT_TABLE_NAME + " ";

	const onChangeLandMinArea = (e) => {
		setLandOption({
			...landOption,
			area: {
				...landOption.area,
				min: e.target.value,
			},
		});
		if (
			(landOption.area.max === "" || parseFloat(e.target.value) <= landOption.area.max) &&
			parseFloat(e.target.value) >= 0
		) {
			const toReplace = "area >= " + e.target.value * 10000 + " ";
			if (tempQuery.includes("WHERE")) {
				if (tempQuery.includes("area >=")) {
					tempQuery = tempQuery.replace(
						/area\s>=\s((\d)*(\.)*(\d*))\s/g,
						toReplace
					);
				} else {
					tempQuery += "AND " + toReplace;
				}
			} else {
				tempQuery += "WHERE " + toReplace;
			}
			setQueryHead(tempQuery);
			dispatch(setLandQuery(tempQuery));
		}
	};

	const onChangeLandMaxArea = (e) => {
		setLandOption({
			...landOption,
			area: {
				...landOption.area,
				max: e.target.value,
			},
		});
		if (
			(landOption.area.min === "" || parseFloat(e.target.value) >= landOption.area.min) &&
			parseFloat(e.target.value) >= 0
		) {
			const toReplace = "area <= " + e.target.value * 10000 + " ";
			if (tempQuery.includes("WHERE")) {
				if (tempQuery.includes("area <=")) {
					tempQuery = tempQuery.replace(
						/area\s<=\s((\d)*(\.)*(\d*))\s/g,
						toReplace
					);
				} else {
					tempQuery += "AND " + toReplace;
				}
			} else {
				tempQuery += "WHERE " + toReplace;
			}
			setQueryHead(tempQuery);
			dispatch(setLandQuery(tempQuery));
		}
	};

	const onChangeLandMinAed = (e) => {
		setLandOption({
			...landOption,
			aed: {
				...landOption.aed,
				min: e.target.value,
			},
		});
		if (
			(landOption.aed.max === "" || parseFloat(e.target.value) <= landOption.aed.max) &&
			parseFloat(e.target.value) >= 0
		) {
			const toReplace = "aed >= " + e.target.value + " ";
			if (tempQuery.includes("WHERE")) {
				if (tempQuery.includes("aed >=")) {
					tempQuery = tempQuery.replace(
						/aed\s>=\s((\d)*(\.)*(\d*))\s/g,
						toReplace
					);
				} else {
					tempQuery += "AND " + toReplace;
				}
			} else {
				tempQuery += "WHERE " + toReplace;
			}
			setQueryHead(tempQuery);
			dispatch(setLandQuery(tempQuery));
		}
	};

	const onChangeLandMaxAed = (e) => {
		setLandOption({
			...landOption,
			aed: {
				...landOption.aed,
				max: e.target.value,
			},
		});
		if (
			(landOption.aed.min === "" || parseFloat(e.target.value) >= landOption.aed.min) &&
			parseFloat(e.target.value) >= 0
		) {
			const toReplace = "aed <= " + e.target.value + " ";
			if (tempQuery.includes("WHERE")) {
				if (tempQuery.includes("aed <=")) {
					tempQuery = tempQuery.replace(
						/aed\s<=\s((\d)*(\.)*(\d*))\s/g,
						toReplace
					);
				} else {
					tempQuery += "AND " + toReplace;
				}
			} else {
				tempQuery += "WHERE " + toReplace;
			}
			setQueryHead(tempQuery);
			dispatch(setLandQuery(tempQuery));
		}
	};

	return (
		<div style={{width:'100%',backgroundColor:'#ffffff99',padding:'20px',borderRadius:'20px',marginBottom:'20px'}}>
				<h3 class="text-center">Land Option</h3>
			<Row> 
				<Col xs={8} offset={4}>
					<Row aria-orientation="center" style={{ paddingBottom: "15px" }}>
						<Col xs={24} >
							<Row area-aria-orientation="center">
								<Col xs={8}>
									<span>Min Area: </span>
								</Col>
								<Col xs={8}>
									<Input
										type="number"
										onChange={onChangeLandMinArea}
										placeholder="0.0"
										suffix={"ha"}
										className="darkThem"
										value={landOption.area.min}
									/>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row aria-orientation="center" style={{ paddingBottom: "15px" }}>
						<Col xs={24}>
							<Row area-aria-orientation="center">
								<Col xs={8}>
									<span>Max Area: </span>
								</Col>
								<Col xs={8}>
									<Input
										type="number"
										onChange={onChangeLandMaxArea}
										placeholder="0.0"
										suffix={"ha"}
										value={landOption.area.max}
									/>
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
					<Col xs={12}>
					<Row aria-orientation="center" style={{ paddingBottom: "15px" }}>
						<Col xs={24}>
							<Row area-aria-orientation="center">
								<Col xs={10}>
									<span>Min Hight Difference: </span>
								</Col>
								<Col xs={6}>
									<Input
										type="number"
										onChange={onChangeLandMinAed}
										placeholder="0.0"
										suffix={"m"}
										value={landOption.aed.min}
									/>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row aria-orientation="center" style={{ paddingBottom: "15px" }}>
						<Col xs={24}>
							<Row area-aria-orientation="center">
								<Col xs={10}>
									<span>Max Height Difference: </span>
								</Col>
								<Col xs={6}>
									<Input
										type="number"
										onChange={onChangeLandMaxAed}
										placeholder="0.0"
										suffix={"m"}
										value={landOption.aed.max}
									/>
								</Col>
							</Row>
						</Col>
					</Row> 
				</Col>
			</Row>
			</div>
	);
};

export default LandOptions;
