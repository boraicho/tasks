import React, { PropsTypes } from 'react';
import Category from './Category';

const CategoryList = ({categories, onCategoryClick}) => (
    <ul>
        {categories.map(category =>
            <Todo
                key={category.id}
                {...category}
                onClick={() => onCategoryClick(category.id)}
                />
        )}
    </ul>
)

CategoryList.PropsTypes = {
    categories: PropsTypes.arrayOf(PropsTypes.shape({
        id: PropsTypes.number.isRequired,
        title: PropsTypes.string.isRequired
    }).isRequired).isRequired,
    onCategoryClick: PropsTypes.func.isRequired
}

export default CategoryList;