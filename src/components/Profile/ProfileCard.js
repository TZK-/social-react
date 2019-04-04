import React from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

export default class extends React.Component {

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
                    {true ? (
                        <Button onClick={this.sendFriendRequest}>Demander en ami</Button>
                    ) : ''}
                </CardBody>
            </Card>
        );
    }
}
