import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import type { RootState } from '../../store';

import { ThumbnailImageUrl, SceneItemInterface, SceneTimecodeInterface, Video } from '../../types';

import APIClient from '../../utils/api_client';
import { upload } from '../../utils/image_uploader';

interface AddSceneReducerParams extends Video, SceneTimecodeInterface {
  thumbnail?: ThumbnailImageUrl;
}

interface UploadSceneThumbnailParams extends Video {
  start: number;
  imageUrl: ThumbnailImageUrl;
}

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
  async ({ videoId, start, end, thumbnail = null }: AddSceneReducerParams) => {
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

export const uploadSceneThumbnail = createAsyncThunk(
  'scene/uploadThumbnail',
  async ({ videoId, start, imageUrl }: UploadSceneThumbnailParams) => {
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
  extraReducers(builder) {
    builder.addCase(fetchScenes.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(fetchScenes.fulfilled, (state, action) => {
      state.status = 'succeeded';
      scenesAdapter.upsertMany(state, action.payload);
    });

    builder.addCase(fetchScenes.rejected, (state) => {
      state.status = 'rejected';
    });

    builder.addCase(addScene.fulfilled, (state, action) => {
      scenesAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(uploadSceneThumbnail.fulfilled, (state, action) => {
      scenesAdapter.upsertOne(state, action.payload);
    });
  },
});

export const { selectAll: selectAllScenes } = scenesAdapter.getSelectors(
  (state: RootState) => state.scenes
);

export const selectAllScenesForVideo = createSelector(
  [selectAllScenes, (state: RootState, videoId: string) => videoId],
  (scenes, videoId) => scenes.filter((scene) => scene.video.videoId === videoId)
);

export default ScenesSlice.reducer;
