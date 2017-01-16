import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavBar } from './common';
import Styles from '../constant/Styles';

class Alarm extends Component {
    render() {
        const { container } = Styles;
        return (
            <View style={container}>
                <NavBar title="World Clock" />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 20 }}>Alarm not implement yet</Text>
                    <Text style={{ color: '#fff', fontSize: 20 }}>Second</Text>
                </View>
            </View>
        );
    }
}

export default Alarm;
