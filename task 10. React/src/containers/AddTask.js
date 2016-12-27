import React from 'react';
import { addTask } from '../api/task-api';
const AddTask = React.createClass({
    getInitialState() {
        return {
            title: ''
        };
    },

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    },

    handleTaskAdd() {
        const { categoryId } = this.props;
        addTask(this.state.title, categoryId);
        this.setState({ title: '' });
    },

    render() {
        return (
            <div className="add-task">
                <input
                    placeholder="Enter title task"
                    className="input-task"
                    value={this.state.title}
                    onChange={this.handleTitleChange}>
                </input>
                <submit className="add-task-button" onClick={this.handleTaskAdd}>Add</submit>
            </div>
        );
    }
});

export default AddTask;