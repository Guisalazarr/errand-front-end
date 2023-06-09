import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ErrandType from '../../types/ErrandType';
import { ApiServiceErrand } from '../../service/api.errand';

interface ListErrandProps {
  id: string;
}

interface createErrandProps {
  id: string;
  title: string;
  description: string;
}

interface deleteErrandProps {
  id: string;
  errandId: string;
}

interface updateErrandProps {
  id: string;
  errandId: string;
  title: string;
  description: string;
}

export const listErrandsAction = createAsyncThunk('errands/list', async (props: ListErrandProps) => {
  const result = await ApiServiceErrand.listErrands(props.id);

  return result;
});

export const createErrandAction = createAsyncThunk('errands/create', async (props: createErrandProps) => {
  const result = await ApiServiceErrand.createErrand(props.id, props.title, props.description);

  return result;
});

export const deleteErrandAction = createAsyncThunk('errands/delete', async (props: deleteErrandProps) => {
  const result = await ApiServiceErrand.deleteErrand(props.id, props.errandId);

  return result;
});

export const updateErrandAction = createAsyncThunk('errands/update', async (props: updateErrandProps) => {
  const result = await ApiServiceErrand.updateErrand(props.id, props.errandId, props.title, props.description);

  return result;
});

export const errandSlice = createSlice({
  name: 'errands',
  initialState: [] as ErrandType[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(listErrandsAction.pending, () => {
      console.log('listErrnads iniciou...');
    });

    builder.addCase(listErrandsAction.fulfilled, (_, action) => {
      console.log('Finalizou');

      return action.payload.data ?? [];
    });
  }
});

export default errandSlice.reducer;
