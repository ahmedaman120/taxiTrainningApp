/* jshint ignore:start */
import React from 'react';
import MapCont from './MapComponent';
import {Container} from 'native-base';
import {View, Text} from "react-native";
import HeaderComponent from "../../../components/HeaderComponent";
import FooterComponent from "../../../components/FooterComponent";
import logo from '../../../assets/taxi_logo_white.png';


class Home extends React.Component{
	
		componentDidMount(){
		this.props.getCurrLocation();
	}
		//27.18096, 31.18368
	render(){
		console.log(this.props.region);
		const region ={
			latitude: 3.146642,
			longitude: 101.695845,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		}
	
		return(
				<Container>
				
					<HeaderComponent logo={logo} /> 

				{this.props.region.latitude && 
					
					<MapCont 	region={this.props.region} 
								getInput={this.props.getInput}
								changeBetweenBeAndWill={this.props.changeBetweenBeAndWill}
								resultTypes={this.props.resultTypes}
								predictions={this.props.predictions}
								getPlacesFromGoogle={this.props.getPlacesFromGoogle}
								InputData={this.props.InputData}
								/>

					
				}
				<FooterComponent/>
				</Container>
				);
	};
}

export default  Home;
/*
//{this.props.region.latitude && 				}
<View style={styles.container}>			 
<Text>Hello {this.props.name} </Text>
</View>
getPlacesFromGoogle={this.props.getPlacesFromGoogle}

*/
