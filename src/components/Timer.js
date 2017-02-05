import React, { Component } from 'react';
import {
    View,
    Text,
    Picker,
    Dimensions,
    TouchableOpacity,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';

import Styles from '../constant/Styles';
import Colors from '../constant/Colors';
import ButtonLabels from '../constant/ButtonLabels';
import { Button } from './common';

class Timer extends Component {
    state = {
        hour: 0,
        minute: 1,
        remaining: 0,
        running: false,
        pause: false,
        btnCancelDisabled: true,
        btnStartPauseLabel: ButtonLabels.START,
        width: Dimensions.get('window').width
    }

    componentDidMount() {
        this.timeout = setInterval(() => {
            const { remaining, pause, running } = this.state;
            // When Timer Ends, pay ringtone
            if (running && remaining === 0) {
                // Reset state
                this.setState({
                    pause: false,
                    running: false,
                    remaining: 0,
                    btnCancelDisabled: true,
                    btnStartPauseLabel: ButtonLabels.START
                });

                // Stop current sound when already exists
                if (this.timerSound !== undefined) {
                    this.timerSound.stop();
                }
                const { ringTone } = this.props;
                // Play sound if it is not No Sound
                if (ringTone !== undefined && ringTone.song !== undefined) {
                    this.timerSound = new Sound(ringTone.song, Sound.MAIN_BUNDLE, e => {
                        if (e) throw e;
                        // Sound never stop until press Dismiss
                        this.timerSound.setNumberOfLoops(-1);
                        this.timerSound.play();
                    });
                }
                // Show alert
                Alert.alert(
                    null,
                    'Timer Ended',
                    [
                        { text: 'Dismiss', onPress: () => this.timerSound.stop() },
                    ]
                );
            }
            // Counting down
            if (remaining > 0 && !pause) {
                this.setState({ remaining: remaining - 1 });
            }
        }, 1000); // 1000 ms
    }

    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    onHourChange(hour) {
        let { minute } = this.state;
        // If hour = 0 and minute = 0, set minute to minimum 1
        if (hour === 0 && minute === 0) {
            minute = 1;
        }
        this.setState({ hour, minute });
    }

    onMinuteChange(minute) {
        const { hour } = this.state;
        // If hour = 0 and minute = 0, set minute to minimum 1
        if (hour === 0 && minute === 0) {
            this.setState({ minute: 1 });
            return;
        }
        this.setState({ minute });
    }

    onCancelPress() {
        // We reset everything exclude hour, minute
        this.setState({
            pause: false,
            running: false,
            remaining: 0,
            btnCancelDisabled: true,
            btnStartPauseLabel: ButtonLabels.START
        });
    }

    onStartPauseResume() {
        const { hour, minute, btnStartPauseLabel } = this.state;
        if (btnStartPauseLabel === ButtonLabels.START ||
            btnStartPauseLabel === ButtonLabels.RESUME) {
            let { remaining } = this.state;
            if (remaining === 0) {
                remaining = ((hour * 60) + minute) * 60;
            }
            this.setState({
                remaining,
                btnStartPauseLabel: ButtonLabels.PAUSE,
                btnCancelDisabled: false,
                pause: false,
                running: true,
            });
        } else {
            this.setState({
                pause: true,
                btnStartPauseLabel: ButtonLabels.RESUME,
            });
        }
    }

    renderPickerOrRemainingTime() {
        const {
            timePickerStyle,
            pickerStyle,
            pickerLabelStyle,
            remaintingLabelStyle,
            remaintingContainerStyle,
        } = Styles;
        const {
            hourList,
            minuteList,
        } = this.props;
        const { hour, minute, remaining, btnCancelDisabled, width } = this.state;
        // format remaining in hh:MM:ss
        const remainingString = new Date(null, null, null, null, null, remaining)
            .toTimeString()
            .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');

        return (
            !btnCancelDisabled ?
                (
                    <View style={remaintingContainerStyle}>
                        <Text style={remaintingLabelStyle}>{remainingString}</Text>
                    </View>
                ) :
                (
                    <View style={timePickerStyle}>
                        <View style={pickerStyle}>
                            <Text style={pickerLabelStyle}>hour</Text>
                            <Picker
                                mode="dropdown"
                                style={{ width: width / 2 }}
                                selectedValue={hour}
                                onValueChange={this.onHourChange.bind(this)}
                                itemStyle={{ color: '#fff', fontSize: 28, }} >
                                {
                                    hourList.map((val, i) => {
                                        return (<Picker.Item label={val} key={`hour-${i}`} value={i} />);
                                    })
                                }
                            </Picker>
                        </View>
                        <View style={pickerStyle}>
                            <Text style={pickerLabelStyle}>minutes</Text>
                            <Picker
                                mode="dropdown"
                                style={{ width: width / 2 }}
                                selectedValue={minute}
                                onValueChange={this.onMinuteChange.bind(this)}
                                itemStyle={{ color: '#fff', fontSize: 28, }} >
                                {
                                    minuteList.map((val, i) => {
                                        return (<Picker.Item label={val} key={`minute-${i}`} value={i} />);
                                    })
                                }
                            </Picker>
                        </View>
                    </View>
                )
        );
    }

    render() {
        const {
            container,
            ringTonePickerStyle,
            controlButtonStyle,
        } = Styles;
        const { ringTone } = this.props;
        const {
            btnCancelDisabled,
            btnStartPauseLabel,
        } = this.state;
        const isStart = (btnStartPauseLabel === ButtonLabels.START ||
            btnStartPauseLabel === ButtonLabels.RESUME);
        const btnStartBackgroundColor = isStart ?
            Colors.btnStartColor : Colors.btnPauseColor;
        const btnStartLabelColor = isStart ?
            Colors.btnStartLabelColor : Colors.btnPauseLabelColor;
        return (
            <View style={container}>
                {this.renderPickerOrRemainingTime()}
                <TouchableOpacity onPress={() => Actions.ringToneList()}>
                    <View style={ringTonePickerStyle}>
                        <Text style={{ color: '#fff', fontSize: 18, }}>When Timer Ends</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 18, marginRight: 10 }}>{ringTone.name}</Text>
                            <Ionicons name="ios-arrow-forward-outline" size={24} color="#fff" />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={controlButtonStyle}>
                    <Button
                        disabled={btnCancelDisabled}
                        onPress={this.onCancelPress.bind(this)}>Cancel</Button>
                    <Button
                        btnEnabledColor={btnStartBackgroundColor}
                        titleEnabledColor={btnStartLabelColor}
                        onPress={this.onStartPauseResume.bind(this)}>
                        {btnStartPauseLabel}
                    </Button>
                </View>
            </View>
        );
    }
}

export default connect(state => {
    const { hourList, minuteList, ringTone } = state.timer;
    return { hourList, minuteList, ringTone };
})(Timer);
