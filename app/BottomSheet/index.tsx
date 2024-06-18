import BottomSheetExpandable from '@/app/BottomSheet/BottomSheetExpandable';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text } from 'react-native';

const BottomSheet = () => {
    return (
        <LinearGradient style={{ flex: 1 }} colors={['#FFC371', '#FF5F6D']}>
            <BottomSheetExpandable>
                <Text>Bottom Sheet Content</Text>
            </BottomSheetExpandable>
        </LinearGradient>
    )
}

export default BottomSheet
