import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Dispute } from '@/types/dispute';
import { Head, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { toast, Toaster } from 'sonner';

export default function AdminShow({ dispute }: { dispute: Dispute }) {
    const { data, setData, patch, processing } = useForm({
        status: dispute.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        patch(route('admin.disputes.update', dispute.id), {
            onSuccess: () => toast.success('Dispute status updated successfully!'),
            onError: () => toast.error('Failed to update dispute status.'),
        });
    };

    console.log(dispute);

    return (
        <AppLayout>
            <Head title={`Dispute Details - ${dispute.id}`} />
            <div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-4">
                    <div className="mb-2 flex items-center justify-between">
                        <Button variant={'link'} onClick={() => window.history.back()} className={'p-0'}>
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
                                            {dispute.submitted_by_user?.name || 'Unknown User'} ({dispute.user_type})
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

                                    <div>
                                        <Label>Phone Number</Label>
                                        <p className="text-lg whitespace-pre-wrap">{dispute.submitted_by_user.phone || 'No phone' +
                                            ' number available'}</p>
                                    </div>



                                    {/* Status Update */}
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <Label>Status</Label>
                                            <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Update status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="open">Open</SelectItem>
                                                    <SelectItem value="resolved">Resolved</SelectItem>
                                                    <SelectItem value="rejected">Rejected</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="mt-4 flex justify-end">
                                            <Button type="submit" disabled={processing}>
                                                {processing ? 'Updating...' : 'Update Status'}
                                            </Button>
                                        </div>
                                    </form>

                                    {/* Created & Updated */}
                                    <div className="flex space-x-4">
                                        <div>
                                            <Label>Created At</Label>
                                            <p className="text-lg">{format(new Date(dispute.created_at), 'MMMM dd, yyyy')}</p>
                                        </div>
                                        <div>
                                            <Label>Last Updated</Label>
                                            <p className="text-lg">{format(new Date(dispute.updated_at), 'MMMM dd, yyyy')}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <Toaster />
        </AppLayout>
    );
}
