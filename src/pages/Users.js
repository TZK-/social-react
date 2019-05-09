import React from "react";
import Api from '../Api';
import {HTTP_ERROR} from "../actions";
import {Col, Container, Row} from "reactstrap";
import ProfileCard from "../components/Profile/ProfileCard";

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    async componentWillMount() {
        try {
            const {data: users} = await Api.get('users');
            this.setState({
                users: users
            });
        } catch (e) {
            this.props.dispatch({
                type: HTTP_ERROR,
                payload: e
            });
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    {this.state.users.map(user => (
                        <Col sm={3} key={user._id}>
                            <ProfileCard user={user}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}

export default Users;
