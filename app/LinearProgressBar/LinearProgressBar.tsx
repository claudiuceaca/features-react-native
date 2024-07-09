import React from "react";
import { Animated, StyleSheet, View } from "react-native";

type AddOpacityProps = {
    color: string;
    opacity: number;
};

const addOpacity = ({ color, opacity = 0.3 }: AddOpacityProps): string => {
    let r: number, g: number, b: number;

    if (color.startsWith('#')) {
        // Hex color
        const hex = color.replace('#', '');
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else if (color.startsWith('rgb')) {
        // RGB color
        const rgb = color.match(/\d+/g);
        if (rgb) {
            r = parseInt(rgb[0], 10);
            g = parseInt(rgb[1], 10);
            b = parseInt(rgb[2], 10);
        } else {
            throw new Error('Invalid RGB color format');
        }
    } else {
        throw new Error('Invalid color format');
    }

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

type LinearProgressBarProps = {
    step: number;
    steps: number;
    height?: number;
    backgroundColor?: string;
};

const LinearProgressBar = (props: LinearProgressBarProps) => {
    const { step, steps, height = 20, backgroundColor = 'rgba(0,0,0,0.1)' } = props;
    const [width, setWidth] = React.useState(0);

    const animatedValue = React.useRef(new Animated.Value(-1000)).current;
    const reactive = React.useRef(new Animated.Value(-1000)).current;

    React.useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    React.useEffect(() => {
        reactive.setValue(-width + (width * step) / steps);
    }, [step, width]);

    return (
        <>
            <View
                style={[
                    styles.container,
                    {
                        height,
                        backgroundColor: addOpacity({ color: backgroundColor, opacity: 0.3 }),
                        borderRadius: height,
                    },
                ]}
            >
                <Animated.View
                    onLayout={(e) => {
                        const newWidth = e.nativeEvent.layout.width;
                        setWidth(newWidth);
                    }}
                    style={[
                        styles.animatedView,
                        {
                            height,
                            backgroundColor: backgroundColor,
                            borderRadius: height,
                            transform: [{ translateX: animatedValue }],
                        },
                    ]}
                />
            </View>
        </>
    );
};

export default LinearProgressBar;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        overflow: 'hidden',
        alignSelf: 'center',
        marginVertical: 10,
    },
    animatedView: {
        width: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
    },
});
