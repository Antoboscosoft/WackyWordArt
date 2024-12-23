import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MatirialIcon from 'react-native-vector-icons/MaterialIcons';
import { common } from '../utills/Utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ContextProvider } from '../navigations/MainNavigator';

function Header({ title, drawerRef, navigation, secondIcon, secondIconPress, secondIconColor = "#fff" }) {
    const insets = useSafeAreaInsets();
    const {setDisplayFooter}=useContext(ContextProvider)
    let checkHome = title === 'Home';
    const onChange = () => {
        // playMusic("menu");
        if (checkHome) {
            drawerRef.current.openDrawer()
        } else {
            navigation.goBack();
        }
        if(title="Let's Learn"){
            setDisplayFooter(true)
        }
    }
    let secondIconStyle = (secondIcon || checkHome) ? {} : { backgroundColor: 'transparent', borderWidth: 0 }
    return (
        <View style={[styles.topBar, { paddingTop: insets.top }]}>
            <TouchableOpacity onPress={onChange} >

                <View style={[styles.circle, { borderRadius: checkHome ? 10 : 35 }]}>
                    <MatirialIcon name={checkHome ? "notes" : "arrow-back"} style={styles.menu} />
                </View>

            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={secondIconPress}>
                <View style={[styles.circle, secondIconStyle, {opacity: secondIcon ? 1 : 0, borderRadius: checkHome ? 10 : 35 }]}>
                    <MatirialIcon name={secondIcon || 'settings'} style={[styles.menu, { color: secondIconColor }]} />
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
        zIndex: 1,
        marginTop: 5
    },
    menu: {
        color: "#fff",
        fontSize: 30,
    },
    title: {
        color: "#00ff1a",
        fontSize: 23,
        fontFamily: common.font.primary,
        backgroundColor: "#0000004d",
        paddingHorizontal: 10,
        borderRadius: 10,
        textDecorationLine: 'underline',
        textShadowColor: "#d70297be",
        textShadowRadius: 2,
        textShadowOffset: { width: 2, height: 1 },
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