import React, { PropsTypes } from 'react';
import Todo from './Todo';

const TodoList = ({todos, onTodoClick}) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
                />
        )}
    </ul>
)

TodoList.PropsTypes = {
    todos: PropsTypes.arrayOf(PropsTypes.shape({
        id: PropsTypes.number.isRequired,
        completed: PropsTypes.bool.isRequired,
        title: PropsTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoClick: PropsTypes.func.isRequired
}

export default TodoList;