import React from 'react';
import {connect} from "react-redux";
import {Redirect, Route, Switch, useParams, useRouteMatch} from "react-router-dom";

import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';

import {propTypes as storePropTypes} from "../../store/initialState";
import {channels} from "../../constants/header";
import {refreshBlogWholly, transferBlogCategory} from "../../store/actions/blog";
import {Box} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
        "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
    linkText: 'Continue reading…',
};

const featuredPosts = [
    {
        title: 'Featured post',
        date: 'Nov 12',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
    {
        title: 'Post title',
        date: 'Nov 11',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
];

const sidebar = {
    title: 'About',
    description:
        'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
        {title: 'March 2020', url: '#'},
        {title: 'February 2020', url: '#'},
        {title: 'January 2020', url: '#'},
        {title: 'November 1999', url: '#'},
        {title: 'October 1999', url: '#'},
        {title: 'September 1999', url: '#'},
        {title: 'August 1999', url: '#'},
        {title: 'July 1999', url: '#'},
        {title: 'June 1999', url: '#'},
        {title: 'May 1999', url: '#'},
        {title: 'April 1999', url: '#'},
    ],
    social: [
        {name: 'GitHub', icon: GitHubIcon},
        {name: 'Twitter', icon: TwitterIcon},
        {name: 'Facebook', icon: FacebookIcon},
    ],
};

export function PureBlog(props) {
    let {path, url} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <BlogHome {...props}
                          homeUrl={url}
                          homePath={path}/>
            </Route>
            <Route exact path={`${path}/:category`}>
                <BlogCategory {...props}
                              homeUrl={url}
                              homePath={path}/>
            </Route>
            <Route path={path}>
                <Redirect to={{pathname: path}}/>
            </Route>
        </Switch>
    );
}

function BlogHome(props) {
    const {
        header, blog,
        onAccessBlogHome,
        homeUrl, homePath
    } = props;

    if (header.channel !== channels.blog) {
        onAccessBlogHome(null, homeUrl);
        return <div>Refreshing BLOG channel.</div>;
    } else if (!blog.currentCategory) {
        return <div>Refreshing BLOG channel.</div>;
    } else {
        return <Redirect to={{pathname: `${homePath}/${blog.currentCategory}`}}/>;
    }
}

function BlogCategory(props) {
    const {
        header, blog, articles,
        onAccessBlogHome, onAccessBlogCategory,
        homeUrl, homePath
    } = props;

    const {category} = useParams();

    if (header.channel !== channels.blog) {
        onAccessBlogHome(category, homeUrl);
        return <div>Refreshing BLOG channel.</div>;
    } else if (!blog.currentCategory) {
        return <div>Refreshing BLOG channel.</div>;
    } else if (blog.currentCategory === category) {
        return <BlogContent header={header} articles={articles}/>;
    } else if (blog.categories.some(c => c.name === category)) {
        onAccessBlogCategory(category);
        return <div>`Refreshing BLOG category:${category}.`</div>;
    } else {
        return <Redirect to={{pathname: `${homePath}/${blog.currentCategory}`}}/>;
    }
}

function BlogContent({header, articles}) {
    const classes = useStyles();

    if (header.channel !== articles.channel || header.currentTab !== articles.tab) {
        return <div>Refreshing articles.</div>;
    } else {
        return (
            <Box>
                <MainFeaturedPost post={mainFeaturedPost}/>
                <Grid container spacing={4}>
                    {featuredPosts.map(post => (
                        <FeaturedPost key={post.title} post={post}/>
                    ))}
                </Grid>
                <Grid container spacing={5} className={classes.mainGrid}>
                    <Main title="From the firehose" articles={articles}/>
                    <Sidebar
                        title={sidebar.title}
                        description={sidebar.description}
                        archives={sidebar.archives}
                        social={sidebar.social}
                    />
                </Grid>
            </Box>
        );
    }
}

PureBlog.propTypes = {
    header: storePropTypes.header,
    blog: storePropTypes.blog,
    articles: storePropTypes.articles
};

export default connect(
    ({header, blog, articles}) =>
        ({header, blog, articles}),
    dispatch => ({
        onAccessBlogHome: (targetCategory, homeUrl) => dispatch(refreshBlogWholly(targetCategory, homeUrl)),
        onAccessBlogCategory: (targetCategory) => dispatch(transferBlogCategory(targetCategory))
    })
)(PureBlog);
