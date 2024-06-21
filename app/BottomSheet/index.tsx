import BottomSheetExpandable from '@/app/BottomSheet/BottomSheetExpandable';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text } from 'react-native';

const App = () => {
    return (
        <LinearGradient style={{ flex: 1 }} colors={['#DA22FF', '#9733EE']}>
            <BottomSheetExpandable>
                <Text>Bottom Sheet Content</Text>
            </BottomSheetExpandable>
        </LinearGradient>
    )
}

export default App
