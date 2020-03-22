import initialState from '../initialState'
import * as types from '../types'

export function header(state = initialState.header, action) {
    if (action.type === types.header.CHANNEL_SWITCHED) {
        const {channel, tabs, currentTab} = action;
        return Object.assign({}, state, {
            channel, tabs, currentTab
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