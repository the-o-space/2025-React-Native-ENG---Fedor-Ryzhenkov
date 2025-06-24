import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push({
        id: Date.now().toString(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      });
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
  },
});

export const { addEvent, deleteEvent } = eventsSlice.actions;

export const selectAllEvents = (state) => state.events.events;

export default eventsSlice.reducer; 