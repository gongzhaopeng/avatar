const WINDOW_LENGTH_FOR_LOADING_MORE_BLOG_ARTICLES = 20;

export function refreshBlogWholly(targetCategory) {
    return dispatch => acquireBlogCategories().then(async categories => {
        const headCategory = categories[0];
        const articles = await acquireBlogArticlesByCategory(headCategory.path);

        // TODO

        await loadMoreBlogArticles(articles);
    });
}

export function transferBlogCategory(targetCategory) {

}

export async function loadMoreBlogArticles(articles) {
    const beginIndexToLoad = articles.findIndex(article => !article.content);
    const loadedArticles = beginIndexToLoad === -1 ? [] :
        await Promise.all(articles.slice(beginIndexToLoad,
            WINDOW_LENGTH_FOR_LOADING_MORE_BLOG_ARTICLES).map(articleToLoad =>
            acquireArticleContent(articleToLoad.path).then(content =>
                Object.assign({}, articleToLoad, {content})
            )
        ));

    console.log(JSON.stringify(loadedArticles));
}

function acquireBlogCategories() {
    return acquireBlogContent("/blog").then(res => {
        return res.map(category => ({
            name: category.name,
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