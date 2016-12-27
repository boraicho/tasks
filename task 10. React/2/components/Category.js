import React, { PropsTypes } from 'react';

const Category = ({OnClick, title}) => (
    <li
        onClick={onClick}>
        {title}
    </li>
)

Category.PropsTypes = {
    onClick: PropsTypes.func.isRequired,
    title: PropsTypes.string.isRequired
}

export default Category;