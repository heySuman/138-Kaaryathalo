import { Card } from '@/components/ui/card';
import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export interface Notification {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: number;
    data: {
        [key: string]: any;
        id: number;
        job_title: string;
        submitted_by: string;
    };
    read_at: string | null;
    created_at: string;
    updated_at: string;
}

export default function NotificationTab() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                axios.defaults.withCredentials = true;

                const response = await axios.get('/notifications');

                setNotifications(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold">Your Notifications</h3>
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <Card key={notification.id} className="p-4">
                        <p className="font-semibold">
                            {notification.data.message} {notification.data.job_title}
                        </p>
                        <p className="text-muted-foreground text-xs">{format(notification.created_at, 'MMMM dd, yyyy')}</p>
                    </Card>
                ))
            ) : (
                <p className="text-muted-foreground">No notifications to show.</p>
            )}
        </div>
    );
}
