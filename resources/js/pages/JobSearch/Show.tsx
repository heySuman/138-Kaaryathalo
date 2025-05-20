import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import ApplyJob from '@/pages/JobApplication/partials/apply-job';
import { IFreelancer } from '@/types/freelancer';
import { JobApplication } from '@/types/job-application';
import { JobPosting } from '@/types/job-postings';
import { Head } from '@inertiajs/react';
import { format, formatDistance, subDays } from 'date-fns';
import { ArrowLeft, Award, Calendar, Tag } from 'lucide-react';
import sanitizeHtml from 'sanitize-html';

export default function Show({
    jobPosting,
    freelancer,
    applied,
}: {
    jobPosting: JobPosting;
    freelancer: IFreelancer | null;
    applied: JobApplication | null;
}) {
    return (
        <AppLayout>
            <Head title={jobPosting.title} />

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

            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-4">
                    <div className="my-4 space-y-8 lg:w-3/4">
                        <div className="space-y-4">
                            <div className={'flex flex-wrap items-center gap-2'}>
                                <h1 className="text-4xl font-bold">{jobPosting.title}</h1>
                                <ApplyJob jobPosting={jobPosting} freelancer={freelancer} applied={applied} />
                            </div>
                            <div className="text-muted-foreground flex items-center space-x-2">
                                <span className="font-semibold">{jobPosting.client?.user.name}</span>
                                <p className={'text-gray-500'}>
                                    {format(jobPosting.created_at?.toLocaleString() as string, 'dd MMM yyyy')}
                                </p>
                            </div>
                        </div>
                        <Separator />
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold">Job Description</h2>
                            <div
                                className="prose mb-4 capitalize"
                                dangerouslySetInnerHTML={{ __html: sanitizeHtml(jobPosting.description) || '' }}
                            ></div>
                        </div>

                        <Separator />
                        <div className="flex flex-wrap justify-between gap-4">
                            <div className={'flex flex-wrap items-center gap-2'}>
                                <Tag />
                                <p>
                                    Rs. {jobPosting.budget} {jobPosting.payment_type}
                                </p>
                            </div>
                            <div className={'flex flex-wrap items-center gap-2'}>
                                <Award />
                                <p className={'capitalize'}>{jobPosting.experience_level}</p>
                            </div>
                            <div className={'flex flex-wrap items-center gap-2'}>
                                <Calendar />
                                <p className={'capitalize'}>{jobPosting.timeline}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold">Skills and Expertise</h2>
                            <div className="list-none space-y-2 flex gap-2 items-center">
                                {jobPosting.skills.map((item, index) => (
                                    <Badge key={index} variant="secondary">
                                        <span>{item}</span>
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4 capitalize">
                            <h2 className="text-2xl font-semibold">More about this job</h2>
                            <div className="list-none space-y-2">
                                <p>Total Applications: {jobPosting.application?.length || 0}</p>
                                <p>Job Status: {jobPosting.status}</p>
                            </div>
                        </div>

                        <Separator />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
