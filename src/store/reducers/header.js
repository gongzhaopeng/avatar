import initialState from '../initialState'
import * as types from '../types'

export function header(state = initialState.header, action) {
    if (action.type === types.header.CHANNEL_SWITCHED) {
        const {title, tabs, currentTab} = action;
        return Object.assign({}, state, {
            title, tabs, currentTab
        });
    } else if (action.type === types.header.TAB_SWITCHED) {
        const {targetTab} = action;
        return Object.assign({}, state, {
            currentTab: targetTab
        });
    } else {
        return state;
    }
}