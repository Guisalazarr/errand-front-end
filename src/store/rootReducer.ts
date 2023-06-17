import { combineReducers } from '@reduxjs/toolkit';
import errandsReducer from './modules/errandSlice';
import loginReducer from './modules/loginSlice';
import titleReducer from './modules/titleSlice';

export default combineReducers({
  errands: errandsReducer,
  login: loginReducer,
  title: titleReducer
});
