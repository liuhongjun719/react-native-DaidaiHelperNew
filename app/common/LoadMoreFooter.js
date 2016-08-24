/**
 * Created by ljunb on 16/5/30.
 */
import React from 'react';
import {
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
} from 'react-native';

export default class LoadMoreFooter extends React.Component {
    render() {

      if (this.props.type == 'NoData') {//没有更多数据了
        return (
            <View style={styles.footer}>
                <Text style={styles.footerTitle}>
                  {this.props.title}
                </Text>
            </View>
        )
      }else if (this.props.type == 'HasData') {//有数据，继续加载更多数据
        return (
            <View style={styles.footer}>
                <ActivityIndicator />
                <Text style={styles.footerTitle}>
                  {this.props.title}
                </Text>
            </View>
        )
      }
    }
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },

    footerTitle: {
        marginLeft: 10,
        fontSize: 15,
        color: 'gray'
    }
})
