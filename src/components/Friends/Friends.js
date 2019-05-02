import React from 'react';
import {connect} from "react-redux";
import {fetchFriends} from "../../actions/friend";
import {ListGroup, ListGroupItem} from "reactstrap";
import './friend.css';
import {Link, withRouter} from "react-router-dom";

class Friends extends React.Component {

    componentDidMount() {
        this.props.fetchFriends();
    }

    render() {
        return (
            <ListGroup>
                {this.props.accepted.map(({friend}) => (
                    <ListGroupItem key={friend._id}>
                        <div className="connected"></div>
                        <Link to={"/users/" + friend._id}>{friend.first_name} {friend.last_name}</Link>
                    </ListGroupItem>
                ))}
            </ListGroup>
        );
    }
}

const mapStateToProps = state => ({
    pending: state.friends.pending,
    accepted: state.friends.accepted
});

export default withRouter(connect(mapStateToProps, {fetchFriends})(Friends));
