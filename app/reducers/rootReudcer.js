/**
 * Created by ljunb on 16/5/25.
 * 根reducer
 */
import { combineReducers } from 'redux';
import Home from './homeReducer';
import HousingLoanPage from './housingLoanReducer';
import PurchaseCarPage from './purchaseCarReducer';
import DetailPage from './detailPageReducer';


export default rootReducer = combineReducers({
    Home,
    HousingLoanPage,
    PurchaseCarPage,
    DetailPage,
})
