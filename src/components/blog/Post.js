import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

import Markdown from "./Markdown";

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

    render() {
        return (
            <CustomMarkdown>
                {this.props.content}
            </CustomMarkdown>
        );
    }
}

Post.propTypes = {
    content: PropTypes.string.isRequired
};

export default Post;