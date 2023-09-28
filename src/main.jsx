import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'

import { store } from './store/store.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  //conn eith store
  <Provider store={store}>
    <App />
  </Provider>//strict fetches data twice to confirm its true/corr
);
