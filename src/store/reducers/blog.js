import initialState from '../initialState'
import * as types from '../types'

export function blog(state = initialState.blog, action) {
    if (action.type === types.blog.REFRESHED_WHOLLY) {
        const {categories, currentCategory} = action;
        return Object.assign({}, state, {
            categories,
            currentCategory
        });
    } else {
        return state;
    }
}