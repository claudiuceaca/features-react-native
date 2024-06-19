import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

interface GradientWrapperProps {
    children: ReactNode;
    style?: ViewStyle;
}

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

const GradientWrapper = ({ children, style }: GradientWrapperProps) => {
    const randomGradientColors = generateRandomGradient();

    return (
        <LinearGradient style={[styles.gradient, style]} colors={randomGradientColors}>
            {children}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
});

export default GradientWrapper;
