import React from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import {connect} from "react-redux";
import {denyRequest, sendRequest} from "../../actions/friend";

class FriendButton extends React.Component {

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

        return ({button});
    }
}

FriendButton.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(FriendButton);
