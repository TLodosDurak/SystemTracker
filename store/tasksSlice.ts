// store/tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState } from '../types';

interface UpdateTaskPayload {
  id: string;
  updates: Partial<Task>;
}

interface ToggleActivePayload {
  id: string;
}

const initialState: TasksState = {
  byId: {},
  allIds: []
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      const task = action.payload;
      if (!state.byId[task.id]) {
        state.byId[task.id] = task;
        state.allIds.push(task.id);
      }
    },
    updateTask(state, action: PayloadAction<UpdateTaskPayload>) {
      const { id, updates } = action.payload;
      if (state.byId[id]) {
        state.byId[id] = { ...state.byId[id], ...updates };
      }
    },
    toggleActive(state, action: PayloadAction<string>) {
      const task = state.byId[action.payload];
      if (task) {
        task.isActive = !task.isActive;
        // Optionally update lastActiveDate when toggling
        task.lastActiveDate = new Date().toISOString();
      }
    },
    updateLastActiveDate(state, action: PayloadAction<{ id: string; date: string }>) {
      const task = state.byId[action.payload.id];
      if (task) {
        task.lastActiveDate = action.payload.date;
      }
    },
    resetTimer(state, action: PayloadAction<string>) {
      const task = state.byId[action.payload];
      if (task) {
        // Resetting timer to the initialState value or another specific logic
        const originalTask = state.byId[action.payload]; // Assuming original timing data or reset logic needed
        if (originalTask) {
          task.durationSeconds = originalTask.durationSeconds;
        }
      }
    },
  },
});

export const { addTask, updateTask, toggleActive, updateLastActiveDate, resetTimer } = tasksSlice.actions;
export default tasksSlice.reducer;
