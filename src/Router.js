import React from 'react';
import { connect } from 'react-redux';
import { ActionConst, Scene, Router } from 'react-native-router-flux';

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
                    sceneStyle={sceneStyle}
                    key="tabWorldClock"
                    component={WorldClock}
                    title="World Clock"
                    icon={TabIcon}
                    iconDefault="ios-globe-outline"
                    iconSelected="ios-globe"
                />
                <Scene
                    navigationBarStyle={navigationBarStyle}
                    titleStyle={navigationTitleStyle}
                    sceneStyle={sceneStyle}
                    key="tabAlarm"
                    component={Alarm}
                    title="Alarm"
                    icon={TabIcon}
                    iconDefault="ios-alarm-outline"
                    iconSelected="ios-alarm" />
                <Scene
                    navigationBarStyle={navigationBarStyle}
                    titleStyle={navigationTitleStyle}
                    sceneStyle={sceneStyle}
                    key="tabBedTime"
                    component={BedTime}
                    title="BedTime"
                    icon={TabIcon}
                    iconDefault="ios-folder-open"
                    iconSelected="ios-folder-open" />
                <Scene
                    navigationBarStyle={navigationBarStyle}
                    titleStyle={navigationTitleStyle}
                    sceneStyle={sceneStyle}
                    key="tabStopwatch"
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
                        type={ActionConst.RESET}
                    />
                    <Scene
                        navigationBarStyle={navigationBarStyle}
                        titleStyle={navigationTitleStyle}
                        sceneStyle={sceneStyle}
                        key="ringToneList"
                        component={RingToneList}
                        title="When Timer Ends"
                        direction="vertical"
                        type={ActionConst.REPLACE}
                        hideTabBar
                    />
                </Scene>
            </Scene>
        </RouterWithRedux>
    );
};

export default RouterComponent;
