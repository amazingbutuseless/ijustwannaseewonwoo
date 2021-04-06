import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createAction,
} from '@reduxjs/toolkit';

interface IUser {
  email: string;
  id: string;
  name: string;
  token: string;
}

const userAdapter = createEntityAdapter<IUser>();

const initialState = userAdapter.getInitialState({
  status: 'signedOut',
  error: null,
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn(state, action) {
      state.status = 'signedIn';
      userAdapter.upsertOne(state, action.payload);
    },

    signOut(state, action) {
      state.status = 'signedOut';
      userAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: {},
});

export const { signIn, signOut } = userSlice.actions;

export const { selectById: selectUserById } = userAdapter.getSelectors((state) => state.user);

export const selectCurrentUser = createSelector(
  (state) => state,
  () => null,
  (state, _) => {
    return selectUserById(state, state.user.ids[0]);
  }
);

export default userSlice.reducer;
