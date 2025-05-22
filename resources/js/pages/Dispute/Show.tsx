import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { Dispute } from '@/types/dispute';

export default function Show({ dispute }: { dispute: Dispute }) {
    return (
        <AppLayout>
            <Head title={`Dispute Details - ${dispute.id}`} />
            <div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-4">
                    <div className="mb-2 flex items-center justify-between">
                        <Button variant={'link'} onClick={() => window.history.back()} className={'p-0'}>
                            {' '}
                            <ArrowLeft /> Back
                        </Button>
                    </div>
                </div>
            </div>
            <div className="z-10 pt-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black">Dispute Details</h2>
                    </div>

                    <div className="py-6">
                        <Card className="border shadow-md">
                            <CardContent>
                                <div className="space-y-6">
                                    {/* Job Posting Information */}
                                    <div>
                                        <Label>Job Posting</Label>
                                        <p className="text-lg font-medium">{dispute.job_posting ? dispute.job_posting.title : 'N/A'}</p>
                                    </div>

                                    {/* Submitted By */}
                                    <div>
                                        <Label>Submitted By</Label>
                                        <p className="text-lg">
                                            {dispute.user?.name || 'Unknown User'} ({dispute.user_type})
                                        </p>
                                    </div>

                                    {/* Dispute Type */}
                                    <div>
                                        <Label>Dispute Type</Label>
                                        <p className="text-lg capitalize">{dispute.dispute_type.replace('_', ' ')}</p>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <Label>Description</Label>
                                        <p className="text-lg whitespace-pre-wrap">{dispute.description || 'No description provided.'}</p>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <Label>Status</Label>
                                        <p
                                            className={`text-lg capitalize ${
                                                dispute.status === 'open'
                                                    ? 'text-yellow-500'
                                                    : dispute.status === 'resolved'
                                                      ? 'text-green-500'
                                                      : 'text-red-500'
                                            }`}
                                        >
                                            {dispute.status}
                                        </p>
                                    </div>

                                    {/* Created & Updated */}
                                    <div className="flex space-x-4">
                                        <div>
                                            <Label>Created At</Label>
                                            <p className="text-lg">{format(dispute.created_at, 'MMMM dd, yyyy')}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
