import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FlatListSynced from './FLatListSynced'

const App = () => {
    return (
        <View style={styles.container}>
            <FlatListSynced />
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})