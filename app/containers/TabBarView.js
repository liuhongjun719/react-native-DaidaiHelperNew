


import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HomeContainer from '../containers/HomeContainer';
import HousingLoanContainer from '../containers/HousingLoanContainer';
import PurchaseCarNewsContainer from '../containers/PurchaseCarNewsContainer';
import DetailPageContainer from '../containers/DetailPageContainer';
import MoreSettingContainer from '../containers/MoreSettingContainer';




const tabBarItems = [
    { title: '快速贷款', component: HomeContainer },
    { title: '房屋贷款', component: HousingLoanContainer },
    { title: '购车资讯', component: PurchaseCarNewsContainer },
    { title: '更多设置', component: MoreSettingContainer },
]

export default class TarBarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: tabBarItems[0].title,
        };
    }
    render() {
        return (
            <TabNavigator tabBarStyle={{ height: 40 }}>
                {
                    tabBarItems.map((controller, i) => {
                        let Component = controller.component;
                        return (
                            <TabNavigator.Item
                                key= {i}
                                selected={this.state.selectedTab === controller.title}
                                title={controller.title}
                                // renderIcon={controller.icon}
                                onPress={() => this.setState({ selectedTab: controller.title }) }>
                                <Component navigator = {this.props.navigator} {...this.props}/>
                            </TabNavigator.Item>
                        )
                    })
                }
            </TabNavigator >

        );
    }


}
