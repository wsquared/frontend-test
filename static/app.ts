/// <reference path="../typings/main.d.ts" />

import { Component, Inject } from 'angular2/core';
import { Counter } from './immutables/counter';
import { CounterList } from './counterList';
import { CounterService } from './services/counterService';
import { loadCounters } from './actions/counterAction';
import { setTotal } from './actions/totalAction';
import { List } from 'immutable';

@Component({
  selector: 'App',
  directives: [CounterList],
  templateUrl: './app.html'
})

export class App {

  private counterList;
  private store;

  constructor( @Inject('ngRedux') ngRedux, private counterService: CounterService) {
    this.store = ngRedux;
    this.counterService.loadCounters()
      .subscribe(
      res => {
        this.counterList = (<Object[]>res.json()).map((counter: any) =>
          new Counter({ id: counter.id, title: counter.title, currentCount: counter.currentCount }));
        this.store.dispatch(loadCounters(List<Counter>(this.counterList)));
        this.store.dispatch(setTotal(this.sum(<List<Counter>>res.json())));
      },
      err => console.log('Error retrieving counters')
      );
    this.store.subscribe(
      state => console.log('New state received ')
    );
  }

  sum(obj) {
    var total = 0;
    for (var i = 0, _len = obj.length; i < _len; i++) {
      total += obj[i]['currentCount'];
    }
    return total;
  }

}
