import React from 'react';

import LogoBlock from '../views/logo-block';
import Menu from '../containers/menu';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import './main-layout.scss';

export default function ({children}) {
    if (children.props.route.path !== '/courses') {
        return (
            <div>
                <Grid className="app" fluid>
                    <div className="logo-container">
                        <LogoBlock />
                    </div>
                </Grid>
                <Grid className="centr-layout">
                    <Row>
                        <Col>
                            {children}
                        </Col>
                    </Row>
                    <Row className="navbar-fixed-bottom">
                        <Col className="footer">
                            copyright 2017
                    </Col>
                    </Row>
                </Grid>
            </div>
        );
    } else {
        return (
            <div>
                <Grid className="app" fluid>
                    <div className="logo-container">
                        <LogoBlock />
                    </div>
                </Grid>
                <Grid className="centr-layout">
                    <Menu />
                    <Row>
                        <Col>
                            {children}
                        </Col>
                    </Row>
                    <Row className="navbar-fixed-bottom">
                        <Col className="footer">
                            copyright 2017
                    </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}