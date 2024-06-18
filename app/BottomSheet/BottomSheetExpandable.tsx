import { Colors } from "@/constants/Colors";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const BottomSheetExpandable = ({ children }: any) => {
    const sheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ["60%", "88%"], []);

    // callbacks
    const handleSheetChange = useCallback((index: any) => {
        console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index: any) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);

    return (
        <BottomSheet
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            enableContentPanningGesture={false}
            enableHandlePanningGesture={true}
        >
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {children}
                <View style={{ marginBottom: 50 }} />
            </ScrollView>
        </BottomSheet>
    )
}

export default BottomSheetExpandable

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24,
        marginTop: -24,
        paddingTop: 24,
        paddingHorizontal: 16,
        marginBottom: 90,
        zIndex: 15
    },
})