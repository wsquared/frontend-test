import { CounterService } from './counterService';
import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import { BaseRequestOptions, Http } from 'angular2/http';
import { provide } from 'angular2/core';
import { MockBackend } from 'angular2/http/testing';

var ENV = process.env.ENV = process.env.NODE_ENV = 'test';

describe('CounterService', () => {

  // beforeEachProviders(() => [
  //   BaseRequestOptions,
  //   MockBackend,
  //   provide(Http, { useFactory: function (backend, defaultOptions) {
  //     return new Http(backend, defaultOptions);
  //   },
  //     deps: [MockBackend, BaseRequestOptions]
  //   }),
  //   CounterService
  // ]);

  // it('should have http', inject([CounterService], (counter) => {
  //   expect(!!counter.http).toEqual(true);
  // }));

  it('true is true', function(){ expect(true).toEqual(true); });

});
