import Button from '@/components/Button';
import { Colors } from '@/constants/Colors';
import React, { useRef } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet
} from 'react-native';
import Toast, { IToast } from './ToastMessage';

const App = () => {

    const toastRef = useRef<IToast>(null);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />

            <Toast ref={toastRef} />

            <Button text='Info' onPress={() => showToast('Posting...', 'info')} />
            <Button text='Success' onPress={() => showToast('Posted', 'success')} />
            <Button text='Error' onPress={() => showToast('Ops, something is wrong!', 'error')} />
        </SafeAreaView>
    );

    function showToast(text: string, type: 'info' | 'success' | 'error') {
        toastRef.current?.hide(() => {
            toastRef.current?.show(text, type, 500);
        });
    }

}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        gap: 20
    },
});
