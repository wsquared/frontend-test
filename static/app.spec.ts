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

import configureStore from './stores/configureStore';
import { CounterService } from './services/counterService';
import { ToastOptions, ToastsManager} from 'ng2-toastr/ng2-toastr';
import { Counter } from './immutables/counter';
import { List } from 'immutable';

let options = {
  autoDismiss: true,
  positionClass: 'toast-top-right',
};

const provider = require('ng2-redux').provider;
const store = configureStore();

import {App} from './app';

describe('App', () => {

  beforeEachProviders(() => [
    App,
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    provider(store),
    provide(ToastsManager, provide(ToastOptions, { useValue: new ToastOptions(options) })),
    CounterService
  ]);

  it('should return counter state', inject([App, CounterService, ToastsManager],
    (app, counterService, toast) => {

      let state = app.store.getState();

      expect(state.counter).toBe(List<Counter>());
    }));

  it('should return total state', inject([App, CounterService, ToastsManager],
    (app, counterService, toast) => {

      let state = app.store.getState();

      expect(state.total).toEqual(0);
    }));

  it('should sum the counterList', inject([App, CounterService, ToastsManager],
    (app, counterService, toast) => {

      let result = app.sum([{ currentCount: 1 }, { currentCount: 5 }]);

      expect(result).toEqual(6);
    }));

});
