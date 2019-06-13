import React from 'react';
import createStore from './redStore/createStore';
import AppContainer from './AppContainer/index';
import {View } from 'react-native';
// import scenes from './routes/scenes'


export default class Root extends React.Component{
	renderApp(){
		const initState = window.__INITIAL_STATE__;
		const store = createStore(initState);

		return (
				<AppContainer store={store} />
			);
	}


	render(){
		return this.renderApp();
	}
}