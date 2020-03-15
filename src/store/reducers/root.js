import {combineReducers} from "redux";

import {owner} from "./owner";
import {blog} from "./blog";
import {articles} from "./articles";

const rootReducer = combineReducers({
    owner,
    blog,
    articles
});

export default rootReducer;
