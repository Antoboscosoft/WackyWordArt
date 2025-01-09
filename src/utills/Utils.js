import SoundPlayer from 'react-native-sound-player';
import { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const color = {
    primary: '#f18927',
    secondary: '#04acb8',
}

const font = {
    // primary: "Ribeye-Regular"
}

const style = {
    border: {
        borderColor: "#ffffffaf",
        borderWidth: 4,
        borderTopWidth: 1
    },
    phraseSize: 20
}
// for common styles
export const common = { color, font, style };

// for animation loader
export const Loader = ({backgroundColor= '#0000001e'}) => {
    return (
        <View style={{...StyleSheet.absoluteFill,alignItems: 'center', paddingTop: 100, zIndex: 1, backgroundColor: backgroundColor}}>
            <FastImage source={require('../assets/images/logo.png')} resizeMode='contain' style={{ width: 100, height: 100 }} />
            <LottieView autoPlay loop={true} source={require('../assets/lottie/textLoading.json')} style={{width: 70, height: 70}}/>
        </View>
    );
}

const useMusicPlayer = (onComplete) => {
    // State to keep track of the currently playing music
    let currentTrack = null;

    // Function to play the music
    const playMusic = (music, loop = true) => {
        // If the requested track is already playing, do nothing
        if (currentTrack === music) return;

        // update the current track
        currentTrack = music;

        try {
            // Play the requested music
            SoundPlayer.playSoundFile(music, 'mp3');
            SoundPlayer.setVolume(0.5);
            if (loop) SoundPlayer.setNumberOfLoops(-1);
        } catch (error) {
            console.log('error playing sound', error);
        }
    };

    // Function to stop the music
    const stopMusic = () => {
        try {
            SoundPlayer.stop();
            SoundPlayer?.release();
        } catch (error) {
            console.log('error stopping sound', error);
        }
    };

    useEffect(() => {
        if (onComplete) {
            const listener = SoundPlayer.addEventListener('FinishedPlaying', () => {
                onComplete();
            });
            return () => listener.remove();
        }
    }, [onComplete]);

    return { playMusic, stopMusic };
}

export default useMusicPlayer

// Function to handle music completion   
const handleMusicCompletion = (onComplete) => {
    try {
        SoundPlayer.addEventListener('FinishedPlaying', (success) => {
            if (success) {
                onComplete && onComplete();
            }
        })
        // SoundPlayer.stop();
        // SoundPlayer.release();
    } catch (error) {
        console.log('error stopping sound', error);
    }
}
// export { playMusic, stopMusic, handleMusicCompletion };