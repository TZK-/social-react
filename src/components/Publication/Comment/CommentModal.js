import React from "react";
import {ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";

class CommentModal extends React.Component {

    render() {
        return (
            <Modal size={"lg"} isOpen={this.props.isOpen} toggle={this.props.onToggle} scrollable={true}>
                <ModalHeader toggle={this.props.onToggle}>Commentaire(s)</ModalHeader>
                <ModalBody id={"modal-content"}>
                    {this.props.post.comments.length > 0 ? (
                        <ListGroup>
                            {this.props.post.comments.map(comment => (
                                <ListGroupItem key={comment._id}>{comment.content}</ListGroupItem>
                            ))}
                        </ListGroup>
                    ) : 'Aucun commentaire'}
                </ModalBody>
                <ModalFooter>
                    <CommentForm post={this.props.post}/>
                </ModalFooter>
            </Modal>
        );
    }
}

CommentModal.propTypes = {
    post: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func
};

export default CommentModal;