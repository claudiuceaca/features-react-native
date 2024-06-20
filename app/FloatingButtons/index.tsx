import React from 'react'
import { StyleSheet, View } from 'react-native'
import FloatingButtonsAround from './FloatingButtonsAround'
import FloatingButtonsUp from './FloatingButtonsUp'

const index = () => {
  return (
    <View style={styles.container}>
      <FloatingButtonsUp />
      <FloatingButtonsAround />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});