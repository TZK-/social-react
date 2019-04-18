import React from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";

class ProfileCard extends React.Component {

    sendFriendRequest(e) {
        // TODO
    }

    render() {
        // TODO hide friend button if the logged user is the given card user

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
                    {true ? (
                        <Button onClick={this.sendFriendRequest}>Demander en ami</Button>
                    ) : ''}
                </CardBody>
            </Card>
        );
    }
}


ProfileCard.propTypes = {
    user: PropTypes.object.isRequired
};

export default withRouter(ProfileCard);
