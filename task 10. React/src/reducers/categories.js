import * as types from '../constants/ActionTypes';
import _ from 'lodash';

const InitialState = {
    categories: []
};

export default function categories(state = InitialState, action) {
    let _categories;
    switch (action.type) {
        case types.GET_ALL_CATEGORY:
            return Object.assign({}, state, { categories: action.categories })
        case types.ADD_CATEGORY:
            _categories = [
                ...state.categories,
                action.newCategory
            ];
            _updateLocalStorage(_categories);
            return Object.assign({}, state, { categories: _categories });
        case types.ADD_SUB_CATEGORY:
            _categories = state.categories;
            for (let i = 0; i < _categories.length; i++) {
                if (_categories[i].id === action.id) {
                    _categories[i].categories.push(action.newCategory);
                }
            }
            _updateLocalStorage(_categories);
            return Object.assign({}, state, { categories: _categories });
        case types.DELETE_CATEGORY:
            const newCategories = state.categories.filter(category => category.id !== action.id);
            _updateLocalStorage(newCategories);
            return Object.assign({}, state, { categories: newCategories });
        case types.CHANGE_CATEGORY:
            _.remove(state.categories, function (category) {
                return category.id === action.id;
            });
            _categories = [
                ...state.categories,
                action.newCategory
            ];
            _updateLocalStorage(_categories);
            return Object.assign({}, state, { categories: _categories });
        default:
            return state;
    }
};

function _updateLocalStorage(categories) {
    const localCategories = JSON.stringify(categories);
    localStorage.setItem('categories', localCategories);
};