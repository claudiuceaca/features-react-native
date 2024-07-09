import { Colors } from '@/constants/Colors';
import { DEVICE_SIZE } from '@/constants/utils';
import React, { Component, PropsWithChildren } from 'react';
import { Animated, I18nManager, StyleSheet, Text, View } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

export default class SwipeableRow extends Component<
    PropsWithChildren<unknown>
> {
    private renderLeftAction = (
        progress: Animated.AnimatedInterpolation<number>
    ) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [-124, 0],
        });
        return (
            <Animated.View style={{ transform: [{ translateX: trans }] }}>
                <RectButton style={[styles.leftAction, { backgroundColor: Colors.purple }]} onPress={this.close}>
                    <Text style={styles.actionText}>Archive</Text>
                </RectButton>
            </Animated.View>
        );
    };

    private renderRightAction = (
        text: string,
        color: string,
        x: number,
        progress: Animated.AnimatedInterpolation<number>
    ) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const pressHandler = () => {
            this.close();
            // eslint-disable-next-line no-alert
            window.alert(text);
        };

        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <RectButton
                    style={[styles.rightAction, { backgroundColor: color }]}
                    onPress={pressHandler}>
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    };

    private renderRightActions = (
        progress: Animated.AnimatedInterpolation<number>,
        _dragAnimatedValue: Animated.AnimatedInterpolation<number>
    ) => (
        <View
            style={{
                width: 221,
                flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            }}>
            {this.renderRightAction('Delete', '#dd2c00', 296, progress)}
            {this.renderRightAction('Flag', '#ffab00', 148, progress)}
            {this.renderRightAction('More', '#C8C7CD', 74, progress)}
        </View>
    );

    private swipeableRow?: Swipeable;

    private updateRef = (ref: Swipeable) => {
        this.swipeableRow = ref;
    };

    private close = () => {
        this.swipeableRow?.close();
    };

    render() {
        const { children } = this.props;
        return (
            <Swipeable
                ref={this.updateRef}
                friction={2}
                enableTrackpadTwoFingerGesture
                leftThreshold={30}
                rightThreshold={40}
                renderLeftActions={(progress, _dragAnimatedValue) => this.renderLeftAction(progress)}
                renderRightActions={this.renderRightActions}
                onSwipeableOpen={(direction) => {
                    console.log(`Opening swipeable from the ${direction}`);
                }}
                onSwipeableClose={(direction) => {
                    console.log(`Closing swipeable to the ${direction}`);
                }}>
                {children}
            </Swipeable>
        );
    }
}

const styles = StyleSheet.create({
    leftAction: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: 114
    },
    actionText: {
        color: 'white',
        fontSize: DEVICE_SIZE.SMALL_DEVICE ? 12 : (DEVICE_SIZE.MEDIUM_DEVICE ? 14 : 16),
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: 74
    },
});
