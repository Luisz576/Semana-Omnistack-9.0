import React, { useState } from 'react'
import { AsyncStorage, Alert, StyleSheet, SafeAreaView, TextInput, Text, TouchableOpacity } from 'react-native'
import api from '../services/api'

export default function Book({ navigation }){
    const [date, setDate] = useState('')
    const spotId = navigation.getParam('spotId')

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user')
        await api.post(`/spots/${spotId}/bookings`, { date }, {
            headers: { user_id }
        })
        Alert.alert('Solicitação enviada!')
        navigation.navigate('List')
    }

    function handleCancel(){
        navigation.navigate('List')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INGRESSO *</Text>
            <TextInput
                style={styles.input}
                autoCapitalize="words"
                autoCorrect={false}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 50
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
})