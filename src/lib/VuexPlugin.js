import { send } from './sendMessageToWorker';
import { filterPayload } from './filterPayload';
import { config } from '../config';

export const sendDataOnMutation = (worker, endpoint) => (mutation, state) => {
  let user = state.user || {};
  let payload = {
    type: mutation.type,
    eventPayload: filterPayload(mutation.payload, config.whiteListFields),
    user: user.id,
  };
  send(worker, payload, endpoint);
};

export const SyncPlugin = (store, worker, endpoint) => {
  store.subscribe(sendDataOnMutation(worker, endpoint));
};
