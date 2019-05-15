import React from "react";
import PropTypes from "prop-types";
import {Button, Input} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import {connect} from "react-redux";
import {createComment} from "../../../actions/comment";

class CommentForm extends React.Component {
    handleChange = e => {
        this.setState({
            content: e.target.value
        });
    };

    submit = () => {
        this.props.createComment(this.props.post, this.state.content);
        this.setState({content: ''})
    };

    constructor(props) {
        super(props);
        this.state = {content: ''};
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                <Input type="textarea" name="content" value={this.state.content} onChange={this.handleChange}/>
                <Button onClick={this.submit}>
                    <FontAwesomeIcon icon={["far", "paper-plane"]} transform={"stack-1x"} color={"white"}/>
                </Button>
            </div>
        );
    }
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
};

export default connect(null, {createComment})(CommentForm);