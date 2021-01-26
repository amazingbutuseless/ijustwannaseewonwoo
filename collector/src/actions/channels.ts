import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

import { client } from './apiClient';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchChannels = createAsyncThunk('channels/fetchChannels', async () => {
  const response = await client.graphql({
    query: `
query channels { 
  channels {
    id
    title
    thumbnails {
      default
      high
    }
  }
}`,
    variables: {},
  });

  return response.data.channels;
});

const ChannelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchChannels.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchChannels.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      channelsAdapter.upsertMany(state, action.payload);
    },
    [fetchChannels.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default ChannelsSlice.reducer;

export const { selectAll: selectAllChannels } = channelsAdapter.getSelectors(
  (state) => state.channels
);
