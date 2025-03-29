import { Button } from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Payment() {
    const [amount, setAmount] = useState(100);

    const handleEsewaPayment = () => {
        router.post('/api/esewa/pay', { amount });
    };

    const handleKhaltiPayment = () => {
        router.post('/api/khalti/pay', { amount });
    };

    return (
        <AppLayout>
            <Head title={'Payment'} />
            <Card className={'max-w-[350px]'}>
                <CardContent>
                    <h2>Make a Payment</h2>
                    <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                    <Button onClick={handleEsewaPayment}>Pay with eSewa</Button>
                    <Button onClick={handleKhaltiPayment}>Pay with Khalti</Button>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
