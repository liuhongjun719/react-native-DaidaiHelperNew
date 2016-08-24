import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native';
import Common from '../common/common';

export default class HomeDetil extends Component {
    render() {
        const {rowDate} = this.props
        
        return (
            <View >
                <Image
                    source={{ uri: 'http://img.hb.aicdn.com/' + rowDate.file.key + '_fw658' }}
                    style={styles.thumbnail}
                    />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    thumbnail: {
        width: Common.window.width,
        height: Common.window.height,

    },
})

