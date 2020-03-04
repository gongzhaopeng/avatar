import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {connect} from "react-redux";
import {ownerLogout} from "../../store/actions/auth";

const useStyles = makeStyles(theme => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}));

function githubAuthUrl() {
    const url = new URL('https://github.com/login/oauth/authorize');

    const searchParams = url.searchParams;
    searchParams.append('client_id', process.env.REACT_APP_GITHUB_AUTH_CLIENT_ID);
    searchParams.append('redirect_uri', process.env.REACT_APP_GITHUB_AUTH_REDIRECT_URI);
    searchParams.append('login', process.env.REACT_APP_GITHUB_OWNER_EMAIL);
    searchParams.append('scope', 'user:email repo');
    searchParams.append('allow_signup', 'false');

    return url;
}

export function PureHeader(props) {
    const classes = useStyles();
    const {sections, title, owner, onOwnerLogout} = props;

    return (
        <React.Fragment>
            <Toolbar className={classes.toolbar}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    {title}
                </Typography>
                <IconButton>
                    <SearchIcon/>
                </IconButton>
                {
                    owner.authenticated ?
                        <Button variant="contained" size="large"
                                color="secondary" onClick={onOwnerLogout}>
                            OWNER VERIFIED
                        </Button> :
                        <Button variant="outlined" size="small"
                                onClick={() => window.location.href = githubAuthUrl().href}>
                            TO BE OWNER
                        </Button>
                }
            </Toolbar>
            <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                {sections.map(section => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        className={classes.toolbarLink}
                    >
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}

PureHeader.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
};

export default connect(
    ({owner}) => ({owner}),
    dispatch => ({
        onOwnerLogout: () => dispatch(ownerLogout())
    })
)(PureHeader);
