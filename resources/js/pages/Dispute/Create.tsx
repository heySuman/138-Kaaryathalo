import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Dispute } from '@/types/dispute';
import { JobPosting } from '@/types/job-postings';
import { Head, useForm, usePage } from '@inertiajs/react';
import { toast, Toaster } from 'sonner';

export default function Create({ jobs }: { jobs: JobPosting[] }) {
    const auth = usePage<SharedData>().props.auth;

    const { data, setData, post } = useForm<Partial<Dispute>>({
        job_posting_id: undefined,
        dispute_type: auth.user.role === 'client' ? 'task_not_submitted' : 'payment_issue',
        description: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        post(route('disputes.store'), {
            onSuccess: () => {
                toast.success('Dispute submitted successfully!');
            },
        });
    };

    return (
        <AppLayout>
            <Head title={'Create Dispute'} />
            <div className="z-10 pt-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Button variant={'link'} className={'p-0 text-slate-600'} onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-2 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black">Create Dispute</h2>
                            <p className={'text-slate-600'}>Please fill up the following form to create a dispute</p>
                        </div>
                    </div>

                    <div className="py-10">
                        <Card className="border-0 px-0 shadow-none">
                            <form onSubmit={handleSubmit}>
                                <CardContent className="space-y-3 px-0">
                                    {/* Job Selection Dropdown */}
                                    <div className="space-y-2">
                                        <Label htmlFor="job_posting_id">Select Job</Label>
                                        <Select
                                            value={data.job_posting_id?.toString() || ''}
                                            onValueChange={(value) => setData('job_posting_id', Number(value))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a job" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {jobs.map((job) => (
                                                    <SelectItem key={job.id} value={job.id.toString()}>
                                                        {job.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Dispute Type Dropdown */}
                                    <div className="space-y-2">
                                        <Label htmlFor="dispute_type">Dispute Type</Label>
                                        <Select value={data.dispute_type || ''} onValueChange={(value) => setData('dispute_type', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select dispute type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="payment_issue">Payment Issue</SelectItem>
                                                <SelectItem value="task_not_submitted">Task Not Submitted</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Description Field */}
                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe the issue in detail"
                                            rows={4}
                                            value={data.description || ''}
                                            onChange={(e) => setData('description', e.target.value)}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end gap-2 pt-6">
                                    <Button type="submit">Submit Dispute</Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
            <Toaster />
        </AppLayout>
    );
}
