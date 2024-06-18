import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DEVICE_SIZE } from '@/constants/utils';

interface ButtonProps {
    text: string;
    onPress?: () => void;
    buttonStyle?: object;
    textStyle?: object;
}

const Button = (props: ButtonProps) => {
    const { text, onPress, buttonStyle, textStyle } = props;

    const generateRandomGradient = () => {
        const colors = [
            ['#FF512F', '#DD2476'],
            ['#FFC371', '#FF5F6D'],
            ['#02AAB0', '#00CDAC'],
            ['#DA22FF', '#9733EE'],
            ['#8E2DE2', '#4A00E0'],
        ];

        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    const randomGradientColors = generateRandomGradient();

    return (
        <TouchableOpacity onPress={onPress} style={{ width: '100%' }}>
            <LinearGradient
                style={[styles.button, buttonStyle]}
                colors={randomGradientColors}>
                <Text style={[styles.text, textStyle]}>{text}</Text>
            </LinearGradient >
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: '100%'
    },
    gradient: {
        flex: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: DEVICE_SIZE.SMALL_DEVICE ? 16 : (DEVICE_SIZE.MEDIUM_DEVICE ? 18 : 20),
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default Button;
