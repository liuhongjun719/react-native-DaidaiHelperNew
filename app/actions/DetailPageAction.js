

import * as types from './actionTypes';
import Util from '../common/utils';


export let DetailPageAction = (isNoData, isLoadMore, isRefreshing, isLoading, page) => {
    let URL = 'http://api.coins.app887.com/api/Favs.action?id=1994&one=20&page=';
    URL += page;
    console.log('收藏URL=======:' + URL);
    return dispatch => {
        dispatch(feachClassList(isNoData, isLoadMore, isRefreshing, isLoading));
        return Util.get(URL,(response) => {
            console.log('收藏数据-----：' + response.root.list);
            var isExistData = (response.root.list.length == 0) ? true : false;
            dispatch(receiveClassList(response, isExistData));
        },(error) => {
            console.log('收藏数据error==>' + error);
            dispatch(receiveClassList([]));
        });
    }
}

let feachClassList = (isNoData, isLoadMore, isRefreshing, isLoading) => {
    return {
        type: types.FETCH_DETAILPAGE_LIST,
        isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
        isNoData: isNoData,
    }
}

let receiveClassList = (response, isExistData) => {
    return {
        type: types.RECEIVE_DETAILPAGE_LIST,
        classList: response.root.list,
        isNoData: isExistData,
    }
}

export let resetState = ()=> {
    return {
        type: types.RESET_DETAILPAGE_STATE,
    }
}
