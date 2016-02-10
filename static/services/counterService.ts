import { Http, Headers } from 'angular2/http';
import { Injectable } from 'angular2/core';

import {
GET_COUNTERS,
SAVE_COUNTERS,
INCREMENT_COUNTER,
DECREMENT_COUNTER,
DELETE_COUNTERS
} from '../../settings';

import { Counter } from '../immutables/counter';

@Injectable()
export class CounterService {

  constructor(private http: Http) {
  }

  loadCounters() {
    return this.http.get(GET_COUNTERS);
  }

  saveCounter(newCounter: Counter) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(SAVE_COUNTERS, JSON.stringify(newCounter.toJS()), { headers: headers });
  }

  incrementCounter(counter: Counter) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(INCREMENT_COUNTER, JSON.stringify(counter.toJS()), { headers: headers });
  }

  decrementCounter(counter: Counter) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(DECREMENT_COUNTER, JSON.stringify(counter.toJS()), { headers: headers });
  }

  deleteCounter(counter: Counter) {
    return this.http.delete(DELETE_COUNTERS + '/' + counter.id);
  }
};
