import React from 'react';
import MapCont from './MapComponent';
import {Container} from 'native-base';

class Home extends React.Component{
		componentDidMount(){
		this.props.setName();
	}
	
	render(){
		const region ={
			latitude: 37.78825,
			longitude: -122.4324,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
		}
		return(
				<Container>
					<MapCont region={region} />
				</Container>
				);
	};
}

export default  Home;
/*
<View style={styles.container}>			 
<Text>Hello {this.props.name} </Text>
</View>
*/
