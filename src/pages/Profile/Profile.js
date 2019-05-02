import React from "react";
import {withRouter} from "react-router-dom";
import Api from "../../Api";
import {Col, Container, Row} from "reactstrap";
import ProfileCard from "../../components/Profile/ProfileCard";
import Publication from "../../components/Publication/Publication";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            posts: []
        }
    }

    async initState(userId) {
        const {data: user} = await Api.get('users/' + userId);
        const {data: posts} = await Api.get(`users/${userId}/posts`);

        this.setState({
            user: user,
            posts: posts
        });
    }


    async componentDidMount() {
        const {match: {params}} = this.props;

        return this.initState(params.id);
    }

    async componentDidUpdate(prevProps) {
        if (prevProps === undefined) {
            return false
        }

        if (this.state.user._id !== this.props.match.params.id) {
            return this.initState(this.props.match.params.id);
        }
    }

    render() {
        if (!this.state.user) {
            return (<div/>);
        }

        return (
            <Container>
                <Row>
                    <Col sm={12} md={4}>
                        <ProfileCard user={this.state.user}/>
                    </Col>
                    <Col sm={12} md={8}>
                        {this.state.posts.map(post => (
                            <Row key={post.id} style={{marginBottom: '10px'}}>
                                <Col sm={12}>
                                    <Publication key={post.id} post={post}/>
                                </Col>
                            </Row>
                        ))}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(Profile);
