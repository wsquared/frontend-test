import {
describe,
expect,
it,
} from 'angular2/testing';

import { List } from 'immutable';
import { increment, decrement, loadCounters, deleteCounter } from '../actions/counterAction';

import counterReducer from './counterReducer';
import { Counter } from '../immutables/counter';

describe('counterReducer', () => {

  it('should increment currentCount by one', () => {
    let counter = new Counter({ id: 23, title: 'Malcolm Fraser', currentCount: 30 });

    let result = counterReducer(List<Counter>().push(counter), increment(counter)).get(0).currentCount;
    expect(result).toBe(31);
  });

  it('should decrement currentCount by one', () => {
    let counter = new Counter({ id: 23, title: 'Malcolm Fraser', currentCount: 30 });

    let result = counterReducer(List<Counter>().push(counter), decrement(counter)).get(0).currentCount;
    expect(result).toBe(29);
  });

  it('should load a list of counters', () => {
    let counter = new Counter({ id: 23, title: 'Malcolm Fraser', currentCount: 30 });
    let counterList = List<Counter>().push(counter);

    let result = counterReducer(counterList, loadCounters(counterList));
    expect(result).toBe(counterList);
  });

  it('should delete a counter', () => {
    let counter = new Counter({ id: 23, title: 'Malcolm Fraser', currentCount: 30 });
    let counterList = List<Counter>().push(counter);

    let result = counterReducer(counterList, deleteCounter(counter));
    expect(result).toBe(List<Counter>());
  });

});
