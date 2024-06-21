import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { colors } from './flatlistSyncedData';

const { width, height } = Dimensions.get('screen');
const IMAGE_SIZE = width / 5;
const SPACING = 10;

const FlatListSynced = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const topRef = useRef();
    const thumbRef = useRef();

    const scrollToActiveIndex = (index: any) => {
        setActiveIndex(index);

        topRef?.current?.scrollToOffset({
            offset: index * width,
            animated: true
        });

        if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
            thumbRef?.current?.scrollToOffset({
                offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
                animated: true
            });
        } else {
            thumbRef?.current?.scrollToOffset({
                offset: 0,
                animated: true
            });
        }
    };

    if (!colors) {
        return <Text>Loading ...</Text>;
    }

    return (
        <>
            <FlatList
                ref={topRef}
                data={colors}
                horizontal
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={ev => {
                    scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
                }}
                pagingEnabled
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ width, height }}>
                        <LinearGradient

                            colors={item.color} style={StyleSheet.absoluteFillObject}>
                        </LinearGradient>
                    </View>
                )}
            />

            <FlatList
                ref={thumbRef}
                data={colors}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                style={styles.smallFlatList}
                contentContainerStyle={styles.smallFlatListContainer}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => scrollToActiveIndex(index)}
                        activeOpacity={0.7}
                    >
                        <LinearGradient
                            colors={item.color}
                            style={[styles.thumbImage,
                            {
                                borderColor: activeIndex === index ? '#fff' : 'transparent'
                            }]}>
                        </LinearGradient>
                    </TouchableOpacity>
                )}
            />
        </>
    );
};

export default FlatListSynced;

const styles = StyleSheet.create({
    smallFlatList: {
        position: 'absolute',
        bottom: IMAGE_SIZE
    },
    smallFlatListContainer: {
        paddingHorizontal: SPACING
    },
    thumbImage: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderWidth: 2,
    }
})
