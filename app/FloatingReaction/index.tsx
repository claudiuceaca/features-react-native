import React from 'react'
import { StyleSheet, View } from 'react-native'
import FloatingReaction from './FloatingReaction'

const App = () => {
  return (
    <View style={styles.container}>
      <FloatingReaction color='#9734EF' iconName={'smileo'} positionProp='right' />
      <FloatingReaction color='#9733EE' iconName={'heart'} positionProp='left' />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
