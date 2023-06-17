import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiServiceErrand } from '../../service/api.errand';
import {
  CreateErrandProps,
  DeleteErrandProps,
  Errand,
  ListErrandProps,
  SearchErrandProps,
  UpdateErrandProps
} from '../../models/errands.models';

export const listErrandsAction = createAsyncThunk('errands/list', async (props: ListErrandProps) => {
  const result = await ApiServiceErrand.listErrands(props);

  return result;
});
export const searchErrandAction = createAsyncThunk('errands/list', async (props: SearchErrandProps) => {
  const result = await ApiServiceErrand.searchErrand(props);

  return result;
});

export const createErrandAction = createAsyncThunk('errands/create', async (props: CreateErrandProps) => {
  const result = await ApiServiceErrand.createErrand(props);

  return result;
});

export const deleteErrandAction = createAsyncThunk('errands/delete', async (props: DeleteErrandProps) => {
  const result = await ApiServiceErrand.deleteErrand(props);

  return result;
});

export const updateErrandAction = createAsyncThunk('errands/update', async (props: UpdateErrandProps) => {
  const result = await ApiServiceErrand.updateErrand(props);

  return result;
});

export const errandSlice = createSlice({
  name: 'errands',
  initialState: [] as Errand[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(listErrandsAction.fulfilled, (_, action) => {
      return action.payload.data ?? [];
    });
    builder.addCase(createErrandAction.fulfilled, (_, action) => {
      return action.payload.data?.errand ?? [];
    });

    builder.addCase(deleteErrandAction.fulfilled, (_, action) => {
      return action.payload.data ?? [];
    });
    builder.addCase(updateErrandAction.fulfilled, (_, action) => {
      return action.payload.data ?? [];
    });
  }
});

export default errandSlice.reducer;
