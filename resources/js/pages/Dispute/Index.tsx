import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Dispute } from '@/types/dispute';
import { PaginatedResponse } from '@/types/job-postings';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

export default function Index({ disputes }: { disputes: PaginatedResponse<Dispute> }) {
    const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);

    const handleDelete = () => {
        if (!selectedDispute) return;

        router.delete(route('disputes.destroy', selectedDispute.id), {
            onSuccess: () => {
                setSelectedDispute(null);
                toast.success('Dispute deleted successfully.');
            },
            onError: () => {
                setSelectedDispute(null);
                toast.error('Failed to delete dispute.');
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Disputes" />

            <div className="z-10 py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black">Your Disputes</h2>
                        <Link href={route('disputes.create')}>
                            <Button>Create Dispute</Button>
                        </Link>
                    </div>

                    <div className="mt-6">
                        {disputes.data.length > 0 ? (
                            <Table className={'mt-3 w-full rounded-md border capitalize'}>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Dispute ID</TableHead>
                                        <TableHead>Dispute Type</TableHead>
                                        <TableHead>Submitted by</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {disputes &&
                                        disputes.data.map((dispute) => (
                                            <TableRow key={dispute.id}>
                                                <TableCell className="font-medium">{dispute.id}</TableCell>
                                                <TableCell>
                                                    <div className={'flex gap-2'}>
                                                        <Link href={route('admin.disputes.show', dispute.id)} className={'underline'}>
                                                            {dispute.dispute_type}
                                                        </Link>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{dispute.submitted_by_user.name}</TableCell>
                                                <TableCell>{dispute.status}</TableCell>
                                                <TableCell>
                                                    {/* Delete Button */}
                                                    <Button variant="destructive" onClick={() => setSelectedDispute(dispute)} disabled={dispute.status === 'resolved' || dispute.status === 'rejected'}>
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="mt-4 text-slate-500">No disputes found.</p>
                        )}
                    </div>
                </div>
            </div>

            <AlertDialog open={!!selectedDispute} onOpenChange={() => setSelectedDispute(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                        <AlertDialogDescription>Are you sure you want to delete this dispute? This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setSelectedDispute(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={handleDelete}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Toaster />
        </AppLayout>
    );
}
