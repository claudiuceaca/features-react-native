import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, ViewToken } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type ListItemProps = {
    item: { id: number };
    index: number;
    viewableItems: SharedValue<ViewToken[]>;
};

type DataItem = {
    id: number;
}[]

const ListItem = React.memo(({ item, index, viewableItems }: ListItemProps) => {
    const rStyle = useAnimatedStyle(() => {
        const isVisible = Boolean(
            viewableItems.value
                .filter(viewableItem => viewableItem.isViewable)
                .find(viewableItem => viewableItem.item.id === item.id)
        );

        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [{
                scale: withTiming(isVisible ? 1 : 0.5)
            }]
        };
    });

    return (
        <Animated.View style={[styles.listItem, rStyle]}>
            <Text style={styles.listItemText}>{item.id}</Text>
        </Animated.View>
    );
});

const FlatListAnimated = ({ data }: { data: DataItem }) => {
    const viewableItems = useSharedValue<ViewToken<{ id: number }>[]>([]);

    const renderItem = useCallback(({ item, index }: ListRenderItemInfo<{ id: number }>) => (
        <ListItem item={item} index={index} viewableItems={viewableItems} />
    ), [viewableItems]);

    const onViewableItemsChanged = useCallback(({ viewableItems: vItems }: { viewableItems: ViewToken[] }) => {
        viewableItems.value = vItems;
    }, [viewableItems]);

    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
        />
    );
};

export default FlatListAnimated;

const styles = StyleSheet.create({

    listItem: {
        height: 80,
        width: '90%',
        backgroundColor: '#9733EE',
        marginTop: 20,
        borderRadius: 20,
        alignSelf: 'center',
    },
    listItemText: {
        color: 'white',
        textAlign: 'center',
        lineHeight: 80,
    },
});
