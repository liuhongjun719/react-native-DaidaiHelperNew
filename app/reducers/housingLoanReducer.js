
import * as types from '../actions/actionTypes';

const initialState = {
    ClassDate: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
    isNoData: false,
};

let housingLoanReducer = (state = initialState, action) => {
    // console.log(action)

    switch (action.type) {
        case types.FETCH_HOUSINGLOAN_LIST:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading,
                isNoData: action.isNoData,
            })

        case types.RECEIVE_HOUSINGLOAN_LIST:
            // console.log(action);
            return Object.assign({}, state, {
                ClassDate: state.isLoadMore ? state.ClassDate.concat(action.classList) : action.classList,
                isLoading: false,
                isRefreshing: false,
                isNoData: action.isNoData,
            })

        // case types.RESET_HOUSINGLOAN_STATE:
        //     return Object.assign({},state,{
        //       ClassDate: [],
        //       isLoading: true,
        //     })

        default:
            return state;
    }
}

export default housingLoanReducer;
