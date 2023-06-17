import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiServiceUser } from '../../service/api.user';
import { LoginProps, UserLogged } from '../../models/login.models';

export const loginAction = createAsyncThunk('user/login', async (props: LoginProps) => {
  const result = await ApiServiceUser.login(props);

  return result;
});

const initialState: UserLogged = {
  id: '',
  name: ''
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearUserLogged: () => initialState
  },
  extraReducers: builder => {
    builder.addCase(loginAction.fulfilled, (_, action) => {
      return action.payload.data ?? {};
    });
  }
});
export const { clearUserLogged } = loginSlice.actions;
export default loginSlice.reducer;
