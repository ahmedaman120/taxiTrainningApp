import React ,{Component} from 'react';
// import {createStackNavigator, createAppContainer} from 'react-navigation';
import PropTypes from'prop-types'; 
import { Provider } from 'react-redux';
import scenes from '../routes/scenes';
import {Router} from 'react-native-router-flux';

export default class AppContainer extends Component{

	static propTypes = {
		store: PropTypes.object.isRequired
	}

	render(){
		return (
				<Provider store={this.props.store}>					
					<Router scenes={scenes} />
				</Provider>
			);
	}
}


