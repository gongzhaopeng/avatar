import initialState from '../initialState'
import * as types from '../types'

export function articles(state = initialState.articles, action) {
    if (action.type === types.articles.REPLACED) {
        const {channel, tab, newArticles} = action;
        return {list: newArticles, channel, tab};
    } else if (action.type === types.articles.LOADED_MORE) {
        const {beginIndex, loadedArticles} = action;
        const newArticles = state.list.slice();
        newArticles.splice(beginIndex, loadedArticles.length, ...loadedArticles);
        return Object.assign({}, state, {list: newArticles});
    } else {
        return state;
    }
}