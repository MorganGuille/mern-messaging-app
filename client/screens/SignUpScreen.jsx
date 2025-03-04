import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';

const URL = 'http://192.168.1.40:5000/auth'

function SignUpScreen({ navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('')

    const HandleSignUp = async () => {


        try {
            const res = await axios.post(`${URL}/signup`, { username, password });
            setResponse(res.data.message)
            console.log(res.data.message)
            navigation.navigate('Login')
            // navigation.goBack();
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            <Text style={styles.input} >:{response}</Text>
            <View style={styles.btnCont}>
                <Button title="Signup" onPress={HandleSignUp} />
                <Button title="Go to login" onPress={() => navigation.goBack()}></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-end', padding: 20, backgroundColor: '##E6E6E6' },
    input: { textAlign: 'center', borderColor: ' slategrey', borderWidth: 1, marginTop: 5, marginBottom: 5, borderRadius: 50, height: 50, },
    btn: { marginTop: 5, marginBottom: 5, backgroundColor: 'black' },
    btnCont: { gap: 10 }
});

export default SignUpScreen