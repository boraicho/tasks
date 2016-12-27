import React, { Component } from 'react';
import '../css/font-awesome-4.7.0/scss/font-awesome.scss';
import './App.scss';
import logo from '../logo.svg';

import AddCategory from './AddCategory';
import AddTask from './AddTask';
import CategoryList from './CategoryList';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div className="wrap-add">
                    <AddCategory />
                    <AddTask
                        categoryId={this.props.params.categoryId} />
                </div>
                <div className="wrap-list">
                    <CategoryList />
                    {this.props.children}
                </div>
            </div>
        );
    };
};

export default App;