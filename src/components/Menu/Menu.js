import React from 'react';
import {
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";

import {NavLink as Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authentication";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Notifications from "./Notifications";

class Menu extends React.Component {

    toggleMenu = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        });
    };

    logout = () => {
        this.props.logoutUser(this.props.history);
    };

    constructor(props) {
        super(props);

        this.state = {
            isMenuOpen: false,
            hasNotifications: false // TODO extract in store & create a seperate component
        };
    }

    render() {
        return (
            <Navbar expand="md" className="navbar-dark bg-dark">
                <NavbarBrand tag={Link} to={"/"}>
                    SocialReact
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleMenu}/>
                <Collapse isOpen={this.state.isMenuOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {this.props.user ? (
                            <React.Fragment>
                                <NavLink>
                                    <FontAwesomeIcon icon="search"/>
                                </NavLink>

                                <NavLink>
                                    <FontAwesomeIcon icon="user-friends"/>
                                </NavLink>


                                <Notifications tag={Link}/>

                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav style={{padding: '0 10px'}}>
                                        <img className={"avatar"} src={this.props.user.avatar}
                                             alt="My profile avatar"/>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem disabled>
                                            {this.props.user.first_name} {this.props.user.last_name}
                                        </DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem>
                                            <Link to={"/me"} exact>Paramètres</Link>
                                        </DropdownItem>
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
