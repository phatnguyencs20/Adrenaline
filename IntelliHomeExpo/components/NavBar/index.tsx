import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import LivingRoom from "../LivingRoom";
import Bedroom from "../Bedroom";
import FaceRecognition from "../FaceRecognition";

const LivingRoomRoute = () => <LivingRoom />;
const BedroomRoute = () => <Bedroom />;
const FaceRecognitionRoute = () => <FaceRecognition />;

const NavBar = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'livingRoom', title: 'Living Room', focusedIcon: 'desk' },
        { key: 'bedroom', title: 'Bedroom', focusedIcon: 'sleep' },
        { key: 'faceRecognition', title: 'Face Recognition', focusedIcon: 'camera' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        livingRoom: LivingRoomRoute,
        bedroom: BedroomRoute,
        faceRecognition: FaceRecognitionRoute,
    });

    return (
        <BottomNavigation
            shifting={true}
            sceneAnimationEnabled={true}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default NavBar;