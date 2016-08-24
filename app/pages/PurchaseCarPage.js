

import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    ListView,
    TouchableOpacity,
    View,
    InteractionManager,
    RefreshControl,
    ScrollView,
    Navigator,
} from 'react-native';



import {PurchaseCarAction} from '../actions/PurchaseCarAction.js';
import Common from '../common/common';
import Loading from '../common/Loading';
import HeaderView from '../common/HeaderView';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
require('moment/locale/zh-cn');
import LoadMoreFooter from '../common/LoadMoreFooter';
import InformationPage from './InformationPage';



let limit = 21;
let offest = '';
let tag = '';
let isLoadMore = false;
let isRefreshing = false;
let isLoading = true;
let page = 0;
let isNoData = false;


class PurchaseCarPage extends Component {
    constructor(props) {
        super(props);
        this._renderRow = this.renderRow.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
          const {dispatch} = this.props
          dispatch(PurchaseCarAction(isNoData,isLoadMore, isRefreshing, isLoading, page));
        })
    }

    _refreshData() {
      isLoadMore = false;
      isRefreshing = true;
      page = 0;
      const {dispatch} = this.props;
      dispatch(PurchaseCarAction(isNoData,isLoadMore, isRefreshing, isLoading, page));

    }


    render() {
        const {PurchaseCarPage} = this.props;
        // console.log(this.props);
        let classList = PurchaseCarPage.ClassDate;
        // console.log('dddddddd------:' + classList);
        return (
            <View>
                <HeaderView
                    titleView= '购车资讯'
                    rightRepeatIcon = 'repeat'
                    rightRepeatAction = {this._refreshData.bind(this)}
                    />
                {PurchaseCarPage.isLoading ? <Loading /> :
                    <ListView
                      dataSource={this.state.dataSource.cloneWithRows(classList) }
                      renderRow={this._renderRow}
                      enableEmptySections={true}
                      initialListSize= {25}
                      onScroll={this._onScroll}
                      onEndReached={this._onEndReach.bind(this) }
                      onEndReachedThreshold={25}
                      renderFooter={this._renderFooter.bind(this) }
                      style={{ height: Common.window.height - 40 - 64 }}
                      refreshControl={
                        <RefreshControl
                          refreshing={PurchaseCarPage.isRefreshing}
                          onRefresh={this._onRefresh.bind(this) }
                          title="正在加载中……"
                          color="#ccc"
                          style = {{marginLeft: 50}}
                          />
                      }
                      />
                }
            </View>
        );

    }

    renderRow(rowDate, rowID) {
        if (rowDate.imglink == '') {//zero image
          return (
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={this._onPressFeedItem.bind(this, rowDate) }
                style={[styles.center, styles.zero_button]}
                >
                <View style = {styles.zero_back_view}>
                    <Text numberOfLines = {2}>{rowDate.title}</Text>
                    <View style = {styles.view_time}>
                      <Text style = {styles.text_time}>{moment(rowDate.CTIME).fromNow()}</Text>
                      <Text style = {styles.text_readarts}>{(rowDate.readarts != undefined) ? rowDate.readarts+' 人阅读' : ''}</Text>
                    </View>
                    <View style = {styles.view_line}></View>
                </View>
            </TouchableOpacity>
          );

        }
        else if (rowDate.imglink != '' && rowDate.imglink_1 == undefined) {//one image
          return (
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={this._onPressFeedItem.bind(this, rowDate) }
                >
                <View style = {styles.one_back_view}>
                  <View style = {styles.one_top_back_view}>
                    <View style = {styles.one_left_view}>
                      <Text numberOfLines = {2}>{rowDate.title}</Text>
                      <View style = {styles.view_time}>
                        <Text style = {styles.text_time}>{moment(rowDate.CTIME).fromNow()}</Text>
                        <Text style = {styles.text_readarts}>{(rowDate.readarts != undefined) ? rowDate.readarts+' 人阅读' : ''}</Text>
                      </View>
                    </View>
                    <Image source = {{uri: rowDate.imglink}} style = {styles.one_right_image}></Image>
                  </View>

                  <View style = {styles.view_line}></View>

                </View>
            </TouchableOpacity>
          );
        }else if (rowDate.imglink != '' && rowDate.imglink_1 != '') {//three
          return (
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={this._onPressFeedItem.bind(this, rowDate) }
                >
                <View style = {styles.three_back_view}>
                  <Text numberOfLines = {2}>{rowDate.title}</Text>
                  <View style = {styles.three_image_back_view}>
                    <Image source = {{uri: rowDate.imglink_1}} style = {styles.three_image}></Image>
                    <Image source = {{uri: rowDate.imglink_2}} style = {styles.three_image_center}></Image>
                    <Image source = {{uri: rowDate.imglink_3}} style = {styles.three_image}></Image>
                  </View>
                  <View style = {styles.view_time}>
                    <Text style = {styles.text_time}>{moment(rowDate.CTIME).fromNow()}</Text>
                    <Text style = {styles.text_readarts}>{(rowDate.readarts != undefined) ? rowDate.readarts+' 人阅读' : ''}</Text>
                  </View>
                  <View style = {styles.view_line}></View>
                </View>

            </TouchableOpacity>
          );
        }

    }


    _onPressFeedItem(rowDate) {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                name: 'InformationPage',
                component: InformationPage,
                passProps: {
                    rowDate: rowDate,
                }
            })
        });
    }

    _renderFooter() {
      const {PurchaseCarPage} = this.props;
      return <LoadMoreFooter title = {(PurchaseCarPage.isNoData) ? '没有更多数据了' : '正在加载更多……'}
                type = {(PurchaseCarPage.isNoData) ? 'NoData' : 'HasData'}/>
    }

    _onScroll() {
      if (!isLoadMore) isLoadMore = true;
    }

    // 下拉刷新
    _onRefresh() {
      if (isLoadMore) {
        const {dispatch} = this.props;
        isLoadMore = false;
        isRefreshing = true;
        page = 0;
        dispatch(PurchaseCarAction(isNoData,isLoadMore, isRefreshing, isLoading, page));

      }
    }

    // 上拉加载
    _onEndReach() {

      InteractionManager.runAfterInteractions(() => {
        const {dispatch} = this.props;
        isLoadMore = true;
        isLoading = false;
        page++;
        dispatch(PurchaseCarAction(isNoData,isLoadMore, isRefreshing, isLoading, page));

      })

    }

}

