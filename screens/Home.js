import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core';

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style = {styles.container}>
      <Text style = {styles.title}>Downloading Match Data</Text>

      <TouchableOpacity
        style={styles.ButtonsContainer}
        onPress={() => { navigation.navigate('Match') }}
      >
        <Text style={styles.Buttontext}>
          Match Data Collection
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.ButtonsContainer}
        onPress={() => { navigation.navigate('Pits') }}
      >
        <Text style={styles.Buttontext}>
          Pit Data Collection
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.ButtonsContainer}
        onPress={() => { navigation.navigate('display') }}
      >
        <Text style={styles.Buttontext}>
          view data
        </Text>
      </TouchableOpacity>


    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  ButtonsContainer: {
    backgroundColor: "#0782F9",
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderRadius: 10,
    marginTop: 20
  },
  Buttontext: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700'
  },
  title: {
    fontSize: 40,
    marginVertical: 10,
  },
  container: {
    height: 350, 
    width: 350,
    flex: 1,
    justifyContent: 'center',
    alignContent:'center',
    margin: 40

}
})