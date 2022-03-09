import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Scanner } from "../Scanner";
import AwesomeButton from "react-native-really-awesome-button";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("backEndScouting.db");

const PitDataCollect = () => {
  const [ScannedData, setScannedData] = useState([]);

  const createPitScoutingTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS " +
          "pitscouting " +
          "(ID INTEGER PRIMARY KEY AUTOINCREMENT, teamNum TEXT, visuals INTEGER, drivetrainType TEXT, climbExists TEXT, shooterExists TEXT, robotStatus TEXT, graciousProfessionalism TEXT, extraComments TEXT);"
      );
    });
  };

  const insertScannedValues = () => {
    createPitScoutingTable();
    let scannedData = ScannedData;
    scannedData.forEach((submission) => {
      insertPitData(submission);
    });
  };

  const insertPitData = (currentObject) => {
    let comments = currentObject.extraComments;
    let team = currentObject.teamNum;
    let Visualranking = currentObject.visuals;
    let drivetrain = currentObject.drivetrainType;
    let climbExists = currentObject.climbExists;
    let shooterExists = currentObject.shooterExists;
    let robotStatus = currentObject.robotStatus;
    let gracius = currentObject.graciousProfessionalism;

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO pitScoutingDownload (teamNum, visuals, drivetrainType, climbExists, shooterExists, robotStatus, graciousProfessionalism, extraComments) VALUES ('" +
          team +
          "', '" +
          Visualranking +
          "', '" +
          drivetrain +
          "', '" +
          climbExists +
          "', '" +
          shooterExists +
          "', '" +
          robotStatus +
          "', '" +
          gracius +
          "', '" +
          comments +
          "')"
      );
    });
  };

  const handleScanSubmit = () => {
    insertScannedValues();
    setScannedData([]);
  };

  const printPitValues = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM pitscouting", [], (tx, results) => {
        if (results.rows.length > 0) {
          console.log("results length: ", results.rows.length);
          console.log("Query successful");
          console.log(results.rows._array);
        } else {
          alert("there's nothing");
        }
      });
    });
  };

  const deletePitData = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM pitscouting");
    });
  };

  return (
    <View style={styles.container}>
      <Scanner setScannedData={setScannedData} />
      <AwesomeButton
        backgroundColor="#0782F9"
        backgroundDarker="black"
        style={{marginBottom: 10, marginLeft: 125}}
        borderRadius={50}
        onPress={() => {
          handleScanSubmit;
        }}
      >
        <Text style={{ margin: 20 }}>Combine Data</Text>
      </AwesomeButton>
      <AwesomeButton
        backgroundColor="#0782F9"
        backgroundDarker="black"
        paddingHorizontal={200}
        borderRadius={50}
        style={{marginBottom: 10, marginLeft: 75}}
        onPress={() => {
          printPitValues;
        }}
      >
        <Text style={{ margin: 20 }}>Print Database Values</Text>
      </AwesomeButton>
      <AwesomeButton
        backgroundColor="#0782F9"
        backgroundDarker="black"
        borderRadius={50}
        paddingHorizontal={150}
        style={{marginLeft: 75}}
        onPress={() => {
          deletePitData;
        }}
      >
        <Text style={{ margin: 20 }}>Delete All Values</Text>
      </AwesomeButton>
    </View>
  );
};

export default PitDataCollect;

const styles = StyleSheet.create({
  container: {
    height: 350,
    width: 350,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    margin: 40,
  },
});
