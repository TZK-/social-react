import React from "react";
import {Button, Col, Container, FormGroup, Row} from "reactstrap";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {AvField, AvForm} from "availity-reactstrap-validation";
import Api from '../../Api';
import {HTTP_ERROR} from "../../actions";
import {toastr} from 'react-redux-toastr'
import {editUser} from "../../actions/authentication";

class ProfileEdit extends React.Component {

    changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (this.state[name] !== undefined) {
            this.setState({
                [name]: value
            });
        }
    };

    submit = () => {
        Api.put('users/' + this.props.user._id, {}, this.state)
            .then(response => {
                this.props.editUser(response.data);
                toastr.success('Profil mis à jour');
            })
            .catch(e => {
                this.props.dispatch({
                    type: HTTP_ERROR,
                    payload: e
                })
            })
    };

    constructor(props) {
        super(props);

        this.state = {
            email: this.props.user.email,
            first_name: this.props.user.first_name,
            last_name: this.props.user.last_name,
            password: '',
            password_confirmation: ''
        };
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={12} md={{size: 9}}>
                        <h2>Vos informations personnelles</h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={3}>
                        <img style={{width: '200px'}} src={this.props.user.avatar} alt="Your avatr"/>
                    </Col>

                    <Col sm={12} md={9}>
                        <AvForm className="form" onSubmit={this.submit}>
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

                            <FormGroup>
                                <div className="text-right">
                                    <Button color={"primary"}>Modifier</Button>
                                </div>
                            </FormGroup>
                        </AvForm>
                    </Col>
                </Row>

                <Row>
                    <Col sm={12}>
                        <h2>Modifier votre mot de passe</h2>

                        <AvForm className="form">
                            <AvField
                                type="password"
                                name="password"
                                id={"password"}
                                label={"Mot de passe"}
                                value=""
                                onChange={this.changeHandler}
                                validate={{
                                    required: true,
                                }}
                            />
                            <AvField
                                type="password"
                                name="password_confirmation"
                                id={"password_confirmation"}
                                label={"Confirmation du mot de passe"}
                                value=""
                                onChange={this.changeHandler}
                                validate={{
                                    required: true,
                                    match: {
                                        value: 'password'
                                    }
                                }}
                            />

                            <FormGroup>
                                <div className="text-right">
                                    <Button color={"primary"}>Modifier</Button>
                                </div>
                            </FormGroup>
                        </AvForm>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default withRouter(connect(mapStateToProps, {editUser})(ProfileEdit));
