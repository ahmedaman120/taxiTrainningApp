/* jshint ignore:start */
import React, { Component } from 'react';
import { View } from 'native-base';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './MapContainerStyle';
import SearchBox from '../SearchBox';
import SearchResults from '../SearchResults';

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
				<SearchBox 
					getInput={this.props.getInput}
					changeBetweenBeAndWill={this.props.changeBetweenBeAndWill}
					getPlacesFromGoogle={this.props.getPlacesFromGoogle}
					/>
				{ (this.props.resultTypes.be || this.props.resultTypes.will) &&
				<SearchResults  
					predictions={this.props.predictions}
					resultTypes={this.props.resultTypes} 
					InputData={this.props.InputData}/>
				}
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