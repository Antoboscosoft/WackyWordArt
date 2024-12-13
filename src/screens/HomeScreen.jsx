import React, { useRef } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PlayIcon from 'react-native-vector-icons/AntDesign';
import MenuIcon from 'react-native-vector-icons/Entypo';
import Header from '../components/Header';
import { common } from '../utills/Utils';
import Background from '../components/Background';
import { FadeAnime } from '../components/Animations';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  const drawerRef = useRef(null);
  const isFocused = useIsFocused();

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

      <TouchableOpacity style={styles.drawerItem} onPress={() => drawerRef.current.closeDrawer()}>
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

    </View>
  );

  return (
    <DrawerLayout ref={drawerRef} drawerWidth={250} drawerPosition="left" renderNavigationView={renderDrawerContent} drawerType="slide">
      {isFocused &&
        <FadeAnime>
          <View style={styles.container}>
            <Background homeSrc={require('../assets/images/homebg.jpeg')} >

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
