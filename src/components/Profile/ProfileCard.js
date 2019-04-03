import React from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

export default class extends React.Component {

    sendFriendRequest(e) {

    }

    render() {
        return (
            <Card>
                <CardImg top height="200px"
                         src="https://picsum.photos/200/300/?random"
                         alt="Card image cap"/>
                <CardBody>
                    <CardTitle>{this.props.user.first_name} {this.props.user.last_name}</CardTitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's
                        content.</CardText>
                    <Button onClick={this.sendFriendRequest}>Demander en ami</Button>
                </CardBody>
            </Card>
        );
    }
}
