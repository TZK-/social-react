import React from "react";
import {Button, Col, Container, FormGroup, Row} from "reactstrap";
import {withRouter} from "react-router-dom";
import {AvField, AvForm} from "availity-reactstrap-validation";
import Api from '../Api';
import {connect} from "react-redux";
import {createToast} from "../actions/toast";

class ResetPassword extends React.Component {
    handleChange = event => {
        this.setState({
            email: event.target.email
        });
    };
    handleSubmit = async () => {
        await Api.post('/auth/reset-password', {}, this.state);
    };

    constructor(props) {
        super(props);

        this.state = {
            email: ''
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className={"bg-light"} sm={12} md={{size: 6, offset: 3}} style={{padding: '30px'}}>
                        <h2 className={"text-center"}>Réinitaliser votre mot de passe</h2>
                        <AvForm method="post" className="form" onSubmit={this.handleSubmit}>
                            <AvField
                                type="email"
                                name="email"
                                id="email"
                                label={"E-Mail"}
                                onChange={this.handleChange}
                                value={this.state.email}
                                validate={{required: true, email: true}}
                            />

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

export default withRouter(connect(null, {createToast})(ResetPassword));
