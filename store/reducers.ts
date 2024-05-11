// src/store/reducers.ts
import { combineReducers } from '@reduxjs/toolkit';
import userProfileReducer from './userProfileSlice';
import systemsReducer from './systemsSlice';
import tasksReducer from './tasksSlice';

const rootReducer = combineReducers({
  userProfile: userProfileReducer,
  systems: systemsReducer,
  tasks: tasksReducer,
});

export default rootReducer;
