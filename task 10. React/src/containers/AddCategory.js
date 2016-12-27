import React from 'react';

import { addCategory } from '../api/category-api';

const AddCategory = React.createClass({
    getInitialState: function () {
        return {
            title: ''
        };
    },

    handleTitleChange: function (event) {
        this.setState({ title: event.target.value });
    },

    handleCategoryAdd: function () {
        addCategory(this.state.title);
        this.setState({ title: '' });
    },

    render: function () {
        return (
            <div className="add-category">
                <input
                    placeholder="Enter title category"
                    className="input-category"
                    value={this.state.title}
                    onChange={this.handleTitleChange}>
                </input>
                <submit className="add-category-button" onClick={this.handleCategoryAdd}>Add</submit>
            </div>
        );
    }
});

export default AddCategory;