
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FilterApi } from '../../app/FetchAPI';
export const fetchFilter = createAsyncThunk(
  'filter/fetchFilter',

  async (filter) => {
    const response = await FilterApi.post("/api/complexSearch",
      {
        data: filter
      });
    const landResult = response.data[0]
    const forestResult = response.data[1]
    const riverResult = response.data[2]
    const inlandwaterResult = response.data[3]
    const othersResult = response.data[4]
    const unionResult = response.data[5]
    const finalResult = {
      'land': landResult,
      'forest': forestResult,
      'river': riverResult,
      'inlandwater': inlandwaterResult,
      'others': othersResult,
      'union': unionResult
    }
    return finalResult;
  }
);

const initialState = {
  searchFilter: ['','','','','',''],
  loading: false,
  error: null,
};

const fetchSlice = createSlice({
  name: 'filterRiver',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.searchFilter = action.payload;

      })
      .addCase(fetchFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default fetchSlice.reducer;