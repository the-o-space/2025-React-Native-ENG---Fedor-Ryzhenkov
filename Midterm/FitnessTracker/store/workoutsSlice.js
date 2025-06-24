import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workouts: [],
};

export const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    addWorkout: (state, action) => {
      state.workouts.push({
        id: Date.now().toString(),
        name: action.payload.name,
        duration: action.payload.duration,
        date: action.payload.date,
        createdAt: new Date().toISOString(),
      });
    },
    clearAllWorkouts: (state) => {
      state.workouts = [];
    },
  },
});

export const { addWorkout, clearAllWorkouts } = workoutsSlice.actions;

// Selectors
export const selectAllWorkouts = (state) => state.workouts.workouts;
export const selectTotalWorkouts = (state) => state.workouts.workouts.length;
export const selectTotalDuration = (state) =>
  state.workouts.workouts.reduce((total, workout) => total + workout.duration, 0);

export default workoutsSlice.reducer; 