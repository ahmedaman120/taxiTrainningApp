import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView , {PROVIDER_GOOGLE}from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps



class Home extends React.Component{
		componentDidMount(){
		this.props.setName();
	}
	
	render(){

		return(
			<View style={styles.container}>
			<MapView
					provider={PROVIDER_GOOGLE} // remove if not using Google Maps
					style={styles.map}
					region={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.015,
						longitudeDelta: 0.0121,
					}}
				>
			</MapView>
	</View>
			)
	};
}
const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		height: 400,
		width: 400,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
 });


export default  Home;
//<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
	//			</View>
//
// ...

/*
<View style={styles.container}>
			 
<Text>Hello {this.props.name} </Text>
   </View>

<Text>HI KSKSK </Text>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
*/
// export default () => (
   
// );
