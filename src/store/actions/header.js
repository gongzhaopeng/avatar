import * as types from '../types';

export function channelSwitched(channel, tabs, currentTab) {
    return {
        type: types.header.CHANNEL_SWITCHED,
        channel: channel,
        tabs,
        currentTab
    };
}

export function tabSwitched(targetTab) {
    return {
        type: types.header.TAB_SWITCHED,
        targetTab
    };
}