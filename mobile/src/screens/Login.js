import React, { useState, useEffect } from 'react'
import { StyleSheet, AsyncStorage, KeyboardAvoidingView, Platform, View, Image, Text, TouchableOpacity, TextInput } from 'react-native'
import api from '../services/api'
import logo from '../assets/logo.png'

export default function Login({ navigation }){
    const [email, setEmail] = useState('')
    const [techs, setTechs] = useState('')

    useEffect(()=>{
        AsyncStorage.getItem('user').then(user=>{
            if(user) navigation.navigate('List')
        })
    }, [])

    async function handleSubmit(){
        const response = await api.post('/sessions', { email })
        const { _id } = response.data
        await AsyncStorage.setItem('user', _id)
        await AsyncStorage.setItem('techs', techs)
        navigation.navigate('List')
    }

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior='padding' style={styles.container}>
            <Image style={styles.img} source={logo}/>
            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIl *</Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Seu e-mail"
                    value={email}
                    keyboardType="email-address"
                    placeholderTextColor="#999"
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    onChangeText={setTechs}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        height: 80,
        resizeMode: 'contain'
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
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
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
})