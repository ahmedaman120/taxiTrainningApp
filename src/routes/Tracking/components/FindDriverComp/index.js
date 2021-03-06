import React from "react";
import {Text} from "react-native";
import { View, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./FindDriverStyle";

var Spinner = require("react-native-spinkit");
export const FindDriver = ({selectedAddress})=>{

	const { be, will }  = selectedAddress || {};
	return (
		<View style={styles.findDriverContainer} >

			<Spinner style={styles.spinner} isVisible size={150} type="Pulse" color="#ffffff"/>
			<View style={styles.content}>
				<Text style={styles.text}>Taxi will come soon</Text>
				<Icon style={styles.locationIcon} name="map-marker"/>

				<View style={styles.pickup}>
					<Text>{ be.name}</Text>
				</View>
				<Icon style={styles.toArrow} name="long-arrow-down"/>
				<View style={styles.dropoff}>
					<Text>{ will.name}</Text>
				</View>

				<View>
					
					<Text style={styles.termsText}>By booking you confirm that you accept our T & C</Text>
		
				</View>
				
			</View>
			
		</View>

	);
}

export default  FindDriver;