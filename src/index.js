import { SyncPlugin } from './lib/VuexPlugin';
import { setConfig, config } from './config';
import { customLogger, errorHandler } from './lib/CustomLogger';

export let log = console.log;

export const errorHandlerAndLoggingPlugin = {
  install(Vue, config) {
    Vue.$log = log;
    Vue.prototype.$log = log;

    if (!config.active || typeof window === 'undefined' || !window.Worker) {
      return;
    }

    config = setConfig(config);
    let worker = new Worker('fetchWorker.js');

    if (config.useErrorHandler) {
      window.onerror = errorHandler(worker, config.errorEndpoint);
    }

    if (config.store) {
      SyncPlugin(config.store, worker, config.storeEndpoint);
    }

    if (config.handler) {
      worker.onmessage = config.handler;
    }

    if (config.useLogging) {
      log = customLogger(worker);
    }
  },
};
