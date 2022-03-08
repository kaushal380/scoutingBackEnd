import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import CombineData from './CombineData'
const Home = () => {
  return (
    <View>
        <ScrollView>
            <CombineData/>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})