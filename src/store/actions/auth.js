/**
 * Created by gongzhaopeng on 2019/10/2.
 */
import * as types from '../types';
import {history} from '../../history/history';

export function ownerVerified(accessToken) {
    return {
        type: types.auth.OWNER_VERIFIED,
        accessToken
    };
}

export function codeReceived(code) {
    return dispatch =>
        acquireAccessToken(code).then(async accessToken => {
            const ownerVerified = await verifyOwner(accessToken);
            if (ownerVerified === true) {
                dispatch(ownerVerified(accessToken));
                history.push('/');
            }
        });
}

function acquireAccessToken(code) {
    const accessTokenReq = new FormData();
    accessTokenReq.append('client_id',
        process.env.REACT_APP_GITHUB_AUTH_CLIENT_ID);
    accessTokenReq.append('client_secret',
        process.env.REACT_APP_GITHUB_AUTH_CLIENT_SECRET);
    accessTokenReq.append('code', code);
    accessTokenReq.append('redirect_uri',
        process.env.REACT_APP_GITHUB_AUTH_REDIRECT_URI);

    return fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        body: accessTokenReq
    }).then(resp => resp.json()).then(res => {
        const {access_token} = res;
        return access_token;
    });
}

function verifyOwner(accessToken) {
    return fetch('https://api.github.com/user/emails', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `token ${accessToken}`
        }
    }).then(resp => resp.json()).then(res => {
        return res.some(({email}) =>
            email === process.env.REACT_APP_GITHUB_OWNER_EMAIL);
    });
}
