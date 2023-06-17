import { createSlice } from '@reduxjs/toolkit';

interface titleProps {
  title: string;
}

const initialState: titleProps = {
  title: ''
};

export const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    createTitle: (state, action) => action.payload
  }
});
export const { createTitle } = titleSlice.actions;
export default titleSlice.reducer;
