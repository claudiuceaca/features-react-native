import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, TouchableOpacity, View } from "react-native";

const { height } = Dimensions.get('window');

const animationEndY = Math.ceil(height * 0.7);
const negativeEndY = animationEndY * -1;

let heartCount = 1;

function getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

type Heart = {
    id: number;
    right: number;
    color: string;
    iconName: string
};

type HeartContainerProps = {
    style?: any;
    onComplete: () => void;
    color: string;
    iconName: string
};

type FloatingReactionProps = {
    color: string;
    iconName: string;
    positionProp: string;
};

const FloatingReaction = (props: FloatingReactionProps) => {
    const { color, iconName, positionProp } = props;
    const [hearts, setHearts] = useState<Heart[]>([]);

    const addHeart = () => {
        setHearts(prevHearts => [
            ...prevHearts,
            {
                id: Math.random(), //heartCount
                right: getRandomNumber(10, 110),
                color: color,
                iconName: iconName,
            }
        ]);
        heartCount++;
    };

    const removeHeart = (id: number) => {
        setHearts(prevHearts => prevHearts.filter(heart => heart.id !== id));
    };

    return (
        <>
            <>
                {hearts.map(heart => (
                    <HeartContainer
                        key={heart.id}
                        style={{ [positionProp]: heart.right }}
                        onComplete={() => removeHeart(heart.id)}
                        color={heart.color}
                        iconName={heart.iconName}
                    />
                ))}
            </>

            <TouchableOpacity onPress={addHeart} style={[styles.addButton,
            {
                backgroundColor: color,
                [positionProp]: 32

            }]}>
                <AntDesign name={iconName} size={24} color={Colors.white} />
            </TouchableOpacity>
        </>
    );
};

const HeartContainer = (props: HeartContainerProps) => {
    const { style, onComplete, color, iconName } = props;
    const position = useRef(new Animated.Value(0)).current;

    const yAnimation = position.interpolate({
        inputRange: [negativeEndY, 0],
        outputRange: [animationEndY, 0],
    });

    const opacityAnimation = yAnimation.interpolate({
        inputRange: [0, animationEndY],
        outputRange: [1, 0],
    });

    const scaleAnimation = yAnimation.interpolate({
        inputRange: [0, 15, 30],
        outputRange: [0, 1.4, 1],
        extrapolate: 'clamp',
    });

    const xAnimation = yAnimation.interpolate({
        inputRange: [
            0,
            animationEndY / 6,
            animationEndY / 3,
            animationEndY / 2,
            animationEndY,
        ],
        outputRange: [0, 25, 15, 0, 10],
    });

    const rotateAnimation = yAnimation.interpolate({
        inputRange: [
            0,
            animationEndY / 6,
            animationEndY / 3,
            animationEndY / 2,
            animationEndY,
        ],
        outputRange: ['0deg', '-5deg', '0deg', '5deg', '0deg'],
    });

    useEffect(() => {
        Animated.timing(position, {
            duration: 2000,
            toValue: negativeEndY,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            onComplete();
        });
    }, []);

    const getHeartStyle = (): any => ({
        transform: [
            { translateY: position },
            { scale: scaleAnimation },
            { translateX: xAnimation },
            { rotate: rotateAnimation },
        ],
        opacity: opacityAnimation,
    });

    return (
        <Animated.View style={[styles.heartContainer, getHeartStyle(), style]}>
            <Heart color={color} iconName={iconName} />
        </Animated.View>
    );
};

const Heart = ({ color, iconName }: { color: string; iconName: string }) => (
    <View style={styles.heart}>
        <AntDesign name={iconName} size={48} color={color} />
    </View>
);

export default FloatingReaction;

const styles = StyleSheet.create({

    addButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 32,
    },
    heartContainer: {
        position: 'absolute',
        bottom: 90,
        backgroundColor: 'transparent',
    },
    heart: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
});
