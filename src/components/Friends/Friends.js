import React from 'react';
import {connect} from "react-redux";
import {fetchFriends} from "../../actions/friend";
import {ListGroup, ListGroupItem} from "reactstrap";
import './friend.css';
import {Link} from "react-router-dom";
import classNames from 'classnames';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import Chat from "../Messages/Chat";
import {open, close} from '../../actions/chat';

class Friends extends React.Component {

    statusClasses = user => classNames({
        status_badge: true,
        connected: !!user.connected,
        disconnected: !user.connected
    });

    toggleChat = friend => {
        if (this.props.isOpen) {
            this.props.close();
        } else {
            this.props.open(friend);
        }
    };

    componentWillMount() {
        this.props.fetchFriends();
    }

    render() {
        const chat = this.props.friend && this.props.isOpen
            ? <Chat friend={this.props.friend} isOpen={this.props.isOpen} />
            : null;

        return (
            <React.Fragment>
                <ListGroup>
                    {this.props.accepted.map(({friend}) => (
                        <ListGroupItem key={friend._id}>
                            <div className={this.statusClasses(friend)}/>
                            <Link to={"/users/" + friend._id}>{friend.first_name} {friend.last_name}</Link>
                            {"  "}<FontAwesomeIcon icon="comment-dots" className={"clickable"} onClick={() => this.toggleChat(friend)}/>
                        </ListGroupItem>
                    ))}
                </ListGroup>

                {chat}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    pending: state.friends.pending,
    accepted: state.friends.accepted,
    isOpen: state.chat.isOpen,
    friend: state.chat.friend
});

export default connect(
    mapStateToProps,
    {fetchFriends, open, close}
)(Friends);
