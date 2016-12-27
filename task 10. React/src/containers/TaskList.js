import React, { Component } from 'react';
import { connect } from 'react-redux';

import Task from '../components/Task';
import * as taskApi from '../api/task-api';
import './TaskList.scss';

class TaskList extends Component {
    _getTaskInCategory(tasks, categoryId) {
        const filterTasks = tasks.filter(task => task.categoryId === categoryId)
        return filterTasks
    };

    render() {
        const tasks = this._getTaskInCategory(this.props.tasks, this.props.params.categoryId);
        return (
            <Task
                tasks={tasks}
                deleteTask={taskApi.deleteTask}>
            </Task>
        );
    };
};

const mapStateToProps = function (store) {
    return {
        //to do rename tasksList = tasks
        tasks: store.tasks.tasks
    };
};

export default connect(mapStateToProps)(TaskList);