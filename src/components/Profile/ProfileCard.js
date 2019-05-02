import React from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import {connect} from "react-redux";
import {denyRequest, sendRequest} from "../../actions/friend";

class ProfileCard extends React.Component {

    sendFriendRequest = () => {
        this.props.sendRequest(this.props.user);
    };

    removeFriend = () => {
        this.props.denyRequest(this.props.user);
    };

    render() {
        let button = null;
        if (this.props.user._id !== this.props.auth.user._id) {
            if (this.props.friends.accepted.find(f => f.friend._id === this.props.user._id)) {
                button = (<Button onClick={this.removeFriend}>Ne plus être amis</Button>);
            } else if (this.props.friends.pending.find(f => f.friend._id === this.props.user._id)) {
                button = (<Button onClick={this.removeFriend}>Annuler la demande d'ami</Button>);
            } else {
                button = (<Button onClick={this.sendFriendRequest}>Demander en ami</Button>);
            }
        }

        return (
            <Card>
                <CardImg top height="200px"
                         src="https://www.philippe-albanel.com/stockphotos/13886-200"
                         alt="Card image cap"/>
                <CardBody>
                    <CardTitle>{this.props.user.first_name} {this.props.user.last_name}</CardTitle>
                    <CardText>
                        Inscrit
                        <Moment tz={"Europe/Paris"} fromNow>
                            {this.props.user.created_at}
                        </Moment>
                    </CardText>
                    {button}
                </CardBody>
            </Card>
        );
    }
}


ProfileCard.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    friends: state.friends,
    auth: state.auth
});

export default withRouter(connect(mapStateToProps, {sendRequest, denyRequest})(ProfileCard));
