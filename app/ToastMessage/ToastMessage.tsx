import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
    runOnJS
} from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';

export interface IToast {
    show: (text: string, type: 'info' | 'success' | 'error', duration: number) => void;
    hide: (callback?: () => void) => void;
}

type ConfigProps = {
    text?: string;
    type?: 'info' | 'success' | 'error';
    duration: number;
}

interface Props {
    duration?: number;
    onHide?: () => void;
}

const Toast = forwardRef<IToast, Props>(({ duration = 500, onHide }, ref) => {
    const [textLength, setTextLength] = useState(0);
    const [toastHeight, setToastHeight] = useState(0);
    const [config, setConfig] = useState<ConfigProps>({ text: undefined, type: undefined, duration: 0 });

    const visibleState = useRef(false);
    const timer = useRef<number | null>(null);

    const transY = useSharedValue(0);
    const transX = useSharedValue(0);

    useImperativeHandle(ref, () => ({ show, hide }));

    useEffect(() => {
        if (textLength && toastHeight && config.text) {
            transX.value = textLength + 12;
            showToast();
            timer.current = window.setTimeout(hideToast, 1500);
        }

        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, [config, toastHeight, textLength]);

    useEffect(() => {
        if (toastHeight) {
            transY.value = -toastHeight;
        }
    }, [toastHeight]);

    const rView = useAnimatedStyle(() => ({
        transform: [{ translateY: transY.value }],
        opacity: interpolate(transY.value, [-toastHeight, 80], [0, 1], 'clamp')
    }), [toastHeight]);

    const rOuterView = useAnimatedStyle(() => ({
        transform: [{ translateX: -Math.max(transX.value, 1) / 2 }]
    }), []);

    const rInnerView = useAnimatedStyle(() => ({
        transform: [{ translateX: transX.value }]
    }), []);

    const rText = useAnimatedStyle(() => ({
        opacity: interpolate(transX.value, [0, textLength], [1, 0])
    }), [textLength]);

    return (
        <Animated.View onLayout={handleViewLayout} style={[styles.container, rView]}>
            <Animated.View style={[styles.outerContainer, rOuterView]}>
                <Animated.View style={[styles.innerContainer, rInnerView, { backgroundColor: generateBackgroundColor() }]}>
                    {generateImage()}
                    <Animated.Text onLayout={handleTextLayout} style={[styles.text, rText]}>{config?.text}</Animated.Text>
                </Animated.View>
            </Animated.View>
        </Animated.View>
    );

    function show(text: string, type: 'info' | 'success' | 'error', duration: number) {
        setConfig({ text, type, duration });
    }

    function hide(callback?: () => void) {
        hideToast(callback);
    }

    function generateImage() {
        switch (config?.type) {
            case 'success': return <AntDesign name="check" size={20} color="white" />;
            case 'error': return <AntDesign name="close" size={20} color="white" />;
            default: return <AntDesign name="info" size={20} color="white" />;
        }
    }

    function generateBackgroundColor() {
        switch (config?.type) {
            case 'success': return '#9733EE';
            case 'error': return '#9733EE';
            default: return '#9733EE';
        }
    }

    function showToast() {
        if (!visibleState.current) {
            visibleState.current = true;
            transY.value = withTiming(80, { duration: config.duration });
            transX.value = withDelay(config.duration, withTiming(0, { duration: config.duration }));
        }
    }

    function hideToast(callback?: () => void) {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        transX.value = withTiming(textLength + 12, { duration });
        transY.value = withDelay(config.duration, withTiming(-toastHeight, {
            duration: config.duration,
            easing: Easing.bezier(0.36, 0, 0.66, -0.56),
        }, () => {
            runOnJS(handleOnFinish)(callback);
        }));
    }

    function handleOnFinish(callback?: () => void) {
        setConfig({ text: undefined, type: undefined, duration: 0 });
        if (onHide) {
            onHide();
        }
        if (callback) {
            setTimeout(callback, 100);
        }
        visibleState.current = false;
    }

    function handleTextLayout(event: LayoutChangeEvent) {
        setTextLength(Math.floor(event.nativeEvent.layout.width));
    }

    function handleViewLayout(event: LayoutChangeEvent) {
        setToastHeight(event.nativeEvent.layout.height);
    }
});

export default Toast;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        zIndex: 100,
        marginHorizontal: 24
    },
    outerContainer: {
        overflow: 'hidden',
        borderRadius: 40
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 40
    },
    image: {
        width: 20,
        height: 20
    },
    text: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 12,
        textAlign: 'center'
    }
});
