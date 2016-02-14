import {
describe,
expect,
it,
inject,
beforeEachProviders,
} from 'angular2/testing';

import { provide } from 'angular2/core';
import { MockConnection } from 'angular2/src/http/backends/mock_backend';
import { BaseRequestOptions, Http, XHRBackend, ResponseOptions, Response, HTTP_PROVIDERS } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing';

import { CounterService } from './counterService';
import { Counter } from '../immutables/counter';
import { List } from 'immutable';

describe('CounterService', () => {
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    HTTP_PROVIDERS,
    provide(XHRBackend, { useClass: MockBackend }),
    CounterService
  ]);


  it('should have http', inject([CounterService], (counterService) => {
    expect(!!counterService.http).toEqual(true);
  }));

  it('should get counters', inject([XHRBackend, CounterService], (mockBackend, counterService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: [
              {
                id: 26,
                title: 'John Smith',
                currentCount: 5
              }]
          }
          )));
      });

    counterService.loadCounters().subscribe(
      response => {
        var counterList = (<List<Counter>>response.json()).map((counter: any) =>
          new Counter({ id: counter.id, title: counter.title, currentCount: counter.currentCount }));

        expect(counterList[0].id).toBe(26);
        expect(counterList[0].title).toBe('John Smith');
        expect(counterList[0].currentCount).toBe(5);
      }
    );
  }));

  it('should save counter', inject([XHRBackend, CounterService], (mockBackend, counterService) => {

    var counter = new Counter({ id: 26, title: 'John Smith', currentCount: 5 });

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: [
              {
                id: 26,
                title: 'John Smith',
                currentCount: 5
              }]
          }
          )));
      });

    counterService.saveCounter(counter).subscribe(
      response => {
        var counterList = (<List<Counter>>response.json()).map((counter: any) =>
          new Counter({ id: counter.id, title: counter.title, currentCount: counter.currentCount }));

        expect(counterList[0].id).toBe(26);
        expect(counterList[0].title).toBe('John Smith');
        expect(counterList[0].currentCount).toBe(5);
      }
    );
  }));

  it('should increment counter', inject([XHRBackend, CounterService], (mockBackend, counterService) => {

    var counter = new Counter({ id: 26, title: 'John Smith', currentCount: 5 });

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: [
              {
                id: 26,
                title: 'John Smith',
                currentCount: 6
              }]
          }
          )));
      });

    counterService.saveCounter(counter).subscribe(
      response => {
        var counterList = (<List<Counter>>response.json()).map((counter: any) =>
          new Counter({ id: counter.id, title: counter.title, currentCount: counter.currentCount }));

        expect(counterList[0].id).toBe(26);
        expect(counterList[0].title).toBe('John Smith');
        expect(counterList[0].currentCount).toBe(6);
      }
    );
  }));

  it('should decrement counter', inject([XHRBackend, CounterService], (mockBackend, counterService) => {

    var counter = new Counter({ id: 26, title: 'John Smith', currentCount: 5 });

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: [
              {
                id: 26,
                title: 'John Smith',
                currentCount: 4
              }]
          }
          )));
      });

    counterService.saveCounter(counter).subscribe(
      response => {
        var counterList = (<List<Counter>>response.json()).map((counter: any) =>
          new Counter({ id: counter.id, title: counter.title, currentCount: counter.currentCount }));

        expect(counterList[0].id).toBe(26);
        expect(counterList[0].title).toBe('John Smith');
        expect(counterList[0].currentCount).toBe(4);
      }
    );
  }));

  it('should delete counter', inject([XHRBackend, CounterService], (mockBackend, counterService) => {

    var counter = new Counter({ id: 26, title: 'John Smith', currentCount: 5 });

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: [
              {
                id: 22,
                title: 'John Travolta',
                currentCount: 5
              }]
          }
          )));
      });

    counterService.deleteCounter(counter).subscribe(
      response => {
        var counterList = (<List<Counter>>response.json()).map((counter: any) =>
          new Counter({ id: counter.id, title: counter.title, currentCount: counter.currentCount }));

        expect(counterList[0].id).toBe(22);
        expect(counterList[0].title).toBe('John Travolta');
        expect(counterList[0].currentCount).toBe(5);
      }
    );
  }));
});
