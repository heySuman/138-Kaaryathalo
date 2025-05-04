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
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { toast, Toaster } from 'sonner';

import { RenderStars } from '@/pages/JobPosting/partials/FreelancerCard';
import { SharedData } from '@/types';
import { format } from 'date-fns';

export default function Index({ jobs, freelancer }: { jobs?: JobPosting[]; freelancer: IFreelancer }) {
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

    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        destroy(route('review.destroy', id), {
            onSuccess: () => toast.success('Review deleted successfully'),
            onError: () => toast.error('Review deletion failed'),
        });
    };

    const auth = usePage<SharedData>().props.auth;
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
                                        <h3 className="text-2xl font-bold text-slate-900 capitalize dark:text-white">{job.title}</h3>
                                    </div>

                                    {/* ------------------------------------- Milestones  ------------------------------------------------- */}
                                    <div className="">
                                        {job.milestones.length > 0 &&
                                            job.milestones?.map((milestone) => (
                                                <div key={milestone.id} className="flex flex-col flex-wrap gap-3 border-y py-4">
                                                    <div>
                                                        <h2 className="inline-block pr-2 text-xl font-bold">{milestone.title}</h2>
                                                        <Badge
                                                            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                                                        >
                                                            {milestone.status}
                                                        </Badge>
                                                    </div>

                                                    <div>
                                                        <p className={'font-bold text-lg my-3'}>Description</p>
                                                        <p className="text-md overflow-hidden">{milestone.description}</p>
                                                    </div>
                                                    <div className="max-w-xs my-3">
                                                        <Label className="text-md">Update Status</Label>
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
                                        {job.milestones.length === 0 && (
                                            <div className="flex w-full flex-col flex-wrap gap-3 border-y p-4 sm:flex-row sm:items-center sm:justify-between">
                                                Client has not posted milestones, please contact client to add milestones.
                                            </div>
                                        )}
                                    </div>
                                    {/*------------------------------------------ Rating & Reviews ------------------------------------------------- */}
                                    {job.reviews.length > 0 && (
                                        <div className="mt-4">
                                            <h4 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Reviews</h4>
                                            <ul className="space-y-3">
                                                {job.reviews.map((review) => (
                                                    <div>
                                                        <div className={'flex items-center gap-2'}>
                                                            <h2 className="text-xl font-medium"> {review.review}</h2>
                                                            <RenderStars rating={review.rating} />
                                                        </div>
                                                        <div className="my-4">
                                                            <p className="text-muted-foreground text-sm">
                                                                Posted on {format(review.created_at, 'MMMM dd, yyyy')}
                                                            </p>
                                                        </div>
                                                        <div className={'flex items-center gap-2'}>
                                                            <LeaveReviewDialog job={job} review={review} />
                                                            <Button variant={'destructive'} size={'sm'} onClick={() => handleDelete(review.id)}>
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {/*----------------------- Action Buttons------------------------*/}
                                    {/* Request Payment Button */}
                                    {job.milestones.length > 0 && allMilestonesCompleted(job) && (
                                        <div className={'mt-6 flex items-center gap-2'}>
                                            {!job.payment_request && (
                                                <div className="flex items-center gap-2">
                                                    <Button size={'sm'} disabled={!!job.payment_request} onClick={() => handleRequestPayment(job)}>
                                                        {job.payment_request ? 'Requested.' : 'Request Payment'}
                                                    </Button>
                                                </div>
                                            )}

                                            {!job.reviews?.find((review) => review.reviewer_id === auth.user.id) && <LeaveReviewDialog job={job} />}
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
