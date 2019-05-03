import React from "react";
import {connect} from "react-redux";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {acceptRequest, denyRequest} from "../../actions/friend";

class Notifications extends React.Component {
    accept = request => {
        this.props.acceptRequest(request.friend);
    };

    deny = request => {
        this.props.denyRequest(request.friend);
    };

    render() {
        const friendNotifications = this.props.pendingRequests.map(r => (
            <DropdownItem key={r._id} tag={'div'}>
                <img className={"avatar"} src={r.friend.avatar}/>
                {r.friend.first_name} {r.friend.last_name}
                <FontAwesomeIcon className={"clickable"} icon={"check"} onClick={() => this.accept(r)}/>
                <FontAwesomeIcon className={"clickable"} icon={"times"} onClick={() => this.deny(r)}/>
            </DropdownItem>
        ));

        const icon = friendNotifications.length > 0 ? (
            <span className="fa-layers fa-fw">
                <FontAwesomeIcon icon={"bell"} inverse/>
                <FontAwesomeIcon icon="plus" inverse transform="shrink-6 right-7 up-7"/>
            </span>
        ) : (<FontAwesomeIcon icon={"bell"}/>);

        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                    {icon}
                </DropdownToggle>
                {friendNotifications.length > 0 ? (
                    <DropdownMenu right>
                        {friendNotifications}
                    </DropdownMenu>
                ) : ''}
            </UncontrolledDropdown>
        );
    }
}

const mapStateToProps = state => ({
    pendingRequests: state.friends.pending
});

export default connect(mapStateToProps, {denyRequest, acceptRequest})(Notifications);
