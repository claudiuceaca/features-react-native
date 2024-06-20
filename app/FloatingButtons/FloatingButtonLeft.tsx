import { Close, Edit, Save, Send } from '@/assets/images/floatingbutton';
import { LinearGradient } from 'expo-linear-gradient';
import React, { FunctionComponent, SVGAttributes } from 'react';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
    Easing,
    Extrapolation,
    SharedValue,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

type FloatingButtonItemProps = {
    value: SharedValue<number>;
    delay: number;
    Icon: FunctionComponent<SVGAttributes<SVGElement>>;
};

const FloatingButtonItem = ({ value, delay, Icon }: FloatingButtonItemProps) => {
    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            value.value,
            [30, 130 + delay],
            [0, 1],
            Extrapolation.CLAMP,
        );

        return {
            bottom: value.value,
            transform: [{ scale: scale }],
        };
    });

    return (
        <Animated.View style={[styles.contentContainer, animatedStyle]}>
            <LinearGradient colors={['#02AAB0', '#00CDAC']}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Icon width={22} height={22} />
                </TouchableOpacity>
            </LinearGradient>
        </Animated.View>
    );
};

const FloatingButtonLeft = () => {
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
            firstValue.value = withDelay(200, withSpring(130));
            secondValue.value = withDelay(100, withSpring(210));
            thirdValue.value = withSpring(290);
        }
        isOpen.value = !isOpen.value;
    };

    const plusIcon = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${progress.value * 45}deg` }],
        };
    });

    return (
        <>
            <FloatingButtonItem value={thirdValue} delay={160} Icon={Edit} />
            <FloatingButtonItem value={secondValue} delay={80} Icon={Save} />
            <FloatingButtonItem value={firstValue} delay={0} Icon={Send} />

            <Pressable
                style={styles.contentContainer}
                onPress={handlePress}>
                <LinearGradient
                    colors={['#02AAB0', '#00CDAC']}>
                    <Animated.View style={[styles.iconContainer, plusIcon]}>
                        <Close width={22} height={22} />
                    </Animated.View>
                </LinearGradient>
            </Pressable>
        </>
    );
};

export default FloatingButtonLeft;

const styles = StyleSheet.create({
    contentContainer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
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