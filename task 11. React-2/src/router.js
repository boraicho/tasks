import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import MainLayout from './components/layouts/main-layout';

import Login from './components/containers/login';
import Courses from './components/containers/course-list-container';
import AddCourse from './components/containers/add-course';
import DeleteCourse from './components/views/delete-course';

export default (
    <Router history={browserHistory}>
        <Route component={MainLayout}>
            <Route path="/" component={Login} />
            <Route path="/courses" component={Courses} />
            <Route path="/courses/new" component={AddCourse} />
            <Route path="/courses/:id" component={AddCourse} />
            <Route path="/courses/delete/:id" component={DeleteCourse} />
        </Route>
    </Router>
);