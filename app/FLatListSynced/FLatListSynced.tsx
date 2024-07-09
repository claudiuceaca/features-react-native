import { Colors } from '@/constants/Colors';
import { DEVICE_SIZE } from '@/constants/utils';
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
                renderItem={({ item, index }) => (
                    <View style={{ width, height }}>
                        <View

                            style={[StyleSheet.absoluteFillObject,
                            styles.indexTextBig,
                            { backgroundColor: item.color }
                            ]}>
                            <Text style={{
                                color: Colors.white,
                                fontSize: DEVICE_SIZE.SMALL_DEVICE ?
                                    40
                                    : (DEVICE_SIZE.MEDIUM_DEVICE ? 45 : 50)
                            }}>
                                {index}
                            </Text>
                        </View>
                    </View >
                )}
            />

            < FlatList
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
                        <View
                            style={[styles.thumbImage,
                            {
                                borderColor: activeIndex === index ? '#fff' : 'transparent',
                                backgroundColor: item.color
                            }]}>
                            <Text style={styles.indexText}>
                                {index}
                            </Text>
                        </View>
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
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    indexText: {
        color: Colors.white
    },
    indexTextBig: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 180
    }
})
