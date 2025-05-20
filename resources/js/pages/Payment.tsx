import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PaymentRequest } from '@/types/payment';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { CircleDollarSign } from 'lucide-react';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

export default function Payment({
    paymentRequests,
    payment,
    error,
    paidAmount,
    pendingAmount,
}: {
    paymentRequests: PaymentRequest[];
    payment?: any;
    error?: string;
    paidAmount: number;
    pendingAmount: number;
}) {
    const handlePay = (paymentRequest: PaymentRequest) => {
        router.post(
            route('khalti.handle'),
            {
                paymentRequest: {
                    id: paymentRequest.id,
                },
            },
            {
                onError: () => {
                    toast('Something went wrong');
                },
            },
        );
    };

    useEffect(() => {
        if (payment) {
            toast.success('Payment successful!');
        } else if (error) {
            toast.error(error);
        }
    }, []);

    const handleReject = (paymentRequest: PaymentRequest) => {
        router.patch(
            route('payment.reject'),
            {
                paymentRequest: {
                    id: paymentRequest.id,
                },
            },
            {
                onSuccess: () => {
                    toast.success('Payment rejected!');
                },
                onError: () => {
                    toast.error('Something went wrong');
                },
            },
        );
    };

    return (
        <AppLayout>
            <Head title={'Payment'} />

            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                        {[
                            { title: 'Pending Amount', value: `Rs. ${pendingAmount ?? 0}`, icon: CircleDollarSign },
                            { title: 'Paid Amount', value: `Rs. ${paidAmount ?? 0}`, icon: CircleDollarSign },
                        ].map((item, index) => (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                                    <item.icon className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{item.value}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mb-2 flex items-center justify-between">
                        <h2 className={'text-2xl font-bold'}>Payment Requests</h2>
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                        <Table className="mt-4 rounded-md">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Job Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Amount (Rs.)</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {paymentRequests &&
                                    paymentRequests.map((paymentRequest) => (
                                        <TableRow key={paymentRequest.id}>
                                            <TableCell className="font-medium">{format(paymentRequest.created_at, 'MMMM dd, yyyy')}</TableCell>
                                            <TableCell className="font-medium">{paymentRequest.job.title}</TableCell>
                                            <TableCell>
                                                <Badge className={'capitalize'}>{paymentRequest.status}</Badge>
                                            </TableCell>
                                            <TableCell>{paymentRequest.amount}</TableCell>
                                            <TableCell className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handlePay(paymentRequest)}
                                                    disabled={paymentRequest.status === 'approved' || paymentRequest.status === 'rejected'}
                                                >
                                                    Pay now
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    disabled={paymentRequest.status === 'approved' || paymentRequest.status === 'rejected'}
                                                    onClick={() => handleReject(paymentRequest)}
                                                >
                                                    Reject
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                            <TableCaption>
                                {!paymentRequests && (
                                    <p className={'text-muted-foreground text-center italic'}>No payment requests found.</p>
                                )}
                            </TableCaption>
                        </Table>
                    </div>
                </div>
            </div>
            <Toaster />
        </AppLayout>
    );
}
