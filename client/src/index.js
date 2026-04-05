import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import { reducers } from './reducers';
import './index.css';

const store = configureStore({
  reducer: reducers,
  // use RTK's default middleware (includes redux-thunk). If you need a custom thunk,
  // either pass getDefaultMiddleware({ thunk: false }) and add your custom thunk here,
  // or configure thunk via getDefaultMiddleware({ thunk: { extraArgument: yourArg } }).
});

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
