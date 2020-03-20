import * as types from '../types';

export function replaced(newArticles) {
    return {
        type: types.articles.REPLACED,
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