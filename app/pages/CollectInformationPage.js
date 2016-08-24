import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    WebView,
} from 'react-native';
import Common from '../common/common';
import HeaderView from '../common/HeaderView';

export default class CollectInformationPage extends Component {



    render() {
      const {rowDate} = this.props;
// console.log('uuuuuuuuuuuuuu:' + rowDate.faved);
        return (
            <View>
            <HeaderView
              titleView= {'详情'}
              leftIcon={'angle-left'}
              leftIconAction={() => this.props.navigator.pop() }
              rightIcon = {'star-o'}
              pageID = {rowDate.CONTENTS}
              />
              <WebView
               style = {styles.web}s
               source = {{uri: rowDate.url}}
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
})
