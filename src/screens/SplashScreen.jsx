import React from 'react';
import { View, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FadeAnime, SlideAnime } from '../components/Animations';

const SplashScreen = () => {


    return (
        <ImageBackground source={require('../assets/images/splash.jpeg')} style={{ width: '100%', height: '100%', resizeMode: 'cover' }}>
            <View style={{ flex: 1, backgroundColor: '#03040648' }}>
                <SlideAnime>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FastImage source={require('../assets/images/logo.png')} resizeMode='contain' style={{ width: 300, height: 300 }} />
                    </View>
                </SlideAnime>
            </View>
        </ImageBackground>
    );
};


export default SplashScreen;
