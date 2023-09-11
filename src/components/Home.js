import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MapView from "../features/mapView/MapView";
import OptionCard from "./SearchOption/OptionCard";
import SideInfo from "./SearchOption/SearchItems/SideInfo";
import GoogleMap from "./GoogleMap";
import App from "./setting";
import { Button, Row } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { toggleView1 } from "../features/filter/StateReducer";
import { hide } from "../features/filter/StateReducer";
import { setTableShow } from "../features/filter/ShowReducer";
const Home = () => {
	const dispatch = useDispatch();
	const loading_andOpe = useSelector((state) => state.complex.loading, []);
	const loading_complex = useSelector((state) => state.complex.loading, []);
	const showGoogleMap = useSelector((state) => state.show.showGoogleMap, []);
	const setView1 = () => {
		dispatch(toggleView1());
	};
	const setShowJsonTableTrue = () => {
		dispatch(setTableShow(true));
	};
	useEffect(() => {
		dispatch(hide());
	}, [dispatch]);
	return (
		<Row style={{ height: "100%", width: "100%" }}>
			{!showGoogleMap && <OptionCard />}
			{!showGoogleMap && (
				<Button
					type="primary"
					loading={loading_andOpe || loading_complex}
					className="setting_btn"
					onClick={setShowJsonTableTrue}
				>
					{(loading_andOpe || loading_complex) ? "Loading..." : "Detailed Information"}
				</Button>
			)}
			{/* <Button type="primary" onClick={setView1} icon={<DownloadOutlined />} loading={loading} className='setting_btn'>
        {loading ? 'Loading...' : 'DefineData'}
      </Button> */}
			{!showGoogleMap && <App />}
			{!showGoogleMap && <MapView />}
			<SideInfo />
			{showGoogleMap && <GoogleMap />}
		</Row>
	);
};
export default Home;
