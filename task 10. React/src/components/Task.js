import React, { Component } from 'react';
import { browserHistory } from 'react-router';


export default class Task extends Component {
    handleEditTask(id) {
        browserHistory.push(`/task/${id}`);
    };

    render() {
        const {tasks} = this.props;
        if (tasks.length === 0) {
            return (
                <div className="task-list">
                    No have tasks in this category
                </div>
            )
        }
        return (
            <div className="task-list">
                {tasks.map(task => {
                    if (task.done) {
                        return (
                            <div key={task.id} className="task">
                                <div>
                                    <i className="fa fa-check"></i>
                                    {task.title}
                                    <i className="fa fa-trash" onClick={this.props.deleteTask.bind(null, task.id)}></i>
                                    <i className="fa fa-pencil-square-o" onClick={this.handleEditTask.bind(null, task.id)}></i>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={task.id} className="task">
                                <div>
                                    {task.title}
                                    <i className="fa fa-trash" onClick={this.props.deleteTask.bind(null, task.id)}></i>
                                    <i className="fa fa-pencil-square-o" onClick={this.handleEditTask.bind(null, task.id)}></i>
                                </div>
                            </div>
                        );
                    }
                }
                )}
            </div>
        );
    }
};
