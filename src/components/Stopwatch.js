import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Sound from 'react-native-sound';
import { NavBar, Button } from './common';
import Styles from '../constant/Styles';

class Stopwatch extends Component {
    constructor(props) {
        super(props);

        this.faded = new Sound('faded.mp3', Sound.MAIN_BUNDLE, e => {
            if (e) {
                console.log('error', e);
            }
        });
    }

    state = {
        playing: false,
    }

    playSound() {
        if (!this.state.playing) {
            console.log('duration', this.faded.getDuration());
            this.faded.play();
        } else {
            console.log('duration', this.faded.getDuration());
            this.faded.pause();
        }
        this.setState({
            playing: !this.state.playing,
        });
    }

    render() {
        const { container } = Styles;
        return (
            <View style={container}>
                <NavBar title="World Clock" />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 30 }}>
                        V3
                    </Text>
                    <Button onPress={this.playSound.bind(this)}>
                        {this.state.playing ? 'Pause' : 'Play'}
                    </Button>
                </View>
            </View>
        );
    }
}

export default Stopwatch;
