/* jshint ignore:start */
import React, { Component } from 'react';
import { View } from 'native-base';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './MapContainerStyle';
import SearchBox from '../SearchBox';
import SearchResults from '../SearchResults';
import axios from 'axios';

export default class MapCont extends Component {
    state={
    	x: this.props.region
    }
    shouldComponentUpdate(nextProps, nextState) {
    	// this.getAddress(nextState.x);
    	console.log('https://maps.googleapis.com/maps/api/geocode/json?address=' + nextState.x.latitude + ',' + nextState.x.longitude + '&key=' + 'AIzaSyCJgAhnCMahmqG0daZluMFTaHNTI8XrrEs');
    	fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + nextState.x.latitude + ',' + nextState.x.longitude + '&key=' + 'AIzaSyCJgAhnCMahmqG0daZluMFTaHNTI8XrrEs')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
})
    	// console.log(`https://www.latlong.net/c/?lat=${nextState.x.latitude}&long=${nextState.x.longitude}`)
    	return true;
    }

    render() {
        const region = this.props.region;
        console.log(this.state.x);
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
                	<MapView.Marker draggable
					    coordinate={this.state.x}
					    onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
					  	pinColor="red"
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
					InputData={this.props.InputData}
					getPlacesFromGoogle={this.props.getPlacesFromGoogle}
					/>
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