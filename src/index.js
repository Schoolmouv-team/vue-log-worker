import { sendDataOnMutation } from './utils/sendDataOnMutation';
import { setConfig, config } from './config';
import { send } from './utils/sendMessageToWorker';

const SyncPlugin = (store, worker, endpoint) => {
  store.subscribe(sendDataOnMutation(worker, endpoint));
};

const customLogger = worker => (...messages) => {
  let payload = {
    messages,
  };
  send(worker, payload, config.loggingEndpoint);
};

const errorHandler = (worker, endpoint) => (msg, url, line, col, error) => {
  let payload = {
    msg,
    url,
    line,
    col,
    error,
  };
  send(worker, payload, endpoint);
};

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
