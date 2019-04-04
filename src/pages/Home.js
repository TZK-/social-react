import React from "react";
import {Col, Container, Row} from "reactstrap";
import {Redirect} from "react-router-dom";
import {authService} from "../services/auth.service";
import ProfileCard from "../components/Profile/ProfileCard";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.user = authService.getUser();
        this.state = {
            posts: []
        }
    }

    // componentDidMount() {
    //     // const posts = postService.getAllForUser(user);
    //     // this.setState(posts.data);
    // }

    render() {
        if (!this.user) {
            return (
                <Redirect to={"/login"}/>
            );
        }

        return (
            <Container>
                <Row>
                    <Col sm={3}>
                        <ProfileCard user={this.user}/>
                    </Col>
                    <Col sm={11}>
                        {this.state.posts.map(post => (
                            {/*<PostCard post={post}/>*/}
                        ))}
                    </Col>
                </Row>
            </Container>
        );
    }
}
