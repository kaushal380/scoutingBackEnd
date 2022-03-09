import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PitDataCollect from '../screens/Pitscouting/PitDataCollect';
import MatchDataCollect from '../screens/MatchData/MatchDataCollect';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();


const AppContainer = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen options = {{headerShown: true, headerTitle: 'home', headerBackVisible: false}} name = "Home" component = {Home} />
          <Stack.Screen options = {{headerShown: true, headerTitle: 'pit scouting collection'}} name = "Pits" component = {PitDataCollect} />
          <Stack.Screen options = {{headerShown: true, headerTitle: 'match scouting collection'}} name = "Match" component = {MatchDataCollect} />
        </Stack.Navigator>
      
      )
}

export default AppContainer

const styles = StyleSheet.create({})