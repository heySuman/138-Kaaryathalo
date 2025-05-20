import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Layout from '@/layouts/app-layout';
import { Message, SharedData, User } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Send } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Index({ users }: { users: User[] }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const auth = usePage<SharedData>().props.auth;

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    const [isSending, setIsSending] = useState(false);

    const handleSendMessage = async (userId: number) => {
        if (!inputValue.trim()) return;

        setIsSending(true);

        try {
            const payload = {
                id: 1000000,
                sender_id: auth.user.id,
                receiver_id: userId,
                message: inputValue,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };

            setMessages(prevState => [...(prevState || []), payload as Message ])
            setInputValue('');

            await axios.post(`/messages`, payload);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSending(false);
        }
    };

    useEffect(() => {
        if (!selectedUser) return;

        // Fetch previous messages between auth user and selectedUser
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/messages/${selectedUser.id}`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        const channel = window.Echo.private(`chat.${auth.user.id}`);

        channel.listen('MessageSent', (e: Message) => {
            if (e.sender_id === selectedUser.id || e.receiver_id === selectedUser.id) {
                setMessages(prev => [...prev, e]);
            }
        });

        return () => {
            window.Echo.leave(`chat.${auth.user.id}`);
        };
    }, [selectedUser]);


    return (
        <Layout>
            <Head title="Chat" />
            <div className="flex h-[90vh] w-full overflow-hidden rounded border">
                <div className="w-1/4 space-y-4 border-r p-4">
                    <h2 className="text-xl font-semibold">Users</h2>
                    {users.map((user) => (
                        <Button
                            key={user.id}
                            variant={selectedUser?.id === user.id ? 'secondary' : 'ghost'}
                            className="w-full items-center justify-start gap-2 py-6"
                            onClick={() => setSelectedUser(user)}
                        >
                            <Avatar>
                                {user.client && (
                                    <>
                                        <AvatarImage src={user.client.profile_picture as string} alt="@shadcn" />
                                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                                    </>
                                )}{' '}
                                {user.freelancer && (
                                    <>
                                        <AvatarImage src={user.freelancer.profile_picture as string} alt="@shadcn" />
                                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                                    </>
                                )}
                            </Avatar>
                            {user.name}
                        </Button>
                    ))}
                </div>

                {/* Chat area */}
                <div className="flex w-3/4 flex-col">
                    {selectedUser ? (
                        <>
                            {/* Header */}
                            <div className="bg-background border-b p-4 shadow-sm flex items-center gap-4">
                                <Avatar>
                                    {selectedUser.client && (
                                        <>
                                            <AvatarImage src={selectedUser.client.profile_picture as string} alt="@shadcn" />
                                            <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                                        </>
                                    )}{' '}
                                    {selectedUser.freelancer && (
                                        <>
                                            <AvatarImage src={selectedUser.freelancer.profile_picture as string} alt="@shadcn" />
                                            <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                                        </>
                                    )}
                                </Avatar>
                                <h2 className="text-lg font-semibold">{selectedUser.name}</h2>
                            </div>

                            <ScrollArea className="flex-1 overflow-y-auto p-4">
                                <div className="space-y-2">
                                    {messages?.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender_id === auth.user.id ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                                                    message.sender_id === auth.user.id
                                                        ? 'bg-primary text-primary-foreground rounded-br-none'
                                                        : 'bg-muted rounded-bl-none'
                                                }`}
                                            >
                                                {message.message}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>

                            {/* Input area */}
                            <div className="border-t p-4">
                                <div className="flex items-center gap-2">
                                    <Input
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Type a message..."
                                        className="rounded-full px-4 py-2"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && inputValue.trim()) {
                                                handleSendMessage(selectedUser.id);
                                            }
                                        }}
                                    />
                                    <Button
                                        onClick={() => handleSendMessage(selectedUser.id)}
                                        disabled={isSending || inputValue.trim() === ''}
                                        size="icon"
                                        className="rounded-full"
                                    >
                                        <Send className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-muted-foreground flex flex-1 items-center justify-center">
                            <p>Select a user to start chatting.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
