import React from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

import {NavLink as Link} from "react-router-dom";
import {authService} from "../services/auth.service";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            user: authService.getUser()
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logout = () => {
        authService.logout();
        this.setState({user: null});
    };

    render() {
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">SocialReact</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} exact to={"/"} activeClassName="active">
                                Home
                            </NavLink>
                        </NavItem>

                        {this.state.user ? (
                            <React.Fragment>
                                <NavItem>
                                    <NavLink tag={Link} exact to={"/a"} activeClassName="active">
                                        {this.state.user.first_name} {this.state.user.last_name}
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        onClick={this.logout}
                                        tag={Link} exact
                                        to={"/"}
                                        activeClassName="active">
                                        Se déconnecter
                                    </NavLink>
                                </NavItem>
                            </React.Fragment>

                        ) : (
                            <React.Fragment>
                                <NavItem>
                                    <NavLink tag={Link} exact to={"/login"} activeClassName="active">
                                        Log in
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} exact to={"/signup"} activeClassName="active">
                                        Sign up
                                    </NavLink>
                                </NavItem>
                            </React.Fragment>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}
