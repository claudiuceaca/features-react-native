import { Colors } from '@/constants/Colors'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CounterAnimated from './CounterAnimated'

const App = () => {
    const [value, setValue] = useState(12351);

    const ButtonCounterAnimated = () => {
        return <TouchableOpacity
            onPress={() => setValue(Math.floor(Math.random() * 8991101) / 100)}
        >
            <Text style={styles.buttonText}>Change Value</Text>
        </TouchableOpacity>
    }

    return (
        <View style={styles.container}>
            <CounterAnimated value={value} fontSize={160} />

            <ButtonCounterAnimated />
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
