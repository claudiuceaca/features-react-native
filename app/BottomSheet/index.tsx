import BottomSheetExpandable from '@/app/BottomSheet/BottomSheetExpandable';
import { Colors } from '@/constants/Colors';
import { DEVICE_SIZE } from '@/constants/utils';
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
        fontSize: DEVICE_SIZE.SMALL_DEVICE ? 13 : (DEVICE_SIZE.MEDIUM_DEVICE ? 15 : 17),
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 20
    }
})
