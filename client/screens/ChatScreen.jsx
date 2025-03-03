import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://192.168.1.41:5000');

function ChatScreen() {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => socket.off('receiveMessage');
    }, []);

    const sendMessage = () => {

        if (message) {
            console.log('sending', message)
            socket.emit('sendMessage', message);
            setMessage('');
        }
    };

    return (
        <View style={styles.container}>
            {messages.map((msg, index) => (
                <Text style={styles.msgText} key={index}>{msg}</Text>
            ))}
            <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
            />
            <Button title="Send" onPress={sendMessage} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 },
    msgText: { textAlign: 'center', marginBottom: '5', borderStyle: 'solid', borderColor: 'grey', borderWidth: 1 },
});

export default ChatScreen