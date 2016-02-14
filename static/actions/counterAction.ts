/// <reference path="../../typings/main.d.ts" />

import { List } from 'immutable';
import { Counter } from '../immutables/counter';

export const INCREMENT_COUNTER: string = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER: string = 'DECREMENT_COUNTER';
export const LOAD_COUNTERS: string = 'LOAD_COUNTERS';
export const DELETE_COUNTER: string = 'DELETE_COUNTER';

export function increment(counter: Counter) {
  return {
    type: INCREMENT_COUNTER,
    counter: counter
  };
}

export function decrement(counter: Counter) {
  return {
    type: DECREMENT_COUNTER,
    counter: counter
  };
}

export function loadCounters(counterList: List<Counter>) {
  return {
    type: LOAD_COUNTERS,
    counterList: counterList
  };
}

export function deleteCounter(counter: Counter) {
  return {
    type: DELETE_COUNTER,
    counter: counter
  };
}
