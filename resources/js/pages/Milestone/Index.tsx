import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import ProfileRequiredCard from '@/pages/Freelancer/partials/popup-dialog/alert-create-profile';
import LeaveReviewDialog from '@/pages/Milestone/partials/alert-dialog-rating-review';
import { IFreelancer } from '@/types/freelancer';
import { JobPosting } from '@/types/job-postings';
import { Head, router } from '@inertiajs/react';
import { toast, Toaster } from 'sonner';

export default function Index({ jobs, freelancer }: { jobs?: JobPosting[]; freelancer: IFreelancer }) {
    console.log(jobs);
    const handleStatusChange = (milestoneId: number, newStatus: string) => {
        router.patch(
            route('milestones.update.status', milestoneId),
            {
                status: newStatus,
            },
            {
                preserveScroll: true,
                onSuccess: () => toast(`Milestone ${milestoneId} updated to ${newStatus}`),
            },
        );
    };

    const handleRequestPayment = (job: JobPosting) => {
        const payload = {
            job_id: job.id,
            client_id: job.client_id,
            freelancer_id: freelancer.id,
            amount: job.budget ?? 0,
        };

        router.post(route('request-payment.store'), payload, {
            onSuccess: () => toast('Payment request submitted.'),
            onError: () => toast.error('Something went wrong'),
        });
    };

    const allMilestonesCompleted = (job: JobPosting) => job.milestones?.length && job.milestones.every((m) => m.status === 'completed');

    return (
        <AppLayout>
            <Head title={'Milestones'} />
            {!freelancer && <ProfileRequiredCard variant={'freelancer'} />}
            <div className="min-h-screen">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Milestones</h2>
                            <p className="mt-1 text-slate-500 dark:text-slate-400">Track progress on your active projects</p>
                        </div>
                    </div>

                    <Separator className="mb-2" />

                    {jobs?.length ? (
                        <div className="space-y-2">
                            {jobs.map((job) => (
                                <div key={job.id} className="py-6">
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{job.title}</h3>
                                    </div>

                                    <div className="">
                                        {job.milestones?.map((milestone) => (
                                            <div
                                                key={milestone.id}
                                                className="flex w-full flex-col flex-wrap gap-3 border-y p-4 sm:flex-row sm:items-center sm:justify-between"
                                            >
                                                <div>
                                                    <h2 className="inline-block pr-2 font-medium">{milestone.title}</h2>
                                                    <Badge
                                                        variant={'outline'}
                                                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                                                    >
                                                        {milestone.status}
                                                    </Badge>
                                                </div>
                                                <p className="overflow-hidden text-sm text-ellipsis text-slate-500 dark:text-slate-300">
                                                    {milestone.description}
                                                </p>
                                                <div className="">
                                                    <Label className="text-xs font-medium text-slate-500 dark:text-slate-400">Update Status</Label>
                                                    <Select
                                                        defaultValue={milestone.status}
                                                        disabled={milestone.status === 'completed'}
                                                        onValueChange={(value) => handleStatusChange(milestone.id, value)}
                                                    >
                                                        <SelectTrigger className="mt-1 w-full">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="pending">Pending</SelectItem>
                                                            <SelectItem value="in progress">In Progress</SelectItem>
                                                            <SelectItem value="completed">Completed</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Request Payment Button */}
                                    {allMilestonesCompleted(job) && (
                                        <div className={'mt-6 flex items-center gap-2'}>
                                            <div className="flex items-center gap-2">
                                                <Button size={'sm'} disabled={!!job.payment_request} onClick={() => handleRequestPayment(job)}>
                                                    Request Payment
                                                </Button>
                                                <p>{job.payment_request && 'Requested.'}</p>
                                            </div>
                                            <LeaveReviewDialog job={job} freelancer={freelancer} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg bg-white p-8 text-center shadow-sm dark:bg-slate-800">
                            <p className="text-lg text-slate-500 dark:text-slate-400">No accepted jobs with milestones yet.</p>
                        </div>
                    )}
                </div>
            </div>
            <Toaster />
        </AppLayout>
    );
}
