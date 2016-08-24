/**
 * Created by jason on 16/7/14.
 */
import React from 'react';
import {connect} from 'react-redux';
import PurchaseCarPage from '../pages/PurchaseCarPage';

class PurchaseCarNewsContainer extends React.Component {
    render() {
        return (
            <PurchaseCarPage {...this.props} />
        )
    }
}

export default connect((state) => {

    const { PurchaseCarPage } = state;
    return {
        PurchaseCarPage
    }
})(PurchaseCarNewsContainer);
