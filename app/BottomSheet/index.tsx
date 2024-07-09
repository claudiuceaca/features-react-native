import BottomSheetExpandable from '@/app/BottomSheet/BottomSheetExpandable';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App = () => {
    return (
        <View style={styles.container}>
            <BottomSheetExpandable>
                <Text style={styles.text}>Bottom Sheet Content</Text>
            </BottomSheetExpandable>
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.purple
    },
    text: {
        color: Colors.purple,
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 20
    }
})
