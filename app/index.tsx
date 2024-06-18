import Button from '@/components/Button';
import SafeAreaViewAndroid from '@/components/SafeAreaView';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App = () => {
    const router = useRouter();

    return (
        <SafeAreaViewAndroid>
            <View style={styles.container}>
                <Text>Choose a Feature</Text>
                <Button text={'BottomSheet'} onPress={() => router.push('/BottomSheet')} />
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
    }
})