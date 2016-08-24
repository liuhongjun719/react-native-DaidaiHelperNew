
import * as types from '../actions/actionTypes';

const initialState = {
    ClassDate: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
    isNoData: false,
};

let purchaseCarReducer = (state = initialState, action) => {
    // console.log(action)

    switch (action.type) {
        case types.FETCH_PURCHASECAR_LIST:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading,
                isNoData: action.isNoData,
            })

        case types.RECEIVE_PURCHASECAR_LIST:
            // console.log(action);
            return Object.assign({}, state, {
                ClassDate: state.isLoadMore ? state.ClassDate.concat(action.classList) : action.classList,
                isLoading: false,
                isRefreshing: false,
                isNoData: action.isNoData,
            })

        default:
            return state;
    }
}

export default purchaseCarReducer;
