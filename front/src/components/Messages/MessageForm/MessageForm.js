import React from 'react';
import {connect} from "react-redux";
import {Button, Input} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import {postMessage} from '../../../actions/chat';

class MessageForm extends React.Component {
    handleChange = e => {
        this.setState({
            content: e.target.value
        });
    };

    submit = () => {
        this.props.postMessage(this.props.friend, this.state.content);
        this.setState({content: ''});
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

const mapStateToProps = state => ({
    friend: state.chat.friend,
});

export default connect(mapStateToProps, {postMessage})(MessageForm);
