/// <reference path="../typings/main.d.ts" />
import { Component, Inject, Input } from 'angular2/core';
import { increment, decrement } from './actions/counterAction';
import { incrementTotal, decrementTotal } from './actions/totalAction';
import { Counter } from './immutables/counter';
import { CounterService } from './services/counterService';
import { List } from 'immutable';

@Component({
  selector: 'counter-list',
  templateUrl: './counterList.html'
})

export class CounterList {

  @Input() counterList: List<Counter>;
  @Input() total: number;
  private ngRedux;

  constructor( @Inject('ngRedux') ngRedux, private counterService: CounterService) {
    this.ngRedux = ngRedux;
  }

  increaseCount($event, counter: Counter) {
    $event.preventDefault();
    this.counterService.incrementCounter(counter)
      .subscribe(
      res => {
        this.ngRedux.dispatch(increment(counter));
        this.ngRedux.dispatch(incrementTotal(counter.currentCount));
      },
      err => console.log('Error incrementing counter')
      );
  }

  decreaseCount($event, counter: Counter) {
    $event.preventDefault();
    this.counterService.decrementCounter(counter)
      .subscribe(
      res => {
        this.ngRedux.dispatch(decrement(counter));
        this.ngRedux.dispatch(decrementTotal(counter.currentCount));
      },
      err => console.log('Error incrementing counter')
      );
  }
}
