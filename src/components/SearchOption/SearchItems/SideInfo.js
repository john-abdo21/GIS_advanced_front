import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { setDetailShow, setGoogleMapShow } from "../../../features/filter/ShowReducer";
import classNames from "classnames";

import "./SideInfo.css";

const SideInfo = () => {
	const dispatch = useDispatch();
	const input = useSelector((state) => state.show.properties, []);
	const store = useSelector((state) => state, []);
	const detailShowState = useSelector((state) => state.show.detailShow, []);
  const showGoogleMap = useSelector(state => state.show.showGoogleMap, []);
	const hideInfoTable = () => {
		dispatch(setDetailShow(false));
	};
	const detailShowClass = classNames({
		"side-info-box": true,
		"side-info-box-hide": !detailShowState,
	});
	const goToGoogleMap = async () => {
		await dispatch(setGoogleMapShow(true));
	}
	const goToOriginal = async () => {
		await dispatch(setGoogleMapShow(false));
	}
	return (
		<div className={detailShowClass}>
			<div>
				<div className="side-info-keys">Type: </div>
				{input.type && <div className="side-info-text">{input.type}</div>}
			</div>
			<div>
				<div className="side-info-keys">ID: </div>
				{input.id && <div className="side-info-text">{input.id}</div>}
			</div>
			<div>
				<div className="side-info-keys">Name: </div>
				{input.name && <div className="side-info-text">{input.name}</div>}
			</div>
			<div>
				<div className="side-info-keys">Location: </div>
				{input.location && (
					<div className="side-info-text">{input.location}</div>
				)}
			</div>
			<div>
				<div className="side-info-keys">Area: </div>
				{input.area && (
					<div className="side-info-text">
						{(input.area / 10000).toFixed(2)}ha
					</div>
				)}
			</div>
			<div>
				<div className="side-info-keys">Height Difference: </div>
				{input.aed && (
					<div className="side-info-text">{input.aed.toFixed(2)}m</div>
				)}
			</div>
			{!showGoogleMap && <CloseCircleOutlined className="close-button" onClick={hideInfoTable} />}
      <div className="to-google-map">
				{!showGoogleMap && <img className="google-map-icon" src="/assets/52434_earth_globe_icon.png" onClick={goToGoogleMap} />}
				{showGoogleMap && <img className="google-map-icon" src="/assets/49408_arrow_back_icon.png" onClick={goToOriginal} />}
      </div>
		</div>
	);
};

export default SideInfo;
