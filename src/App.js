import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Menu from './components/Menu/Menu';
import './App.css';
import routes from './Routes';
import {connect} from 'react-redux';
import PrivateRoute from "./components/Route/PrivateRoute";
import Friends from "./components/Friends/Friends";
import {Col, Container, Row} from "reactstrap";

import socket from './socket';
import {userConnected, userDisconnected} from "./actions/friend";

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

    constructor(props) {
        super(props);
        socket.on('user_connected', userId => {
            this.props.userConnected(userId);
        });

        socket.on('disconnect', userId => {
            this.props.userDisconnected(userId);
        });
    }

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

                    <Container>
                        {this.props.isAuthenticated ? (
                            <Row>
                                <Col sm={10}>
                                    {App.renderRoutes()}
                                </Col>

                                <Col sm={2}>
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
    user: state.auth.user
});

export default connect(mapStateToProps, {userConnected, userDisconnected})(App);
