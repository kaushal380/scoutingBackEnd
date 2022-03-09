import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PitDataCollect from '../screens/Pitscouting/pitDataCollect';
import MatchDataCollect from '../screens/MatchData/MatchDataCollect';
import Home from '../screens/Home';
import SendingFinalData from '../screens/sending final data/SendingFinalData';
import DisplayContainer from './DisplayContainer';
const Stack = createNativeStackNavigator();


const AppContainer = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen options = {{headerShown: true, headerTitle: 'home', headerBackVisible: false}} name = "Home" component = {Home} />
          <Stack.Screen options = {{headerShown: true, headerTitle: 'pit scouting collection'}} name = "Pits" component = {PitDataCollect} />
          <Stack.Screen options = {{headerShown: true, headerTitle: 'match scouting collection'}} name = "Match" component = {MatchDataCollect} />
          <Stack.Screen options = {{headerShown: false}} name = "display" component = {DisplayContainer} />
        </Stack.Navigator>
      
      )
}

export default AppContainer

const styles = StyleSheet.create({})