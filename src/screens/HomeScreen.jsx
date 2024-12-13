import React, { useCallback, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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


function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const drawerRef = useRef(null);
  const isFocused = useIsFocused();
  const usePlayMusic = useMusicPlayer();
  const { playMusic, stopMusic } = usePlayMusic;
  // Use `useFocusEffect` to handle screen focus and blur events
  useFocusEffect(
    useCallback(() => {
      playMusic("sakura_girl");
      // return () => {
      //   stopMusic();
      // };
    }, [isFocused])
  );

  const menuClick = (navName) => {
    drawerRef.current.closeDrawer();
    navigation.navigate(navName);
  };

  // Drawer Content with Icons
  const renderDrawerContent = () => (
    // return (
    <Background>
      <View style={[styles.drawerContainer, { paddingTop: insets.top }]}>
        <Pressable style={styles.drawerHeader} hitslop={20} onPress={() => { drawerRef.current.closeDrawer(); playMusic("menu", false) }}>
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
        </View>
      </View>
    </Background>
  );

  return (
    <DrawerLayout ref={drawerRef} drawerWidth={250} drawerPosition="left" renderNavigationView={renderDrawerContent} drawerType="slide">
      {isFocused &&
        <FadeAnime>
          <View style={styles.container}>
            <Background>
              {/* Header */}
              <Header drawerRef={drawerRef} title={'Home'} navigation={navigation} secondIcon={'settings'} secondIconPress={() => navigation.navigate('Settings')} />
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
              <FastImage source={require('../assets/images/zebra_hand_raise.png')} style={{ position: 'absolute', right: 0, bottom: -10, width: 250, height: 300 }} />
            </Background>
          </View>
        </FadeAnime>
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
});

export default HomeScreen;
