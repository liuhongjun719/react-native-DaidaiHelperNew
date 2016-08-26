import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    WebView,
    ListView,
    TouchableOpacity,
    Switch,
    InteractionManager,
} from 'react-native';
import Common from '../common/common';
import HeaderView from '../common/HeaderView';
import Icon from 'react-native-vector-icons/FontAwesome';
import DetailPageContainer from '../containers/DetailPageContainer';
import Storage from '../common/Storage';

var stateTest = true;

export default class HomeDetil extends Component {
  constructor(props) {
      super(props);
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
          dataSource: ds.cloneWithRows(['意见反馈', '评分', '版本号', '通知', '清理缓存']),
          isSwitchOn: true,
      };
  }

  _onValueChange(value) {
    // console.log('value-------:' + value);
    this.setState({
      isSwitchOn: value,
    })
    console.log('vvvvvvv' + this.state.isSwitchOn);
  }

  _renderRow(
    rowData: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
    // console.log('this.state.isSwitchOn:----------' + this.state.isSwitchOn);
    if (rowID < 2) {
      return(
        <TouchableOpacity
        activeOpacity={0.75}>
          <View style = {styles.container}>
              <Text>{rowData}</Text>
              <Icon color="gray" size={20} name='angle-right'/>
          </View>
        </TouchableOpacity>
      );
    }else if (rowID == 2) {
      return(
        <TouchableOpacity
        activeOpacity={0.75}>
          <View style = {styles.container}>
              <Text>{rowData}</Text>
              <Text>{'1.0.0'}</Text>
          </View>
        </TouchableOpacity>
      );
    }else if (rowID == 3) {///
      return(
        <TouchableOpacity
        activeOpacity={0.75}>
          <View style = {styles.container}>
              <Text>{rowData}</Text>
              <Switch
               value = {this.state.isSwitchOn}
               onValueChange = {this._onValueChange.bind(this)}
               />
          </View>
        </TouchableOpacity>
      );
    }else if (rowID == 4) {
      return(
        <TouchableOpacity
        activeOpacity={0.75}>
          <View style = {styles.container}>
              <Text style = {{width: 60}}>{rowData}</Text>
              <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style = {{width: 80}}>{'1.81M'}</Text>
                <Icon color="gray" size={20} name='angle-right'/>
              </View>
          </View>
        </TouchableOpacity>
      );
    }

  }



  _showCollectedArticle(data) {
    console.log(data);
    InteractionManager.runAfterInteractions(() => {
        this.props.navigator.push({
            name: '收藏',
            component: DetailPageContainer,
        })
    });
  }




    render() {
      // console.log('value-------:' + this.state.isSwitchOn);

        return (
            <View>
              <HeaderView
                titleView= {'更多设置'}
                leftCollectIcon = {'star-o'}
                showCollectedIconAction={this._showCollectedArticle.bind(this, 'data000000')}/>
                <ListView
                  style = {styles.list}
                  dataSource = {this.state.dataSource}
                  renderRow = {this._renderRow.bind(this)}
                  // renderSeparator = {this.renderSeparator}
                  />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    list: {
        width: Common.window.width,
        height: Common.window.height-64,
        paddingLeft: 10,
        paddingRight: 0,
    },
    container: {
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: 'rgb(245, 244, 245)',
        borderBottomWidth: 0.5,

    },
})
