import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch, useLocation} from "react-router-dom";
import {connect} from 'react-redux';

import Blog from "./components/blog/Blog";
import {codeReceived} from "./store/actions/auth";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Footer from "./components/blog/Footer";
import Header from "./components/blog/Header";

const sections = [
    {title: 'Technology', url: '#'},
    {title: 'Design', url: '#'},
    {title: 'Culture', url: '#'},
    {title: 'Business', url: '#'},
    {title: 'Politics', url: '#'},
    {title: 'Opinion', url: '#'},
    {title: 'Science', url: '#'},
    {title: 'Health', url: '#'},
    {title: 'Style', url: '#'},
    {title: 'Travel', url: '#'},
];

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
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="lg">
                <Header title="Blog" sections={sections}/>,
                <main>
                    <Switch>
                        <Route path="/blog">
                            <Blog/>
                        </Route>
                        <Route path="/">
                            <Redirect to={{pathname: "/blog"}}/>
                        </Route>
                    </Switch>
                </main>
            </Container>
            <Footer title="Footer" description="Something here to give the footer a purpose!"/>
        </React.Fragment>
    );
}

export default connect(
    null,
    dispatch => ({
        onCodeReceived: code => dispatch(codeReceived(code))
    })
)(PureApp);
