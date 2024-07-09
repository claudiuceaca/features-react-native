import { LinearGradient } from 'expo-linear-gradient';
import React, { FunctionComponent, SVGAttributes } from 'react';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
    Easing,
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { Close, Edit, Save, Send } from '@/assets/images/floatingbutton';
import { Colors } from '@/constants/Colors';

type FloatingButtonItemProps = {
    Icon: FunctionComponent<SVGAttributes<SVGElement>>;
    animatedStyle: any;
};

const colors = ['#DA22FF', Colors.purple];

const FloatingButtonItem = ({ Icon, animatedStyle, }: FloatingButtonItemProps) => {
    return (
        <Animated.View style={[styles.contentContainer, animatedStyle]}>
            <LinearGradient colors={colors}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Icon width={22} height={22} />
                </TouchableOpacity>
            </LinearGradient>
        </Animated.View>
    );
};

const FloatingButtonsAround = () => {
    const firstValue = useSharedValue(30);
    const secondValue = useSharedValue(30);
    const thirdValue = useSharedValue(30);
    const isOpen = useSharedValue(false);
    const progress = useDerivedValue(() =>
        isOpen.value ? withTiming(1) : withTiming(0),
    );

    const handlePress = () => {
        const config = {
            easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
            duration: 500,
        };
        if (isOpen.value) {
            firstValue.value = withTiming(30, config);
            secondValue.value = withDelay(50, withTiming(30, config));
            thirdValue.value = withDelay(100, withTiming(30, config));
        } else {
            firstValue.value = withDelay(200, withSpring(110));
            secondValue.value = withDelay(100, withSpring(100));
            thirdValue.value = withSpring(110);
        }
        isOpen.value = !isOpen.value;
    };

    const firstIcon = useAnimatedStyle(() => {
        const scale = interpolate(
            firstValue.value,
            [30, 110],
            [0, 1],
            Extrapolation.CLAMP,
        );

        return {
            right: firstValue.value,
            transform: [{ scale: scale }],
        };
    });

    const secondIcon = useAnimatedStyle(() => {
        const scale = interpolate(
            secondValue.value,
            [30, 100],
            [0, 1],
            Extrapolation.CLAMP,
        );

        return {
            bottom: secondValue.value,
            right: secondValue.value,
            transform: [{ scale: scale }],
        };
    });

    const thirdIcon = useAnimatedStyle(() => {
        const scale = interpolate(
            thirdValue.value,
            [30, 110],
            [0, 1],
            Extrapolation.CLAMP,
        );

        return {
            bottom: thirdValue.value,
            transform: [{ scale: scale }],
        };
    });

    const plusIcon = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${progress.value * 45}deg` }],
        };
    });

    return (
        <>
            <FloatingButtonItem Icon={Edit} animatedStyle={thirdIcon} />
            <FloatingButtonItem Icon={Save} animatedStyle={secondIcon} />
            <FloatingButtonItem Icon={Send} animatedStyle={firstIcon} />

            <Pressable
                style={styles.contentContainer}
                onPress={() => {
                    handlePress();
                }}>
                <LinearGradient
                    colors={colors}>
                    <Animated.View style={[styles.iconContainer, plusIcon]}>
                        <Close width={22} height={22} />
                    </Animated.View>
                </LinearGradient>
            </Pressable>
        </>
    );
};

export default FloatingButtonsAround;

const styles = StyleSheet.create({
    contentContainer: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        borderRadius: 50,
        overflow: 'hidden'
    },
    iconContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 26,
        height: 26,
    },
});