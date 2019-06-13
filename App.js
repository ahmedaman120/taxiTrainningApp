import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Root from './src/main';
import MapView , {PROVIDER_GOOGLE} from 'react-native-maps';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
         <Root {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
/*<MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
<Text>ssss</Text>
*/

 // <Root {...this.props} />
