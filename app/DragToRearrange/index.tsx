import { Colors } from "@/constants/Colors";
import { DEVICE_SIZE } from "@/constants/utils";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import SortableList from "./DragToRearrange";

const { width } = Dimensions.get('window');
const MARGIN = 20;
const SIZE = width / 2 - MARGIN;

const renderItems = () => (
    [...Array(6)].map((_, index) => (
        <View
            key={index}
            style={styles.box}>
            <Text style={styles.text}>{index}</Text>
        </View>
    ))
)

const App = () => {
    return (
        <View style={styles.container}>
            <SortableList editing={true} onDragEnd={(positions) => console.log(JSON.stringify(positions, null, 2))}>
                {renderItems()}
            </SortableList>
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    box: {
        width: SIZE - MARGIN,
        height: SIZE - MARGIN,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.purple
    },
    text: {
        color: Colors.white,
        fontSize: DEVICE_SIZE.SMALL_DEVICE ? 30 : (DEVICE_SIZE.MEDIUM_DEVICE ? 32 : 34)
    }
});