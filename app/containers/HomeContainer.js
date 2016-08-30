/**
 * Created by jason on 16/7/14.
 */
import React from 'react';
import {connect} from 'react-redux';
import Home from '../pages/Home';
import CodePush from 'react-native-code-push';

class HomeContainer extends React.Component {

  componentDidMount() {
    CodePush.sync({
      deploymentKey: 'lCYb0hSXQUEJHWiSykloC7wXu_19V1dAekTcW',
      updateDialog: {
        optionalIgnoreButtonLabel: '稍后',
        optionalInstallButtonLabel: '后台更新',
        optionalUpdateMessage: '“贷贷助手”有新版本了，是否更新？',
        title: '更新提示',
      },
      installMode: CodePush.InstallMode.ON_NEXT_RESTART,
    });
  }


    render() {
        return (
            <Home {...this.props} />
        )
    }
}
// HomeContainer = CodePush({ updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE })(HomeContainer);

export default connect((state) => {
    const { Home } = state;
    return {
        Home
    }
})(HomeContainer);
