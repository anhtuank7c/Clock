import React, { Component } from 'react';
import {
    ListView,
    ScrollView,
    View
} from 'react-native';
import { connect } from 'react-redux';
import Sound from 'react-native-sound';
import { NavBarButton } from './common';
import store from '../config/store';
import TimerActions from '../actions/TimerActions';
import Styles from '../constant/Styles';
import RingToneListItem from './RingToneListItem';

class RingToneList extends Component {
    static renderLeftButton = () => {
        return (
            <NavBarButton
                title="Cancel"
                onPress={() => {
                    const { ringTone } = store.getState().timer;
                    store.dispatch(TimerActions.backToTimer(ringTone));
                }} />
        );
    }

    static renderRightButton = () => {
        return (
            <NavBarButton
                title="Set"
                onPress={() => {
                    const { tmpRingTone } = store.getState().timer;
                    store.dispatch(TimerActions.changeRingTone(tmpRingTone));
                }} />
        );
    }

    componentWillMount() {
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.playSound(nextProps);
    }

    componentWillUnmount() {
        this.playSound({ playSound: undefined });
    }

    playSound({ playSound }) {
        if (this.playTmpSound !== undefined) {
            this.playTmpSound.stop();
        }
        if (playSound === undefined || playSound.song === undefined) {
            return;
        }
        const playTmpSound = new Sound(playSound.song, Sound.MAIN_BUNDLE, e => {
            if (e) throw e;
            playTmpSound.setNumberOfLoops(0);
            playTmpSound.play();
            this.playTmpSound = playTmpSound;
        });
    }

    createDataSource({ ringToneList }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(ringToneList);
    }

    renderRow(item) {
        return <RingToneListItem item={item} />;
    }

    render() {
        const { container, listViewStyle } = Styles;
        return (
            <View style={container}>
                <ScrollView indicatorStyle="white">
                    <ListView
                        style={listViewStyle}
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                        renderSeparator={
                            (sectionId, rowId) => <View key={rowId} style={Styles.separator} />
                        }
                        renderFooter={() => {
                            const item = {
                                name: 'Stop Playing',
                                song: undefined
                            };
                            return <RingToneListItem item={item} />;
                        }}
                    />
                </ScrollView>
            </View>
        );
    }
}

export default connect((state) => {
    const { ringToneList, ringTone, tmpRingTone, playSound } = state.timer;
    return { ringToneList, ringTone, tmpRingTone, playSound };
})(RingToneList);
