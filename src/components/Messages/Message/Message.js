import React from 'react';
import Moment from "react-moment";
import {Tooltip} from "reactstrap";
import './message.css';
import classNames from 'classnames';

class Message extends React.Component {
    messageClasses = classNames({
        message_container: true,
        message_me: this.props.me._id === this.props.message.author._id,
        message_friend: this.props.me._id !== this.props.message.author._id,
    });

    toggleTooltip = () => {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    };

    constructor(props) {
        super(props);

        this.state = {
            tooltipOpen: false
        }
    }

    render() {
        return (
            <div className={this.messageClasses}>
                <div className={"right"}>
                    <div>
                        {this.props.message.content}
                    </div>

                    <div className="message_date">
                        <Tooltip
                            placement="right"
                            target={"tooltip" + this.props.message._id}
                            isOpen={this.state.tooltipOpen}
                            toggle={this.toggleTooltip}>
                            Le <Moment format="MM/DD/YYYY à HH:mm" tz={"Europe/Paris"}>{this.props.message.createdAt}</Moment>
                        </Tooltip>

                        <Moment
                            fromNow
                            tz={"Europe/Paris"}
                            id={"tooltip" + this.props.message._id}>
                            {this.props.message.createdAt}
                        </Moment>
                    </div>
                </div>
            </div>
        );
    }
}

export default Message;