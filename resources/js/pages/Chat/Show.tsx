import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import AppLayout from '@/layouts/app-layout';
import { Message, User } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { ArrowLeft, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    auth: { user: { id: number; name: string } };
    receiverId: number;
    receiver: User;
};

export default function Chat({ auth, receiverId, receiver }: Props) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    const pollingInterval = 5000;

    // Function to fetch messages from the server
    const fetchMessages = async () => {
        try {
            const res = await axios.get(`/messages?receiver_id=${receiverId}`);
            setMessages(res.data);
        } catch (err) {
            console.error('Error fetching messages:', err);
        }
    };

    useEffect(() => {
        fetchMessages();

        const intervalId = setInterval(fetchMessages, pollingInterval);

        return () => clearInterval(intervalId);
    }, [fetchMessages, receiverId]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (!text.trim()) return;

        axios
            .post('/messages', {
                receiver_id: receiverId,
                message: text,
            })
            .then((res) => {
                fetchMessages();
                setText('');
            })
            .catch((err) => {
                console.error('Error sending message:', err);
            });
    };

    return (
        <AppLayout>
            <Head title={receiver.name} />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-4">
                <div className="mb-2 flex items-center justify-between">
                    <Button variant={'link'} onClick={() => window.history.back()} className={'p-0'}>
                        {' '}
                        <ArrowLeft /> Back
                    </Button>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-4">
                <div className="mb-2 flex items-center justify-between">
                    <Card className="m-2 max-h-[90vh]">
                        <CardHeader>
                            <h2>{receiver.name}</h2>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-2 overflow-y-auto rounded-md border p-4">
                            <ScrollArea className="">
                                {messages &&
                                    messages.map((msg) => {
                                        const isSender = msg.sender_id === auth.user.id;
                                        return (
                                            <div key={msg.id} className={`my-1 flex ${isSender ? 'justify-end' : 'justify-start'}`}>
                                                <p
                                                    className={`w-fit rounded border p-2 ${
                                                        isSender ? 'bg-white dark:text-black' : 'bg-slate-900' + ' text-white'
                                                    }`}
                                                >
                                                    {msg.message}
                                                </p>
                                            </div>
                                        );
                                    })}
                                {/* Add a reference for auto-scrolling */}
                                <div ref={scrollRef}></div>
                            </ScrollArea>
                        </CardContent>

                        <CardFooter className="mt-4 flex items-center gap-2">
                            <Input
                                placeholder="Type your message..."
                                className="flex-1"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <Button onClick={sendMessage} variant="default" className="gap-1">
                                <Send size={18} />
                                Send
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
