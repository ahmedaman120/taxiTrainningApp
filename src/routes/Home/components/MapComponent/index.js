/* jshint ignore:start */
import React, { Component } from 'react';
import { Container } from 'native-base';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './MapContainerStyle';
import SearchBox from '../SearchBox';
import SearchResults from '../SearchResults';
import {View} from 'react-native';
 // const { width, height } = Dimensions.get('window');

// import axios from 'axios';
export default class MapCont extends Component {
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

		{	this.props.readyDriver && 
		 Array.from(this.props.readyDriver).map((marker, index)=>
						<MapView.Marker
							key={index}
							coordinate={{latitude:marker.coordinate[1], longitude:marker.coordinate[0] }}
							image={require('../../../../assets/taxi.png')}
						/>	
					)
				}
				
					</View>
					}
                </MapView>
				<SearchBox 
					getInput={this.props.getInput}
					changeBetweenBeAndWill={this.props.changeBetweenBeAndWill}
					getPlacesFromGoogle={this.props.getPlacesFromGoogle}
					getSelectedAddress={this.props.getSelectedAddress}
					selectedAddress={this.props.selectedAddress}
					resultTypes={this.props.resultTypes} 
					/>
				{ (this.props.resultTypes.be || this.props.resultTypes.will) &&
				<SearchResults  
					predictions={this.props.predictions}
					resultTypes={this.props.resultTypes} 
					InputData={this.props.InputData}
					getPlacesFromGoogle={this.props.getPlacesFromGoogle}
					getSelectedAddress={this.props.getSelectedAddress}
					/>
				}
            </View>
        )
    }
}

/**
 * 
 * <MapView.Marker
                	coordinate={region}
                	pinColor="green"
                />
 * {
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.015,
						longitudeDelta: 0.0121,
					} */
