import React from 'react'
import { StyleSheet, View } from 'react-native'
import CircularProgressBar from './CircularProgressBar'
import { dataCircularProgressBar } from './dataCircularProgressBar'

const App = () => {
    return (
        <View style={styles.container}>
            {dataCircularProgressBar.map(d => {
                return <CircularProgressBar
                    key={d.id}
                    percentage={d.percentage}
                    color={d.color}
                    max={d.max}
                    radius={d.radius}
                    strokeWidth={d.strokeWidth}
                />
            })}
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
    }
})