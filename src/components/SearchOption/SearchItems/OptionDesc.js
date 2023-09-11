import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { CloseCircleOutlined, SaveOutlined } from "@ant-design/icons";
import Bookmark from "./Bookmark";

import { setTableShow, setCurrentPage, setTableDataKeys } from "../../../features/filter/ShowReducer";

import JsonTable from "../../../components/JsonTable";

import "./OptionDesc.css";

const OptionDesc = (props) => {
  const store = useSelector((state) => state, []);

  const dispatch = useDispatch();

  const [currentPage, setPage] = useState(1);

  // const tableData = store.filter.searchFilter.land;
  const tableData = store.complex.advancedSearch;
  const savedData = store.show.savedGeomToDraw;
  const isActive = store.show.tableshow;

  const onChangeCurrentPage = page => {
    setPage(page)
    dispatch(setCurrentPage(page))
  }

  const cardClass = classNames({
    "option-card": true,
    "option-card-hide": !isActive,
  });

  const hideJsonTable = () => {
    dispatch(setTableShow(false));
  };

  // const saveSelected = () => {

  // }

  return (
    <div className={cardClass}>
      <CloseCircleOutlined className="close-button" onClick={hideJsonTable} />
      {currentPage === 1 ?
      <div>
        {tableData ? <JsonTable jsonData={tableData} /> : "No data to show"}
      </div> :
      currentPage === 2 ?
      <div>
        {tableData ? <JsonTable jsonData={savedData} /> : "No data to show"}
      </div> :
      <div>Detailed info</div> 
      }
      {/* <SaveOutlined className="save-button" onClick={saveSelected} /> */}

      <Bookmark
        key="1"
        color="white"
        text="All Plots"
        background="#aa0000aa"
        top="0px"
        pageNum="1"
        action={() => onChangeCurrentPage(1)}
      />
      <Bookmark
        key="2"
        color="white"
        text="Saved Plots"
        background="#0000aaaa"
        top="101px"
        pageNum="2"
        action={() => {
          onChangeCurrentPage(2);
          dispatch(setTableDataKeys([]));
        }}
      />
      {/* <Bookmark
        key="3"
        color="white"
        text="Detailed Info"
        background="#005555aa"
        top="202px"
        pageNum="3"
        action={() => onChangeCurrentPage(3)}
      /> */}
    </div>
  );
};

export default OptionDesc;
