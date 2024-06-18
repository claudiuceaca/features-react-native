import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
    AnimatedRef,
    Easing,
    SharedValue,
    runOnJS,
    scrollTo,
    useAnimatedGestureHandler,
    useAnimatedReaction,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ItemProps {
    children: ReactNode;
    positions: SharedValue<{ [id: string]: number }>;
    id: string;
    editing: boolean;
    onDragEnd: (diffs: { [id: string]: number }) => void;
    scrollView: AnimatedRef<Animated.ScrollView>;
    scrollY: SharedValue<number>;
}

interface ListProps {
    children: ReactNode[];
    editing: boolean;
    onDragEnd: (diff: { [id: string]: number }) => void;
}

const { width } = Dimensions.get('window');
const MARGIN = 20;
const SIZE = width / 2 - MARGIN;
const COL = 2;

const animationConfig = {
    easing: Easing.inOut(Easing.ease),
    duration: 350,
};

const getPosition = (position: number) => {
    'worklet';
    return {
        x: position % COL === 0 ? 0 : SIZE * (position % COL),
        y: Math.floor(position / COL) * SIZE,
    };
};

const getOrder = (tx: number, ty: number, max: number) => {
    'worklet';
    const x = Math.round(tx / SIZE) * SIZE;
    const y = Math.round(ty / SIZE) * SIZE;
    const row = Math.max(y, 0) / SIZE;
    const col = Math.max(x, 0) / SIZE;
    return Math.min(row * COL + col, max);
};

const Item = ({ children, positions, id, onDragEnd, scrollView, scrollY, editing }: ItemProps) => {
    const inset = useSafeAreaInsets();
    const containerHeight = Dimensions.get('window').height - inset.top - inset.bottom;
    const contentHeight = (Object.keys(positions.value).length / COL) * SIZE;
    const isGestureActive = useSharedValue(false);

    const position = getPosition(positions.value[id]!);
    const translateX = useSharedValue(position.x);
    const translateY = useSharedValue(position.y);

    useAnimatedReaction(
        () => positions.value[id]!,
        (newOrder) => {
            if (!isGestureActive.value) {
                const pos = getPosition(newOrder);
                translateX.value = withTiming(pos.x, animationConfig);
                translateY.value = withTiming(pos.y, animationConfig);
            }
        }
    );

    const onGestureEvent = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { x: number; y: number }
    >({
        onStart: (_, ctx) => {
            if (editing) {
                ctx.x = translateX.value;
                ctx.y = translateY.value;
                isGestureActive.value = true;
            }
        },
        onActive: ({ translationX, translationY }, ctx) => {
            if (editing) {
                translateX.value = ctx.x + translationX;
                translateY.value = ctx.y + translationY;
                const newOrder = getOrder(
                    translateX.value,
                    translateY.value,
                    Object.keys(positions.value).length - 1
                );

                const oldOrder = positions.value[id];
                if (newOrder !== oldOrder) {
                    const idToSwap = Object.keys(positions.value).find(
                        (key) => positions.value[key] === newOrder
                    );
                    if (idToSwap) {
                        const newPositions = JSON.parse(JSON.stringify(positions.value));
                        newPositions[id] = newOrder;
                        newPositions[idToSwap] = oldOrder;
                        positions.value = newPositions;
                    }
                }

                const lowerBound = scrollY.value;
                const upperBound = lowerBound + containerHeight - SIZE;
                const maxScroll = contentHeight - containerHeight;
                const leftToScrollDown = maxScroll - scrollY.value;
                if (translateY.value < lowerBound) {
                    const diff = Math.min(lowerBound - translateY.value, lowerBound);
                    scrollY.value -= diff;
                    scrollTo(scrollView, 0, scrollY.value, false);
                    ctx.y -= diff;
                    translateY.value = ctx.y + translationY;
                }
                if (translateY.value > upperBound) {
                    const diff = Math.min(translateY.value - upperBound, leftToScrollDown);
                    scrollY.value += diff;
                    scrollTo(scrollView, 0, scrollY.value, false);
                    ctx.y += diff;
                    translateY.value = ctx.y + translationY;
                }
            }
        },
        onEnd: () => {
            const newPosition = getPosition(positions.value[id]!);
            translateX.value = withTiming(newPosition.x, animationConfig, () => {
                isGestureActive.value = false;
                runOnJS(onDragEnd)(positions.value);
            });
            translateY.value = withTiming(newPosition.y, animationConfig);
        },
    });

    const style = useAnimatedStyle(() => {
        const zIndex = isGestureActive.value ? 100 : 0;
        const scale = withSpring(isGestureActive.value ? 1.05 : 1);
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            width: SIZE,
            height: SIZE,
            zIndex,
            transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale }],
        };
    });

    return (
        <Animated.View style={style}>
            <PanGestureHandler enabled={editing} onGestureEvent={onGestureEvent}>
                <Animated.View style={StyleSheet.absoluteFill}>{children}</Animated.View>
            </PanGestureHandler>
        </Animated.View>
    );
};

const SortableList = ({ children, editing, onDragEnd }: ListProps) => {
    const scrollY = useSharedValue(0);
    const scrollView = useAnimatedRef<Animated.ScrollView>();
    const positions = useSharedValue<{ [id: string]: number }>(
        Object.assign({}, ...children.map((child, index) => ({ [index.toString()]: index })))
    );
    const onScroll = useAnimatedScrollHandler({
        onScroll: ({ contentOffset: { y } }) => {
            scrollY.value = y;
        },
    });

    return (
        <Animated.ScrollView
            onScroll={onScroll}
            ref={scrollView}
            contentContainerStyle={{
                height: Math.ceil(children.length / COL) * SIZE,
            }}
            showsVerticalScrollIndicator={false}
            bounces={false}
            scrollEventThrottle={16}>
            {children.map((child, index) => (
                <Item
                    key={index}
                    positions={positions}
                    id={index.toString()}
                    editing={editing}
                    onDragEnd={onDragEnd}
                    scrollView={scrollView}
                    scrollY={scrollY}>
                    {child}
                </Item>
            ))}
        </Animated.ScrollView>
    );
};

export default SortableList;