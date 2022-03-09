import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Scanner } from '../Scanner'

const pitDataCollect = () => {
    const [ScannedData, setScannedData] = useState();
    return (
      <View style={styles.container}>
         <Scanner setScannedData={setScannedData}/>
        <Text onPress={() => {console.log(ScannedData)}}>CombineData</Text>
      </View>
    )
}

export default pitDataCollect

const styles = StyleSheet.create({
    container: {
        height: 350, 
        width: 350,
        flex: 1,
        justifyContent: 'center',
        alignContent:'center',
        margin: 40

    }
})