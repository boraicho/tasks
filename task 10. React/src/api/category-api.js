import store from '../store/store';
import axios from 'axios';
import * as categoryActions from '../actions/CategoryActions';

export function getCategories() {
    return store.dispatch(categoryActions.getAllCategory());
}

export function addCategory(title) {
    return axios({
        method: 'post',
        url: 'http://localhost:3001/categories',
        data: {
            category: {
                title: title
            }
        }
    }).then(response => {
        store.dispatch(categoryActions.addCategory(response.data))
        return response;
    });
}

export function getAllCategory() {
    return axios.get('http://localhost:3001/categories').then(response => {
        store.dispatch(categoryActions.getAllCategory(response.data));
        return response;
    });
}

export function deleteCategory(id) {
    return axios.delete('http://localhost:3001/categories/' + id).then(response => {
        store.dispatch(categoryActions.deleteCategory(id));
        return response;
    })
}

export function changeCategory(id, title) {
    const newCategory = {
        id: id,
        title: title
    }
    return store.dispatch(categoryActions.changeCategory(id, newCategory));
}