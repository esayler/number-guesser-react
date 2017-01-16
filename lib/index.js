import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

require('./styles/reset.scss');
require('./styles/base.scss');

render(<App />, document.getElementById('app'));
