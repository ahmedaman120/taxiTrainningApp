import React, { Component } from 'react';
import { View } from 'native-base';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './MapContainerStyle';
export default class MapCont extends Component {
    
    render() {
        const region = this.props.region;
        return (
            <View style={styles.container}>
                <MapView
					provider={PROVIDER_GOOGLE} // remove if not using Google Maps
					style={styles.map}
					region={region}
				>
				<MapView.Marker
                	coordinate={region}
                	pinColor="green"
                	/>
                </MapView>

            </View>
        )
    }
}

/**{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.015,
						longitudeDelta: 0.0121,
					} */