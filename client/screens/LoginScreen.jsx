import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const socket = io('http://192.168.1.40:5000');

const URL = 'http://192.168.1.40:5000/auth'

function LoginScreen({ navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('')

    const handleResponse = (message) => {

        setResponse(message);
        setTimeout(() => {
            setResponse('');
        }, 2000);
    }

    const HandleLogin = async () => {
        console.log('handling login')
        try {
            const res = await axios.post(`${URL}/login`, { username, password });
            await AsyncStorage.setItem('token', res.data.token);
            await AsyncStorage.setItem('username', JSON.stringify(username));
            handleResponse(res.data.message)
            socket.emit('refresh')
            navigation.navigate('Chat')
        } catch (error) {
            handleResponse('Incorrect username or password')
            // console.error('Login error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            {response ? <Text style={styles.response}>{response}</Text> : null}
            <View style={styles.btnCont}>
                <Button style={styles.btn} title="Log-in" onPress={HandleLogin} />
                <Button style={styles.btn} title="Go to Signup" onPress={() => navigation.navigate('Signup')}></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-end', padding: 20, backgroundColor: '##E6E6E6' },
    input: { textAlign: 'center', borderColor: ' slategrey', borderWidth: 1, marginTop: 5, marginBottom: 5, borderRadius: 50, height: 50 },
    btn: { marginTop: 5, marginBottom: 5, backgroundColor: 'black' },
    btnCont: { gap: 10 },
    response: { position: 'absolute', left: '30%', bottom: '50%' }


});

export default LoginScreen