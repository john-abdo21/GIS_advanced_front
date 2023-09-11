import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "antd";
import {
  SaveFilled,
  SaveOutlined,
  CheckCircleFilled,
  LineHeightOutlined,
} from "@ant-design/icons";

import SearchBox from "./utils/searchBox";
import { setTable2Draw, setTableDataKeys, setSavedGeom, setSavedGeomIds } from "../features/filter/ShowReducer";

const JsonTable = ({ jsonData }) => {
  const dispatch = useDispatch();
  const store_show = useSelector((state) => state.show);
  const filterText = store_show.filterText;
  const savedRowsInfo = store_show.savedGeomIds;
  const tableDataKeys = store_show.tableDataKeys;

  const [bookmarkedRows, setBookmarkedRows] = useState([...tableDataKeys]);
  const [savedRows, setSavedRows] = useState([...savedRowsInfo]);
  const [bookmarkedAll, setBookmarkedAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const header = ["Id", "Name", "Location"];

  useEffect(() => {
    saveBookmarkedRowsToDatabase();
  }, [bookmarkedRows]);

  const saveBookmarkedRowsToDatabase = () => {};
  if (jsonData && jsonData.length > 0) {
    const tempData = [...Object.keys(jsonData[0])]
    const realData = [tempData[0], tempData[1], tempData[2]]

    const handleBookmarkToggleAll = async () => {
      if (bookmarkedAll) {
        await setBookmarkedAll(false);
        await setBookmarkedRows([]);
        await dispatch(setTable2Draw([]));
      } else {
        await setBookmarkedAll(true);
        const response = await [];
        await jsonData.forEach((item) => {
          response.push(JSON.parse(item));
        });
        await dispatch(setTable2Draw(response));
        await setBookmarkedRows(dataSource.map((row) => row[1]));
      }
    };

    // const saveData = async (record) => {
    //   const tempRows = savedRows;
    //   const isSaved = tempRows.includes(record[0]);
    //   if (isSaved) {
    //     const index = await tempRows.findIndex((row) => row == record[0]);
    //     const removed = await tempRows.splice(index, 1);
    //     if (removed) await setSavedRows([...tempRows]);
    //     await alert("Location " + removed[0] + " is removed.");
    //   } else {
    //     const result = await tempRows.push(record[0]);
    //     await setSavedRows([...tempRows]);
    //     await alert("Location " + record[0] + " is saved.");
    //   }
    //   const response = await [];
    //   await tempRows.forEach(async (item) => {
    //     const idx = await jsonData.findIndex((row) => row[1] == item);
    //     await response.push(jsonData[idx]);
    //   });
    //   await dispatch(setSavedGeom(response));
    //   await dispatch(setSavedGeomIds(savedRows));
    // };
    const saveData = async (record) => {
      const tempRows = savedRows;
      const isSaved = tempRows.includes(record[0]);
      if (isSaved) {
        const index = await tempRows.findIndex((row) => row == record[0]);
        const removed = await tempRows.splice(index, 1);
        if (removed) await setSavedRows([...tempRows]);
        await alert("Location " + removed[0] + " is removed.");
      } else {
        const result = await tempRows.push(record[0]);
        await setSavedRows([...tempRows]);
        await alert("Location " + record[0] + " is saved.");
      }
      const response = await [];
      await tempRows.forEach(async (item) => {
        const idx = await jsonData.findIndex((row) => row[2] == item);
        await response.push(jsonData[idx]);
      });
      await dispatch(setSavedGeom(response));
      await dispatch(setSavedGeomIds(savedRows));
    };

    // const handleRowClick = async (record) => {
    //   const isBookmarked = await bookmarkedRows.includes(record[0]);
    //   if (isBookmarked) {
    //     const index = await bookmarkedRows.findIndex(
    //       (row) => row == record[0]
    //     );
    //     const removed = await bookmarkedRows.splice(index, 1);
    //     if (removed) await setBookmarkedRows([...bookmarkedRows]);
    //   } else {
    //     const result = await bookmarkedRows.push(record[0]);
    //     await setBookmarkedRows([...bookmarkedRows]);
    //   }
    //   const response = await [];
    //   await bookmarkedRows.forEach(async (item) => {
    //     const idx = await jsonData.findIndex((row) => row[1] == item);
    //     await response.push(jsonData[idx]);
    //   });
    //   await dispatch(setTable2Draw(response));
    //   console.log('bookmarkedRows',bookmarkedRows)
    //   await dispatch(setTableDataKeys(bookmarkedRows));
    // };
    const handleRowClick = async (record) => {
      const isBookmarked = await bookmarkedRows.includes(record[0]);
      if (isBookmarked) {
        const index = await bookmarkedRows.findIndex(
          (row) => row == record[0]
        );
        const removed = await bookmarkedRows.splice(index, 1);
        if (removed) await setBookmarkedRows([...bookmarkedRows]);
      } else {
        const result = await bookmarkedRows.push(record[0]);
        await setBookmarkedRows([...bookmarkedRows]);
      }
      const response = await [];
      console.log('bookmarkedRows', bookmarkedRows);
      await bookmarkedRows.forEach(async (item) => {
        const idx = await jsonData.findIndex((row) => row[2] == item);
        await response.push(JSON.parse(jsonData[idx][12]));
      });
      await dispatch(setTable2Draw(response));
      console.log('bookmarkedRows',bookmarkedRows)
      await dispatch(setTableDataKeys(bookmarkedRows));
    };

    const goToPage = (page) => {
      setCurrentPage(page);
    };

    console.log(jsonData);

    // const dataSource = jsonData.reduce((acc, item, index) => {
    //   if (
    //     item[1].includes(filterText) ||
    //     item[2].includes(filterText) ||
    //     item[3].includes(filterText)
    //   ) {
    //     const filteredItem = [item[1], item[2], item[3]];
    //     acc.push({ ...filteredItem, key: String(index + 1) });
    //   }
    //   return acc;
    // }, []);

    const dataSource = jsonData.reduce((acc, item, index) => {
      if (
        item[2].includes(filterText) ||
        item[6].includes(filterText) ||
        item[7].includes(filterText)
      ) {
        const filteredItem = [item[2], item[6], item[7]];
        acc.push({ ...filteredItem, key: String(index + 1) });
      }
      return acc;
    }, []);

    const columns = [
      {
        title: () => (
          <Button
            icon={bookmarkedAll ? <CheckCircleFilled /> : false}
            onClick={() => handleBookmarkToggleAll()}
          />
        ),
        dataIndex: "key",
        key: "key",
        fixed: "left",
        width: 50,
        render: (_, record) => (
          <Button
            icon={
              bookmarkedRows.includes(record[0]) ? (
                <CheckCircleFilled style={{ fontSize: "20px" }} />
              ) : (
                false
              )
            }
            onClick={() => handleRowClick(record)}
          />
        ),
      },
      ...realData.map((key, index) => ({
        title: header[key],
        dataIndex: key,
        key: key,
        render: (_, record) => (
          <div onClick={() => handleRowClick(record)}>
            <span>{record[index]}</span>
          </div>
        ),
      })),
      {
        title: "",
        render: (_, record) => (
          <Button
            icon={
              savedRows.includes(record[0]) ? (
                <SaveFilled style={{ fontSize: "20px" }} />
              ) : (
                <SaveOutlined style={{ fontSize: "20px" }} />
              )
            }
            onClick={(e) => {
              e.preventDefault();
              saveData(record);
            }}
          />
        ),
      },
    ];

    return (
      <>
        <SearchBox />
        <Table
          dataSource={dataSource}
          columns={columns}
          size="small"
          className="striped-table"
          pagination={{
            pageSize: 10,
            // current: currentPage
          }}
        />
      </>
    );
  }
};

export default JsonTable;
