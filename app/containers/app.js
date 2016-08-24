/**
 * Created by jason on 16/7/14.
 */
import React from 'react';
import {
    Navigator,
    View,
    StyleSheet,
    Text,
} from 'react-native';

import TabBarView from '../containers/TabBarView';

class App extends React.Component {
    render() {

        return (
            <View style={{ flex: 1 }}>
                <Navigator
                    initialRoute={{ name: 'TabBarView', component: TabBarView }}

                    configureScene={(route) => {
                        if (route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.FloatFromRight;
                    } }
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component navigator = {navigator} route = {route} {...route.passProps} />
                        )
                    } }
                    />
            </View>
        )
    }
}

export default App;