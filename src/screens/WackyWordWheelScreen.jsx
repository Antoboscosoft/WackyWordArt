import React, { useContext, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Animated, Easing, ScrollView, ActivityIndicator } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import Header from '../components/Header';
import Background from '../components/Background';
import useMusicPlayer, { common } from '../utills/Utils';
import SoundPlayer from 'react-native-sound-player';
import { ContextProvider } from '../navigations/MainNavigator';
import { FadeAnime } from '../components/Animations';
import { useIsFocused } from '@react-navigation/native';
import { getApiservice, getService } from '../APIServices/services';
import axios from 'axios';
import LottieView from 'lottie-react-native';
// import Sound from 'react-native-sound';
// import audio1 from '../assets/audios/barbie-girl.mp3';

function WackyWordWheelScreen({ navigation }) {
  // Static List of verbs for the wheel:
  const verbs1 = ['Dance', 'Walk', 'Jog', 'Run', 'Read', 'Eat', 'Sing', 'Play'];
  // Dynamic List of verbs for the wheel:
  const [verbs, setVerbs] = useState([]);
  // State to manage the selected verb
  const [displayedSentence, setDisplayedSentence] = useState('');
  const [spinning, setSpinning] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;
  const [countdown, setCountdown] = useState(5); // Timer starts at 15 seconds
  const thornShake = useRef(new Animated.Value(80)).current;

  const [selectedVerb, setSelectedVerb] = useState();
  const [phrase, setPhrase] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState(null);
  const [highlightedVerb, setHighlightedVerb] = useState(null);

  const usePlayMusic = useMusicPlayer();
  const { playMusic, stopMusic } = usePlayMusic;
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const { musicController, setMusicControler } = useContext(ContextProvider);
  const timerRef = useRef(null); // Ref to manage the timer
  // console.log("displayedSentence", displayedSentence);

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

    // soundRef.setCurrentTime(0);
    // soundRef.play((succuss) => {
    //   if(!succuss){
    //     console.log("Playback failed due to audio decoding errors");
    //   } else {
    //     console.log('Playback successful');
    //   }
    // });
    musicController == true && playMusic("puzzle_game");
    setSpinning(true);
    setCountdown(5);
    // startCountdown();
    // startThornShake();

    if (selectedVerb) {
      let updatePhrase = phrase.replace(selectedVerb, `{${partOfSpeech}}`).trim();
      setPhrase(updatePhrase);
    }

    // Before spinning the wheel, remove the selected verb from the phrase:
    // let updatePhrase = phrase.replace(selectedVerb, "").trim();
    // setPhrase(updatePhrase);
    setHighlightedVerb(null);
    setSelectedVerb("");

    // Generate a random degree for the wheel
    const randomDegree = Math.floor(3600 + Math.random() * 360);
    const selectedIndex = Math.floor((360 - (randomDegree % 360)) / (360 / verbs?.length)) % verbs?.length;

    // Start the countdown timer
    startCountdown();

    // Animate the wheel for 5 seconds
    Animated.timing(rotation, {
      toValue: randomDegree,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      const newSelectedVerb = verbs[selectedIndex];
      // const selectedVerb = selectVerb;
      setSelectedVerb(newSelectedVerb);
      setHighlightedVerb(newSelectedVerb);
      // setPhrase(prevPhrase => prevPhrase.replace('{verb}', selectedVerb));

      // Get the part of speech placeholder type from the initial phrase (e.g., {verb})
      const math = phrase.match(/\{([a-zA-Z]+)\}/);
      if (math) {
        setPartOfSpeech(math[1]); // Store the part of speech type (verb, adjective, etc.)
      }

      // After the spin, update the phrase with the new selected verb
      setPhrase(prevPhrase => {
        const partOfSpeech = prevPhrase.match(/\{[a-zA-Z]+\}/g)?.[0];
        if (partOfSpeech) {
          return prevPhrase.replace(partOfSpeech, newSelectedVerb);
        }
        return prevPhrase;
      });

      startCountdown();
      setSpinning(false);
      // stopThornShake();
      stopMusic();
      // soundRef.pause();
      rotation.setValue(randomDegree % 360);
    })
  };

  // Function to fetch data from API
  const fetchResult = async () => {
    setLoading(true); // Show loading indicator
    setError(null); // Clear any previous error

    // setSelectedVerb('');
    try {
      const response = await getService('/wackywheel');
      if (response.status === true) {
        console.log("response", response);
        const { phrase, options } = response?.data;
        setPhrase(phrase);
        setVerbs(options);
        setLoading(false);
      } else {
        throw new Error('API error...');
      }
    } catch (error) {
      console.log("enum error", error);
      setError('Failed to load data. Showing default data.');
      setPhrase("I love to {verb} every day!");
      setVerbs(verbs1);
    } finally {
      setLoading(false);
    }
    // getApiservice('/freeai/wackywheel').then(response => {
    //   if (response.status === true) {
    //     console.log("response", response);
    //     const {phrase, options} = response?.data;
    //     setPhrase(phrase);
    //     setVerbs(options);
    //     setLoading(false);
    //   }
    // }).catch(error => {
    //   console.log("enum error", error);
    //   setError('Failed to load data. Please check your connection and try again.');
    // }).finally(() => {
    //   setLoading(false);
    // });
  };

  useEffect(() => {
    fetchResult();
  }, []);

  const startCountdown = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      // setCountdown((prevCountdown) => prevCountdown - 1);
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  // Stop the countdown timer
  const stopCountdown = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    // startCountdown();
    return () => {
      stopCountdown();
    };
  }, []);

  const renderWheel = () => {
    const segments = verbs?.length;
    const angle = 360 / segments; // Angle for each segment
    const radius = 160; // Radius of the wheel

    return (
      <Svg width={2 * radius} height={2 * radius} viewBox={`0 0 ${2 * radius} ${2 * radius}`}>
        <G rotation={-90} origin={`${radius}, ${radius}`}>
          {verbs?.map((verb, index) => {
            const startAngle = angle * index;
            const endAngle = startAngle + angle;
            const x1 = radius + radius * Math.cos((Math.PI * startAngle) / 180);
            const y1 = radius + radius * Math.sin((Math.PI * startAngle) / 180);
            const x2 = radius + radius * Math.cos((Math.PI * endAngle) / 180);
            const y2 = radius + radius * Math.sin((Math.PI * endAngle) / 180);

            // Text positioning
            const textAngle = startAngle + (angle / 2); // Angle for text in the middle of the segment
            const textX = radius + radius * 0.6 * Math.cos((Math.PI * textAngle) / 180);
            const textY = radius + radius * 0.6 * Math.sin((Math.PI * textAngle) / 180);
            {/* const textRotation = textAngle > 90 && textAngle < 270 ? textAngle + 180 : textAngle; */ }

            const textRotation = textAngle > 180 ? textAngle - 180 : textAngle;

            return (
              <G key={index}>
                <Path
                  d={`M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} z`}
                  // fill={index % 2 === 0 ? '#91d159' : '#1d6e74'}
                  fill={index % 2 === 0 ? '#d67221' : '#16c2cf'}
                  stroke="#fff"
                  strokeWidth={2}
                />
                <SvgText
                  // x={textX}
                  // y={textY}
                  x={radius + radius * 0.6 * Math.cos((Math.PI * (startAngle + angle / 2)) / 180)}
                  y={radius + radius * 0.6 * Math.sin((Math.PI * (startAngle + angle / 2)) / 180)}
                  fill="#ffffff"
                  fontSize={16}
                  fontFamily={common.font.primary}
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  style={{ textAlign: 'center' }}
                  transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                // rotation={`rotate(${textRotation}, ${textX}, ${textY})`}
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

  const renderPhrase = () => {
    const parts = phrase.split(new RegExp(`(${selectedVerb})`, 'g')); // Split the phrase by selectedVerb

    return parts.map((part, index) => {
      // If it's the verb, apply the highlightedstyle
      if (part === selectedVerb) {
        return (
          <Text key={index} style={{ color: 'orange', fontWeight: 'bold' }}>
            {part}
          </Text>
        );
      }

      // Otherwise, render the part as normal
      return <Text key={index}>{part}</Text>
    });
  };

  // Start the thorn shaking animation
  // const startThornShake = () => {
  //   Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(thornShake, {
  //         toValue: 10, // Move right
  //         duration: 200,
  //         easing: Easing.linear,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(thornShake, {
  //         toValue: -10, // Move left
  //         duration: 200,
  //         easing: Easing.linear,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(thornShake, {
  //         toValue: 0, // Back to center
  //         duration: 200,
  //         easing: Easing.linear,
  //         useNativeDriver: true,
  //       }),
  //     ])
  //   ).start();
  // };


  // Stop the thorn shake after spinning ends
  // const stopThornShake = () => {
  //   thornShake.stopAnimation();
  // };

  const isFocused = useIsFocused();
  const scaleValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (isFocused) {
      scaleValue.setValue(0);
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [isFocused]);


  return (
    <View style={styles.container}>
      <FadeAnime>
        <Background>
          {/* Header Section */}
          <Header title="Wacky Word Wheel" navigation={navigation} />
          <ScrollView>
            {/* Center Content Section */}
            {loading ? (
              <View>
                <LottieView autoPlay loop={true} source={require('../assets/lottie/textLoading.json')} style={[styles.loading, {width: 100, height: 100}]}/>
              </View>
            ) : (
              <View style={styles.content}>
                <View style={styles.sentenceContainer}>
                  {/* <Text style={styles.sentenceText}>
                  Every morning, I{' '}
                  <Text style={displayedSentence ? styles.highlight : styles.underline}>
                    {displayedSentence || '_____'}
                  </Text>{' '}
                  to start my day.
                </Text> */}
                  <Text style={styles.sentenceText}>
                    {/* {phrase || '_____'} */}
                    {renderPhrase()}
                  </Text>
                </View>

                {/* countdown timer display */}
                {/* {spinning && (
              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>Time Remaining: {countdown} s</Text>
              </View>
              )} */}

                {/* Spinning Wheel */}
                <Animated.View style={[styles.wheelContainer, { transform: [{ scale: scaleValue }] }]}>
                  {/* Thorn positioned statically */}
                  <Animated.View
                    style={[
                      styles.thorn,
                      // {
                      //   transform: [
                      //     {
                      //       translateY: thornShake
                      //     },
                      //   ],
                      // },
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
                    {!spinning ? (
                      <Text style={styles.spinButtonText}> {'Spin'} </Text>
                    ) : (
                      <Text style={styles.timerText}>{countdown} s</Text>
                    )}
                  </TouchableOpacity>
                </Animated.View>
              </View>


            )}
          </ScrollView>
        </Background>
      </FadeAnime>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginTop: 50,
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
    color: '#333',
    marginRight: 5,
    marginBottom: 10,
  },

  sentenceContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#ffffffe8',
    borderRadius: 10,
    padding: 15,
  },
  sentenceText: {
    fontSize: common.style.phraseSize,
    textAlign: 'center',
    fontFamily: common.font.primary,
    color: "#000",
  },
  timerContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 20,
    color: '#d67221',
    fontWeight: 'bold',
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
    borderRadius: 5,
    color: '#fff',
    fontFamily: common.font.primary,
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
    // backgroundColor: common.color.secondary,
    backgroundColor: '#5e0190',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    zIndex: 1,
    borderColor: '#fff',
    borderWidth: 2,
    // paddingVertical: 15,
    paddingHorizontal: 10,
  },
  spinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: common.font.primary,
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
    top: 93,
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
    borderBottomColor: '#faf606',
    zIndex: 1,
  },
});


export default WackyWordWheelScreen