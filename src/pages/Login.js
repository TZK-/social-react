import React from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {NavLink} from "react-router-dom";

export default class extends React.Component {
    render() {
        return (
            <Container>
                <h2>Log In</h2>
                <Form className="form">
                    <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="myemail@email.com"
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="********"
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
