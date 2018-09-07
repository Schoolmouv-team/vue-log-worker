import { config } from '../config';

export const customLogger = worker => (...messages) => {
  let payload = {
    messages,
  };
  send(worker, payload, config.loggingEndpoint);
};

export const errorHandler = (worker, endpoint) => (
  msg,
  url,
  line,
  col,
  error,
) => {
  let payload = {
    msg,
    url,
    line,
    col,
    error,
  };
  send(worker, payload, endpoint);
};
