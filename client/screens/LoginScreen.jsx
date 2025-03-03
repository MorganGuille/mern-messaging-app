import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';

const URL = 'http://192.168.1.41:5000/auth'

function LoginScreen({ navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('')

    const HandleLogin = async () => {
        console.log('handling login')
        try {
            const res = await axios.post(`${URL}/login`, { username, password });
            setResponse(res.data.message)
            console.log(res.data.message)
            navigation.navigate('Chat')
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            <Button title="Log-in" onPress={HandleLogin} />
            <Text>:{response}</Text>
            <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },

});

export default LoginScreen