// src/store/taskReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  name: string;
  durationSeconds: number;
  isActive: boolean;
  lastActiveDate: string;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [
    { id: 1, name: 'Task 1', durationSeconds: 3600, isActive: false, lastActiveDate: new Date().toDateString() },
    { id: 2, name: 'Task 2', durationSeconds: 7200, isActive: false, lastActiveDate: new Date().toDateString() },
    { id: 3, name: 'Task 3', durationSeconds: 5400, isActive: false, lastActiveDate: new Date().toDateString() },
  ],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleActive(state, action: PayloadAction<number>) {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.isActive = !task.isActive;
      }
    },
    updateLastActiveDate(state, action: PayloadAction<{ taskId: number; date: string }>) {
      const task = state.tasks.find(task => task.id === action.payload.taskId);
      if (task) {
        task.lastActiveDate = action.payload.date;
      }
    },
    resetTimer(state, action: PayloadAction<number>) {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        const originalTask = initialState.tasks.find(t => t.id === task.id);
        if (originalTask) { // Additional check for TypeScript
          task.durationSeconds = originalTask.durationSeconds;
        }
      }
    },
  },
});

export const { toggleActive, updateLastActiveDate, resetTimer } = taskSlice.actions;
export default taskSlice.reducer;