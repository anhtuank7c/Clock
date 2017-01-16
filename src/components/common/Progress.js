import React, { PropTypes } from 'react';
import { Text, View, Dimensions } from 'react-native';
import Styles from '../../constant/Styles';

const propTypes = {
    progressed: PropTypes.number.isRequired,
    screnWidth: PropTypes.number,
    color: PropTypes.string,
};
const screen = Dimensions.get('window');
const Progress = ({ progressed = 0, color = '#4caf50', height = 6 }) => {
    if (progressed > 100 || progressed < 0) {
        throw new Error('Value for progressed from 0-100');
    }
    const screenWidth = screen.width * 0.8;
    const { progressContainerStyle, progressBarContainerStyle, progressBarContentStyle } = Styles;
    const progressWidth = (screenWidth * progressed) / 100;

    return (
        <View style={progressContainerStyle}>
            <View style={[progressBarContainerStyle, { borderColor: color, height, width: screenWidth }]}>
                <View style={[progressBarContentStyle, { width: progressWidth, height, backgroundColor: color }]} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>{progressWidth}</Text>
                <Text>{progressWidth}/{100}</Text>
            </View>
        </View>
    );
};

Progress.propTypes = propTypes;

export { Progress };
