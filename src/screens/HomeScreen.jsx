import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerLayout, Switch } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PlayIcon from 'react-native-vector-icons/AntDesign';
import MenuIcon from 'react-native-vector-icons/Entypo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { common } from '../utills/Utils';
import Background from '../components/Background';
import { FadeAnime } from '../components/Animations';
import { useFocusEffect } from '@react-navigation/native';
import Sound from 'react-native-sound';

function HomeScreen({ navigation }) {
  const drawerRef = useRef(null);
  const insets = useSafeAreaInsets();
  const soundRef = useRef(null); // Reuse the sound object
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Load sound when screen is focused if not already loaded
      if (!soundRef.current) {
        soundRef.current = new Sound('home_music.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            // console.log("failed to load the sound", error);
          }
        });
      }

      return () => {
        // Release sound when screen is unfocused
        if (soundRef.current) {
          soundRef.current.stop(() => {});
          soundRef.current.release();
          soundRef.current = null;
        }
      };
    }, [])
  );

  const toggleMusic = () => {
    if (isMusicPlaying) {
      // Stop music if it's playing
      soundRef.current?.stop(() => {});
      setIsMusicPlaying(false);
    } else {
      // Start playing the music if it's stopped
      soundRef.current?.play((success) => {
        if (!success) {
          // console.log("Playback failed due to audio decoding errors");
        }
      });
      setIsMusicPlaying(true);
    }
  };

  // Initialize sound bar menu
  const menuSound = useRef(
    new Sound('menu.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Error loading sound:', error);
      }
    })
  );

  // Play the menu sound
  const playMenuSound = () => {
    menuSound.current.stop(() => {
      menuSound.current.play((success) => {
        // if (!success) console.log('Playback failed');
      });
    });
  };


  // Drawer Content with Icons
  const renderDrawerContent = () => (
    // return (
    <View style={styles.drawerContainer}>
      <Pressable style={styles.drawerHeader} hitslop={20} onPress={() => drawerRef.current.closeDrawer()}>
        <MenuIcon name="menu" style={{ color: common.color.primary, fontSize: 24 }} />
        <Text style={styles.drawerTitle}>Menu</Text>
      </Pressable>
      <TouchableOpacity style={styles.drawerItem} onPress={() => {
        drawerRef.current.closeDrawer();
      }}>
        <Icon name="account" size={24} style={styles.drawerItemIcon} />
        <Text style={styles.drawerItemText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerItem} onPress={() => {
        drawerRef.current.closeDrawer();
      }}>
        <Icon name="chart-bar" size={24} style={styles.drawerItemIcon} />
        <Text style={styles.drawerItemText}>Progress</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerItem} onPress={() => {
        drawerRef.current.closeDrawer();
        navigation.navigate('Home');
      }}>
        <Icon name="logout" size={24} style={styles.drawerItemIcon}
        />
        <Text style={styles.drawerItemText}>Logout</Text>
      </TouchableOpacity>


      {/* Toggle button for music */}
      <View style={styles.drawerItem}>
        <Text style={styles.drawerItemText}>Music</Text>
        <Switch
          value={isMusicPlaying}
          onValueChange={toggleMusic}
          thumbColor={isMusicPlaying ? common.color.secondary : '#ccc'}
          trackColor={{ false: '#ccc', true: common.color.primary }}
        />
      </View>
    </View>
  );

  return (
    <DrawerLayout ref={drawerRef} drawerWidth={250} drawerPosition="left" renderNavigationView={renderDrawerContent} drawerType="slide">
      <FadeAnime>
        <View style={[styles.container, { paddingTop: insets.top }]}>

          {/* Header */}
          <Header drawerRef={drawerRef} title={'Home'} navigation={navigation} secondIcon={'settings'} secondIconPress={() => navigation.navigate('Settings')} />

          {/* Main section */}
          <Background homeSrc={require('../assets/images/homebg.jpeg')}>
            <View>
              <View style={styles.button}>
                <TouchableOpacity style={styles.combineButton} onPress={() => navigation.navigate('HowToPlayScreen')}>
                  <PlayIcon name="questioncircle" size={30} color="white" />
                  <Text style={styles.buttonText}> How to Play </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.button}>
                <TouchableOpacity style={styles.combineButton1} onPress={() => navigation.navigate('PlayScreen')}>
                  <PlayIcon name="play" size={30} color="white" />
                  <Text style={styles.buttonText}> Play </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Background>
        </View>
      </FadeAnime>
    </DrawerLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20
  },
  combineButton: {
    marginTop: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: common.color.primary,
    borderRadius: 25,
    padding: 7,
    borderColor: "#ffffffaf",
    borderWidth: 4,
    borderTopWidth: 1
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  combineButton1: {
    flexDirection: 'row',
    backgroundColor: common.color.secondary,
    borderRadius: 25,
    width: 130,
    padding: 7,
    borderColor: "#ffffffaf",
    borderWidth: 4,
    borderTopWidth: 1,
    columnGap: 10
  },

  // Drawer styles
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  drawerHeader: {
    backgroundColor: '#ffeedd',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  drawerTitle: {
    color: common.color.secondary,
    fontSize: 22,
    fontWeight: 'bold',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginLeft: 10,
  },
  drawerItemIcon: {
    marginRight: 10,
    color: common.color.secondary
  },
  drawerItemText: {
    fontSize: 18,
    color: common.color.primary,
  },
  musicToggleContainer: {
    marginTop: 20,
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
