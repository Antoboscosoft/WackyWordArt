import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import useMusicPlayer, { common } from '../utills/Utils';
import Background from '../components/Background';
import { FadeAnime } from '../components/Animations';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import SoundPlayer from 'react-native-sound-player';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ContextProvider } from '../navigations/MainNavigator';

export const AppContext = createContext();

function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const drawerRef = useRef(null);
  const isFocused = useIsFocused();
  const usePlayMusic = useMusicPlayer();
  const { playMusic, stopMusic } = usePlayMusic;
  const { musicController, setMusicControler } = useContext(ContextProvider);


  // State for toggle buttons
  const [vdxEnabled, setVdxEnabled] = useState(false);
  const [bgMusicEnabled, setBgMusicEnabled] = useState(false);


  // Function to toggle vdx sound effects
  const toggleVdxSound = () => {
    // setVdxEnabled(!vdxEnabled);
    setVdxEnabled(prev => !prev)
  }

  const toggleBgMusic = () => {
    // setBgMusicEnabled(!bgMusicEnabled);
    setBgMusicEnabled((prev) => !prev);
    setMusicControler(prev => !prev);
  }

  // Function to play background music
  const playBackgroundMusic = () => {
    try {
      playMusic("sakura_girl");
      SoundPlayer.loadSoundFile('sakura_girl', 'mp3'); // Use your music URL or local file
      SoundPlayer.play();
    } catch (e) {
      console.log('Cannot play background music', e);
    }
  }

  // Function to stop background music
  const stopBackgroundMusic = () => {
    try {
      SoundPlayer.stop();
    } catch (e) {
      console.log('Cannot stop background music', e);
    }
  }


  // Use `useFocusEffect` to handle screen focus and blur events
  useFocusEffect(
    useCallback(() => {
      if (bgMusicEnabled) {
        playBackgroundMusic();
      }
      return () => {
        // if(bgMusicEnabled){
        stopBackgroundMusic();
        // }
      };
      playMusic("sakura_girl");
      // return () => {
      //   stopMusic();
      // };
    }, [bgMusicEnabled, playBackgroundMusic, stopBackgroundMusic])
  );

  const playMusicWithVdxCheck = (soundName) => {
    if (vdxEnabled) {
      playMusic(soundName);
    }
    return
  };

  // UseEffect to handle background music state
  useEffect(() => {
    if (bgMusicEnabled) {
      playBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  }, [bgMusicEnabled]);

  const menuClick = (navName) => {
    drawerRef.current.closeDrawer();
    playMusicWithVdxCheck('menu');
    navigation.navigate(navName);
  };

  // Drawer Content with Icons
  const renderDrawerContent = () => (
    // return (
    <Background>
      <View style={[styles.drawerContainer, { paddingTop: insets.top }]}>
        <Pressable style={styles.drawerHeader} hitslop={20} onPress={() => {
          drawerRef.current.closeDrawer();
          playMusicWithVdxCheck('menu');
          // playMusic("menu", false)
        }}>
          <MaterialIcon name="notes" style={{ color: common.color.primary, fontSize: 30 }} />
          <Text style={styles.drawerTitle}>Menu</Text>
        </Pressable>

        <View style={{ padding: 20, rowGap: 20 }}>

          <TouchableOpacity style={styles.drawerItem} onPress={() => menuClick('ProfileScreen')}>
            <Icon name="account" size={25} style={styles.drawerItemIcon} />
            <Text style={styles.drawerItemText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={() => menuClick('ProgressScreen')}>
            <Icon name="chart-bar" size={25} style={styles.drawerItemIcon} />
            <Text style={styles.drawerItemText}>Progress</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={() => { menuClick('Home') }}>
            <Icon name="logout" size={25} style={styles.drawerItemIcon} />
            <Text style={styles.drawerItemText}>Logout</Text>
          </TouchableOpacity>

          {/* Toggle Buttons */}
          {/* <View style={styles.settingsContainer}>
            <View style={styles.toggleContainer}>
              <Text style={styles.settingLabel}> Vdx </Text>
              <Switch
                value={vdxEnabled}
                onValueChange={toggleVdxSound}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={vdxEnabled ? '#4bfbe1' : '#f4f3f4'}
              // thumbColor={'#f4f3f4'}
              />
            </View>
            <View style={styles.toggleContainer}>
              <Text style={styles.settingLabel}> Bg Music </Text>
              <Switch
                value={bgMusicEnabled}
                onValueChange={toggleBgMusic}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={bgMusicEnabled ? '#f5dd4b' : 'f4f3f5'}
              // thumbColor={'#f4f3f5'}
              />
            </View>
          </View> */}
        </View>
      </View>
    </Background>
  );

  return (
    <DrawerLayout ref={drawerRef} drawerWidth={250} drawerPosition="left" renderNavigationView={renderDrawerContent} drawerType="slide">
      {isFocused &&
        <View style={styles.container}>
          <FadeAnime>
            <Background>
              {/* Header */}
              <Header drawerRef={drawerRef} title={'Home'} navigation={navigation} secondIcon={'settings'} secondIconPress={() => navigation.navigate('Settings')} />
              <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ zIndex: 1 }}>
                {/* Main section */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={styles.button}>
                    <TouchableOpacity style={styles.combineButton} onPress={() => navigation.navigate('HowToPlayScreen')}>
                      {/* <PlayIcon name="questioncircle" size={30} color="white" /> */}
                      <LottieView autoPlay loop={false} source={require('../assets/lottie/howToPlay.json')} style={{ width: 50, height: 50 }} />
                      <Text style={styles.buttonText}> How to Play </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.button}>
                    <TouchableOpacity style={[styles.combineButton, { backgroundColor: common.color.primary }]} onPress={() => navigation.navigate('PlayScreen')}>
                      {/* <PlayIcon name="play" size={30} color="white" /> */}
                      <LottieView autoPlay source={require('../assets/lottie/play.json')} style={{ width: 50, height: 50 }} />
                      <Text style={styles.buttonText}> Play </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
              <FastImage source={require('../assets/images/zebra_hand_raise.png')} style={{ position: 'absolute', right: 0, bottom: -10, width: 220, height: 270 }} />
            </Background>
          </FadeAnime>
        </View>
      }
    </DrawerLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    paddingBottom: 50
  },
  combineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '65%',
    backgroundColor: common.color.secondary,
    borderRadius: 35,
    paddingHorizontal: 7,
    ...common.style.border
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: common.font.primary,
  },
  // Drawer styles
  drawerContainer: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#ffeedd',
    padding: 8,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
  },
  drawerTitle: {
    fontFamily: common.font.primary,
    color: common.color.secondary,
    fontSize: 25,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1ca',
    padding: 10,
    borderRadius: 10,
    ...common.style.border,
    borderColor: common.color.secondary
  },
  drawerItemIcon: {
    marginRight: 10,
    color: common.color.secondary
  },
  drawerItemText: {
    fontSize: 19,
    color: common.color.primary,
    fontFamily: common.font.primary
  },
  musicToggleContainer: {
    marginTop: 20,
    justifyContent: 'space-between',
  },
  settingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '50%',
    alignSelf: 'flex-start'
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: 10
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#f5f5fb'
  },
});

export default HomeScreen;
