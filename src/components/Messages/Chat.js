import React from 'react';
import {connect} from "react-redux";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {close, fetch} from '../../actions/chat';
import Message from "./Message/Message";
import MessageForm from "./MessageForm/MessageForm";

class Chat extends React.Component {

    close = () => {
        this.props.close();
    };

    static scrollToEnd() {
        const modal = document.getElementById('modal-content');
        modal.scrollTop = modal.scrollHeight - modal.clientHeight;
    }

    componentWillMount() {
        this.props.fetch(this.props.friend);
    }

    render() {
        return (
            <Modal size={"lg"} isOpen={this.props.isOpen} toggle={this.close} scrollable={true}
                   onOpened={Chat.scrollToEnd}>
                <ModalHeader toggle={this.close}>Discussion
                    avec {this.props.friend.first_name} {this.props.friend.last_name}</ModalHeader>
                <ModalBody id={"modal-content"}>
                    {this.props.messages.map(message => (
                        <Message message={message} key={message._id} me={this.props.loggedUser}/>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <MessageForm/>
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