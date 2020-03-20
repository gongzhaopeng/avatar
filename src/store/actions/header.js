import * as types from '../types';

export function channelSwitched(channelTitle, tabs, currentTab) {
    return {
        type: types.header.CHANNEL_SWITCHED,
        title: channelTitle,
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