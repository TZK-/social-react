import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Menu from './components/Menu';
import './App.css';
import routes from './Routes';
import {Provider} from 'react-redux';
import store from './store';
import PrivateRoute from "./components/Route/PrivateRoute";

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
            <Provider store={store}>
                <Router>
                    <div>
                        <header>
                            <Menu/>
                        </header>

                        {App.renderRoutes()}
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
