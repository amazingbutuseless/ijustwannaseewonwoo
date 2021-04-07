import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import { AddSceneReducerParameters, SceneItemInterface } from '../../types';

import APIClient from '../../utils/api_client';
import { upload, getUrl } from '../../utils/image_uploader';

const scenesAdapter = createEntityAdapter<SceneItemInterface>({
  sortComparer: (a, b) => {
    if (a.start > b.start) return 1;
    if (a.start < b.start) return -1;
  },
});

const initialState = scenesAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const sceneEntities = `
id
start
end
thumbnail
video {
  videoId
}`;

const getScenesQuery = `
query scenes($videoId: String) {
  scenes(videoId: $videoId) {
    ${sceneEntities}
  }
}`;

const addSceneQuery = `
mutation registerScene($sceneData: registerSceneData) {
  registerScene(data: $sceneData) {
    ${sceneEntities}
  }
}`;

const updateSceneQuery = `
mutation updateScene($sceneData: updateSceneData) {
  updateScene(data: $sceneData) {
    ${sceneEntities}
  }
}`;

export const addScene = createAsyncThunk(
  'scene/addScene',
  async ({ videoId, start, end, thumbnail = null }: AddSceneReducerParameters) => {
    const response = await APIClient.graphql({
      query: addSceneQuery,
      variables: {
        sceneData: {
          videoId,
          start,
          end,
          thumbnail,
        },
      },
    });

    return response.data.registerScene;
  }
);

interface uploadSceneThumbnailParams {
  videoId: string;
  start: number;
  imageUrl: string;
}

export const uploadSceneThumbnail = createAsyncThunk(
  'scene/uploadThumbnail',
  async ({ videoId, start, imageUrl }: uploadSceneThumbnailParams) => {
    const thumbnail = `thumbnail/${videoId}--${start}.jpg`;

    await upload(thumbnail, imageUrl);

    const response = await APIClient.graphql({
      query: updateSceneQuery,
      variables: {
        sceneData: {
          videoId,
          start,
          thumbnail,
        },
      },
    });

    return response.data.updateScene;
  }
);

export const fetchScenes = createAsyncThunk('scenes/fetch', async (videoId: string) => {
  const response = await APIClient.graphql({
    query: getScenesQuery,
    variables: {
      videoId: videoId,
    },
  });

  return response.data.scenes;
});

const ScenesSlice = createSlice({
  name: 'scenes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchScenes.pending]: (state, action) => {
      state.status = 'pending';
    },
    [fetchScenes.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      scenesAdapter.upsertMany(state, action.payload);
    },
    [fetchScenes.rejected]: (state, action) => {
      state.status = 'rejected';
    },
    [addScene.fulfilled]: (state, action) => {
      scenesAdapter.upsertOne(state, action.payload);
    },
    [uploadSceneThumbnail.fulfilled]: (state, action) => {
      scenesAdapter.upsertOne(state, action.payload);
    },
  },
});

export const { selectAll: selectAllScenes } = scenesAdapter.getSelectors((state) => state.scenes);

export const selectAllScenesForVideo = createSelector(
  [selectAllScenes, (state, videoId) => videoId],
  (scenes, videoId) => scenes.filter((scene) => scene.video.videoId === videoId)
);

export default ScenesSlice.reducer;
