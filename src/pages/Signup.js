import React from "react";
import {Button, Col, Container, Label} from "reactstrap";
import {NavLink, Redirect, withRouter} from "react-router-dom";
import {AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
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
                <h2>Sign up</h2>
                <AvForm className="form" onSubmit={this.submit}>
                    <Col>
                        <AvGroup>
                            <Label for={"first_name"}>First name</Label>
                            <AvInput
                                required
                                type="text"
                                name="first_name"
                                id={"first_name"}
                                value={this.state.first_name}
                                onChange={this.changeHandler}
                                validate={{
                                    required: {value: true},
                                }}
                            />
                        </AvGroup>
                    </Col>
                    <Col>
                        <AvGroup>
                            <Label for={"last_name"}>Last name</Label>
                            <AvInput
                                type="text"
                                name="last_name"
                                id={"last_name"}
                                value={this.state.last_name}
                                onChange={this.changeHandler}
                                validate={{
                                    required: {value: true},
                                }}
                            />
                        </AvGroup>
                    </Col>
                    <Col>
                        <AvGroup>
                            <Label for={"email"}>Email</Label>
                            <AvInput
                                type="email"
                                name="email"
                                id={"email"}
                                value={this.state.email}
                                onChange={this.changeHandler}
                                validate={{
                                    required: true,
                                    email: true,
                                }}
                            />
                        </AvGroup>
                    </Col>
                    <Col>
                        <AvGroup>
                            <Label for="password">Password</Label>
                            <AvInput
                                type="password"
                                name="password"
                                placeholder="********"
                                id={"password"}
                                value={this.state.password}
                                onChange={this.changeHandler}
                                validate={{
                                    required: true
                                }}
                            />
                        </AvGroup>
                    </Col>
                    <div>
                        <NavLink to={"/login"}>You already have an account ? Log in !</NavLink>
                    </div>
                    <Button>Submit</Button>
                </AvForm>
            </Container>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {registerUser})(withRouter(Signup))
