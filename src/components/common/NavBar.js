import React, { PropTypes } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Colors from '../../constant/Colors';

const propTypes = {
    title: PropTypes.string.isRequired,
    titleLeft: PropTypes.string,
    titleRight: PropTypes.string,
    onLeftPress: PropTypes.func,
    onRightPress: PropTypes.func,
};

const renderControl = ({ title, onPress }) => {
    if (title !== undefined && onPress === undefined) {
        throw new Error(`You have to implement onLeftPress/onRightPress function for ${title}`);
    }
    const { buttonColor } = styles;
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={buttonColor}>{title}</Text>
        </TouchableOpacity>
    );
};

const NavBar = ({ title, titleLeft, titleRight, onLeftPress, onRightPress }) => {
    const { container, titleColor } = styles;
    return (
        <View style={container}>
            {renderControl({ title: titleLeft, onPress: onLeftPress })}
            <Text style={titleColor}>{title}</Text>
            {renderControl({ title: titleRight, onPress: onRightPress })}
        </View>
    );
};

NavBar.propTypes = propTypes;

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 65,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: Colors.navbarColor,
        borderBottomWidth: 1,
        borderBottomColor: Colors.navbarBorderColor
    },
    titleColor: {
        color: Colors.navbarTitleColor,
        fontSize: 22
    },
    buttonColor: {
        color: Colors.navbarButtonColor,
        fontSize: 14
    }
};

export { NavBar };
