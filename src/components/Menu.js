import React from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

import {NavLink as Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "../actions/authentication";

class Menu extends React.Component {

    logout = () => {
        this.props.logoutUser(this.props.history);
    };

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
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} exact to={"/"} activeClassName="active">
                                Home
                            </NavLink>
                        </NavItem>

                        {this.props.user ? (
                            <React.Fragment>
                                <NavItem>
                                    <NavLink tag={Link} exact to={"/a"} activeClassName="active">
                                        {this.props.user.first_name} {this.props.user.last_name}
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

const mapStateToProps = state => ({
    user: state.auth.user
});

export default withRouter(connect(mapStateToProps, {logoutUser})(Menu));
