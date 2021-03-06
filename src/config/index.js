let config = {
  baseUrl: 'http://localhost:3000',
  active: process.env.NODE_ENV === 'production',
  store: null,
  useErrorHandler: true,
  useLogging: true,
  handler: null,
  errorEndpoint: '/errors',
  storeEndpoint: '/events',
  loggingEndpoint: '/logging',
  whiteListFields: null,
  whiteListMutationTypes: null,
  addFields: () => ({}),
};

const setConfig = c => {
  return (config = { ...config, ...c });
};

export { config, setConfig };
