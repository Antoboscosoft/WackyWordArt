import SoundPlayer from 'react-native-sound-player';
import Zebra from '../assets/images/zebraY.png';

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
    }
}

export const common = { color, Zebra, font, style };

// Function to play the music
const playMusic = (music) => {
    try {
      SoundPlayer.playSoundFile(music, 'mp3');
      SoundPlayer.setVolume(0.5);
      SoundPlayer.setNumberOfLoops(-1);
    } catch (error) {
      console.log('error playing sound', error);
    }
  };

  // Function to stop the music
  const stopMusic = () => {
    try {
      SoundPlayer.stop();
      SoundPlayer.release();
    } catch (error) {
      console.log('error stopping sound', error);
    }
  };

  export { playMusic, stopMusic };
