import React from 'react';
import { connect } from 'react-redux';
import { Actions, ActionConst, Scene, Router, Modal } from 'react-native-router-flux';

import { TabIcon } from './components/common';
import Styles from './constant/Styles';

import WorldClock from './components/WorldClock';
import Alarm from './components/Alarm';
import Stopwatch from './components/Stopwatch';
import BedTime from './components/BedTime';
import Timer from './components/Timer';
import RingToneList from './components/RingToneList';

const RouterWithRedux = connect()(Router);
const RouterComponent = () => {
    const { navigationBarStyle, navigationTitleStyle, sceneStyle } = Styles;
    return (
        <RouterWithRedux>
            <Scene
                key="root"
                tabs
                tabBarStyle={Styles.tabbarContainer}
                >
                <Scene
                    navigationBarStyle={navigationBarStyle}
                    titleStyle={navigationTitleStyle}
                    key="worldClock"
                    component={WorldClock}
                    title="World Clock"
                    icon={TabIcon}
                    iconDefault="ios-globe-outline"
                    iconSelected="ios-globe"
                    />
                <Scene
                    navigationBarStyle={navigationBarStyle}
                    titleStyle={navigationTitleStyle}
                    key="alarm"
                    component={Alarm}
                    title="Alarm"
                    icon={TabIcon}
                    iconDefault="ios-alarm-outline"
                    iconSelected="ios-alarm" />
                <Scene
                    navigationBarStyle={navigationBarStyle}
                    titleStyle={navigationTitleStyle}
                    key="bedTime"
                    component={BedTime}
                    title="BedTime"
                    icon={TabIcon}
                    iconDefault="ios-folder-open"
                    iconSelected="ios-folder-open" />
                <Scene
                    navigationBarStyle={navigationBarStyle}
                    titleStyle={navigationTitleStyle}
                    key="stopwatch"
                    component={Stopwatch}
                    title="Stopwatch"
                    icon={TabIcon}
                    iconDefault="ios-stopwatch-outline"
                    iconSelected="ios-stopwatch" />
                <Scene
                    initial
                    key="tabTimer"
                    icon={TabIcon}
                    title="Timer"
                    iconDefault="ios-timer-outline"
                    iconSelected="ios-timer">
                    <Scene
                        navigationBarStyle={navigationBarStyle}
                        titleStyle={navigationTitleStyle}
                        sceneStyle={sceneStyle}
                        key="timer"
                        title="Timer"
                        component={Timer}
                        duration={10}
                        />
                    <Scene
                        navigationBarStyle={navigationBarStyle}
                        titleStyle={navigationTitleStyle}
                        key="ringToneList"
                        component={RingToneList}
                        direction="vertical"
                        duration={10}
                        hideTabBar
                        hideNavBar
                        />
                </Scene>
            </Scene>
        </RouterWithRedux>
    );
};

export default RouterComponent;
