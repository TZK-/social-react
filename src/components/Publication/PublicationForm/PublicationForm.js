import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {createPost} from "../../../actions/post";
import './publication-form.css';
import {Button, Form, FormGroup, Input} from "reactstrap";

class PublicationForm extends React.Component {
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    submit = () => {
        this.props.createPost(this.state, this.props.user);
    };

    toggle = () => {
        this.setState({
            openEditor: this.state.content.length > 0 ? true : !this.state.openEditor
        });
    };

    cancel = () => {
        this.setState({
            content: '',
            openEditor: false
        });
    };

    constructor(props) {
        super(props);

        this.state = {
            content: '',
            openEditor: false
        };
    }

    render() {
        let button = null;
        if (this.state.openEditor) {
            button = (
                <FormGroup style={{marginTop: '10px', marginBottom: 0}} className={"action-buttons float-right"}>
                    <span className={"clickable cancel-action"} onClick={this.cancel} style={{marginRight: '10px',}}>
                        Annuler
                    </span>

                    <Button color="danger" size="sm" disabled={this.state.content.length === 0}
                            className={"btn-rounded"}>
                        Publier !
                    </Button>
                </FormGroup>
            );
        }

        return (
            <Form onSubmit={this.submit} className={"post-form clearfix"}>
                <Input
                    name="content"
                    type={"textarea"}
                    rows={this.state.openEditor ? 3 : 1}
                    placeholder={"Quoi de neuf ?"}
                    validate={{required: true}}
                    onChange={this.handleChange}
                    value={this.state.content}
                    onBlur={this.toggle} onFocus={this.toggle}/>
                {button}
            </Form>
        );
    }
}

const mapStateWithProps = state => {
    return {
        user: state.auth.user
    };
};

export default withRouter(connect(mapStateWithProps, {createPost})(PublicationForm));
