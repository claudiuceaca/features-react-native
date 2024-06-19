import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AppleStyleSwipeableRow from './SwipeableRow';
import Profile1 from "@/assets/images/SwipeableRow/Profile1.svg";
import Profile2 from "@/assets/images/SwipeableRow/Profile2.svg";
import Profile3 from "@/assets/images/SwipeableRow/Profile3.svg";
import Profile4 from "@/assets/images/SwipeableRow/Profile4.svg";
import Profile5 from "@/assets/images/SwipeableRow/Profile5.svg";
import Profile6 from "@/assets/images/SwipeableRow/Profile6.svg";
import Profile7 from "@/assets/images/SwipeableRow/Profile7.svg";
import Profile9 from "@/assets/images/SwipeableRow/Profile9.svg";
import Profile10 from "@/assets/images/SwipeableRow/Profile10.svg";
import Profile11 from "@/assets/images/SwipeableRow/Profile11.svg";
import Profile8 from "@/assets/images/SwipeableRow/Profile8.svg";


const rows = [
    {
        id: 1,
        text: 'Row 1',
        img: Profile1,
    },
    {
        id: 2,
        text: 'Row 2',
        img: Profile2,
    },
    {
        id: 3,
        text: 'Row 3',
        img: Profile3,
    },
    {
        id: 4,
        text: 'Row 4',
        img: Profile4,
    },
    {
        id: 5,
        text: 'Row 5',
        img: Profile5,
    },
    {
        id: 6,
        text: 'Row 6',
        img: Profile6,
    },
    {
        id: 7,
        text: 'Row 7',
        img: Profile7,
    },
    {
        id: 8,
        text: 'Row 8',
        img: Profile8,
    },
    {
        id: 9,
        text: 'Row 9',
        img: Profile9,
    },
    {
        id: 10,
        text: 'Row 10',
        img: Profile10,
    },
    {
        id: 11,
        text: 'Row 11',
        img: Profile11,
    },
];

const NUM_ITEMS = 11;

const initialData = [...Array(NUM_ITEMS)].map((_, index) => ({
    text: `Row ${index + 1}`,
    key: `key-${index}`,
    index,
}));

const App = () => {
    const renderItem = ({ item }: { item: { text: string; key: string; index: number } }) => {
        const row = rows[item.index % rows.length];
        const RowImage = row.img;
        return (
            <AppleStyleSwipeableRow>
                <View style={styles.itemContainer}>
                    <RowImage width={50} height={50} />
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </AppleStyleSwipeableRow>
        );
    };

    const ItemSeparator = () => <View style={styles.separator} />;

    return (
        <View style={styles.container}>
            <FlatList
                data={initialData}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparator}
            />
        </View>
    );
};

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
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd',
    },
});

export default App;
