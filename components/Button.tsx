import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, StyleProp, View } from 'react-native';
import GradientWrapper from './GradientWrapper';
import { DEVICE_SIZE } from '@/constants/utils';
import { Colors } from '@/constants/Colors';

interface ButtonProps {
    text: string;
    onPress?: () => void;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({ text, onPress, buttonStyle, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ width: '100%' }}>
            <View style={[styles.button, buttonStyle]}>
                <Text style={[styles.text, textStyle]}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.purple,
        overflow: 'hidden'
    },
    text: {
        fontSize: DEVICE_SIZE.SMALL_DEVICE ? 16 : (DEVICE_SIZE.MEDIUM_DEVICE ? 18 : 20),
        color: Colors.white,
        fontWeight: 'bold',
    },
});

export default Button;
