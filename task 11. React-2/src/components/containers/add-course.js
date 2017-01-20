import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import $ from 'jquery';
import _ from 'lodash';

import '../../helpers.scss';
import './add-course.scss';

import * as courseApi from '../../api/course-api';

class AddCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            time: '',
            date: '',
            autors: [],
            autorsList: ["Vasya", "Petya", "Misha", "Olia", "Ulia"],
            diffAutors: [],
            titleError: '',
            timeError: '',
            dateEror: ''
        }
        if (props.route.path !== "/courses/new") {
            courseApi.getCourse(this.props.params.id);
        };

        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCourse = this.handleCourse.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        let {title, time, date, autors} = nextProps.course;
        this.setState({
            title: title,
            time: time,
            date: date,
            autors: autors,
            diffAutors: _.difference(this.state.autorsList, autors)
        });
    };

    getValidationStateTitle() {
        const lengthTitle = this.state.title.length;
        if (lengthTitle === 0) return 'error';
    };

    getValidationStateTime() {
        const lengthTime = this.state.time.length;
        if (lengthTime === 0) return 'error';
    };

    getValidationStateDate() {
        const lengthDate = this.state.date.length;
        if (lengthDate === 0) return 'error';
    };

    getValidationStateAutors() {
        const lengthAutors = this.state.autors.length;
        if (lengthAutors === 0) return 'error';
    };

    handleChange(e) {
        switch (e.target.id) {
            case 'formControlsTitle':
                console.log((e.target.value.(/\d+/)));
                if(e.target.value.match())
                this.setState({ title: e.target.value });
                break;
            case 'formControlsTime':
                if(e.target.value)
                this.setState({ time: e.target.value });
                break;
            case 'formControlsDate':
                this.setState({ date: e.target.value });
                break;
            case 'formControlsAutors':
                this.setState({ autors: e.target.value });
                break;
            default: return false;
        }
    };

    handleCourse() {
        let {title, time, date} = this.state,
            autors = [];
        $("#select-right option").each(function (i, elem) {
            autors.push($(elem).val());
        });
        if (this.props.route.path === "/courses/new") {
            courseApi.addCourse(title, time, date, autors);
        } else {
            let { id } = this.props.params;
            courseApi.updateCourse(id, title, time, date, autors);
        };
        browserHistory.push('/courses');
    };

    onRightBtnSelect() {
        let valueSelect = $("#select-left option:Selected");
        $("#select-right").append(valueSelect);
    };

    onLeftBtnSelect() {
        let valueSelect = $("#select-right option:Selected");
        $("#select-left").append(valueSelect);
    };

    render() {
        return (
            <Col md={6} className="h-center-col">
                <Panel header="Add new course" className="text-center">
                    <form className="add-course-form" className="text-left">
                        <FormGroup
                            controlId="formControlsTitle"
                            validationState={this.getValidationStateTitle()}
                            >
                            <ControlLabel>Title {<span>{this.state.titleError}</span>}</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.title}
                                placeholder="Enter title"
                                onChange={this.handleChange}
                                />
                        </FormGroup>
                        <FormGroup
                            controlId="formControlsTime"
                            validationState={this.getValidationStateTime()}
                            >
                            <ControlLabel>Duration</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.time}
                                placeholder="Enter course duration"
                                onChange={this.handleChange}
                                />
                        </FormGroup>
                        <FormGroup
                            controlId="formControlsDate"
                            validationState={this.getValidationStateDate()}
                            >
                            <ControlLabel>Date</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.date}
                                placeholder="Enter course date"
                                onChange={this.handleChange}
                                />
                        </FormGroup>
                        <Col md={5} className="course-select-left">
                            <FormGroup controlId="select-left">
                                <ControlLabel>Autors</ControlLabel>
                                <FormControl componentClass="select" multiple>
                                    {
                                        this.state.diffAutors.map(autor => {
                                            return (
                                                <option value={autor}>{autor}</option>
                                            );
                                        })
                                    };
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col md={2} className="course-select-buttons-col">
                            <div className="course-select-buttons">
                                <Button className="r-btn" onClick={this.onRightBtnSelect}>{">>"}</Button>
                                <Button className="l-btn" onClick={this.onLeftBtnSelect}>{"<<"}</Button>
                            </div>
                        </Col>
                        <Col md={5} className="course-select-right">
                            <FormGroup controlId="select-right">
                                <ControlLabel>Selected authors</ControlLabel>
                                <FormControl componentClass="select" multiple>
                                    {this.state.autors.map(autor => {
                                        return (
                                            <option value={autor}>{autor}</option>
                                        );
                                    })
                                    };
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Button type="submit" bsStyle="success" onClick={this.handleCourse}>Save</Button>
                    </form>
                </Panel>
            </Col>
        );
    };
};

const mapStateToProps = (store) => {
    return {
        course: store.courseList.course
    };
};

export default connect(mapStateToProps)(AddCourse);