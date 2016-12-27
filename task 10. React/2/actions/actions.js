export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_TODO = 'ADD_TODO';

export function addCategory(title) {
    return { type: ADD_CATEGORY, title }
}

export function addTodo(title, categoryId) {
    return { type: ADD_TODO, title, categoryId }
}