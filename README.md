# Vue log worker @schoolmouv 

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) 
  
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

To log a data to your backend (or by ```console.log``` if you are not in production) using :
```javascript
this.$log('log inside a component');
Vue.$log('log with vue instance');

import { log } from '@schoolmouv/vue-log-worker';
log('log anywhere');
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
