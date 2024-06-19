import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RenderItemParams } from 'react-native-draggable-flatlist';
import DraggableFlatListComponent from './DraggableFlatlist';
import { Item, initialData } from './initialData';

const App = () => {
    const [data, setData] = useState<Item[]>(initialData);

    const renderItem = (props: RenderItemParams<Item>) => {
        const { item, drag, isActive, getIndex } = props;

        return (
            <TouchableOpacity
                onLongPress={drag}
                disabled={isActive}
                style={[
                    styles.rowItem,
                    { backgroundColor: isActive ? '#bbb' : item.backgroundColor },
                ]}
            >
                <Text style={styles.text}>{item.label}</Text>
            </TouchableOpacity>
        );
    };

    const handleDragEnd = ({ data }: { data: Item[] }) => {
        setData(data);
    };

    return (
        <DraggableFlatListComponent
            data={data}
            renderItem={renderItem}
            onDragEnd={handleDragEnd}
        />
    );
};

export default App;

const styles = StyleSheet.create({
    rowItem: {
        height: 132,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
