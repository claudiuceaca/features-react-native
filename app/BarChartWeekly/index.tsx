import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BarChartWeekly from './BarChartWeekly';
import { data } from './BarChartWeeklyData';

const App = () => {
    const [activeWeekIndex, setActiveWeekIndex] = useState(0);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <BarChartWeekly
                weeks={data}
                activeWeekIndex={activeWeekIndex}
                onWeekChange={setActiveWeekIndex}
            />
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
});