import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Scanner } from './Scanner'

const CombineData = () => {
  const [ScannedData, setScannedData] = useState();
  return (
    <View>
       <Scanner setScannedData={setScannedData}/>
      <Text onPress={console.log(ScannedData)}>CombineData</Text>
    </View>
  )
}

export default CombineData

const styles = StyleSheet.create({})