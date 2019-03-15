import React from 'react';
import {Collapse, Nav, Navbar, NavLink, NavbarBrand, NavbarToggler, NavItem} from "reactstrap";

import { NavLink as Link } from "react-router-dom";

class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
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
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} exact to={"/"} activeClassName="active">
                                Home
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={Link} exact to={"/a"} activeClassName="active">
                                John Doe
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default Menu;
