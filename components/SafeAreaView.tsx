import React from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native'

const SafeAreaViewAndroid = ({ children }: { children: React.ReactNode }) => {
    return (
        <SafeAreaView style={styles.container}>
            {children}
        </SafeAreaView>
    )
}

export default SafeAreaViewAndroid

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1
    }
})