import React from "react";
import {connect} from "react-redux";
import {Toast, ToastBody, ToastHeader} from 'reactstrap';
import {removeToast} from "../../actions/toast";

class Toasts extends React.Component {
    toggle = toast => {
        this.props.removeToast(toast);
    };

    render() {
        return (
            <div>
                {this.props.toasts.map(toast => (
                    <Toast key={toast.id} color={toast.color}>
                        <ToastHeader toggle={() => this.toggle(toast)}>{toast.title}</ToastHeader>
                        {toast.message ? (
                            <ToastBody>{toast.message}</ToastBody>
                        ) : null}
                    </Toast>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    toasts: state.toasts
});

export default connect(mapStateToProps, {removeToast})(Toasts);
