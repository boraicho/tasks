import React from 'react';
import { Link } from 'react-router';

import '../../css/helpers.scss';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Button from 'react-bootstrap/lib/Button';

import logo from '../../other/logo.png';
import './logo-block.scss';

export default function (props) {
    return (
        <Row className="header-block">
            <Col className="logo-block">
                <Image src={logo} className="logo" />
                <div className="course-btn">
                    <Link to="/courses"><Button bsStyle="info">courses</Button></Link>
                    <span className="login-text">
                        user login
                        <Link to="/"><Button bsStyle="link" className="header-btn">exit</Button></Link>
                    </span>
                </div>
            </Col>
        </Row>
    );
};