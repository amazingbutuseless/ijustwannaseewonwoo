import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

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

    signOut(state) {
      state.status = 'signedOut';
      userAdapter.removeAll(state);
    },
  },
  extraReducers: {},
});

export const { signIn, signOut } = userSlice.actions;

export const { selectById: selectUserById } = userAdapter.getSelectors(
  (state: RootState) => state.user
);

export const selectCurrentUser = createSelector(
  (state: RootState) => state,
  () => null,
  (state, _) => {
    return selectUserById(state, state.user.ids[0]);
  }
);

export default userSlice.reducer;
