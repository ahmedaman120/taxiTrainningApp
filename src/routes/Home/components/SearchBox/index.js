/* jshint ignore:start */
import React from 'react';
import {Text} from 'react-native';
import { View, InputGroup, Input } from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";
import styles from './SearchBoxStyle';
class SearchBox extends React.Component{
   
    handleInput=(key,val)=>{
        this.props.getInput({
            key,
            value:val
        });
        this.props.getPlacesFromGoogle();
    };
    
	render(){
        const {be , will} = this.props.selectedAddress || {}; 
		return(
            <View style={styles.searchBox}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.lable}>Enter Address</Text>
                    <InputGroup>
                        <Icon name="search" size={15} color=" #5E9DC8" />
                        <Input style={styles.inputSearch}  placeholder= {be ? be && be.name : "Where you want taxi?"}   onChangeText={this.handleInput.bind(this,"be")} onFocus={()=>this.props.changeBetweenBeAndWill("be")} />
                    </InputGroup>
                </View>
                <View style={styles.secondInputWrapper}>
                    <Text style={styles.lable}> Enter Destination</Text>
                    <InputGroup>
                        <Icon name="search" size={15} color=" #5E9DC8" />
                        <Input style={styles.inputSearch}  placeholder= {will ? will && will.name : "Where you want taxi destination?" }  onChangeText={this.handleInput.bind(this,"will")} onFocus={()=>this.props.changeBetweenBeAndWill("will")}  />
                    </InputGroup>
                </View>
            </View>
		);
	};
}

export default  SearchBox;