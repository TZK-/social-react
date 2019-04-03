import React from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {NavLink} from "react-router-dom";
import {create} from '../services/user.service';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            password: ''
        };
    }

    changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    };

    submit = async (event) => {
        event.preventDefault();

        const res = await create(this.state);

        console.log("ok", res);
    };

    render() {
        return (
            <Container>
                <h2>Sign up</h2>
                <Form className="form" onSubmit={(e) => this.submit(e)}>
                    <Col>
                        <FormGroup>
                            <Label for={"first_name"}>First name</Label>
                            <Input
                                type="text"
                                name="first_name"
                                placeholder="myemail@email.com"
                                id={"first_name"}
                                value={this.state.first_name}
                                onChange={this.changeHandler}
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
                                value={this.state.last_name}
                                onChange={this.changeHandler}
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
                                value={this.state.email}
                                onChange={this.changeHandler}
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
                                value={this.state.password}
                                onChange={this.changeHandler}
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
