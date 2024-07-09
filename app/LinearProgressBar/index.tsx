import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LinearProgressBar from './LinearProgressBar'

const App = () => {
    const [step, setStep] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((step + 1) % (10 + 1))
        }, 500);

        return () => {
            clearInterval(interval)
        }
    }, [step])

    return (
        <View style={styles.container}>
            <Text style={styles.steps}>{step} / {10}</Text>
            <LinearProgressBar step={step} steps={10} height={20} backgroundColor='#9733EE' />
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    steps: {
        color: '#9733EE',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
        marginTop: -40,
    }
})