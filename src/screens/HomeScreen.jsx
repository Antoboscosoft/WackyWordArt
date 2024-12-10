import React, {useRef} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {DrawerLayout} from 'react-native-gesture-handler';
import MatirialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // For drawer items
import PlayIcon from 'react-native-vector-icons/AntDesign';
import MenuIcon from 'react-native-vector-icons/Entypo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function HomeScreen({navigation}) {
  const drawerRef = useRef(null);
  const insets= useSafeAreaInsets();
  // Drawer Content with Icons
  const renderDrawerContent = () => (
    // return (
    <View style={styles.drawerContainer}>
      <Text
        style={styles.drawerTitle}
        onPress={() => drawerRef.current.closeDrawer()}
        hitslop={20}>
        <Text style={[{alignSelf: 'flex-start', marginRight: 10}]}>
          {' '}
          ☰ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Text>
        Menu
      </Text>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          drawerRef.current.closeDrawer();
          navigation.navigate('Profile');
        }}>
        <Icon
          name="account"
          size={24}
          color="#3b5a9a"
          style={styles.drawerItemIcon}
        />
        <Text style={styles.drawerItemText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          drawerRef.current.closeDrawer();
          navigation.navigate('Game');
        }}>
        <Icon
          name="gamepad-variant"
          size={24}
          color="#3b5a9a"
          style={styles.drawerItemIcon}
        />
        <Text style={styles.drawerItemText}>Games</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          drawerRef.current.closeDrawer();
          navigation.navigate('TutorialScreen');
        }}>
        <Icon
          name="book-open-variant"
          size={24}
          color="#3b5a9a"
          style={styles.drawerItemIcon}
        />
        <Text style={styles.drawerItemText}>Tutorial Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          drawerRef.current.closeDrawer();
          navigation.navigate('Progress');
        }}>
        <Icon
          name="chart-bar"
          size={24}
          color="#3b5a9a"
          style={styles.drawerItemIcon}
        />
        <Text style={styles.drawerItemText}>Progress</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          drawerRef.current.closeDrawer();
          navigation.navigate('Settings');
        }}>
        <Icon
          name="cog"
          size={24}
          color="#3b5a9a"
          style={styles.drawerItemIcon}
        />
        <Text style={styles.drawerItemText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          drawerRef.current.closeDrawer();
          navigation.navigate('Home');
        }}>
        <Icon
          name="logout"
          size={24}
          color="#3b5a9a"
          style={styles.drawerItemIcon}
        />
        <Text style={styles.drawerItemText}>Logout</Text>
      </TouchableOpacity>
    </View>
    // );
  );
  // }

  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={renderDrawerContent}
      drawerType="slide">
      <View style={[styles.container,{ paddingTop: insets.top}]}>
        {/* Top bar */}
        <View style={[styles.topBar, {paddingTop: 0}]}>
          <TouchableOpacity onPress={() => drawerRef.current.openDrawer()}>
            <MenuIcon name="menu" style={styles.menu}/>
          </TouchableOpacity>
          <Text style={styles.title}>Home</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <MatirialIcon name="settings" style={styles.menu} />
          </TouchableOpacity>
        </View>

        {/* Main section */}
        <View>
          <ImageBackground
            source={require('../assets/images/homebg.jpeg')}
            style={styles.backgroundImage}>
            <View style={styles.button}>
              <TouchableOpacity style={styles.combineButton}
                onPress={() => navigation.navigate('HowToPlayScreen')}>
                <PlayIcon name="play" size={35} color="white" />
                <Text style={styles.buttonText}> How to Play </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity style={styles.combineButton1}
                onPress={() => navigation.navigate('HowToPlayScreen')}>
                <PlayIcon name="play" size={35} color="white" />
                <Text style={styles.buttonText}> Play </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        {/* Bottom section */}
        <View style={styles.adContainer}>
          <Text style={styles.adText}>Advertisement</Text>
          {/* Placeholder for an ad image or component */}
          <FastImage
            style={styles.adImage}
            source={{uri: 'https://via.placeholder.com/300x100'}} // Replace with your ad image or SDK component
            resizeMode="contain"
          />
        </View>
      </View>
    </DrawerLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  menu:{
    color: '#f18927',
    fontSize: 32,
  },
  homeheadicon: {
    fontSize: 30,
    color: '#3b5a9a',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b5a9a',
    marginBottom: 20,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  combineButton:{
    marginTop: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f18927',
    borderRadius: 30,
    padding: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'cursive',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  title: {
    color: '#04acb8',
    fontWeight: 'bold',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'cursive',
    textShadowColor: '#d8d6d6',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 1,
    letterSpacing: 1,
  },
  combineButton1:{
    marginTop: 450,
    flexDirection: 'row',
    justifyContent: 'end',
    alignItems: 'center',
    backgroundColor: '#04acb8',
    borderRadius: 30,
    padding: 15,
  },
  // Drawer styles
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3b5a9a',
    backgroundColor: '#ffeedd',
    padding: 10,
    borderRadius: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginLeft: 10,
  },
  drawerItemIcon: {
    marginRight: 10,
  },
  drawerItemText: {
    fontSize: 18,
    color: '#567100',
  },

  // Advertisement styles
  adContainer: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  adText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#de0000',
    marginBottom: 5,
  },
  adImage: {
    width: 300,
    height: 45,
  },
});

export default HomeScreen;
