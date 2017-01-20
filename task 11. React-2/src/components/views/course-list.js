import React from 'react';
import { Link } from 'react-router';

import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';

import '../../helpers.scss';
import './course-list.scss';

export default function (props) {
    let hour,
        minutes;
    return (
        <Col md={8} className="user-list h-center-col">
            {props.courses.map(course => {
                hour = course.time / 60 | 0;
                minutes = course.time % 60;
                return (
                    <div
                        key={course.id}
                        className="course">
                        <div>
                            <div className="course-header">
                                <span className="course-title">
                                    {course.title}
                                </span>
                                <span className="course-time">
                                    Hour(s): {hour} minutes: {minutes}
                                </span>
                                <span className="course-date" >
                                    Date start: {course.date}
                                </span>
                            </div>
                            <div className="course-body">
                                Autors: {course.autors.join(',')}
                            </div>
                            <div className="course-links">
                                <Link to={"/courses/" + course.id}><Button bsStyle="warning">edit course</Button></Link>
                                <Link to={"/courses/delete/" + course.id}><Button bsStyle="danger">delete course</Button></Link>
                            </div>
                        </div>
                    </div>
                );
            })
            };
        </Col>
    );
}