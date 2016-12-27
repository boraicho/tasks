import * as types from '../constants/ActionTypes';

export function addCategory(newCategory) {
    return {
        type: types.ADD_CATEGORY,
        newCategory
    };
}

export function getAllCategory(categories) {
    return {
        type: types.GET_ALL_CATEGORY,
        categories
    };
}

export function deleteCategory(id) {
    return {
        type: types.DELETE_CATEGORY,
        id
    };
}

export function changeCategory(id, newCategory) {
    return {
        type: types.CHANGE_CATEGORY,
        id,
        newCategory
    };
}

export function addSubCategory(id, newCategory) {
    return {
        type: types.ADD_SUB_CATEGORY,
        newCategory,
        id
    };
}
