import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App = () => {
    return (
        <View style={styles.container}>
            <Text>App</Text>
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        paddingTop: 50
    }
})