import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import CssBaseline from '@material-ui/core/CssBaseline';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <CssBaseline>
      <App />
    </CssBaseline>
  </BrowserRouter>,
  document.getElementById('root'),
);
