import React from "react";
import {Card, CardBody, CardFooter, CardHeader, CardLink, CardText, CardTitle} from "reactstrap";
import {Link, withRouter} from "react-router-dom";
import PropTypes from 'prop-types'
import './publication.css';
import Moment from "react-moment";

class Publication extends React.Component {

    render() {
        const userName = this.props.post.author.first_name + ' ' + this.props.post.author.last_name;
        return (
            <Card>
                <CardHeader>
                    <img className={"avatar"} src={this.props.post.author.avatar} alt={userName + " avatar"}/>
                    <div className={"username"}>{userName}</div>
                    <div className={"date"}>
                        <small><Moment fromNow tz={"Europe/Paris"}>{this.props.post.created_at}</Moment></small>
                    </div>
                </CardHeader>
                <CardBody>
                    <CardTitle>{this.props.post.title}</CardTitle>
                    <CardText className={"text-justify"}>
                        {this.props.post.content}
                    </CardText>
                </CardBody>
                <CardFooter className={"text-right"}>
                    <CardLink href="#">{this.props.post.nb_comments || 0} commentaire(s)</CardLink>
                </CardFooter>
            </Card>
        );
    }
}

Publication.propTypes = {
    post: PropTypes.object.isRequired
};

export default withRouter(Publication);
