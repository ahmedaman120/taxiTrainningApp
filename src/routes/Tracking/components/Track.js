/* jshint ignore:start */
import React from 'react';
import {Container} from 'native-base';
import {View, Text} from "react-native";
import HeaderComponent from "../../../components/HeaderComponent";
import TrackCon from './MapTrack';
import DriverFound from './DriverFound';
import DriverFooterProfile from './DriverFooterProfile';
import DriverOnTheWayFooter from './DriverOnTheWayFooter';
import FindDriver from './FindDriverComp'



class Track extends React.Component{
	
	
	render(){
		console.log(this.props.region);
	
		return(
				<Container>
				<View style={{flex:1}}>
				    	<FindDriver selectedAddress={this.props.selectedAddress}/>
					</View>
				</Container>
				);
	};
}

export default  Track;

