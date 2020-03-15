/**
 * Created by gongzhaopeng on 2019/10/2.
 */
import PropTypes from 'prop-types';

export const propTypes = {
    owner: PropTypes.shape({
        authenticated: PropTypes.bool.isRequired,
        accessToken: PropTypes.string
    }).isRequired,
    blog: PropTypes.shape({
        categories: PropTypes.arrayOf(
            PropTypes.shape({
                "name": PropTypes.string.isRequired,
                "url": PropTypes.string.isRequired
            })
        ).isRequired,
        currentCategory: PropTypes.string
    }).isRequired,
    articles: PropTypes.shape({
        list: PropTypes.arrayOf(PropTypes.shape({
            "name": PropTypes.string.isRequired,
            "url": PropTypes.string.isRequired,
            "content": PropTypes.string
        })).isRequired,
        nextToLoad: PropTypes.number.isRequired
    }).isRequired
};

export default {
    owner: {
        authenticated: false,
        accessToken: null
    },
    blog: {
        categories: [],
        currentCategory: null
    },
    articles: {
        list: [],
        nextToLoad: 0
    }
};
