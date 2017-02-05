import React, { PropTypes } from 'react';
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import Colors from '../../constant/Colors';

const propsType = {
    title: PropTypes.string.isRequired,
    // onPress: PropTypes.func,
    containerStyle: PropTypes.object,
    titleStyle: PropTypes.object,
};

const NavBarButton = ({ title, onPress, containerStyle, titleStyle }) => {
    const { container, text } = styles;
    return (
        <TouchableOpacity
            onPress={onPress}>
            <View style={[container, containerStyle]}>
            <Text style={[text, titleStyle]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

NavBarButton.propsType = propsType;
const styles = {
    container: {
        marginTop: 5
    },
    text: {
        color: Colors.navbarButtonColor
    } 
};
export { NavBarButton };
