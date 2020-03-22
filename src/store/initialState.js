/**
 * Created by gongzhaopeng on 2019/10/2.
 */
import PropTypes from 'prop-types';

export const propTypes = {
    owner: PropTypes.shape({
        authenticated: PropTypes.bool.isRequired,
        accessToken: PropTypes.string
    }).isRequired,
    header: PropTypes.shape({
        channel: PropTypes.string.isRequired,
        tabs: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                link: PropTypes.string.isRequired
            })
        ).isRequired,
        currentTab: PropTypes.string
    }).isRequired,
    blog: PropTypes.shape({
        categories: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                path: PropTypes.string.isRequired
            })
        ).isRequired,
        currentCategory: PropTypes.string
    }).isRequired,
    articles: PropTypes.shape({
        list: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            content: PropTypes.string
        })).isRequired,
        channel: PropTypes.string,
        tab: PropTypes.string
    }).isRequired
};

export default {
    owner: {
        authenticated: false,
        accessToken: null
    },
    header: {
        channel: "",
        tabs: [],
        currentTab: null
    },
    blog: {
        categories: [],
        currentCategory: null
    },
    articles: {
        list: [],
        channel: null,
        tab: null
    }
};
