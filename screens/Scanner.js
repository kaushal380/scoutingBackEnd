import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AwesomeButton from "react-native-really-awesome-button";

export function Scanner({ setScannedData }) {
  const [permission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const askPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setPermission(status === "granted");
  };

  useEffect(() => {
    askPermission();
  }, []);

  const handleScan = ({ data }) => {
    setScanned(true);
    // alert(`${data}`);
    let stringObject = `${data}`;
    let ArrayObjects = JSON.parse(stringObject);
    setScannedData(ArrayObjects);
  };

  const cameraView = (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleScan}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );

  if (scanned) {
    return (
      <View style={{width: 250, height: 250, marginLeft: 100}}>
        <AwesomeButton
          progress
          progressLoadingTime="500"
          backgroundColor="#0782F9"
          backgroundDarker="black"
          borderRadius={50}
          onPress={() => {
            setTimeout(() => {
              setScanned(false);
            }, 550);
          }}
        >
          <Text style={{ margin: 20 }}>Scan Another</Text>
        </AwesomeButton>
      </View>
    );
  } else {
    return cameraView;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    margin: 25,
  },
});
