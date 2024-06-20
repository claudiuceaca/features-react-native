import React from 'react'
import { StyleSheet, View } from 'react-native'
import FloatingButtonLeft from './FloatingButtonLeft'

const index = () => {
  return (
    <View style={styles.container}>
      <FloatingButtonLeft />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});