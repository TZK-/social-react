import React from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import {authService} from "../../services/auth.service";

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.user = authService.getUser();
    }

    sendFriendRequest(e) {

    }

    render() {
        return (
            <Card>
                <CardImg top height="200px"
                         src="https://www.philippe-albanel.com/stockphotos/13886-200"
                         alt="Card image cap"/>
                <CardBody>
                    <CardTitle>{this.props.user.first_name} {this.props.user.last_name}</CardTitle>
                    <CardText>Some quick example text</CardText>
                    {this.user.id !== this.props.user.id ? (
                        <Button onClick={this.sendFriendRequest}>Demander en ami</Button>
                    ) : ''}
                </CardBody>
            </Card>
        );
    }
}
