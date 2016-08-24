/**
 * Created by jason on 16/7/14.
 */
import React from 'react';
import {connect} from 'react-redux';
import DetailPage from '../pages/DetailPage';

class DetailPageContainer extends React.Component {
    render() {
        return (
            <DetailPage {...this.props} />
        )
    }
}

export default connect((state) => {

    const { DetailPage } = state;
    return {
        DetailPage
    }
})(DetailPageContainer);
