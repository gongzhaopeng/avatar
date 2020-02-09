import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

import Markdown from "./Markdown";

const PLACEHOLDER_POST = '# LOADING...';

const useStyles = makeStyles(theme => ({
    markdown: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
    },
}));

function CustomMarkdown(props) {
    const classes = useStyles();

    return <Markdown className={classes.markdown} {...props}/>;
}

export class Post extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: PLACEHOLDER_POST
        };
    }

    componentDidMount() {
        this.loadPost(this.props.uri)
    }

    render() {
        return (
            <CustomMarkdown>
                {this.state.content}
            </CustomMarkdown>
        );
    }

    loadPost(uri) {
        fetch(uri)
            .then(ret => ret.text())
            .then(text => this.setState({
                content: text
            }))
    }
}

Post.propTypes = {
    uri: PropTypes.string.isRequired
};

export default Post;