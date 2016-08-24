/**
 * Created by jason on 16/7/14.
 */
import React from 'react';
import {connect} from 'react-redux';
import MoreSettingPage from '../pages/MoreSettingPage';

class MoreSettingContainer extends React.Component {
    render() {
        return (
            <MoreSettingPage {...this.props} />
        )
    }
}

export default connect((state) => {

    const { MoreSettingPage } = state;
    return {
        MoreSettingPage
    }
})(MoreSettingContainer);
