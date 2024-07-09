import React from 'react'
import { StyleSheet, View } from 'react-native'
import FloatingReaction from './FloatingReaction'
import { Colors } from '@/constants/Colors'

const App = () => {
  return (
    <View style={styles.container}>
      <FloatingReaction color={Colors.purple} iconName={'smileo'} positionProp='right' />
      <FloatingReaction color={Colors.purple} iconName={'heart'} positionProp='left' />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
