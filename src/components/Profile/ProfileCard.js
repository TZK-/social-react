import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import FriendButton from "./FriendButton";

class ProfileCard extends React.Component {

    render() {
        return (
            <Card>
                <CardImg top height="200px"
                         src="https://www.philippe-albanel.com/stockphotos/13886-200"
                         alt="Card image cap"/>
                <CardBody>
                    <CardTitle>{this.props.user.first_name} {this.props.user.last_name}</CardTitle>
                    <CardText>
                        Inscrit <Moment tz={"Europe/Paris"} fromNow>
                            {this.props.user.createdAt}
                        </Moment>
                    </CardText>
                    <FriendButton user={this.props.user}/>
                </CardBody>
            </Card>
        );
    }
}


ProfileCard.propTypes = {
    user: PropTypes.object.isRequired
};

export default withRouter(ProfileCard);
