import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	filterText: "",
	showGoogleMap: false,
	tableshow: false,
  detailShow: false,
	fromTableToDraw: [],
	tableDataKeys: [],
	savedGeomIds: [],
	savedGeomToDraw: [],
	currentPage: 1,
	properties: {},
};

const optionReducer = createSlice({
	name: "optionReducer",
	initialState,
	reducers: {
		setTable2Draw: (state, action) => {
			state.fromTableToDraw = [...action.payload];
		},
		setTableShow: (state, action) => {
			state.tableshow = action.payload;
		},
		setFilterText: (state, action) => {
			state.filterText = action.payload;
		},
		setTableDataKeys: (state, action) => {
			state.tableDataKeys = [...action.payload];
		},
		setSavedGeom: (state, action) => {
			state.savedGeomToDraw = [...action.payload];
		},
		setSavedGeomIds: (state, action) => {
			state.savedGeomIds = [...action.payload];
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		setProperties: (state, action) => {
			state.properties = action.payload;
		},
		setDetailShow: (state, action) => {
			state.detailShow = action.payload;
		},
		setGoogleMapShow: (state, action) => {
			state.showGoogleMap = action.payload;
		},
	},
});
export const {
	setTable2Draw,
	setTableShow,
	setFilterText,
	setTableDataKeys,
	setSavedGeom,
	setSavedGeomIds,
	setCurrentPage,
	setProperties,
  setDetailShow,
	setGoogleMapShow,
} = optionReducer.actions;
export default optionReducer.reducer;
