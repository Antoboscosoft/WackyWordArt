import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MatirialIcon from 'react-native-vector-icons/MaterialIcons';
import { common } from '../utills/Utils';

function Header({ title, drawerRef, navigation, secondIcon, secondIconPress }) {
    let checkHome = title === 'Home';
    const onChange = () => {
        if (checkHome) {
            drawerRef.current.openDrawer()
        } else {
            navigation.goBack();
        }
    }
    return (
        <View style={[styles.topBar, { paddingTop: 0 }]}>
            <TouchableOpacity onPress={onChange} style={{width: 35, height: 35}}>
                {
                    checkHome ?
                    <MatirialIcon name="menu" style={styles.menu} /> :
                    <View style={styles.circle}>
                        <MatirialIcon name="arrow-back" style={[styles.menu, { color: '#fff'}]} />
                    </View>
                }
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={secondIconPress}>
                <MatirialIcon name={secondIcon || 'settings'} style={[styles.menu, { opacity: secondIcon ? 1 : 0 }]} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#fff',
        borderBottomColor: common.color.primary,
        borderBottomWidth: 3,
    },
    menu: {
        color: common.color.primary,
        fontSize: 30,
    },
    title: {
        color: common.color.secondary,
        fontWeight: 'bold',
        fontSize: 25,
        fontWeight: 'bold',
        textShadowColor: '#d8d6d6',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
    },
    circle: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: common.color.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Header