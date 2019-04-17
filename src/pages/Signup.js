import React from "react";
import {Button, Col, Container, FormGroup, Row} from "reactstrap";
import {NavLink, Redirect, withRouter} from "react-router-dom";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {connect} from "react-redux";
import {registerUser} from "../actions/authentication";

class Signup extends React.Component {
    changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    };

    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);

        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            password_confirmation: ''
        };
    }

    async submit(event, errors, values) {
        if (errors.length > 0) {
            return;
        }

        this.props.registerUser(this.state, this.props.history);
    };

    render() {
        if (this.state.isAuthenticated) {
            return (
                <Redirect to={"/"}/>
            );
        }

        return (
            <Container>
                <Row>
                    <Col className={"bg-light"} sm={12} md={{size: 6, offset: 3}} style={{padding: '30px'}}>
                        <h2 className={"text-center"}>Inscription</h2>
                        <AvForm className="form" onSubmit={this.submit} autocomplete={"off"}>
                            <Col>
                                <AvField
                                    required
                                    type="text"
                                    name="first_name"
                                    id={"first_name"}
                                    label={"Prénom"}
                                    value={this.state.first_name}
                                    onChange={this.changeHandler}
                                    validate={{
                                        required: {value: true},
                                    }}
                                />
                            </Col>
                            <Col>
                                <AvField
                                    type="text"
                                    name="last_name"
                                    id={"last_name"}
                                    label={"Nom"}
                                    value={this.state.last_name}
                                    onChange={this.changeHandler}
                                    validate={{
                                        required: {value: true},
                                    }}
                                />
                            </Col>
                            <Col>
                                <AvField
                                    type="email"
                                    name="email"
                                    id={"email"}
                                    label={"Adresse E-Mail"}
                                    value={this.state.email}
                                    onChange={this.changeHandler}
                                    validate={{
                                        required: true,
                                        email: true,
                                    }}
                                />
                            </Col>
                            <Col>
                                <AvField
                                    type="password"
                                    name="password"
                                    id={"password"}
                                    label={"Mot de passe"}
                                    value={this.state.password}
                                    onChange={this.changeHandler}
                                    validate={{
                                        required: true,
                                    }}
                                />
                            </Col>
                            <Col>
                                <AvField
                                    type="password"
                                    name="password_confirmation"
                                    id={"password_confirmation"}
                                    label={"Confirmation du mot de passe"}
                                    value={this.state.password_confirmation}
                                    onChange={this.changeHandler}
                                    validate={{
                                        required: true,
                                        match: {
                                            value: 'password'
                                        }
                                    }}
                                />
                            </Col>

                            <FormGroup className={"text-center"}>
                                Vous avec déjà un compte ? <NavLink to={"/signup"}>Se connecter</NavLink>
                            </FormGroup>

                            <FormGroup>
                                <div className="text-right">
                                    <Button color={"primary"}>Valider</Button>
                                </div>
                            </FormGroup>
                        </AvForm>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, {registerUser})(Signup));
