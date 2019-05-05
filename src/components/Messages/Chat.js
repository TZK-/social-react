import React from 'react';
import {connect} from "react-redux";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {close} from '../../actions/chat';
import Message from "./Message";

class Chat extends React.Component {
    close = () => {
        this.props.close();
    };

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.close}>
                <ModalHeader toggle={this.close}>Discution avec {this.props.friend.first_name} {this.props.friend.last_name}</ModalHeader>
                <ModalBody>
                    {this.props.messages.map(message => (
                        <Message message={message}/>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.close}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.close}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    isOpen: state.chat.isOpen,
    messages: state.chat.messages,
    loggedUser: state.auth.user
});

export default connect(mapStateToProps, {close})(Chat);