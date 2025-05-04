import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PaymentRequest } from '@/types/payment';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { CircleDollarSign } from 'lucide-react';
import { Toaster } from 'sonner';

export default function RequestPayment({
    paymentRequests,
    paidAmount,
    pendingAmount,
}: {
    paymentRequests: PaymentRequest[];
    paidAmount: number;
    pendingAmount: number;
}) {
    console.log(paymentRequests);
    return (
        <AppLayout>
            <Head title={'Payment'} />

            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                        {[
                            { title: 'Pending Amount', value: `Rs. ${pendingAmount}`, icon: CircleDollarSign },
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
                    <Separator />
                    <div className="mb-2 flex items-center justify-between">
                        <Table className="mt-4 rounded-md">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Job Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Amount (Rs.)</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {paymentRequests.map((paymentRequest) => (
                                    <TableRow key={paymentRequest.id}>
                                        <TableCell className="font-medium">{format(paymentRequest.created_at, 'MMMM dd, yyyy')}</TableCell>
                                        <TableCell className="font-medium">{paymentRequest.job.title}</TableCell>
                                        <TableCell>
                                            <Badge className={'capitalize'}>{paymentRequest.status}</Badge>
                                        </TableCell>
                                        <TableCell>{paymentRequest.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            <Toaster />
        </AppLayout>
    );
}
