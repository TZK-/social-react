import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Menu from './components/Menu';
import './App.css';
import routes from './Routes';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <header>
                        <Menu/>
                    </header>
                    
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                        />
                    ))}
                </div>
            </Router>
        );
    }
}

export default App;
