import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

import { deleteCourse } from '../../api/course-api';

import '../../helpers.scss';
import './delete-course.scss';

class Delete extends Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    };

    onDelete() {
        deleteCourse(this.props.params.id);
        browserHistory.push('/courses');
    };

    render() {
        return (
            <Row>
                <Col md={3} className="h-center-col text-center">
                    <Panel header="Are you sure?" className="delete-panel">
                        <Button bsStyle="success" onClick={this.onDelete}>Yes</Button>
                        <Link to="/courses"><Button bsStyle="danger">No</Button></Link>
                    </Panel>
                </Col>
            </Row>
        );
    };

};

export default Delete;