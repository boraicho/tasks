import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { getTaskInCategory } from '../api/task-api';
import { changeCategory } from '../api/category-api';

export default class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            id: ''
        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.render = this.render.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this._changeCategory = this._changeCategory.bind(this);
        this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    };

    handleGetTasks(categoryId) {
        getTaskInCategory(categoryId);
        browserHistory.push(`/category/${categoryId}`);
    };

    _changeCategory() {
        changeCategory(this.state.id, this.state.title);
        this.setState({ title: '', id: '' });
    };

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    };

    handleChangeCategory(category, event) {
        event.stopPropagation();
        this.setState({ title: category.title, id: category.id });
    };

    handleDeleteCategory(id, event) {
        event.stopPropagation();
        this.props.deleteCategory(id);
    }

    render() {
        const {categories} = this.props;
        if (!categories) {
            return (
                <div>
                    No have category
                </div>
            )
        }
        return (
            <div>
                {categories.map(category => {
                    if (category.id !== this.state.id) {
                        return (
                            <div key={category.id} className="category" onClick={this.handleGetTasks.bind(null, category.id)}>
                                <div>
                                    {category.title}
                                    <i className="fa fa-trash" onClick={this.handleDeleteCategory.bind(null, category.id)}></i>
                                    <i className="fa fa-pencil-square-o" onClick={this.handleChangeCategory.bind(null, category)}></i>
                                </div >
                            </div >
                        );
                    } else {
                        return (
                            <div key={this.state.id} className="category">
                                <div>
                                    <input
                                        placeholder="Enter new title"
                                        className="category-title"
                                        value={this.state.title}
                                        onChange={this.handleTitleChange}>
                                    </input>
                                    <i className="fa fa-check" onClick={this._changeCategory}></i>
                                </div >
                            </div >
                        );
                    };
                })}
            </div>
        );
    }
};