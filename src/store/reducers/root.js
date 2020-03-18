import {combineReducers} from "redux";

import {owner} from "./owner";
import {blog} from "./blog";
import {articles} from "./articles";
import {header} from "./header";

const rootReducer = combineReducers({
    owner,
    blog,
    articles,
    header
});

export default rootReducer;
