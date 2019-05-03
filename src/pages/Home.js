import React from "react";
import {Col, Container, Row} from "reactstrap";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PublicationForm from "../components/Publication/PublicationForm/PublicationForm";
import {fetchFeed} from "../actions/post";
import Publication from "../components/Publication/Publication";

class Home extends React.Component {

    componentDidMount() {
        this.props.fetchFeed(this.props.user);
    }

    render() {
        return (
            <Container>

                <Row style={{marginBottom: '20px'}}>
                    <Col sm={12}>
                        <PublicationForm/>
                    </Col>
                </Row>

                {this.props.feed.map(post => (
                    <Row key={post.id} style={{marginBottom: '20px'}}>
                        <Col sm={12}>
                            <Publication post={post}/>
                        </Col>
                    </Row>
                ))}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    feed: state.post.feed
});

export default withRouter(connect(mapStateToProps, {fetchFeed})(Home));
