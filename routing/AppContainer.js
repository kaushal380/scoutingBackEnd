import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

<<<<<<< HEAD
import PitDataCollect from '../screens/Pitscouting/PitDataCollect';
import MatchDataCollect from '../screens/MatchData/MatchDataCollect';
=======
import MatchDataCollect from '../screens/MatchData/MatchDataCollect'
import PitDataCollect from '../screens/Pitscouting/PitDataCollect';
>>>>>>> f5916e2359ac89dc66347942f85adec2af4f9839
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