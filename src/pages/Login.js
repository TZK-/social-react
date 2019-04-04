import React from "react";
import {Button, Col, Container, Label} from "reactstrap";
import {NavLink, Redirect, withRouter} from "react-router-dom";
import {AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {loginUser} from "../actions/authentication";
import {connect} from "react-redux";

class Login extends React.Component {

    handleChange = async (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = async (event, errors) => {
        if (errors.length > 0) {
            return;
        }

        this.props.loginUser(this.state, this.props.history);
    };

    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null
        }
    }

    render() {
        return (
            <Container>
                <h2>Log In</h2>
                <AvForm method="post" className="form" onSubmit={this.handleSubmit}>
                    <Col>
                        <AvGroup>
                            <Label for={"email"}>Email</Label>
                            <AvInput
                                type="email"
                                name="email"
                                id="email"
                                onChange={this.handleChange}
                                validate={{required: true, email: true}}
                            />
                        </AvGroup>
                    </Col>
                    <Col>
                        <AvGroup>
                            <Label for="password">Mot de passe</Label>
                            <AvInput
                                type="password"
                                name="password"
                                id="password"
                                placeholder="********"
                                onChange={this.handleChange}
                                validate={{required: true}}
                            />
                        </AvGroup>
                    </Col>
                    <div>
                        <NavLink to={"/signup"}>You do not have an account yet ? Sign up !</NavLink>
                    </div>
                    <Button>Submit</Button>
                </AvForm>
            </Container>
        );
    }
}

const mapStateProps = state => state;

export default withRouter(connect(mapStateProps, {loginUser})(Login));
