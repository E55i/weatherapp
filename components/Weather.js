import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

const api = {
    url: process.env.EXPO_PUBLIC_API_URL,
    key: process.env.EXPO_PUBLIC_API_KEY,
    icons: process.env.EXPO_PUBLIC_ICON_URL
}

export default function Weather(props) {

    const [temp, setTemp] = useState(0)
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')

    useEffect(() => {
        const url = api.url +
            '&lat=' + props.latitude +
            '&lon=' + props.longitude +
            '&units=metric' +
            '&appid=' + api.key

        console.log(url)

        fetch(url)
            .then(res => res.json())
            .then((json) => {
                setTemp(json.main.temp)
                setDescription(json.weather[0].description)
                setIcon(json.weather[0].icon + '@2x.png')
            })

    }, [])


    return (
        <View>
            <Text style={styles.temp}>{temp}&#x2103;</Text>
            {icon &&
                <Image source={{ uri: api.icons + icon }} style={styles.icon} />
            }
            <Text style={styles.desc}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    temp: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 40,
    },
    icon: {
        alignSelf: 'center',
        width: 100,
        height: 100,
    },
    desc: {
        textAlign: 'center',
    }
});