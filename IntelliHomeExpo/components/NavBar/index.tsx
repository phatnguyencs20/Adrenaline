import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import LivingRoom from "../LivingRoom";
import FaceRecognition from "../FaceRecognition";
import Statistic from '../Statistic';

const LivingRoomRoute = () => <LivingRoom />;
const FaceRecognitionRoute = () => <FaceRecognition />;
const StatisticRoute = () => <Statistic />;

const NavBar = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'livingRoom', title: 'Living Room', focusedIcon: 'desk' },
        { key: 'faceRecognition', title: 'Face Recognition', focusedIcon: 'camera' },
        { key: 'statistic', title: 'Statistic', focusedIcon: 'chart-line' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        livingRoom: LivingRoomRoute,
        faceRecognition: FaceRecognitionRoute,
        statistic: StatisticRoute,
    });

    return (
        <BottomNavigation
            sceneAnimationEnabled={true}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default NavBar;