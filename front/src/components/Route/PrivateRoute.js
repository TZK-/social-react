import {Redirect, Route, withRouter} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

function PrivateRoute({component: Component, isAuthenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={"/login"}/>
                )
            }
        />
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
