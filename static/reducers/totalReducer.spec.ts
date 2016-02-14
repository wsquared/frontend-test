import {
describe,
expect,
it,
} from 'angular2/testing';

import { incrementTotal, decrementTotal, decreaseTotal, setTotal } from '../actions/totalAction';

import totalReducer from './totalReducer';

describe('totalReducer', () => {

  it('should increment total by one', () => {
    let result = totalReducer(0, incrementTotal());
    expect(result).toBe(1);
  });

  it('should decrement total by one', () => {
    let result = totalReducer(1, decrementTotal());
    expect(result).toBe(0);
  });

  it('should decrease total by 7', () => {
    let result = totalReducer(7, decreaseTotal(5));
    expect(result).toBe(2);
  });

  it('should set total', () => {
    let result = totalReducer(7, setTotal(10));
    expect(result).toBe(10);
  });

});
