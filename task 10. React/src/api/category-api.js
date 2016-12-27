import store from '../store/store';
import * as categoryActions from '../actions/CategoryActions';

export function getCategories() {
    return store.dispatch(categoryActions.getAllCategory());
}

export function addCategory(title) {
    const newCategory = {
        id: Date.now().toString(),
        title: title
    }
    return store.dispatch(categoryActions.addCategory(newCategory));
}

export function deleteCategory(id) {
    return store.dispatch(categoryActions.deleteCategory(id));
}

export function changeCategory(id, title) {
    const newCategory = {
        id: id,
        title: title
    }
    return store.dispatch(categoryActions.changeCategory(id, newCategory));
}