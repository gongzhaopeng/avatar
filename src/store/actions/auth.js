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

export function ownerLogout() {
    return {
        type: types.auth.OWNER_LOGOUT
    }
}

export function codeReceived(code) {
    return dispatch =>
        acquireAccessToken(code).then(async accessToken => {
            if (!accessToken) return;

            const verified = await verifyOwner(accessToken);
            if (verified === true) {
                dispatch(ownerVerified(accessToken));
                history.push('/');
            }
        });
}

function acquireAccessToken(code) {
    const accessTokenReq = {
        'client_id': process.env.REACT_APP_GITHUB_AUTH_CLIENT_ID,
        'client_secret': process.env.REACT_APP_GITHUB_AUTH_CLIENT_SECRET,
        'code': code,
        'redirect_uri': process.env.REACT_APP_GITHUB_AUTH_REDIRECT_URI
    };

    return fetch('/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(accessTokenReq)
    }).then(resp => resp.json()).then(res => {
        const {access_token} = res;
        return access_token;
    }).catch(reason => console.log(reason));
}

function verifyOwner(accessToken) {
    return fetch('/user/emails', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `token ${accessToken}`
        }
    }).then(resp => resp.json()).then(res => {
        return res.some(({email}) =>
            email === process.env.REACT_APP_GITHUB_OWNER_EMAIL);
    }).catch(reason => console.log(reason));
}
