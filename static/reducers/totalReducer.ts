/// <reference path="../../typings/main.d.ts" />

import {
INCREMENT_TOTAL,
DECREMENT_TOTAL,
DECREASE_TOTAL,
SET_TOTAL,
} from '../actions/totalAction';

export default function(state: number = 0, action) {
  switch (action.type) {
    case INCREMENT_TOTAL:
      return state += 1;
    case DECREMENT_TOTAL:
      return state -= 1;
    case SET_TOTAL:
      return state = action.total;
    case DECREASE_TOTAL:
      return state -= action.total;
    default:
      return state;
  }
}
