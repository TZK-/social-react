import React from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

import {NavLink as Link} from "react-router-dom";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            isLogged: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

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

                        {this.state.isLogged ? (
                            <NavItem>
                                <NavLink tag={Link} exact to={"/a"} activeClassName="active">
                                    John Doe
                                </NavLink>
                            </NavItem>
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
