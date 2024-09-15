import { Colors } from '@/constants/Colors';
import { format } from 'date-fns';
import React from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

type Day = {
    day: Date;
    value: number;
};
type Week = Day[];

type WeeklyBarChartProps = {
    weeks: Week[];
    activeWeekIndex: number;
    onWeekChange: (index: number) => void;
};

type SingleBarChartProps = {
    maxHeight: number;
    width: number;
    day: Day;
};

const SingleBarChart = ({ maxHeight, width, day }: SingleBarChartProps) => {
    const rStyle = useAnimatedStyle(() => ({
        height: withTiming(maxHeight * day.value),
        opacity: withTiming(day.value),
    }), [day.value, maxHeight]);

    return (
        <View>
            <Animated.View
                style={[styles.weeklyBar, rStyle, { width }]}
            />
            <Text style={[styles.weekDay, { width }]}>
                {format(day.day, 'eeeee')}
            </Text>
        </View>
    );
};

const BarChartWeekly = ({ weeks, activeWeekIndex, onWeekChange }: WeeklyBarChartProps) => {
    const { width: windowWidth } = useWindowDimensions();
    const activeWeek = weeks[activeWeekIndex];
    const BarChartWidth = windowWidth * 0.9;
    const BarChartGap = 10;
    const BarWidth = (BarChartWidth - BarChartGap * (activeWeek.length - 1)) / activeWeek.length;
    const MaxBarHeight = 150;
    const ScrollViewHeight = 60;

    return (
        <View style={{ height: ScrollViewHeight + MaxBarHeight, width: windowWidth }}>
            <View
                style={[styles.weeklyBarChart, {
                    width: BarChartWidth,
                    height: MaxBarHeight,
                    marginHorizontal: (windowWidth - BarChartWidth) / 2
                }]}>
                {activeWeek.map((day, index) => (
                    <SingleBarChart
                        key={index}
                        day={day}
                        maxHeight={MaxBarHeight}
                        width={BarWidth}
                    />
                ))}
            </View>

            <ScrollView
                horizontal
                snapToInterval={windowWidth}
                decelerationRate='fast'
                showsHorizontalScrollIndicator={false}
                disableIntervalMomentum
                disableScrollViewPanResponder
                scrollEventThrottle={16}
                onScroll={({ nativeEvent }) => {
                    const scrollOffset = nativeEvent.contentOffset.x;
                    const activeIndex = Math.round(scrollOffset / windowWidth);
                    onWeekChange(activeIndex);
                }}
                style={{ width: windowWidth, height: ScrollViewHeight }}
            >
                {weeks.map((week, index) => (
                    <View
                        key={index}
                        style={[styles.weekLabelContainer, {
                            height: ScrollViewHeight,
                            width: windowWidth,
                        }]}
                    >
                        <Text style={styles.weekLabel}>
                            Week of {format(week[0].day, 'd MMMM')}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default BarChartWeekly;

const styles = StyleSheet.create({
    weeklyBarChart: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-end',
    },
    weeklyBar: {
        backgroundColor: Colors.purple,
        borderRadius: 15,
        borderCurve: 'continuous',
    },
    weekLabelContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    weekLabel: {
        color: Colors.purple,
        fontSize: 16,
    },
    weekDay: {
        textAlign: 'center',
        fontSize: 12,
        color: Colors.purple,
        marginTop: 5,
        fontWeight: '600',
    },
});
