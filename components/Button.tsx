import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import GradientWrapper from './GradientWrapper';
import { DEVICE_SIZE } from '@/constants/utils';

interface ButtonProps {
    text: string;
    onPress?: () => void;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({ text, onPress, buttonStyle, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ width: '100%' }}>
            <GradientWrapper style={[styles.button, buttonStyle]}>
                <Text style={[styles.text, textStyle]}>{text}</Text>
            </GradientWrapper>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: DEVICE_SIZE.SMALL_DEVICE ? 16 : (DEVICE_SIZE.MEDIUM_DEVICE ? 18 : 20),
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default Button;
