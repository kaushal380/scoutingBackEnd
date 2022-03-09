import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import pitDataCollect from '../screens/Pitscouting/pitDataCollect';
import matchDataCollect from '../screens/MatchData/matchDataCollect';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();


const AppContainer = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen options = {{headerShown: true, headerTitle: 'home', headerBackVisible: false}} name = "Home" component = {Home} />
          <Stack.Screen options = {{headerShown: true, headerTitle: 'pit scouting collection'}} name = "Pits" component = {pitDataCollect} />
          <Stack.Screen options = {{headerShown: true, headerTitle: 'match scouting collection'}} name = "Match" component = {matchDataCollect} />
        </Stack.Navigator>
      
      )
}

export default AppContainer

const styles = StyleSheet.create({})