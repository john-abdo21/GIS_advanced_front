import React, { useEffect } from "react";
import AndOrComponent from "./AndOrComponent";
import LandOptions from "./LandOptions";
import SearchButton from "./SearchButton";
import { Row, Col, Input, Form, Divider } from "antd";

import "./SideOptions.css";

const SideOptions = (props) => {
	const tempProps = {
		props: {
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
		},
		and: null,
		or: null,
	};
	const menu = [
		{
			label: "River",
			key: "1",
		},
		{
			label: "Forest",
			key: "2",
		},
		{
			label: "Lake",
			key: "3",
		},
		{
			label: "Others",
			key: "4",
		},
	];

	return (
		<>
			<Row className="modalbody">
				<Col xs={18} offset={3}>
						<LandOptions />
				</Col>
				<Col
					xs={24}
					style={{ maxHeight: "70vh", position: "relative" ,alignItems:'center'}}
				>
					<div className="complex-search-content">
						<AndOrComponent
							firstChild={true}
							restricted={menu}
							andCount={1}
							noSelection={true}
							currentSelection="River"
							queryKey="plot_"
						/>
						<SearchButton onSearchButtonClick={props.clickSearchButton} />
					</div>
				</Col>
			</Row>
		</>
	);
};

export default SideOptions;
