import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Input, Button, Row, Col, Divider, Collapse } from "antd";
import Error from "./Error";
import ButtonGlow from "./ButtonGlow";
import ComplexSearch from "./ButtonGlow/ComplexSearch";
import SideOptions from "./ComplexOptions/SideOptions";
import SearchItems from "./SearchItems";
import OptionDesc from "./SearchItems/OptionDesc";

import { fetchFilter } from "../../features/filter/FilterSlice";
import { hide } from "../../features/filter/StateReducer";
import "../../features/filter/filter.module.css";

import ItemsToSearch from "./Options/ItemsToSearch";

import ForestOptions from "./Options/ForestOptions";
import RiverOptions from "./Options/RiverOptions";
import LakeOptions from "./Options/LakeOptions";
import TownOptions from "./Options/TownOptions";

import "./OptionCard.css";

const OptionCard = () => {
	const [enabled, setEnabled] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isComplexModalOpen, setIsComplexModalOpen] = useState(false);

	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		dispatch(fetchFilter(options));
		dispatch(hide());
		setIsModalOpen(false);
	};
	const loading = useSelector((state) => state.filter.loading, []);
	const store = useSelector((state) => state, []);
	const options = store.options;
	const showModal = () => {
		setIsModalOpen(true);
	};
	const showComplexModal = () => {
		setIsComplexModalOpen(true);
	};
	const hideComplexModal = () => {
		setIsComplexModalOpen(false);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		setIsComplexModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setIsComplexModalOpen(false);
	};

	const items = [
		{
			key: "1",
			label:
				options.options.forest.minDistance ||
				options.options.forest.maxDistance ||
				options.options.forest.minArea ||
				options.options.forest.maxArea
					? "Forest"
					: "Forest (Unset)",
			children: <ForestOptions />,
		},
		{
			key: "2",
			label:
				options.options.river.minDistance ||
				options.options.river.maxDistance ||
				options.options.river.minLength ||
				options.options.river.maxLength ||
				options.options.river.minWidth ||
				options.options.river.maxWidth
					? "River"
					: "River (Unset)",
			children: <RiverOptions />,
		},
		{
			key: "3",
			label:
				options.options.lake.minDistance ||
				options.options.lake.maxDistance ||
				options.options.lake.minArea ||
				options.options.lake.maxArea
					? "Lake"
					: "Lake (Unset)",
			children: <LakeOptions />,
		},
		{
			key: "4",
			label:
				options.options.town.hospitalLabel ||
				options.options.town.stationLabel ||
				options.options.town.schoolLabel
					? "Others"
					: "Others (Unset)",
			children: <TownOptions />,
		},
	];

	return (
		<>
			{/* <ButtonGlow onClick={showModal} /> */}
			<ComplexSearch onClick={showComplexModal} />
			<SearchItems />
			<OptionDesc />

			<Modal
				title="Search Options"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				className="option-modal"
				footer={[]}
			>
				<Form layout="vertical" onFinish={handleSubmit}>
					<Divider plain>
						{" "}
						<span>
							<h5>- Land Feature -</h5>
						</span>{" "}
					</Divider>
					<Row justify="center">
						<ItemsToSearch />
					</Row>

					<Divider plain>
						{" "}
						<span>
							<h5>- Search Condition -</h5>
						</span>{" "}
					</Divider>
					<Collapse items={items} bordered={false} />

					<Row justify="center">
						<Error />
					</Row>

					<Form.Item
						style={{
							marginRight: "15px",
							marginBottom: "-10px",
							marginTop: "10px",
						}}
					>
						<Row justify="end">
							<Col>
								<Button type="primary" htmlType="submit">
									Search
								</Button>
							</Col>
						</Row>
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				open={isComplexModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				className="option-modal"
				height="600px"
				width="1100px"
				footer={[]}
			>
				<SideOptions clickSearchButton={hideComplexModal} />
			</Modal>
		</>
	);
};

export default OptionCard;
