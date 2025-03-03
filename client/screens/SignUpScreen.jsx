import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';

const URL = 'http://192.168.1.41:5000/auth'

function SignUpScreen({ navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('')

    const HandleSignUp = async () => {


        try {
            const res = await axios.post(`${URL}/signup`, { username, password });
            setResponse(res.data.message)
            console.log(res.data.message)
            // navigation.goBack();
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            <Button title="Signup" onPress={HandleSignUp} />
            <Text>:{response}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },

});

export default SignUpScreen