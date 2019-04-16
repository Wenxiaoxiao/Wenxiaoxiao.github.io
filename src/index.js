import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import * as serviceWorker from './serviceWorker';
import PmpRouter from './Page/Router/index';


ReactDOM.render(<PmpRouter ></PmpRouter>,document.getElementById('root'));

serviceWorker.unregister();
