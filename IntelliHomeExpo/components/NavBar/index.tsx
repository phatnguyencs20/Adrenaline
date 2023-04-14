import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import LivingRoom from "../LivingRoom";
import FaceRecognition from "../FaceRecognition";

const LivingRoomRoute = () => <LivingRoom />;
const FaceRecognitionRoute = () => <FaceRecognition />;

const NavBar = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'livingRoom', title: 'Living Room', focusedIcon: 'desk' },
        { key: 'faceRecognition', title: 'Face Recognition', focusedIcon: 'camera' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        livingRoom: LivingRoomRoute,
        faceRecognition: FaceRecognitionRoute,
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