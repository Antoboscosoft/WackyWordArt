import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import Header from '../components/Header';
import Background from '../components/Background';
import { common } from '../utills/Utils';
// import Sound from 'react-native-sound';
// import audio1 from '../assets/audios/barbie-girl.mp3';

function WackyWordWheelScreen({ navigation }) {
  // List of verbs for the wheel
  const verbs = ['Dance', 'Walk', 'Jog', 'Run', 'Read', 'Eat', 'Sing', 'Play'];
  // State to manage the selected verb
  const [displayedSentence, setDisplayedSentence] = useState('');
  const [spinning, setSpinning] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;
  const thornShake = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  // const soundRef = useRef(
  //   new Sound('puzzle-game.mp3', Sound.MAIN_BUNDLE, (error) => {
  //     if (error) {
  //       console.log('failed to load the sound', error);
  //     } else {
  //       console.log('sound loaded successfully');
  //     }
  //   })
  // ).current;

  // useEffect(() => {
  //   return () => {
  //     soundRef.release();
  //   };
  // }, []);
  // console.log('soundRef', soundRef, "Spinning : ----", spinning);
  
// when entering ino the page it will play the sound:
  // useEffect(() => {
  //   const sound = new Sound('barbie_girl.mp3', Sound.MAIN_BUNDLE, (error) => {
  //     if (error) {
  //       console.error('Error loading sound:', error);
  //     } else {
  //       sound.play((success) => {
  //         if (!success) {
  //           console.error('Playback error');
  //         }
  //       });
  //     }
  //   });
  
  //   return () => {
  //     sound.release();
  //   };
  // }, []);

  const startSpin = () => {
    if (spinning) return;
    console.log('Attempting to play sound...');

    soundRef.setCurrentTime(0);

    soundRef.play((succuss) => {
      if(!succuss){
        console.log("Playback failed due to audio decoding errors");
      } else {
        console.log('Playback successful');
      }
    });

    setSpinning(true);
    startThornShake();
    const randomDegree = Math.floor(3600 + Math.random() * 360);
    const selectedIndex = Math.floor((360 - (randomDegree % 360)) / (360 / verbs.length)) % verbs.length;

    Animated.timing(rotation, {
      toValue: randomDegree,
      duration: 15000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      const selectedVerb = verbs[selectedIndex];
      setDisplayedSentence(selectedVerb);
      setSpinning(false);
      stopThornShake();
      soundRef.pause();
      rotation.setValue(randomDegree % 360);
    })
  };

  const renderWheel = () => {
    const segments = verbs.length;
    const angle = 360 / segments;
    const radius = 150;

    return (
      <Svg width={2 * radius} height={2 * radius} viewBox={`0 0 ${2 * radius} ${2 * radius}`}>
        <G rotation={-90} origin={`${radius}, ${radius}`}>
          {verbs.map((verb, index) => {
            const startAngle = angle * index;
            const endAngle = startAngle + angle;
            const x1 = radius + radius * Math.cos((Math.PI * startAngle) / 180);
            const y1 = radius + radius * Math.sin((Math.PI * startAngle) / 180);
            const x2 = radius + radius * Math.cos((Math.PI * endAngle) / 180);
            const y2 = radius + radius * Math.sin((Math.PI * endAngle) / 180);

            // Text positioning
            const textAngle = startAngle + (angle / 2);
            const textX = radius + radius * 0.6 * Math.cos((Math.PI * textAngle) / 180);
            const textY = radius + radius * 0.6 * Math.sin((Math.PI * textAngle) / 180);
            const textRotation = textAngle > 90 && textAngle < 270 ? textAngle + 180 : textAngle;

            return (
              <G key={index}>
                <Path
                  d={`M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} z`}
                  fill={index % 2 === 0 ? '#bdaf5e' : '#00ff59'}
                  stroke="#fff"
                  strokeWidth={2}
                />
                <SvgText
                  x={radius + radius * 0.6 * Math.cos((Math.PI * (startAngle + angle / 2)) / 180)}
                  y={radius + radius * 0.6 * Math.sin((Math.PI * (startAngle + angle / 2)) / 180)}
                  fill="#fff"
                  fontSize={16}
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  rotation={`rotate(${textRotation}, ${textX}, ${textY})`}
                >
                  {verb}
                </SvgText>
              </G>
            );
          })}
        </G>
      </Svg>
    );
  };

  // Start the thorn shaking animation
  const startThornShake = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(thornShake, {
          toValue: 10, // Move right
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(thornShake, {
          toValue: -10, // Move left
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(thornShake, {
          toValue: 0, // Back to center
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };


  // Stop the thorn shake after spinning ends
  const stopThornShake = () => {
    thornShake.stopAnimation();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header Section */}
      <Header title="Wacky Word Wheel" navigation={navigation} />
      <Background>
        {/* Center Content Section */}
        <View style={styles.content}>
          <View style={styles.sentenceContainer}>
            <Text style={styles.sentenceText}>
              Every morning, I{' '}
              <Text style={displayedSentence ? styles.highlight : styles.underline}>
                {displayedSentence || '_____'}
              </Text>{' '}
              to start my day.
            </Text>
          </View>

          {/* Spinning Wheel */}
          <View style={styles.wheelContainer}>
            {/* Thorn positioned statically */}
            <Animated.View
              style={[
                styles.thorn,
                {
                  transform: [
                    {
                      translateX: thornShake
                    },
                  ],
                },
              ]}
            />
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: rotation.interpolate({
                      inputRange: [0, 360],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              }}
            >
              {renderWheel()}
            </Animated.View>
            {/* Spin Button at the center */}
            <TouchableOpacity style={styles.spinButton} onPress={startSpin}>
              <Text style={styles.spinButtonText}> {spinning ? 'Spin...' : 'Spin'} </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Background>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  // Content styles
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 50,
    gap: 20,
  },
  sentenceRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  sentenceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
    marginBottom: 10,
  },

  sentenceContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#ffffffe8',
    borderRadius: 8,
    padding: 15,
  },
  sentenceText: {
    fontSize: 18,
    textAlign: 'center',
  },
  underline: {
    borderBottomWidth: 2,
    borderBottomColor: common.color.primary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  highlight: {
    backgroundColor: common.color.primary,
    paddingHorizontal: 5,
    fontWeight: 'bold',
    borderRadius: 5,
  },

  wheelContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinButton: {
    position: 'absolute',
    width: 80,
    height: 80,
    backgroundColor: common.color.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    zIndex: 1,
    // paddingVertical: 15,
    paddingHorizontal: 10,
  },
  spinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Wheel Modal Overlay
  wheelOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thorn: {
    position: 'absolute',
    top: -15,
    left: '50%',
    transform: [{ translateX: -10 }],
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ff0000',
    zIndex: 1,
  },
});


export default WackyWordWheelScreen