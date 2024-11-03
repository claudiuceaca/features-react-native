import { Colors } from '@/constants/Colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import HourPickerAnimated from './HourPickerAnimated'

const App = () => {
    return (
        <View style={styles.container}>
            <HourPickerAnimated />
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        paddingBottom: 40
    },
    buttonText: {
        color: Colors.purple
    }
})
