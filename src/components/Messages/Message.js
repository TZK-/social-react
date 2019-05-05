import React from 'react';
import {connect} from "react-redux";

class Message extends React.Component {
    render() {
        return (
            <div/>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Message);