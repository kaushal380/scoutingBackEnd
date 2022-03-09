import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Scanner } from '../Scanner'
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("backEndScouting.db");


const MatchDataCollect = () => {
  const [ScannedData, setScannedData] = useState();

  const createMatchTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS "
        + "MatchData "
        + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, matchNum TEXT, teamNum TEXT, taxi TEXT, humanShot TEXT, autoLowerCargo INTEGER, autoUpperCargo INTEGER, teleLowerCargo INTEGER, teleUpperCargo INTEGER, climb TEXT, drivetrainranking INTEGER, defenseRanking INTEGER, redCard INTEGER, yelloCard INTEGER, techFouls INTEGER, deactivated TEXT, disqualified TEXT, extraComments TEXT);"
      )
    })
  }

  const insertScannedValues = () => {
    createMatchTable();
    let scannedData = ScannedData;
    scannedData.forEach(element => {
        insertMatchData(element);
    });
  }

  const insertMatchData = (currentObject) => {
    let match = currentObject.matchNum;
    let Team = currentObject.teamNum;
    let taxiToString = currentObject.taxi;
    let humanShotToText = currentObject.humanShot;
    let autoLower = currentObject.autoLowerCargo;
    let AutoUpper = currentObject.autoUpperCargo;
    let TeleLower = currentObject.teleLowerCargo;
    let TeleUpper = currentObject.teleUpperCargo;
    let hanger = currentObject.climb;
    let Drivetrainranking = currentObject.drivetrainranking;
    let DefenseRanking = currentObject.defenseRanking;
    let RedCard = currentObject.redCard;
    let YelloCard = currentObject.yelloCard;
    let techFoul = currentObject.techFouls;
    let isDeactivatedToString = currentObject.deactivated;
    let isDisqualifiedToString = currentObject.disqualified;
    let comments = currentObject.extraComments;

    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO MatchData (matchNum, teamNum, taxi, humanShot, autoLowerCargo, autoUpperCargo, teleLowerCargo, teleUpperCargo, climb, drivetrainranking, defenseRanking, redCard, yelloCard, techFouls, deactivated, disqualified, extraComments) VALUES ('" + match + "', '" + Team + "', '" + taxiToString + "', '" + humanShotToText + "', '" + autoLower + "', '" + AutoUpper + "', '" + TeleLower + "', '" + TeleUpper + "', '" + hanger + "', '" + Drivetrainranking + "', '" + DefenseRanking + "','" + RedCard + "','" + YelloCard + "','" + techFoul + "','" + isDeactivatedToString + "','" + isDisqualifiedToString + "','" + comments + "')"
        )
    })
}

  const handleScanSubmit = () => {
    insertScannedValues()
    setScannedData([])
  }

  const printMatchValues = () => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM MatchData', [],
            (tx, results) => {
                if(results.rows.length > 0){
                console.log('results length: ', results.rows.length);
                console.log("Query successful")
                console.log(results.rows._array)
                }
                else {
                    alert("there's nothing")
                    
                }
            })
    })
  }

  const deleteMatchData = () => {
      db.transaction((tx) => {
        tx.executeSql(
            "DELETE FROM MatchData"
        )
    })
  }

  return (
    <View style={styles.container}>
      <Scanner setScannedData={setScannedData} />

      <TouchableOpacity style = {styles.ButtonsContainer} onPress = {handleScanSubmit}>
      <Text style = {styles.Buttontext} >Combine data</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.ButtonsContainer} onPress = {deleteMatchData}>
      <Text style = {styles.Buttontext} >erase match data</Text>
      </TouchableOpacity>
      <Text style = {{fontSize: 20}} onPress={printMatchValues}>print DB values</Text>

    </View>
  )
}

export default MatchDataCollect

const styles = StyleSheet.create({
  container: {
    height: 350,
    width: 350,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 40

  },
  ButtonsContainer: {
    backgroundColor: "#0782F9",
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderRadius: 10,
    margin: 20
  },
  Buttontext: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700'
  },
})