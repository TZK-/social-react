import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Menu from './components/Menu/Menu';
import './App.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import routes from './Routes';
import {connect} from 'react-redux';
import PrivateRoute from "./components/Route/PrivateRoute";
import Friends from "./components/Friends/Friends";
import {Alert, Col, Container, Row} from "reactstrap";
import ReduxToastr from 'react-redux-toastr'

import socket from './socket';
import {userConnected, userDisconnected} from "./actions/friend";
import {clearErrors} from "./actions/error";

class App extends Component {
    static renderRoutes() {
        return routes.map((route, index) => {
            if (route.unauthenticated === true) {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                );
            }

            return (
                <PrivateRoute
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            )
        });
    }

    toggleErrors = () => {
        this.props.clearErrors();
    };

    render() {
        if (this.props.user !== null) {
            socket.emit('user_connected', this.props.user._id);
        }

        return (
            <Router>
                <div>
                    <header>
                        <Menu/>
                    </header>

                    <ReduxToastr
                        timeOut={4000}
                        newestOnTop={false}
                        preventDuplicates
                        position="bottom-right"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        progressBar
                        closeOnToastrClick/>

                    <Container>
                        {this.props.errors.length > 0 ? (
                            <Row>
                                <Col sm={12}>
                                    <Alert color="danger" isOpen={this.props.errors.length > 0} toggle={this.toggleErrors}>
                                        <ul>
                                            {this.props.errors.map((e, index) => (
                                                <li key={index}>
                                                    {typeof e.data === 'string' ? e.data : `[${e.data.field}]: ${e.data.msg}`}
                                                </li>
                                            ))}
                                        </ul>
                                    </Alert>
                                </Col>
                            </Row>
                        ) : ''}

                        {this.props.isAuthenticated ? (
                            <Row>
                                <Col sm={12} md={10}>
                                    {App.renderRoutes()}
                                </Col>

                                <Col sm={12} md={2}>
                                    <Friends/>
                                </Col>
                            </Row>
                        ) : (
                            <Col sm={12}>
                                {App.renderRoutes()}
                            </Col>
                        )}
                    </Container>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    errors: state.errors
});

export default connect(mapStateToProps, {userConnected, userDisconnected, clearErrors})(App);
