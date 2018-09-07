import { config } from '../config';

export const send = (worker, payload, url) => {
  if (url[0] !== '/') {
    url = `/${url}`;
  }
  const data = {
    payload,
    url: `${config.baseUrl}${url}`,
  };

  worker.postMessage(data);
};
