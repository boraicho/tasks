import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './containers/App';
import TaskList from './containers/TaskList';
import TaskEdit from './containers/TaskEdit';
import store from './store/store';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <Route
                    path='/category/:categoryId'
                    component={TaskList}>
                </Route>
                <Route
                    path='/task/:taskId'
                    component={TaskEdit}>
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);