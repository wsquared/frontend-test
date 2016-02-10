import 'angular2/bundles/angular2-polyfills';
import { bootstrap } from 'angular2/platform/browser';
import { App } from './App';
import { HTTP_PROVIDERS } from 'angular2/http';
import { CounterService } from './services/counterService';
import configureStore from './stores/configureStore';
import {provide} from 'angular2/core';
import {ToastOptions} from 'ng2-toastr/ng2-toastr';

let options = {
  autoDismiss: true,
  positionClass: 'toast-top-center',
};

const provider = require('ng2-redux').provider;
const store = configureStore();

bootstrap(App, [HTTP_PROVIDERS, CounterService, provider(store), provide(ToastOptions, { useValue: new ToastOptions(options) })]);
