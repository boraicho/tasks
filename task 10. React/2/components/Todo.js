import React, { PropsTypes } from 'react';

const Todo = ({OnClick, title}) => (
    <li
        onClick={onClick}>
        {title}
    </li>
)

Todo.PropsTypes = {
    onClick: PropsTypes.func.isRequired,
    title: PropsTypes.string.isRequired
}

export default Todo;