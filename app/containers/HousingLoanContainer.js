/**
 * Created by jason on 16/7/14.
 */
import React from 'react';
import {connect} from 'react-redux';
import HousingLoanPage from '../pages/HousingLoanPage';

class HousingLoanContainer extends React.Component {
    render() {
        return (
            <HousingLoanPage {...this.props} />
        )
    }
}

export default connect((state) => {

    const { HousingLoanPage } = state;
    return {
        HousingLoanPage
    }
})(HousingLoanContainer);