const styles = StyleSheet.create({
  center:{
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
  },
  container: {
      width: Common.window.width-20,
      height: 50,
      // paddingLeft: 10,

      // paddingRight: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      // borderBottomColor: '#ccc',
      // borderBottomWidth: 0.5,

  },

  view_line: {
    height: 1,
    backgroundColor: 'rgb(245, 244, 245)',
    marginTop: 5,
  },

  // TODO: zero Image
  zero_button: {
    height: 80,
  },
  zero_back_view: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  zero_title: {
    fontSize: 18,
  },

  zero_date: {
    fontSize: 14

  },


  // TODO: one Image
  one_right_image: {
    height: 100,
    width: 120,
  },
  one_back_view: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },

  one_top_back_view: {
    flexDirection: 'row',
  },
  one_left_view: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },


  // TODO: three Image
  three_back_view: {
    flexDirection: 'column',
    padding: 10
  },
  three_image_back_view: {
    flexDirection: 'row',
  },
  three_image: {
    flex: 1,
    height: 100,
  },
  three_image_center: {
    flex: 1,
    height: 100,
    marginLeft: 5,
    marginRight: 5,
  },

  view_time: {
    flexDirection: 'row',
    marginTop: 20,
  },

  text_time: {
    fontSize: 10,
    color: 'rgb(203, 203, 203)',
  },
  text_readarts: {
    fontSize: 10,
    color: 'rgb(203, 203, 203)',
    marginLeft: 10,
  },

});

module.exports = PurchaseCarPage;
