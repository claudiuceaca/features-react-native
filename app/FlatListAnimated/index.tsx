import React from 'react';
import { StyleSheet, View } from 'react-native';
import FlatListAnimated from './FlatListAnimated';

const App = () => {
    const data = Array.from({ length: 50 }, (_, index) => ({ id: index }));

    return (
        <View style={styles.container}>
            <FlatListAnimated data={data} />
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});