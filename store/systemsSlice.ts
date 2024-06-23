import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { System, RootState } from '../types';

interface SystemsState {
  byId: { [key: string]: System };
  allIds: string[];
}

const initialState: SystemsState = {
  byId: {},
  allIds: [],
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
    addTaskToSystem(state, action: PayloadAction<{ systemId: string; taskId: string }>) {
      const { systemId, taskId } = action.payload;
      if (state.byId[systemId]) {
        state.byId[systemId].tasks.push(taskId);
      }
    },
    updateTaskOrder(state, action: PayloadAction<{ systemId: string; taskOrder: string[] }>) {
      const { systemId, taskOrder } = action.payload;
      if (state.byId[systemId]) {
        state.byId[systemId].tasks = taskOrder;
      }
    },
  }
});

export const { addSystem, addTaskToSystem, updateTaskOrder } = systemsSlice.actions;
export default systemsSlice.reducer;
