import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState } from '../types';

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
    toggleActive(state, action: PayloadAction<string>) {
      const task = state.byId[action.payload];
      if (task) {
        if (task.isActive) {
          task.isActive = false;
          task.endTime = new Date().toISOString();
          if (task.startTime) {
            task.totalTimeSpent += Math.floor((new Date(task.endTime).getTime() - new Date(task.startTime).getTime()) / 1000);
          }
        } else {
          // Deactivate other tasks
          Object.values(state.byId).forEach(t => {
            if (t.isActive) {
              t.isActive = false;
              t.endTime = new Date().toISOString();
              if (t.startTime) {
                t.totalTimeSpent += Math.floor((new Date(t.endTime).getTime() - new Date(t.startTime).getTime()) / 1000);
              }
            }
          });
          task.isActive = true;
          task.startTime = new Date().toISOString();
        }
      }
    },
    updateTask(state, action: PayloadAction<{ id: string; updates: Partial<Task> }>) {
      const { id, updates } = action.payload;
      if (state.byId[id]) {
        state.byId[id] = { ...state.byId[id], ...updates };
      }
    },
    updateTaskOrder(state, action: PayloadAction<{ systemId: string; taskOrder: string[] }>) {
      // Update task order in the system
    }
  }
});

export const { addTask, toggleActive, updateTask, updateTaskOrder } = tasksSlice.actions;
export default tasksSlice.reducer;
