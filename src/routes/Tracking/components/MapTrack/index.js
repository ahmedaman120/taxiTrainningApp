/* jshint ignore:start */
import React, { Component } from 'react';
import { Container } from 'native-base';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './mapTrackStyle';
import {View} from 'react-native';
 // const { width, height } = Dimensions.get('window');

// import axios from 'axios';
export default class TrackCont extends Component {
    state={
    	x: this.props.region,
    	isMapReady: false
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
    onMapLayout = () => {
    this.setState({ isMapReady: true });
}

    render() {
    	// const { width, height } = Dimensions.get('window');

        const region = this.props.region;
        console.log(this.state.x);
        return (

        
            <View style={styles.container}>

                <MapView	
					style={styles.map}
					initialRegion={region}
					onMapReady={this.onMapLayout}
				>
				{ this.state.isMapReady &&
				<View>
				{this.props.selectedAddress.will &&
					<MapView.Marker
                	coordinate={this.props.selectedAddress.will.location}
					pinColor="green"
                />}

		        {this.props.selectedAddress.be &&
					<MapView.Marker
                	coordinate={this.props.selectedAddress.be.location}
					pinColor="red"
                />}
				{this.props.showCarMarker &&
					<MapView.Marker
							coordinate={{latitude:this.props.driverLocation.coordinate[1], longitude:this.props.driverLocation.coordinate[0] }}
							image={require('../../../../assets/taxi.png')}
						/>}

			    </View>
				}
                </MapView>
            </View>
        )
    }
}
