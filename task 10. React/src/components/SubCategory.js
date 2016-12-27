import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { getTaskInCategory } from '../api/task-api';

export default class SubCategory extends Component {
    constructor(props) {
        super(props)
        this.render = this.render.bind(this);
        this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    };

    handleGetTasks(categoryId) {
        getTaskInCategory(categoryId);
        browserHistory.push(`/category/${categoryId}`);
    };

    handleDeleteCategory(id, event) {
        event.stopPropagation();
        this.props.deleteCategory(id);
    };

    render() {
        const {categories} = this.props;
        return (
            <div>
                {categories.map(category => {
                    return (
                        < div key={category.id} className="category" onClick={this.handleGetTasks.bind(null, category.id)} >
                            <div>
                                {category.title}
                            </div >
                        </div >
                    );
                })}
            </div>
        );
    }
};
