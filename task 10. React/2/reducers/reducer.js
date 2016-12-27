import { combineReducers } from 'redux';

function categories(state = [], action) {
    switch (action.type) {
        case 'ADD_CATEGORY':
            return Object.assign({}, state, {
                categories: [
                    ...state.categories,
                    {
                        title: action.title
                    }
                ]
            })
        default:
            return state
    }
}

function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                        title: action.title,
                        completed: false,
                        categoryId: action.categoryId
                    }
                ]
            })
        default:
            return state
    }
}

const todoApp = combineReducers({
    categories,
    todos
})

export default todoApp;