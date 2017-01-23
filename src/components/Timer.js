import React, { Component } from 'react';
import {
    View,
    Text,
    Picker,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PushNotification from 'react-native-push-notification';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Styles from '../constant/Styles';
import Colors from '../constant/Colors';
import ButtonLabels from '../constant/ButtonLabels';
import { Button } from './common';
import {
    changeRingTone,
} from '../actions';

const { width } = Dimensions.get('window');

class Timer extends Component {
    state = {
        hour: 0,
        minute: 1,
        remaining: 0,
        running: false,
        pause: false,
        btnCancelDisabled: true,
        btnStartPauseLabel: ButtonLabels.START,
    }

    componentWillMount() {
        PushNotification.configure({
            onRegister(token) {
                console.log('token', token);
            },
            onNotification(notification) {
                console.log('notification', notification);
            },
            //ios
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            requestPermissions: true
        });
    }

    componentDidMount() {
        this.timeout = setInterval(() => {
            const { remaining, pause, running } = this.state;
            // When Timer Ends, pay ringtone
            if (running && remaining === 0) {
                this.pushNotification();
                // this.alarmSound.play();
                this.setState({
                    pause: false,
                    running: false,
                    remaining: 0,
                    btnCancelDisabled: true,
                    btnStartPauseLabel: ButtonLabels.START
                });
            }
            // Counting down
            if (remaining > 0 && !pause) {
                this.setState({
                    remaining: remaining - 1
                });
            }
        }, 1000);
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

    pushNotification() {
        const { ringTone } = this.props;
        PushNotification.localNotification({
            ticker: 'Timer ended',
            vibrate: true,
            playSound: true,
            tag: 'timer_app',
            title: 'Timer',
            message: 'Timer ended',
            soundName: ringTone.path,
        });
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
        const { hour, minute, remaining, btnCancelDisabled } = this.state;
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

const mapStateToProps = (state) => {
    const {
        hourList,
        minuteList,
        ringTone,
    } = state.timer;

    return {
        hourList,
        minuteList,
        ringTone,
    };
};

export default connect(mapStateToProps, { changeRingTone })(Timer);
