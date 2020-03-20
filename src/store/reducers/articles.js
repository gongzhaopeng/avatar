import initialState from '../initialState'
import * as types from '../types'

export function articles(state = initialState.articles, action) {
    if (action.type === types.articles.REPLACED) {
        const {newArticles} = action;
        return newArticles;
    } else if (action.type === types.articles.LOADED_MORE) {
        const {beginIndex, loadedArticles} = action;
        const newArticles = state.slice();
        newArticles.splice(beginIndex, loadedArticles.length, ...loadedArticles);
        return newArticles;
    } else {
        return state;
    }
}