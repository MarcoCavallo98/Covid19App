import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.sass';

const rootElement = document.getElementById('root');

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement);

registerServiceWorker();

