import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';


const URL = 'http://192.168.1.40:5000/auth'

function LoginScreen({ navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('')

    const HandleLogin = async () => {
        console.log('handling login')
        try {
            const res = await axios.post(`${URL}/login`, { username, password });
            await AsyncStorage.setItem('token', res.data.token);
            await AsyncStorage.setItem('username', JSON.stringify(username));
            setResponse(res.data.message)

            navigation.navigate('Chat')
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            <Text style={styles.input}>:{response}</Text>
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
    btnCont: { gap: 10 }


});

export default LoginScreen