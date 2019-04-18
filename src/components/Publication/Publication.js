import React from "react";
import {Card, CardBody, CardFooter, CardHeader, CardLink, CardText, CardTitle, Tooltip} from "reactstrap";
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types'
import './publication.css';
import Moment from "react-moment";

class Publication extends React.Component {

    toggleTooltip = () => {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            tooltipOpen: false
        }
    }

    render() {
        const userName = this.props.post.author.first_name + ' ' + this.props.post.author.last_name;
        return (
            <Card>
                <CardHeader>
                    <img className={"avatar"} src={this.props.post.author.avatar} alt={userName + " avatar"}/>
                    <div className={"username"}>{userName}</div>
                    <div className={"date"}>
                        <small>
                            <Tooltip placement="right" isOpen={this.state.tooltipOpen} target={"tooltip" + this.props.post.id}
                                     toggle={this.toggleTooltip}>
                                Le <Moment format="MM/DD/YYYY à HH:mm" tz={"Europe/Paris"}/>
                            </Tooltip>
                            <Moment fromNow tz={"Europe/Paris"}
                                    id={"tooltip" + this.props.post.id}>{this.props.post.created_at}</Moment>
                        </small>
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
