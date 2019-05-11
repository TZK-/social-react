import React from "react";
import {Card, CardBody, CardFooter, CardHeader, CardLink, CardText, CardTitle, Tooltip} from "reactstrap";
import {Link, withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import './publication.css';
import Moment from "react-moment";
import CommentModal from "./Comment/CommentModal";
import Emoji from 'react-emoji-render';

class Publication extends React.Component {

    toggleTooltip = () => {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    };

    toggleComments = () => {
        this.setState({
            commentsOpen: !this.state.commentsOpen
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            tooltipOpen: false,
            commentsOpen: false
        }
    }

    render() {
        const userName = this.props.post.author.first_name + ' ' + this.props.post.author.last_name;

        return (
            <React.Fragment>
                <Card>
                    <CardHeader>
                        <img className={"avatar"} src={this.props.post.author.avatar} alt={userName + " avatar"}/>
                        <div className={"username"}>
                            <Link to={"/users/" + this.props.post.author.id}>
                                {userName}
                            </Link>
                        </div>
                        <div className={"date"}>
                            <small>
                                <Tooltip
                                    placement="right"
                                    target={"tooltip" + this.props.post.id}
                                    isOpen={this.state.tooltipOpen}
                                    toggle={this.toggleTooltip}>
                                    Le <Moment format="MM/DD/YYYY à HH:mm"
                                               tz={"Europe/Paris"}>{this.props.post.createdAt}</Moment>
                                </Tooltip>
                                <Moment
                                    fromNow
                                    tz={"Europe/Paris"}
                                    id={"tooltip" + this.props.post.id}>
                                    {this.props.post.createdAt}
                                </Moment>
                            </small>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <CardTitle>{this.props.post.title}</CardTitle>
                        <CardText className={"text-justify"}>
                            <Emoji text={this.props.post.content}/>
                        </CardText>
                    </CardBody>
                    <CardFooter className={"text-right"}>
                        <CardLink href={"#"}
                                  onClick={() => this.toggleComments()}>{this.props.post.comments.length || 0} commentaire(s)</CardLink>
                    </CardFooter>
                </Card>

                <CommentModal post={this.props.post} isOpen={this.state.commentsOpen}
                              onToggle={() => this.toggleComments()}/>
            </React.Fragment>
        );
    }
}

Publication.propTypes = {
    post: PropTypes.object.isRequired
};

export default withRouter(Publication);
