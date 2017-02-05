import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Styles from '../constant/Styles';

class BedTime extends Component {
    render() {
        const { container } = Styles;
        return (
            <View style={container}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 30 }}>BedTime not implement yet</Text>
                </View>
            </View>
        );
    }
}

export default BedTime;
