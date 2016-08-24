'use strict';
import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Layout from './Layout';

export default class Tab extends React.Component {
  static propTypes = {
    testID : PropTypes.string,
    title: PropTypes.string,
    titleStyle: Text.propTypes.style,
    badge: PropTypes.element,
    onPress: PropTypes.func,
    hidesTabTouch: PropTypes.bool,
    allowFontScaling: PropTypes.bool,
    style: View.propTypes.style,
    viewStyle: View.propTypes.style,
  };

  constructor(props, context) {
    super(props, context);

    this._handlePress = this._handlePress.bind(this);
  }

  render() {
    let { title, badge } = this.props;
    let icon = null;
    if (React.Children.count(this.props.children) > 0) {
      icon = React.Children.only(this.props.children);
    }

    if (title) {
      title =
        <View style = {[styles.title_back_view, this.props.viewStyle]}>
          <Text
            numberOfLines={1}
            allowFontScaling={!!this.props.allowFontScaling}
            style={[styles.title, this.props.titleStyle]}>
            {title}
          </Text>
        </View>;
    }

    if (badge) {
      badge = React.cloneElement(badge, {
        style: [styles.badge, badge.props.style],
      });
    }

    let tabStyle = [
      styles.container,
      title ? null : styles.untitledContainer,
      this.props.style,
    ];
    return (
      <TouchableOpacity
        testID={this.props.testID}
        activeOpacity={this.props.hidesTabTouch ? 1.0 : 0.8}
        onPress={this._handlePress}
        style={tabStyle}>
        <View>
          {badge}
        </View>
        {title}
      </TouchableOpacity>
    );
  }

  _handlePress(event) {
    if (this.props.onPress) {
      this.props.onPress(event);
    }
  }
}

let styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  untitledContainer: {
    paddingBottom: 13,
  },
  title: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    alignSelf: 'stretch',
    // marginTop: 4,
    fontWeight: '100',
    // marginBottom: 10 + Layout.pixel,
    paddingBottom: 5,
  },

  title_back_view: {
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    marginBottom: 0,
  },
});
