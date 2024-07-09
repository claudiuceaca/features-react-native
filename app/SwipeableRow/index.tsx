import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SwipeableRow from './SwipeableRow';
import { rows } from './rowsData';
import { DEVICE_SIZE } from '@/constants/utils';
import { Colors } from '@/constants/Colors';

const NUM_ITEMS = 11;

const initialData = [...Array(NUM_ITEMS)].map((_, index) => ({
    text: `Row ${index + 1}`,
    key: `key-${index}`,
    index,
}));

const App = () => {
    const renderItem = ({ item, index }: { item: { text: string; key: string; index: number }; index: number }) => {
        const row = rows[index % rows.length];
        const RowImage = row.img;
        return (
            <SwipeableRow>
                <View style={styles.itemContainer}>
                    <RowImage width={50} height={50} />
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </SwipeableRow>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={initialData}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        height: 75,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    text: {
        fontWeight: 'bold',
        fontSize: DEVICE_SIZE.SMALL_DEVICE ? 16 : (DEVICE_SIZE.MEDIUM_DEVICE ? 18 : 20),
        color: Colors.purple
    },
});