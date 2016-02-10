/// <reference path="../../typings/main.d.ts" />

export const INCREMENT_TOTAL: string = 'INCREMENT_TOTAL';
export const DECREMENT_TOTAL: string = 'DECREMENT_TOTAL';
export const DECREASE_TOTAL: string = 'DECREASE_TOTAL';
export const SET_TOTAL: string = 'SET_TOTAL';

export function incrementTotal() {
  return {
    type: INCREMENT_TOTAL
  };
}

export function decrementTotal() {
  return {
    type: DECREMENT_TOTAL
  };
}

export function setTotal(total: number) {
  return {
    type: SET_TOTAL,
    total: total
  };
}

export function decreaseTotal(total: number) {
  return {
    type: DECREASE_TOTAL,
    total: total
  };
}
