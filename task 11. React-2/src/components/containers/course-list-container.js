import React, { Component } from 'react';
import { connect } from 'react-redux';

import Course from '../views/course-list';
import * as coursesApi from '../../api/course-api';

class CourseList extends Component {
    constructor(props) {
        super(props);
        coursesApi.getCourses();
    };

    render() {
        const {courses} = this.props;
        return (
            <Course courses={courses} />
        );
    };
};

const mapStateProps = function (store) {
    return {
        courses: store.courseList.courses.filter(course => course.title.includes(store.courseList.filter))
    };
};

export default connect(mapStateProps)(CourseList);