import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Delta {
  hour: number;
  day: number;
  week: number;
  month: number;
  quarter: number;
  year: number;
}

interface AssetData {
  _id: string;
  code: string;
  rate: number;
  volume: number;
  cap: number;
  timestamp: string;
  delta: Delta;
}

interface AssetState {
  data: AssetData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AssetState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchAssetData = createAsyncThunk(
  'asset/fetchAssetData',
  async (asset: string) => {
    const response = await axios.get(`http://localhost:5000/api/stocks/${asset}`);
    return response.data;
  }
);

const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssetData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAssetData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAssetData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const { setData } = assetSlice.actions;

export default assetSlice.reducer;
