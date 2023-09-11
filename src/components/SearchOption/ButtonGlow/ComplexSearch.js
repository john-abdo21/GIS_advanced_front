import React from "react";
import { FileSearchOutlined } from "@ant-design/icons";
import "./css.css";

const ButtonGlow = ({ onClick }) => {
	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	};
	return (
		<div className="option_area_complex" onClick={handleClick}>
			<div className="option_toggle">
				<div className="option_icon">
					{/* <div className="option_horizontal"></div>
                    <div className="option_vertical"></div> */}
					<FileSearchOutlined
						style={{
							fontSize: "26px",
							color: "#0ADACD",
						}}
					/>
				</div>
			</div>
			<div className="option_bubble"></div>
		</div>
	);
};

export default ButtonGlow;
