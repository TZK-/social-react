import React from "react";
import {Col, Container, Row} from "reactstrap";
import {Redirect, withRouter} from "react-router-dom";
import ProfileCard from "../components/Profile/ProfileCard";
import {connect} from "react-redux";

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            user: null
        }
    }

    componentDidMount() {
        // const posts = postService.getAllForUser(user);
        // this.setState(posts.data);
    }

    render() {
        if (!this.props.user) {
            return (<Container/>);
        }

        return (
            <Container>
                <Row>
                    <Col sm={3}>
                        <ProfileCard user={this.props.user}/>
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

const mapStateToProps = state => ({
    user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(Home));
