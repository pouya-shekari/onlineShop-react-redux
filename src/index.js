import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {AppRoute} from 'routes/App.route';
import store from './redux/store';
import 'assets/styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    {/*<Provider store={store}>

    </Provider>*/}
      <AppRoute/>
  </React.StrictMode>,
  document.getElementById('root')
);

