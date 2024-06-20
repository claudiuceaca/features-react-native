import Button from '@/components/Button';
import SafeAreaViewAndroid from '@/components/SafeAreaView';
import { DEVICE_SIZE } from '@/constants/utils';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { features } from './appData';

const App = () => {
    const router = useRouter();

    return (
        <SafeAreaViewAndroid>
            <View style={styles.container}>
                <Text style={styles.title}>Choose a Feature</Text>
                {features.map(feat => <Button text={feat.title} onPress={() => router.push(feat.path)} key={feat.id} />)}
            </View >
        </SafeAreaViewAndroid>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        gap: 20,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 20
    },
    title: {
        fontSize: DEVICE_SIZE.SMALL_DEVICE ? 30 : (DEVICE_SIZE.MEDIUM_DEVICE ? 32 : 34),
        fontWeight: '600'
    }
})