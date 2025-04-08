import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PaymentRequest } from '@/types/payment';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import {toast} from "sonner";

export default function Payment({ paymentRequests }: { paymentRequests: PaymentRequest[] }) {
    console.log(paymentRequests);

    const handlePay = (paymentRequest: PaymentRequest) => {
        router.post(route('khalti.handle'), {
            paymentRequest: {
                id: paymentRequest.id,
            },
        },{
            onError: () => {
                toast("Something went wrong");
            }
        });
    };

    return (
        <AppLayout>
            <Head title={'Payment'} />

            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-2 flex items-center justify-between">
                        <h2 className={'text-2xl font-bold'}>Payment Requests</h2>
                    </div>
                    <Separator />
                    <div className="mb-2 flex items-center justify-between">
                        <Table className="mt-4 rounded-md border">
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
                                {paymentRequests.map((paymentRequest) => (
                                    <TableRow key={paymentRequest.id}>
                                        <TableCell className="font-medium">{format(paymentRequest.created_at, 'MMMM dd, yyyy')}</TableCell>
                                        <TableCell className="font-medium">{paymentRequest.job.title}</TableCell>
                                        <TableCell>
                                            <Badge>{paymentRequest.status}</Badge>
                                        </TableCell>
                                        <TableCell>{paymentRequest.amount}</TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button size="sm" variant="outline" onClick={() => handlePay(paymentRequest)}>
                                                Pay now
                                            </Button>
                                            <Button size="sm" variant="destructive">
                                                Reject
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
