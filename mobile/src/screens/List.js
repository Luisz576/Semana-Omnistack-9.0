import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, AsyncStorage, ScrollView, View, SafeAreaView, Image } from 'react-native'
import SpotList from '../components/SpotList'
import socketio from 'socket.io-client'
import logo from '../assets/logo.png'
import { baseURL } from '../services/api'

export default function List(){
    const [techs, setTechs] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio(baseURL, { query: { user_id } })
            socket.on('booking_response', data => {
                Alert.alert(`Sua reserva em ${data.spot.company} em ${data.date} foi ${data.approved ? 'aprovada!' : 'rejeitada!'}`)
            })
        })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('techs').then(techs=>{
            setTechs(techs.split(',').map(tech=>tech.trim()))
        })
    }, [])
    
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.img} source={logo}/>
            <ScrollView>
                {techs.map(tech=><SpotList key={tech} tech={tech}/>)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        marginBottom: 30,
    },
    img: {
        height: 80,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
    },
})