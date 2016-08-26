/**
 * Created by ljunb on 16/5/8.
 * 导航栏标题
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Common from '../common/common';

import Util from './utils';
import { toastShort } from '../common/ToastUtil';




export default class Header extends React.Component {
  constructor(props) {
      super(props);
      this._getCollectedData = this._getCollectedData.bind(this)
      this.state = {
        // collectState: this.props.collectState,
        collectState: '',
        pageID: this.props.pageID,
      };
      // console.log('this.props.collectState.faved========00000===:' + this.state.collectState);
      // console.log('this.props.collectState.ID========00000===:' + this.state.pageID);
  }

  //获取收藏的状态
  _getCollectedData() {
    var commend_url = 'http://api.coins.app887.com/api/Contents.action?id=';
    commend_url += this.state.pageID;
    commend_url += '&uid=1994';
    console.log('commend_url=========:' + commend_url);
    Util.get(commend_url,(response) => {
      console.log('成功------');
      let data = response.root;
          this.setState({
            collectState: data.favscount,
          });
    },(error) => {
      console.log('失败------');
    });
 }









  _collectArticle(collectState, pageID) {
    var commend_url = '';
    if (this.state.collectState == '0') {
      commend_url = 'http://api.coins.app887.com/api/Fav.action?id=1994&articleid=';
    }else if (this.state.collectState == '1') {
      commend_url = 'http://api.coins.app887.com/api/DeleteFav.action?id=1994&articleid=';
    }
    commend_url += this.state.pageID;
    console.log('commend_url=========:' + commend_url);

  Util.get(commend_url,(response) => {
    console.log('成功------');
    if (this.state.collectState == '0') {
      toastShort('已收藏');
    }else if (this.state.collectState == '1') {
      toastShort('取消收藏');
    }
      this.setState({
      });
  },(error) => {
    console.log('失败------');
    toastShort('收藏失败');
  });
}



    render() {
        let NavigationBar = [];
        // 左边图片按钮
        if (this.props.leftIcon != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'leftIcon'}
                    activeOpacity={0.75}
                    style={styles.leftIcon}
                    onPress={this.props.leftIconAction}
                    >
                    <Icon color="orange" size={30} name={this.props.leftIcon}/>
                </TouchableOpacity>
            )
        }

        // 在 更多设置 界面导航左边的 收藏collect 按钮，显示收藏界面
        if (this.props.leftCollectIcon != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'leftCollectIcon'}
                    activeOpacity={0.75}
                    style={styles.leftCollectIcon}
                    onPress={this.props.showCollectedIconAction}
                    >
                    <Icon color="orange" size={20} name={this.props.leftCollectIcon}/>
                </TouchableOpacity>
            )
        }

        // 标题
        if (this.props.title != undefined) {
            NavigationBar.push(
                <Text key={'title'} style={styles.title}>{this.props.title}</Text>
            )
        }

        // 自定义标题View
        if (this.props.titleView != undefined) {
            let Component = this.props.titleView;

            NavigationBar.push(
                <Text key={'titleView'} style={styles.titleView}>{this.props.titleView}</Text>
            )
        }


        // 右边图片 收藏按钮 collect
        if (this.props.rightIcon != undefined) {
          this._getCollectedData();
          console.log('rightIcon----------------' + this.props.rightIcon);
          let iconColor = (this.state.collectState == 1) ? 'orange' : 'lightgray';
            NavigationBar.push(
                <TouchableOpacity
                    key={'rightIcon'}
                    activeOpacity={0.75}
                    style={styles.rightIcon}
                    onPress={this._collectArticle.bind(this,this.state.collectState, this.state.pageID)}
                    >
                    <Icon color={iconColor}  size={20} name={this.props.rightIcon}/>
                </TouchableOpacity>
            )
        }


        // 右边 刷新界面 按钮
        if (this.props.rightRepeatIcon != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'rightRepeatIcon'}
                    activeOpacity={0.75}
                    style={styles.rightIcon}
                    onPress={this.props.rightRepeatAction}
                    >
                    <Icon color='orange'  size={20} name={this.props.rightRepeatIcon}/>
                </TouchableOpacity>
            )
        }









        return (
            <View style={styles.navigationBarContainer}>
                {NavigationBar}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    navigationBarContainer: {
        marginTop: 20,
        flexDirection: 'row',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1.0,
        backgroundColor: 'rgb(253, 253, 253)',
    },

    title: {
        fontSize: 15,
        marginLeft: 15,
    },
    titleView: {
        fontSize: 15,
        color: 'darkorange',
    },
    leftIcon: {
       left: -Common.window.width/2+40,
    },

    rightIcon: {
      left: Common.window.width/2-50,
    },
    leftCollectIcon: {
      left: -Common.window.width/2+60,

    }
})
// onPress={this.props.rightIconAction}
// <Icon color="orange" size={20} name={this.props.rightIcon}/>
