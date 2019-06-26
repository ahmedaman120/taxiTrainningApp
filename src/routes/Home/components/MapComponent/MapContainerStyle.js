import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	container: {
...StyleSheet.absoluteFillObject,
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	map: {
		 marginTop: 55,
		...StyleSheet.absoluteFillObject,
	},
 });

 export default  styles;
