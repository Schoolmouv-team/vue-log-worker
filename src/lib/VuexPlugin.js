import { send } from './sendMessageToWorker';

export const sendDataOnMutation = (worker, endpoint) => (mutation, state) => {
  let user = state.user || {};
  let payload = {
    type: mutation.type,
    eventPayload: mutation.payload,
    user: user.id,
  };
  send(worker, payload, endpoint);
};

export const SyncPlugin = (store, worker, endpoint) => {
  store.subscribe(sendDataOnMutation(worker, endpoint));
};
