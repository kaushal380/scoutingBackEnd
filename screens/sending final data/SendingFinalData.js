import { StyleSheet, Text, View } from 'react-native'
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
    }

    const convertMatchToString = () => {
        let arrayData = matchData;
        let StringData = JSON.stringify(arrayData)
        // setMatchString(StringData)
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
    // const generatePitQRCode = (canvas) => {
    //     if (canvas !== null) {
    //         // QRCode options
    //         var options = {
    //             text: matchDataToString(),
    //         };
    //         // Create QRCode Object
    //         var qrCode = new QRCode(canvas, options);
    //     }
    // }
    const printStuff = () => {
        console.log(convertMatchToString());
    }
    return (
        <View style = {styles.container}>
            <Text style = {{fontSize: 30}} onPress = {sequentialCallInit}>update states</Text>
            <Text style = {{fontSize: 30}} onPress = {printStuff}>SendingFinalData</Text>
            {matchData && (
                <Canvas ref={generateMatchQRCode}/>
            )}
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
})