import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MatirialIcon from 'react-native-vector-icons/MaterialIcons';
import { common, playMusic } from '../utills/Utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Header({ title, drawerRef, navigation, secondIcon, secondIconPress }) {
    const insets = useSafeAreaInsets();

    let checkHome = title === 'Home';
    const onChange = () => {
        playMusic("menu");
        if (checkHome) {
            drawerRef.current.openDrawer()
        } else {
            navigation.goBack();
        }
    }
    let secondIconStyle = (secondIcon || checkHome) ? {} : { backgroundColor: 'transparent', borderWidth: 0 }
    return (
        <View style={[styles.topBar, { paddingTop: insets.top }]}>
            <TouchableOpacity onPress={onChange} >

                <View style={[styles.circle, { borderRadius: checkHome ? 10 : 35 }]}>
                    <MatirialIcon name={checkHome ? "menu" : "arrow-back"} style={styles.menu} />
                </View>

            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={secondIconPress}>
                <View style={[styles.circle, secondIconStyle, { borderRadius: checkHome ? 10 : 35 }]}>
                    <MatirialIcon name={secondIcon || 'settings'} style={[styles.menu, { opacity: secondIcon ? 1 : 0 }]} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 15,
        padding: 8,
    },
    menu: {
        color: "#fff",
        fontSize: 30,
    },
    title: {
        color: "#ffffff",
        fontSize: 26,
        fontFamily: common.font.primary,
    },
    circle: {
        borderRadius: 10,
        padding: 3,
        backgroundColor: common.color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderTopWidth: 1,
        borderColor: '#ffffff83'
    },
})

export default Header