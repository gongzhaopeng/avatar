import initialState from '../initialState'
import * as types from '../types'

export function owner(state = initialState.owner, action) {
    if (action.type === types.auth.OWNER_VERIFIED) {
        const {accessToken} = action;
        return Object.assign({}, state, {
            authenticated: true,
            accessToken: accessToken
        });
    } else if (action.type === types.auth.OWNER_LOGOUT) {
        return Object.assign({}, state, {
            authenticated: false,
            accessToken: null
        });
    } else {
        return state;
    }
}