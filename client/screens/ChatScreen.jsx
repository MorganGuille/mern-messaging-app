import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

const socket = io('http://192.168.1.41:5000');

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('token:', token)
        return token;
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};

function ChatScreen() {

    const [content, setContent] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [sentMessages, setSentMessages] = useState([])

    const retrieveMessages = async () => {

    }

    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            setReceivedMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => socket.off('receiveMessage');
    }, []);

    const sendMessage = () => {

        let senderID = AsyncStorage.getItem('userID');
        console.log(senderID) //// this doesnt work at all!

        if (content) {

            let message = {
                senderID: senderID,
                content: content
            }
            setSentMessages((prevMessages) => [...prevMessages, message]);
            console.log('sending', content)
            socket.emit('sendMessage', message);
            setContent('');
        }
    };

    return (
        <View style={styles.container}>
            {receivedMessages.map((message, index) => (
                <Text style={styles.recmsgText} key={index}>{message.content}</Text>
            ))}
            {sentMessages.map((message, index) => (
                <Text style={styles.sntmsgText} key={index}>{message.content}</Text>
            ))}
            <TextInput
                style={styles.input}
                value={content}
                onChangeText={setContent}
                placeholder="Type a message..."
            />
            <Button title="Send" onPress={sendMessage} />
            <Button title="Get token" onPress={getToken} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 },
    recmsgText: { textAlign: 'left', marginBottom: '5', paddingLeft: '10', borderStyle: 'solid', borderColor: 'grey', borderWidth: 1 },
    sntmsgText: { textAlign: 'right', marginBottom: '5', paddingRight: '10', borderStyle: 'solid', borderColor: 'green', borderWidth: 1, backgroundColor: 'lightgreen' },
});

export default ChatScreen