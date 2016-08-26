
import * as types from '../actions/actionTypes';

const initialState = {
    ClassDate: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
    isNoData: false,
};

let detailPageReducer = (state = initialState, action) => {
    // console.log(action)

    switch (action.type) {
        case types.FETCH_DETAILPAGE_LIST:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading,
                isNoData: action.isNoData,
            })

        case types.RECEIVE_DETAILPAGE_LIST:
            // console.log(action);
            return Object.assign({}, state, {
                ClassDate: state.isLoadMore ? loadMore(state, action) : refresh(state, action),
                isLoading: false,
                isRefreshing: false,
                isNoData: action.isNoData,
            })

        default:
            return state;
    }
}
function refresh(state, action) {
  state.classList = action.classList;
  return state.classList;
}

function loadMore(state, action) {
  state.ClassDate = state.ClassDate.concat(action.classList);
  return state.ClassDate;
}

export default detailPageReducer;
