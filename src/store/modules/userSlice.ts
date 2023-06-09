import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiServiceUser } from '../../service/api.user';
import UserType from '../../types/UserType';

interface createUserProps {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export const createUserAction = createAsyncThunk('user/create', async (props: createUserProps) => {
  const result = await ApiServiceUser.create(props.name, props.email, props.password, props.repeatPassword);

  return result;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: [] as UserType[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createUserAction.pending, () => {
      console.log('UserCreate iniciou...');
    });

    builder.addCase(createUserAction.fulfilled, (_, action) => {
      console.log('Finalizou');

      return action.payload.data ?? {};
    });
  }
});

export default userSlice.reducer;
