// types/index.ts
import rootReducer from '../store/reducers'; // This will import your combined reducers

export interface UserProfile {
    name: string;
    personalInfo: PersonalInfo;
    systems: string[]; // Array of system IDs
    tasks: string[]; // Array of task IDs
  }
  
  export interface PersonalInfo {
    email?: string;
    phone?: string;
  }
  
  export interface System {
    id: string;
    name: string;
    tasks: string[]; // Array of task IDs
  }
  
  export interface Task {
    id: string;
    name: string;
    durationSeconds: number;
    isActive: boolean;
    lastActiveDate: string;
  }
  
  
  export interface TasksState {
    byId: { [key: string]: Task };
    allIds: string[];
  }

  export interface SystemsState {
    byId: { [key: string]: System };
    allIds: string[];
  } 
  
  export type RootState = ReturnType<typeof rootReducer>;