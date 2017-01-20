import React, { Component } from 'react';
import { Link } from 'react-router';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';

import { filterCourse } from '../../api/course-api';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    };

    handleChange(e) {
        if (e.target.id === 'formControlsFilter') this.setState({ filter: e.target.value });
    };

    onSearch() {
        filterCourse(this.state.filter);
    }

    render() {
        return (
            <Row>
                <Col md={4} mdOffset={2}>
                    <form className="search-course">
                        <FormGroup controlId="formControlsFilter">
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    onChange={this.handleChange}
                                    />
                                <InputGroup.Button>
                                    <Button onClick={this.onSearch}>Search</Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup>
                    </form>
                </Col>
                <Col md={2} mdOffset={2}>
                    <Link to="/courses/new"><Button bsStyle="primary">Add course</Button></Link>
                </Col>
            </Row>
        );
    };
};

export default Menu;