import * as types from '../types';
import {channelSwitched, tabSwitched} from "./header";
import {replaced, loadedMore} from "./articles";
import {channels} from "../../constants/header";

const WINDOW_LENGTH_FOR_LOADING_MORE_BLOG_ARTICLES = 20;

export function refreshedWholly(categories, currentCategory) {
    return {
        type: types.blog.REFRESHED_WHOLLY,
        categories,
        currentCategory
    };
}

export function refreshBlogWholly(targetCategoryName, homeUrl) {
    return dispatch =>
        acquireBlogCategories().then(async categories => {
            const targetCategory = (targetCategoryName && categories.find(category =>
                category.name === targetCategoryName)) || categories[0];

            const articles = await acquireBlogArticlesByCategory(targetCategory.path);

            const tabs = categories.map(category => ({
                name: category.name.toUpperCase(),
                link: `${homeUrl}/${category.name}`
            }));
            const currentTab = targetCategory.name.toUpperCase();
            dispatch(channelSwitched(channels.blog, tabs, currentTab));

            dispatch(refreshedWholly(categories, targetCategory.name));

            dispatch(replaced(channels.blog, currentTab, articles));

            await loadMoreBlogArticles(articles)(dispatch);
        });
}

export function transferBlogCategory(targetCategory) {
    return dispatch => console.log(`Transferring to category:${targetCategory}.`);
}

export function loadMoreBlogArticles(articles) {
    return async dispatch => {
        const beginIndexToLoad = articles.findIndex(article => !article.content);
        const loadedArticles = beginIndexToLoad === -1 ? [] :
            await Promise.all(articles.slice(beginIndexToLoad,
                WINDOW_LENGTH_FOR_LOADING_MORE_BLOG_ARTICLES).map(articleToLoad =>
                acquireArticleContent(articleToLoad.path).then(content =>
                    Object.assign({}, articleToLoad, {content})
                )
            ));

        dispatch(loadedMore(beginIndexToLoad, loadedArticles));
    }
}

function acquireBlogCategories() {
    return acquireBlogContent("/blog").then(res => {
        return res.map(category => ({
            name: category.name.toLowerCase(),
            path: category.path
        }));
    });
}

function acquireBlogArticlesByCategory(categoryPath) {
    return acquireBlogContent(categoryPath).then(res => {
        return res.map(article => ({
            name: article.name,
            path: article.path
        }));
    });
}

function acquireArticleContent(articlePath) {
    return acquireBlogContent(articlePath).then(({content}) =>
        window.atob(content)
    );
}

function acquireBlogContent(path) {
    const url = process.env.REACT_APP_GITHUB_API_BASE_URL
        + process.env.REACT_APP_GITHUB_BACKEND_REPO
        + path;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(resp => resp.json());
}