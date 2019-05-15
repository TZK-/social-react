import React from "react";
import {Button, Col, Container, FormGroup, Row} from "reactstrap";
import {NavLink, withRouter} from "react-router-dom";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {loginUser} from "../actions/authentication";
import {connect} from "react-redux";

class Login extends React.Component {

    handleChange = (event) => {
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
                <Row>
                    <Col className={"bg-light"} sm={12} md={{size: 6, offset: 3}} style={{padding: '30px'}}>
                        <h2 className={"text-center"}>Connexion</h2>
                        <AvForm method="post" className="form" onSubmit={this.handleSubmit}>
                            <AvField
                                type="email"
                                name="email"
                                id="email"
                                label={"Email"}
                                onChange={this.handleChange}
                                validate={{required: true, email: true}}
                            />

                            <AvField
                                type="password"
                                name="password"
                                id="password"
                                label={"Mot de passe"}
                                onChange={this.handleChange}
                                validate={{required: true}}
                            />

                            <FormGroup className={"text-center"}>
                                Pas encore de compte ? <NavLink to={"/signup"}>S'inscrire</NavLink>
                                <br/>
                                <NavLink to={"/reset-password"}>Mot de passe oublié ?</NavLink>
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

const mapStateProps = state => state;

export default withRouter(connect(mapStateProps, {loginUser})(Login));
