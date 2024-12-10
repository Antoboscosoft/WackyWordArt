import React from 'react'
import { ImageBackground,View } from 'react-native'

function Background({ children, homeSrc }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#a0ff92' }}>
            {/* <ImageBackground source={homeSrc || require('../assets/images/bg1.png')} style={{ width: '100%', height: '100%', resizeMode: 'cover' }}> */}
                {children}
            {/* </ImageBackground> */}
        </View>
    )
}


export default Background