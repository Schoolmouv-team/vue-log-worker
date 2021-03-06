import { send } from './sendMessageToWorker';
import { filterPayload } from './filterPayload';
import { config } from '../config';

export const sendDataOnMutation = (worker, endpoint) => (mutation, state) => {
  if (
    !config.whiteListMutationTypes ||
    config.whiteListMutationTypes.includes(mutation.type)
  ) {
    let payload = {
      type: mutation.type,
      eventPayload: filterPayload(mutation.payload, config.whiteListFields),
      ...config.addFields(state),
    };
    send(worker, payload, endpoint);
  }
};

export const SyncPlugin = (store, worker, endpoint) => {
  store.subscribe(sendDataOnMutation(worker, endpoint));
};
