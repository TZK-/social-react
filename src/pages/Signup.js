import React from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {NavLink} from "react-router-dom";

export default class extends React.Component {
    render() {
        return (
            <Container>
                <h2>Sign up</h2>
                <Form className="form">
                    <Col>
                        <FormGroup>
                            <Label for={"first_name"}>First name</Label>
                            <Input
                                type="text"
                                name="first_name"
                                placeholder="myemail@email.com"
                                id={"first_name"}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for={"last_name"}>Last name</Label>
                            <Input
                                type="text"
                                name="last_name"
                                id={"last_name"}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for={"email"}>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="email@example.com"
                                id={"email"}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="********"
                                id={"password"}
                            />
                        </FormGroup>
                    </Col>
                    <div>
                        <NavLink to={"/login"}>You already have an account ? Log in !</NavLink>
                    </div>
                    <Button>Submit</Button>
                </Form>
            </Container>
        );
    }
}
