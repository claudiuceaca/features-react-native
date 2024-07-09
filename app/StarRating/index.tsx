import { DEVICE_SIZE, width } from '@/constants/utils'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StarRating from './StarRating'
import { Colors } from '@/constants/Colors'

const App = () => {
    const [rating, setRating] = useState(1)

    return (
        <View style={styles.container}>
            <Text style={styles.textRating}>{rating}</Text>
            <StarRating rating={rating} setRating={setRating} color={Colors.purple} />
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
        paddingBottom: width / 3
    },
    textRating: {
        fontSize: DEVICE_SIZE.SMALL_DEVICE ? 60 : (DEVICE_SIZE.MEDIUM_DEVICE ? 65 : 70),
        color: Colors.purple,
        fontWeight: '700'
    }
})
