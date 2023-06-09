import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiServiceUser } from '../../service/api.user';

interface LoginProps {
  email: string;
  password: string;
}

export const loginAction = createAsyncThunk('user/login', async (props: LoginProps) => {
  const result = await ApiServiceUser.login(props.email, props.password);

  return result;
});

interface UserLoggedState {
  id: string;
  name: string;
}
const initialState: UserLoggedState = {
  id: '',
  name: ''
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginAction.pending, () => {
      console.log('loginErrand iniciou...');
    });

    builder.addCase(loginAction.fulfilled, (_, action) => {
      console.log('Finalizou');

      return action.payload.data ?? {};
    });
  }
});

export default loginSlice.reducer;
