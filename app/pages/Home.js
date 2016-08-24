/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Navigator,
  WebView,
} from 'react-native';

import {
  home,
} from '../actions/homeAction';
import Common from '../common/common';
import HeaderView from '../common/HeaderView';


class Home extends Component {

  constructor(props) {
    super(props); //这一句不能省略，照抄即可
    // debugger
    this.state = {
    };
  }

  _refreshData() {
    console.log('home button');
  }

  render() {
    const { Home,rowDate } = this.props;
     tag = rowDate;
    // console.log(this.props);
    // debugger
    return (
      <View>
      <HeaderView
          titleView= '快速贷款'
          rightRepeatIcon = 'home'
          rightRepeatAction = {this._refreshData.bind(this)}
          />
          <WebView
           style = {styles.web}
           source = {{uri: 'http://m.rong360.com'}}
           >
          </WebView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  web: {
      width: Common.window.width,
      height: Common.window.height-64,

  },
});

module.exports = Home;
