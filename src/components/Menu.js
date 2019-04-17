import React from 'react';
import {
    Collapse,
    DropdownItem, DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink, UncontrolledDropdown
} from "reactstrap";

import {NavLink as Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "../actions/authentication";

class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isMenuOpen: false,
        };
    }

    toggleMenu = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        });
    };

    logout = () => {
        this.props.logoutUser(this.props.history);
    };

    render() {
        return (
            <Navbar expand="md" className="navbar-dark bg-dark">
                <NavbarBrand href="/">SocialReact</NavbarBrand>
                <NavbarToggler onClick={this.toggleMenu}/>
                <Collapse isOpen={this.state.isMenuOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {this.props.user ? (
                            <React.Fragment>
                                <NavItem>
                                    <NavLink tag={Link} exact to={"/"} activeClassName="active">
                                        Accueil
                                    </NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav style={{padding: '0 10px'}}>
                                        <img className={"avatar"} src="https://picsum.photos/200" alt="My profile avatar"/>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <Link to={"/me"} exact>Paramètres</Link>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={this.logout}>
                                            Déconnexion
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </React.Fragment>

                        ) : (
                            <React.Fragment>
                                <NavItem>
                                    <NavLink tag={Link} exact to={"/login"} activeClassName="active">
                                        Connexion
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} exact to={"/signup"} activeClassName="active">
                                        Inscription
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
