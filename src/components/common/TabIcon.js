import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constant/Colors';

const propTypes = {
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    iconName: PropTypes.string,
    iconSize: PropTypes.number,
};

const renderIcon = ({ iconDefault, iconSelected, iconSize = 30, selected }) => {
    if (iconDefault === undefined || iconSelected === undefined) {
        return;
    }
    return (
        <Ionicons
            name={selected ? iconSelected : iconDefault}
            size={iconSize}
            color={selected ? Colors.tabbarIconSelected : Colors.tabbarIconDefault} />
    );
};

const TabIcon = ({ title, selected, iconDefault, iconSelected, iconSize }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {renderIcon({ iconDefault, iconSelected, iconSize, selected })}
            <Text style={{ fontSize: 12, color: selected ? Colors.tabbarIconSelected : Colors.tabbarIconDefault }}>{title}</Text>
        </View>
    );
};

TabIcon.propTypes = propTypes;

export { TabIcon };
