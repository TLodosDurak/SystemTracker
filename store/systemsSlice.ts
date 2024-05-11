// store/systemsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { System, RootState } from '../types';

interface SystemsState {
  byId: { [key: string]: System };
  allIds: string[];
  selectedSystemId: string | null;
}

const initialState: SystemsState = {
  byId: {},
  allIds: [],
  selectedSystemId: null
};

const systemsSlice = createSlice({
  name: 'systems',
  initialState,
  reducers: {
    addSystem(state, action: PayloadAction<System>) {
      const system = action.payload;
      if (!state.byId[system.id]) {
        state.byId[system.id] = system;
        state.allIds.push(system.id);
      }
    },
    selectSystem(state, action: PayloadAction<string>) {
      state.selectedSystemId = action.payload;
    },
    addTaskToSystem(state, action: PayloadAction<{ systemId: string; taskId: string }>) {
      const { systemId, taskId } = action.payload;
      if (state.byId[systemId]) {
        state.byId[systemId].tasks.push(taskId);
      }
    }
  }
});

export const { addSystem, selectSystem, addTaskToSystem } = systemsSlice.actions;
export default systemsSlice.reducer;