import React from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {NavLink, Redirect} from "react-router-dom";
import {authService} from "../services/auth.service";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
            isAuthenticated: authService.isAuthenticated()
        }
    }

    handleChange = async (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        // TODO handle form validation
        try {
            await authService.login(this.state.email, this.state.password);
            this.setState({isAuthenticated: true});
        } catch (e) {
            // TODO handle API errors
            console.error(e);
        }
    };

    render() {
        if (this.state.isAuthenticated) {
            return (
                <Redirect to={"/"}/>
            );
        }

        return (
            <Container>
                <h2>Log In</h2>
                <Form method="post" className="form" onSubmit={this.handleSubmit}>
                    <Col>
                        <FormGroup>
                            <Label for={"email"}>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="email@example.com"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="password">Mot de passe</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="********"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <div>
                        <NavLink to={"/signup"}>You do not have an account yet ? Sign up !</NavLink>
                    </div>
                    <Button>Submit</Button>
                </Form>
            </Container>
        );
    }
}
