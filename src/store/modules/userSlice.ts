import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiServiceUser } from '../../service/api.user';
import { CreateUserProps, User } from '../../models/user.models';

export const createUserAction = createAsyncThunk('user/create', async (props: CreateUserProps) => {
  const result = await ApiServiceUser.createUser(props);

  return result;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: [] as User[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createUserAction.fulfilled, (_, action) => {
      return action.payload.data ?? {};
    });
  }
});

export default userSlice.reducer;
