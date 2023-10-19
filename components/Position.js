import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import Weather from './Weather'

export default function Position() {

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            try {
                if (status !== 'granted') {
                    setMessage('Location not permitted.')
                } else {
                    const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                    setMessage('Location retrieved')
                    setIsLoading(false)
                }

            } catch (error) {
                setMessage('Error retrieving location.')
            }
            
        })()
    }, [])


    return (
        <View>
            <Text style={styles.coords}>{latitude.toFixed(3)}, {longitude.toFixed(3)}</Text>
            <Text style={styles.message}>{message}</Text>
            {isLoading === false &&
            <Weather latitude={latitude} longitude={longitude} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    coords: {
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 8,
        fontSize: 16,
    },
    message: {
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 14,
    }
});
