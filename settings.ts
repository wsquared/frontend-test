let BASE_URL = 'http://localhost:3100';
let COUNTER_URL = '/api/v1/counter';

export const GET_COUNTERS = BASE_URL + COUNTER_URL + 's';
export const SAVE_COUNTERS = BASE_URL + COUNTER_URL;
export const DELETE_COUNTERS = BASE_URL + COUNTER_URL;
export const INCREMENT_COUNTER = BASE_URL + COUNTER_URL + '/inc';
export const DECREMENT_COUNTER = BASE_URL + COUNTER_URL + '/dec';
