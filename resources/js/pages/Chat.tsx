import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
import {SharedData} from "@/types";

export default function Chat({ receiverId }:{receiverId: number}) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { auth } = usePage<SharedData>().props;
    const userId = auth.user.id;

    useEffect(() => {
        fetchMessages();
    }, [receiverId]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`/api/messages/${receiverId}`);
            setMessages(response.data.messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/messages', {
                receiver_id: receiverId,
                message: newMessage,
            });
            setNewMessage('');
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const markAsRead = async (messageId) => {
        try {
            await axios.patch(`/api/messages/${messageId}/read`);
            // Optionally, refetch messages to reflect the change immediately
            fetchMessages();
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };

    useEffect(() => {
        messages.forEach(message => {
            if(message.receiver_id === userId && !message.read_at){
                markAsRead(message.id);
            }
        });

    }, [messages])

    return (
        <div>
            <div>
                {messages.map((message) => (
                    <div key={message.id}>
                        <p>
                            <strong>{message.sender_id === userId ? 'You' : message.sender.name}:</strong>{' '}
                            {message.message}
                        </p>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
        <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message"
        />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
