import { Colors } from '@/constants/Colors';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { StyleSheet, Text, TextProps, View } from 'react-native';

type TickerListProps = {
    number: number;
    fontSizeNew?: number;
    index: number;
};

interface TickProps extends TextProps {
    fontSize: number | undefined;
}

const numbersToNice = [...Array(10).keys()];
const _stagger = 50;

const Tick = ({ children, fontSize, style, ...rest }: TickProps) => {
    return (
        <Text
            style={[
                style,
                {
                    fontSize: fontSize,
                    lineHeight: fontSize && fontSize * 1.1,
                    fontVariant: ['tabular-nums'],
                    fontWeight: '900',
                },
                styles.tick
            ]}
            {...rest}
        >
            {children}
        </Text>
    );
};

const TickerList = ({ number, fontSizeNew, index }: TickerListProps) => {
    return (
        <View style={[styles.tickerListContainer, { height: fontSizeNew }]}>
            <MotiView
                animate={{
                    translateY: fontSizeNew && -fontSizeNew * 1.1 * number,
                }}
                transition={{
                    delay: index * _stagger,
                    damping: 80,
                    stiffness: 200,
                }}
                key={`tickerlist-${index}`}
            >
                {numbersToNice.map((num, index) => (
                    <Tick fontSize={fontSizeNew}
                        key={`number-${num}-${index}`}>
                        {num}
                    </Tick>
                ))}
            </MotiView>
        </View>
    );
};

const CounterAnimated = ({ value, fontSize }: { value: number; fontSize?: number }) => {
    const [newFontSize, setNewFontSize] = useState(60);
    const intNumber = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);

    const spittedValue = intNumber.toString().split('');

    return (
        <View>
            <Tick
                fontSize={fontSize}
                numberOfLines={1}
                style={styles.hiddenText}
                adjustsFontSizeToFit
                onTextLayout={(e: any) => {
                    setNewFontSize(e.nativeEvent.lines[0].ascender - 10);
                }}
            >
                {intNumber}
            </Tick>

            <View style={styles.counterContainer}>
                {spittedValue.map((number, index) => {
                    if (!isNaN(parseInt(number))) {
                        return (
                            <TickerList
                                fontSizeNew={newFontSize}
                                number={parseInt(number)}
                                index={index}
                                key={`${index}-${newFontSize}`}
                            />
                        );
                    }

                    return (
                        <Tick
                            key={index}
                            fontSize={newFontSize}
                            style={styles.transparentText}
                        >
                            {number}
                        </Tick>
                    );
                })}
            </View>
        </View>
    );
};

export default CounterAnimated;

const styles = StyleSheet.create({
    tickerListContainer: {
        overflow: 'hidden',
    },
    hiddenText: {
        position: 'absolute',
        left: 10000000,
        right: 10000000,
        color: Colors.purple
    },
    counterContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    transparentText: {
        opacity: 0.2,
    },
    tick: {
        color: Colors.purple
    }
});
