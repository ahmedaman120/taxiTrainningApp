// import React from "react";
import { Text, Image } from "react-native";
import styles from './HeaderStyles';

import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon ,Container, Title } from 'native-base';

export default class HeaderComponent extends Component {
    render() {
       return (
         <Container>
                <Header style={{backgroundColor:"#FF5E3A",zIndex: 2}}  >
                <Left>
                <Button transparent>
                    <Icon name="bars" style={styles.icon} />
                </Button>
            </Left>
            <Body>
                <Image resizeMode="contain" style={styles.logo} source={this.props.logo} />
            </Body>
            <Right>
                <Button transparent>
                    <Icon name="gift" style={styles.icon} />
                </Button>
            </Right>
                </Header>
            </Container>
        
    );
    }
}

 /*<Container>
        <Header style={{backgroundColor:"#FF5E3A"}} androidStatusBarColor="light-content">
            <Left>
                <Button transparent>
                    <Icon name="bars" style={styles.icon} />
                </Button>
            </Left>
            <Body>
                <Image resizeMode="contain" style={styles.logo} source={this.props.logo} />
            </Body>
            <Right>
                <Button transparent>
                    <Icon name="gift" style={styles.icon} />
                </Button>
            </Right>
        </Header>
</Container>

<Container> 
                <Header>
                    <Title>Header</Title>
                </Header>
        </Container>
*/
// export default HeaderComponent;


