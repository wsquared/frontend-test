import {
describe,
expect,
it,
inject,
beforeEachProviders,
} from 'angular2/testing';

import { provide } from 'angular2/core';
import { BaseRequestOptions, Http } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing';

import { CounterService } from './services/counterService';
import { ToastOptions, ToastsManager} from 'ng2-toastr/ng2-toastr';
import { Counter } from './immutables/counter';

import { CounterList } from './counterList';

const provider = require('ng2-redux').provider;

import configureStore from './stores/configureStore';

let options = {
  autoDismiss: true,
  positionClass: 'toast-top-right',
};

describe('CounterList', () => {

  beforeEachProviders(() => [
    CounterList,
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    provider(configureStore()),
    provide(ToastsManager, provide(ToastOptions, { useValue: new ToastOptions(options) })),
    CounterService
  ]);

  it('increment count should call counterService.incrementCounter', inject([CounterList, CounterService],
    (counterList, counterService) => {
      spyOn(counterService, 'incrementCounter').and.callThrough();

      counterList.incrementCount(new Event('click'), new Counter({ id: 123, title: 'John Travolta', currentCount: 3 }));

      expect(counterService.incrementCounter).toHaveBeenCalled();

    }));

  it('decrement count should call counterService.decrementCounter', inject([CounterList, CounterService, ToastsManager],
    (counterList, counterService) => {
      spyOn(counterService, 'decrementCounter').and.callThrough();

      counterList.decrementCount(new Event('click'), new Counter({ id: 123, title: 'John Travolta', currentCount: 3 }));

      expect(counterService.decrementCounter).toHaveBeenCalled();
    }));

  it('delete counter should call counterService.deleteCounter', inject([CounterList, CounterService, ToastsManager],
    (counterList, counterService) => {
      spyOn(counterService, 'deleteCounter').and.callThrough();

      counterList.deleteCounter(new Event('click'), new Counter({ id: 123, title: 'John Travolta', currentCount: 3 }));

      expect(counterService.deleteCounter).toHaveBeenCalled();
    }));

  it('add counter should call counterService.saveCounter', inject([CounterList, CounterService, ToastsManager],
    (counterList, counterService) => {
      spyOn(counterService, 'saveCounter').and.callThrough();

      counterList.addCounter(new Event('click'), 'Michael Jordan');

      expect(counterService.saveCounter).toHaveBeenCalled();
    }));
});
