import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Animated, Easing, TouchableWithoutFeedback, View } from "react-native";

type StarProps = {
    filled: boolean;
    size?: number;
    color?: string;
};

const Star = ({ filled, size = 52, color }: StarProps) => {
    return (
        <FontAwesome
            name={filled ? "star" : "star-o"}
            color={color}
            size={size}
            style={{ marginHorizontal: 6 }}
        />
    );
};

const numStars = 5;

type RatingStarsProps = {
    rating: number
    setRating: React.Dispatch<React.SetStateAction<number>>
    color?: string
}

const StarRating = ({ rating, setRating, color }: RatingStarsProps) => {
    const animations = Array(numStars)
        .fill(0)
        .map(() => useState(new Animated.Value(1))[0]);

    const rate = (star: number) => {
        setRating(star);
        for (let i = 0; i < star; i++) {
            animate(i);
        }
    };

    const animate = (index: number) => {
        Animated.timing(animations[index], {
            toValue: 2,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            animations[index].setValue(1);
        });
    };

    const stars = [];

    for (let x = 1; x <= numStars; x++) {
        const animateScale = animations[x - 1].interpolate({
            inputRange: [1, 1.5, 2],
            outputRange: [1, 1.4, 1],
        });

        const animateOpacity = animations[x - 1].interpolate({
            inputRange: [1, 1.2, 2],
            outputRange: [1, 0.5, 1],
        });

        const animateWobble = animations[x - 1].interpolate({
            inputRange: [1, 1.25, 1.75, 2],
            outputRange: ["0deg", "-3deg", "3deg", "0deg"],
        });

        const animationStyle = {
            transform: [{ scale: animateScale }, { rotate: animateWobble }],
            opacity: animateOpacity,
        };

        stars.push(
            <TouchableWithoutFeedback
                key={x}
                onPress={() => rate(x)}
            >
                <Animated.View style={x <= rating ? animationStyle : {}}>
                    <Star filled={x <= rating} color={color} />
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }

    return (
        <View style={{ flexDirection: "row" }}>{stars}</View>
    );
};

export default StarRating;
