import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Post from "./Post";
import {propTypes} from "../../store/initialState";

export default function Main(props) {
    const {articles, title} = props;

    return (
        <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Divider/>
            {articles.list.filter(article => article.content).map(article => (
                <Post key={article.name} content={article.content}/>
            ))}
        </Grid>
    );
}

Main.propTypes = {
    articles: propTypes.articles,
    title: PropTypes.string,
};
