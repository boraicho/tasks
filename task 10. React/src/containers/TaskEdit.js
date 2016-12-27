import React, { Component } from 'react';
import { connect } from 'react-redux';

import Edit from '../components/Edit';
import './TaskEdit.scss';

class TaskEdit extends Component {

    _getTaskId(tasks, id) {
        const getTaskId = tasks.filter(task => task.id === id);
        return getTaskId;
    };

    render() {
        let task = this._getTaskId(this.props.tasks, this.props.params.taskId);
        return (
            <Edit
                task={task}
                >
            </Edit>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        //todo rename taskList
        tasks: store.tasks.tasks
    };
};

export default connect(mapStateToProps)(TaskEdit);