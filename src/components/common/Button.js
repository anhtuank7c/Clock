import React, { PropTypes } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Colors from '../../constant/Colors';

const propTypes = {
    children: PropTypes.any.isRequired,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    btnDisabledColor: PropTypes.string,
    btnEnabledColor: PropTypes.string,
    titleDisabledColor: PropTypes.string,
    titleEnabledColor: PropTypes.string,
};

const Button = ({
    children,
    onPress,
    btnDisabledColor,
    btnEnabledColor,
    titleDisabledColor,
    titleEnabledColor,
    disabled
}) => {
    const localBTNDisabledColor = btnDisabledColor || Colors.btnDisabledColor;
    const localBTNEnabledColor = btnEnabledColor || Colors.btnEnabledColor;

    const backgroundColor = { backgroundColor: disabled ? localBTNDisabledColor : localBTNEnabledColor };
    const borderColor = { borderColor: disabled ? localBTNDisabledColor : localBTNEnabledColor };

    const localTitleDisabledColor = titleDisabledColor || Colors.btnDisabledLabelColor;
    const localTitleEnabledColor = titleEnabledColor || Colors.btnEnabledLabelColor;

    const titleColor = { color: disabled ? localTitleDisabledColor : localTitleEnabledColor };
    const { container, outerBorder, text } = styles;
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}>
            <View style={[outerBorder, borderColor]}>
                <View style={[container, backgroundColor]}>
                    <Text style={[text, titleColor]}>{children}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 72,
        height: 72,
        borderRadius: 36,
    },
    outerBorder: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
    },
    text: {
        color: '#97979c',
        fontSize: 18,
    }
};

Button.propTypes = propTypes;

export { Button };
