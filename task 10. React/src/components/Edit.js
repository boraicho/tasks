import React, { Component } from 'react';
import * as taskApi from '../api/task-api';
import { browserHistory } from 'react-router';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.task[0].id,
            title: props.task[0].title,
            done: props.task[0].done,
            description: props.task[0].description,
            categoryId: props.task[0].categoryId
        }
        this.handleTaskChange = this.handleTaskChange.bind(this);
        this.handleTaskEdit = this.handleTaskEdit.bind(this);
        this.handleTaskCancel = this.handleTaskCancel.bind(this);
        this.render = this.render.bind(this);
    }

    handleTaskChange(event) {
        let value = event.target.value;
        switch (event.target.id) {
            case 'title':
                this.setState({ title: value });
                break;
            case 'done':
                this.setState({ done: event.target.checked });
                break;
            case 'description':
                this.setState({ description: value });
                break;
            default:
                break;
        }
    };

    handleTaskEdit() {
        const {id, title, done, description, categoryId} = this.state;
        taskApi.changeTask(id, title, done, description, categoryId);
        browserHistory.push(`/category/${this.state.categoryId}`);
    }

    handleTaskCancel() {
        browserHistory.push(`/category/${this.state.categoryId}`);
    }

    render() {
        return (
            <form className="task-edit" key={this.state.id}>
                <div className="up-line">
                    <input
                        id="title"
                        placeholder="Enter title task"
                        className="form-title-task"
                        value={this.state.title}
                        onChange={this.handleTaskChange}
                        >
                    </input>
                    <div className="buttons">
                        <submit className="edit-task-button" onClick={this.handleTaskEdit}>Save</submit>
                        <submit className="edit-cancel-button" onClick={this.handleTaskCancel}>Cancel</submit>
                    </div>
                </div>
                <div>
                    <input
                        id="done"
                        className="form-done-task checkbox"
                        type="checkbox"
                        defaultChecked={this.state.done}
                        onChange={this.handleTaskChange}
                        />
                    <label htmlFor="done">Done</label>
                </div>
                <textarea
                    rows="10"
                    id="description"
                    placeholder="Enter description"
                    className="form-description-task"
                    value={this.state.description}
                    onChange={this.handleTaskChange}
                    >
                </textarea>
            </form>
        );
    }
};