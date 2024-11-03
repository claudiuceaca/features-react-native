import { Colors } from '@/constants/Colors';
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, runOnJS, SharedValue } from 'react-native-reanimated';

const { height } = Dimensions.get('window');
const ITEM_HEIGHT = 50;

interface PickerItemProps {
    item: string;
    index: number;
    scrollY: SharedValue<number>;
}

const PickerItem: React.FC<PickerItemProps> = ({ item, index, scrollY }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
            [0.5, 1, 0.5]
        );

        const scale = interpolate(
            scrollY.value,
            [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
            [0.8, 1, 0.8]
        );

        return {
            opacity,
            transform: [{ scale }]
        };
    });

    return (
        <Animated.View style={[styles.item, animatedStyle]}>
            <Text style={styles.itemText}>{item}</Text>
        </Animated.View>
    );
};

interface PickerColumnProps {
    data: string[];
}

const PickerColumn: React.FC<PickerColumnProps> = ({ data }) => {
    const scrollY = useSharedValue(0);
    const scrollViewRef = useRef<Animated.ScrollView | null>(null);

    const maxScroll = (data.length - 1) * ITEM_HEIGHT;

    const adjustScrollPosition = (offset: number) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                y: offset,
                animated: true,
            });
        }
    };

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = Math.min(Math.max(event.contentOffset.y, 0), maxScroll);
        },
        onEndDrag: () => {
            const roundedOffset = Math.round(scrollY.value / ITEM_HEIGHT) * ITEM_HEIGHT;
            runOnJS(adjustScrollPosition)(roundedOffset);
        },
    });

    return (
        <Animated.ScrollView
            ref={scrollViewRef}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingVertical: height / 2 - ITEM_HEIGHT / 2,
                width: 100
            }}
        >
            {data.map((item, index) => (
                <PickerItem key={index} item={item} index={index} scrollY={scrollY} />
            ))}
        </Animated.ScrollView>
    );
};

const HourPickerAnimatedComponent: React.FC = () => {
    const itemsAMPM = ['AM', 'PM'];
    const itemsHours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(1));
    const itemsMinutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    return (
        <View style={styles.container}>
            <PickerColumn data={itemsHours} />
            <PickerColumn data={itemsMinutes} />
            <PickerColumn data={itemsAMPM} />
        </View>
    );
};

export default HourPickerAnimatedComponent;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 360
    },
    item: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 44,
        fontWeight: 'bold',
        color: Colors.purple
    },
});
