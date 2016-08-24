/**
 * Created by jsaon on 16/7/15.
 */
import {Dimensions} from 'react-native';

let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}
export default {
    window: window,
}