import React, { Component } from 'react';
import { connect } from 'react-redux';

import Category from '../components/Category';
import * as categoryApi from '../api/category-api';
import './CategoryList.scss';


class CategoryList extends Component {
    render() {
        const {categories} = this.props;
        return (
            <div className="category-list">
                <Category
                    categories={categories}
                    deleteCategory={categoryApi.deleteCategory}
                    changeCategory={categoryApi.changeCategory}
                    addSubCategory={categoryApi.addSubCategory}
                    >
                </Category>
            </div>
        );
    }
};

const mapStateProps = function (store) {
    return {
        categories: store.categories.categories
    };
};

export default connect(mapStateProps)(CategoryList);