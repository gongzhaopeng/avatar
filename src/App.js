import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useLocation
} from "react-router-dom";
import {connect} from 'react-redux';

import Blog from "./components/blog/Blog";
import {codeReceived} from "./store/actions/auth";

export function PureApp({onCodeReceived}) {
    return (
        <Router>
            <AppWithCodeChecking onCodeReceived={onCodeReceived}/>
        </Router>
    );
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function AppWithCodeChecking({onCodeReceived}) {
    const query = useQuery();

    const code = query.get('code');

    if (code) {
        onCodeReceived(code);
    }

    return (
        <Switch>
            <Route path="/blog">
                <Blog/>
            </Route>
            <Route path="/">
                <Redirect to={{pathname: "/blog"}}/>
            </Route>
        </Switch>
    );
}

export default connect(
    null,
    dispatch => ({
        onCodeReceived: code => dispatch(codeReceived(code))
    })
)(PureApp);
