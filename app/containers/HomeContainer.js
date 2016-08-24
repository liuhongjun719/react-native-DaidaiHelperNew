/**
 * Created by jason on 16/7/14.
 */
import React from 'react';
import {connect} from 'react-redux';
import Home from '../pages/Home';

class HomeContainer extends React.Component {
    render() {
        return (
            <Home {...this.props} />
        )
    }
}

export default connect((state) => {
    const { Home } = state;
    return {
        Home
    }
})(HomeContainer);
