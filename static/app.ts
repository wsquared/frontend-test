/// <reference path="../typings/main.d.ts" />
require('./app.css');

import { Component, Inject } from 'angular2/core';
import { Counter } from './immutables/counter';
import { CounterList } from './counterList';
import { CounterService } from './services/counterService';
import { loadCounters } from './actions/counterAction';
import { setTotal } from './actions/totalAction';
import { List } from 'immutable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'App',
  templateUrl: './app.html',
  directives: [CounterList],
  providers: [ToastsManager]
})

export class App {

  private counterList;
  private store;

  constructor( @Inject('ngRedux') ngRedux, private counterService: CounterService, private toastr: ToastsManager) {
    this.store = ngRedux;
    this.counterService.loadCounters()
      .subscribe(
      res => {
        this.counterList = (<List<Counter>>res.json()).map((counter: any) =>
          new Counter({ id: counter.id, title: counter.title, currentCount: counter.currentCount }));
        this.store.dispatch(loadCounters(List<Counter>(this.counterList)));
        this.store.dispatch(setTotal(this.sum(this.counterList)));
      },
      err => {
        this.toastr.error('This is not good!', 'Oops!' + err);
        console.log('Error retrieving counters');
      }
      );
    this.store.subscribe(
      state => console.log('New state received ')
    );
  }

  sum(counters) {
    var total = 0;
    for (var i = 0, len = counters.length; i < len; i++) {
      total += counters[i]['currentCount'];
    }
    return total;
  }

}
