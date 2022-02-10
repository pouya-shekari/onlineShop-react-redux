import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {AppRoute} from 'routes/App.route';
import { ToastContainer } from 'react-toastify';
import store from './redux/store';
import 'assets/styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <AppRoute/>
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

