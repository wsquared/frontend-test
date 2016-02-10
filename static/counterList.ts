/// <reference path="../typings/main.d.ts" />
import { Component, Inject, Input } from 'angular2/core';
import { increment, decrement, deleteCounter, loadCounters } from './actions/counterAction';
import { incrementTotal, decrementTotal, decreaseTotal } from './actions/totalAction';
import { Counter } from './immutables/counter';
import { CounterService } from './services/counterService';
import { List } from 'immutable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'counter-list',
  templateUrl: './counterList.html',
  providers: [ToastsManager]
})

export class CounterList {

  @Input() counterList: List<Counter>;
  @Input() total: number;
  private store;

  constructor( @Inject('ngRedux') ngRedux, private counterService: CounterService, private toastr: ToastsManager) {
    this.store = ngRedux;
  }

  incrementCount($event, counter: Counter) {
    $event.preventDefault();
    this.counterService.incrementCounter(counter)
      .subscribe(
      res => {
        this.store.dispatch(increment(counter));
        this.store.dispatch(incrementTotal());
        let total = this.store.getState().total;
        this.toastr.success('Increased by 1. Total: ' + total, 'Saved.');
      },
      err => console.log('Error incrementing counter - ' + err)
      );
  }

  decrementCount($event, counter: Counter) {
    $event.preventDefault();
    this.counterService.decrementCounter(counter)
      .subscribe(
      res => {
        this.store.dispatch(decrement(counter));
        this.store.dispatch(decrementTotal());
        let total = this.store.getState().total;
        this.toastr.success('Decreased by 1. Total: ' + total, 'Saved.');
      },
      err => console.log('Error incrementing counter - ' + err)
      );
  }

  deleteCounter($event, counter: Counter) {
    $event.preventDefault();
    this.counterService.deleteCounter(counter)
      .subscribe(
      res => {
        this.store.dispatch(deleteCounter(counter));
        this.store.dispatch(decreaseTotal(counter.currentCount));
        let total = this.store.getState().total;
        this.toastr.success('Decreased by ' + counter.currentCount + '. Total: ' + total, 'Saved.');
      },
      err => console.log('Error incrementing counter - ' + err)
      );
  }

  addCounter($event, title: string) {
    $event.preventDefault();
    this.counterService.saveCounter(new Counter({
      title: title
    }))
    .subscribe(
      res => {
        let counterList = (<List<Counter>>res.json()).map((counter: any) =>
          new Counter({ id: counter.id, title: counter.title, currentCount: counter.currentCount }));
        this.store.dispatch(loadCounters(List<Counter>(counterList)));
        this.toastr.success('Created ' + title, 'Saved.');
      }
    )
    ;
  }
}
