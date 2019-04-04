import React from "react";
import {Col, Container, Row} from "reactstrap";
import {userService} from "../services/user.service";
import ProfileCard from "../components/Profile/ProfileCard";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            loaded: false
        };
    }

    async componentDidMount() {
        const users = await userService.getAll();

        this.setState({
            loaded: true,
            users: users.data
        })
    }

    render() {
        const cards = this.state.users.map(user => {
            return (
                <Col sm={4} key={user.id}>
                    <ProfileCard user={user}/>
                </Col>
            );
        });

        if (!this.state.loaded) {
            return null;
        }

        return (
            <Container>
                <Row>
                    {cards}
                </Row>
            </Container>
        );
    }
}
