import * as types from '../types';

export function replaced(channel, tab, newArticles) {
    return {
        type: types.articles.REPLACED,
        channel,
        tab,
        newArticles
    };
}

export function loadedMore(beginIndex, loadedArticles) {
    return {
        type: types.articles.LOADED_MORE,
        beginIndex,
        loadedArticles
    };
}