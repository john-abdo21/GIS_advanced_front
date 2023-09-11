import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FilterApi } from "../../app/FetchAPI";

export const fetchComplexReducer = createAsyncThunk(
	"filter/fetchComplexReducer",
	async (filter) => {
		const response = await FilterApi.post("/api/advancedSearch", {
			data: filter,
		});
		console.log("response from advanced search", JSON.parse(response.data));
		return JSON.parse(response.data);
	}
);

const initialState = {
	landQuery: "",
	sideQuery: "",
	totalQuery: "",
	advancedSearch: null,
	loading: false,
	error: null,
	queriesFromComponents: [],
	TotalQueryFromComponents: '',
};

const complexOptionReducer = createSlice({
	name: "complexOptionReducer",
	initialState,
	reducers: {
		setLandQuery: (state, action) => {
			state.landQuery = action.payload;
		},
		setSideQuery: (state, action) => {
			state.sideQuery = action.payload;
		},
		setTotalQuery: (state, action) => {
			state.totalQuery = action.payload;
		},
		setQueriesFromComponents: (state, action) => {
			state.queriesFromComponents = [...action.payload];
		},
		setTotalQueryFromComponents: (state, action) => {
			state.TotalQueryFromComponents = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchComplexReducer.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchComplexReducer.fulfilled, (state, action) => {
				state.loading = false;
				state.advancedSearch = action.payload;
			})
			.addCase(fetchComplexReducer.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const {
	setLandQuery,
	setSideQuery,
	setTotalQuery,
	setQueriesFromComponents,
	setTotalQueryFromComponents
} = complexOptionReducer.actions;
export default complexOptionReducer.reducer;
