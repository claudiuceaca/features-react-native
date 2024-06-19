import React from 'react';
import { StyleSheet, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

type Item = {
    key: string;
    label: string;
    height: number;
    width: number;
    backgroundColor: string;
}

type Props = {
    data: Item[];
    renderItem: (params: {
        item: Item;
        drag: () => void;
        isActive: boolean;
        getIndex: () => number | undefined
    }) => JSX.Element;
    onDragEnd: (params: { data: Item[] }) => void;
}

const DraggableFlatListComponent = (props: Props) => {
    const { data, renderItem, onDragEnd } = props;

    return (
        <View style={styles.container}>
            <DraggableFlatList
                data={data}
                onDragEnd={({ data }) => onDragEnd({ data })}
                keyExtractor={(item) => item.key}
                renderItem={({ item, drag, isActive }) => renderItem({ item, drag, isActive, getIndex: () => undefined })}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default DraggableFlatListComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        width: '100%'
    },
});
