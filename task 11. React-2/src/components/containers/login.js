import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Col from 'react-bootstrap/lib/Col';

import { userSucces, getUsers } from '../../api/user-api';
import '../../helpers.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: 'admin',
            password: 'admin',
            errorMessage: ''
        };
        getUsers();
        this.handleChange = this.handleChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
    };

    getValidationStateLogin() {
        const lengthLogin = this.state.login.length;
        if (lengthLogin === 0) return 'error';
    };

    getValidationStatePass() {
        const lengthPass = this.state.password.length;
        if (lengthPass === 0) return 'error';
    };

    handleChange(e) {
        if (e.target.id === 'formControlsLogin') this.setState({ login: e.target.value });
        else if (e.target.id === 'formControlsPassword') this.setState({ password: e.target.value });
    };

    onLogin() {
        console.log(userSucces(this.state.login, this.state.password));
        // if (userSucces(this.state.login, this.state.password)) {
        //     browserHistory.push('/courses');
        // }
        // else{
        //     this.setState({ errorMessage: "Login/password is wrong"});
        // }
    }

    render() {
        return (
            <Col md={6} className="h-center-col">
                <Panel>
                    <form className="login-form">
                        <FormGroup
                            controlId="formControlsLogin"
                            validationState={this.getValidationStateLogin()}
                            >
                            <ControlLabel>Login</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.login}
                                placeholder="Enter login"
                                onChange={this.handleChange}
                                />
                        </FormGroup>
                        <FormGroup
                            controlId="formControlsPassword"
                            validationState={this.getValidationStatePass()}
                            >
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="password"
                                value={this.state.password}
                                placeholder="Enter password"
                                onChange={this.handleChange}
                                />
                        </FormGroup>
                        <Button onClick={this.onLogin}>Log In</Button>
                    </form>
                </Panel>
            </Col>
        );
    };
};

const mapStateProps = function (store) {
    console.log(store.users);
    return {
        users: store.users
    }
}

export default Login;