import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Menu from './components/Menu/Menu';
import './App.css';
import routes from './Routes';
import {connect} from 'react-redux';
import PrivateRoute from "./components/Route/PrivateRoute";
import Friends from "./components/Friends/Friends";
import {Col, Container, Row} from "reactstrap";

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

    render() {
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
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(App);
