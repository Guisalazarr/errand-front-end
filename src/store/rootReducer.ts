import { combineReducers } from '@reduxjs/toolkit';
import errandsReducer from './modules/errandSlice';
import loginReducer from './modules/loginSlice';

export default combineReducers({
  errands: errandsReducer,
  login: loginReducer
});
