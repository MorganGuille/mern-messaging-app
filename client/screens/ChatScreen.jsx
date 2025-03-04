import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

const socket = io('http://192.168.1.40:5000');

// const getToken = async () => {
//     try {
//         const token = await AsyncStorage.getItem('token');
//         console.log('token:', token)
//         return token;
//     } catch (error) {
//         console.error('Error retrieving token:', error);
//         return null;
//     }
// };

function ChatScreen() {

    const [userName, setUserName] = useState('')
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getID = async () => {
            let userName = await AsyncStorage.getItem('username');
            setUserName(userName)
        }
        getID()
    }, []);

    useEffect(() => {
        socket.on('receiveMessage', (dbmessages) => {
            setMessages(dbmessages);
        });

        return () => socket.off('receiveMessage');
    }, []);

    const sendMessage = () => {

        if (content) {

            let message = {
                senderID: userName,
                content: content
            }

            socket.emit('sendMessage', message);
            setContent('');
        }
    };

    return (
        <View style={styles.container}>
            {messages.map((message, index) => (
                <Text style={message.senderID === userName ? styles.sntmsgText : styles.recmsgText} key={index}>{message.content}</Text>
            ))}
            <TextInput
                style={styles.input}
                value={content}
                onChangeText={setContent}
                placeholder="Type a message..."
            />
            <View style={styles.btnCont}>
                <Button title="Send" onPress={sendMessage} />
                {/* <Button title="Get token" onPress={getToken} /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-end', padding: 20, backgroundColor: '##E6E6E6' },
    input: { textAlign: 'center', borderColor: ' slategrey', borderWidth: 1, marginTop: 5, marginBottom: 5, borderRadius: 50, height: 50 },
    recmsgText: { height: 50, textAlign: 'left', marginBottom: '5', paddingLeft: '10', borderStyle: 'solid', borderColor: 'grey', borderWidth: 1 },
    sntmsgText: { textAlign: 'right', marginBottom: '5', paddingRight: '10', borderStyle: 'solid', borderColor: 'green', borderWidth: 1, backgroundColor: 'lightgreen' },
    btnCont: { gap: 10 }
});

export default ChatScreen