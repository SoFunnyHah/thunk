import {
  ADD_NUMBER, CLEAR, DECREMENT, INCREMENT, SET_COUNTER,
} from '../types';

export const incrementCounter = () => ({ type: INCREMENT });
export const decrementCounter = () => ({ type: DECREMENT });
export const clearCounter = () => ({ type: CLEAR });
export const setCounter = (payload) => ({ type: SET_COUNTER, payload }); // cause of payload:payload
export const addNumberCounter = (payload) => ({ type: ADD_NUMBER, payload });
