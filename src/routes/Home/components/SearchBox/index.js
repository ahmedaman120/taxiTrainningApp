/* jshint ignore:start */
import React from 'react';
import {Text} from 'react-native';
import { View, InputGroup, Input } from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";
import styles from './SearchBoxStyle';
class SearchBox extends React.Component{
	render(){
		return(
            <View style={styles.searchBox}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.lable}>Enter Address</Text>
                    <InputGroup>
                        <Icon name="search" size={15} color=" #5E9DC8" />
                        <Input style={styles.inputSearch}  placeholder="Where you want taxi?"/>
                    </InputGroup>
                </View>
                <View style={styles.secondInputWrapper}>
                    <Text style={styles.lable}>Enter Destination</Text>
                    <InputGroup>
                        <Icon name="search" size={15} color=" #5E9DC8" />
                        <Input style={styles.inputSearch}  placeholder="Where you want taxi destination?"/>
                    </InputGroup>
                </View>
            </View>
		);
	};
}

export default  SearchBox;