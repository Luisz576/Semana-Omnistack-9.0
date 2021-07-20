import React, { useState, useEffect } from 'react'
import { withNavigation } from 'react-navigation'
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import api from '../services/api'

export function SpotItem(spot, { navigation }){
    function handleNavigate(){
        navigation.navigate('Book', { spotId: spot._id })
    }

    return (<View style={styles.listItem}>
        <Image style={styles.thumbnail} source={{uri: `http://192.168.0.104:3000${spot.thumbnail_url}`}}/>
        <Text style={styles.company}>{spot.company}</Text>
        <Text style={styles.price}>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</Text>
        <TouchableOpacity onPress={handleNavigate} style={styles.button}>
            <Text style={styles.buttonText}>Solicitar reserva</Text>
        </TouchableOpacity>
    </View>)
}

function SpotList({ tech, navigation }){
    const [loading, setLoading] = useState(true)
    const [spots, setSpots] = useState([])

    useEffect(()=>{
        async function loadSpots(){
            setLoading(true)
            const response = await api.get('/spots', {params: { tech }})
            setSpots(response.data)
            setLoading(false)
        }
        loadSpots()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
            {loading ? <Text style={styles.message}>Carregando...</Text> : spots.length > 0 ? <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot=>spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item })=>SpotItem(item, { navigation: navigation })}
            /> : <Text style={styles.message}>Nenhum resultado encontrado :(</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    bold: {
        fontWeight: 'bold',
    },
    list: {
        paddingHorizontal: 20,
    },
    listItem: {
        marginRight: 15,
    },
    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5,
    },
    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    message: {
        marginHorizontal: 20,
    }
})

export default withNavigation(SpotList)