/* jshint ignore:start */
import React from 'react';
import MapCont from './MapComponent';
import {Container} from 'native-base';

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
				{this.props.region.latitude && 
					<MapCont region={this.props.region} />
				}
				</Container>
				);
	};
}
//{this.props.region.latitude && 				}

export default  Home;
/*
<View style={styles.container}>			 
<Text>Hello {this.props.name} </Text>
</View>
*/
