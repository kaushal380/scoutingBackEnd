import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { QRCode, Canvas } from 'easyqrcode-react-native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("backEndScouting.db");



const SendingFinalData = () => {
    const [matchData, setMatchData] = useState();
    const [matchString, setMatchString] = useState("nothing");
    const [pitData, setPitData] = useState();

    const sequentialCallInit = () => {
        getMatchData()
    }
    const getMatchData = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM MatchData', [],
                (tx, results) => {
                    if(results.rows.length > 0){
                    console.log('results length: ', results.rows.length);
                    console.log("Query successful")
                    setMatchData(results.rows._array)
                    }
                    else {
                        alert("there's nothing")
                        
                    }
                })
        })
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM pitscouting', [],
                (tx, results) => {
                    if(results.rows.length > 0){
                    console.log('results length: ', results.rows.length);
                    console.log("Query successful")
                    setPitData(results.rows._array)
                    }
                    else {
                        alert("there's nothing")
                        
                    }
                })
        })
    }

    const convertMatchToString = () => {
        let arrayData = matchData;
        let StringData = JSON.stringify(arrayData)
        return StringData;
    }

    const convertPitToString = () => {
        let arrayData = pitData;
        let StringData = JSON.stringify(arrayData)
        return StringData;
    }
    
    const generateMatchQRCode = (canvas) => {
        console.log(getMatchData())
        if (canvas !== null) {
            // QRCode options
            var options = {
                text: convertMatchToString(),
            };
            // Create QRCode Object
            var qrCode = new QRCode(canvas, options);
        }
    }
    const generatePitQRCode = (canvas) => {
        if (canvas !== null) {
            // QRCode options
            var options = {
                text: convertPitToString(),
            };
            // Create QRCode Object
            var qrCode = new QRCode(canvas, options);
        }
    }
    const printStuff = () => {
        console.log(convertMatchToString());
    }
    return (
        
        <View style = {styles.container}>
            <ScrollView>
            <TouchableOpacity style = {styles.ButtonsContainer} onPress = {getMatchData}>
                <Text style = {styles.Buttontext}>update states</Text>
            </TouchableOpacity>
            <View style = {styles.qrCodeContainer}>
                <Text>Match data</Text>
            {matchData && (
                <Canvas ref={generateMatchQRCode}/>
            )}
            </View>
            <View style = {styles.container}>
                <Text>Pit data</Text>
            {pitData && (
                <Canvas ref={generatePitQRCode}/>
            )}
            </View>
            </ScrollView>
        </View>
    )
}

export default SendingFinalData

const styles = StyleSheet.create({
    container: {
        height: 350, 
        width: 350,
        flex: 1,
        justifyContent: 'center',
        alignContent:'center',
        margin: 40

    },
    qrCodeContainer: {
        margin: 30
    },
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
})