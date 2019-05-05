import React from 'react';
import {connect} from "react-redux";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {close, fetch} from '../../actions/chat';
import Message from "./Message";

class Chat extends React.Component {
    close = () => {
        this.props.close();
    };

    componentWillMount() {
        this.props.fetch(this.props.friend);
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.close}>
                <ModalHeader toggle={this.close}>Discution avec {this.props.friend.first_name} {this.props.friend.last_name}</ModalHeader>
                <ModalBody>
                    {this.props.messages.map(message => (
                        <React.Fragment>
                            <Message message={message} key={message._id} me={this.props.loggedUser}/>
                        </React.Fragment>
                    ))}
                </ModalBody>
                <ModalFooter>
                    {/*<!-- DISPLAY message form -->*/}
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    isOpen: state.chat.isOpen,
    messages: state.chat.messages,
    friend: state.chat.friend,
    loggedUser: state.auth.user
});

export default connect(mapStateToProps, {close, fetch})(Chat);