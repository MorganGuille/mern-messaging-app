import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl, TextInput, Button, Pressable } from 'react-native';
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
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {

        const getID = async () => {
            let userName = await AsyncStorage.getItem('username');
            setUserName(userName)
        }
        getID()
    }, []);

    useEffect(() => {
        socket.on('receiveMessages', (dbmessages) => {
            setMessages(dbmessages);
        });

        return () => socket.off('receiveMessages');
    }, []);

    const sendMessage = () => {

        if (content) {

            let message = {
                senderID: userName,
                content: content
            }

            socket.emit('sendMessage', message);
            socket.emit('refresh')
            setContent('');

        }
    };

    const handleOnRefresh = () => {


        socket.emit('refresh')
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => handleOnRefresh()} />} >
                {messages.map((message, index) => (
                    <Text style={message.senderID === userName ? styles.sntmsgText : styles.recmsgText} key={index}>{message.content}</Text>
                ))}
            </ScrollView>
            <View style={styles.btnCont}>
                <TextInput
                    style={styles.input}
                    value={content}
                    onChangeText={setContent}
                    placeholder="Message .. "
                />

                <Pressable style={styles.pressable} onPress={sendMessage}><Text>{'>'}</Text></Pressable>
                {/* <Button title="Get token" onPress={getToken} /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '##E6E6E6' },
    input: { paddingLeft: 10, borderColor: ' slategrey', borderWidth: 1, marginTop: 5, marginBottom: 5, borderRadius: 50, height: 50, width: '80%' },
    recmsgText: { alignSelf: 'flex-start', marginRight: '10%', maxWidth: '90%', textAlign: 'left', marginBottom: '5', padding: '10', borderStyle: 'solid', borderColor: 'grey', borderWidth: 1, borderRadius: 15, backgroundColor: 'slategrey' },
    sntmsgText: { alignSelf: 'flex-end', marginLeft: '10%', maxWidth: '90%', textAlign: 'right', marginBottom: '5', padding: '10', borderStyle: 'solid', borderColor: '#3DDC84', borderWidth: 1, borderRadius: 15, backgroundColor: 'lightgreen' },
    btnCont: { flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' },
    pressable: { backgroundColor: 'lightgreen', width: 50, aspectRatio: 1, borderRadius: 100, marginTop: 5, marginBottom: 5, justifyContent: 'center', alignItems: 'center' }
});

export default ChatScreen