// store/userProfileSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, RootState } from '../types';

const initialState: UserProfile = {
  name: '',
  personalInfo: {},
  systems: [],
  tasks: []
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setPersonalInfo(state, action: PayloadAction<{ email?: string; phone?: string }>) {
      state.personalInfo = action.payload;
    },
    addSystemId(state, action: PayloadAction<string>) {
      if (!state.systems.includes(action.payload)) {
        state.systems.push(action.payload);
      }
    },
    addTaskId(state, action: PayloadAction<string>) {
      if (!state.tasks.includes(action.payload)) {
        state.tasks.push(action.payload);
      }
    },
  }
});

export const { setName, setPersonalInfo, addSystemId, addTaskId } = userProfileSlice.actions;
export default userProfileSlice.reducer;
