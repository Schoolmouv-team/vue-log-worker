# Vue log worker @schoolmouv  
  
This is a plugin to send logs to backend.  
  
You can send three kind of logs :  
- Error logs  
- Personal logs  
- Store mutations

## Install 

```
npm i @schoolmouv/vue-log-worker
```

## Usage

First register the plugin inside your app entrypoint 

```javascript 
import { errorHandlerAndLoggingPlugin } from '@schoolmouv/vue-worker-logging';

Vue.use(errorHandlerAndLoggingPlugin, option);
```

And add our plugin inside your webpack configuration 
(it only add the worker into your dist folder)

```javascript
const { syncWebpackPlugin } = require('@schoolmouv/vue-log-worker/build/plugin');

module.exports = {  
  configureWebpack: () => ({  
    plugins: [syncWebpackPlugin()],  
  }),  
};
```

## Options

### errorHandlerAndLoggingPlugin

Options you can use inside Vue.use

```javascript
const options = {  
  // base url of your backend
  baseUrl: 'http://localhost', 
   
  // Boolean, when the logger is active, by default in production mode
  active: process.env.NODE_ENV === 'production',

  //Your application Vuex store
  store: null,  

  // Boolean, if you want to use the worker error logger
  useErrorHandler: true,  

  // Boolean, if you want to use the worker logger
  useLogging: true,

  // function: when the server send a response to the worker, 
  //you can catch it inside this handler   
  handler: null,  

  // Endpoint for error, store and logging inside your backend
  errorEndpoint: '/errors',  
  storeEndpoint: '/events',  
  loggingEndpoint: '/logging',  
};
```
