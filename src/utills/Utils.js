import SoundPlayer from 'react-native-sound-player';
import { useEffect } from 'react';

const color = {
    primary: '#f18927',
    secondary: '#04acb8',
}

const font = {
    primary: "Ribeye-Regular"
}

const style = {
    border: {
        borderColor: "#ffffffaf",
        borderWidth: 4,
        borderTopWidth: 1
    },
    phraseSize: 23
}

export const common = { color, font, style };

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
