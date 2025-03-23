import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import ApplyJob from '@/pages/JobApplication/partials/apply-job';
import { IFreelancer } from '@/types/freelancer';
import { JobApplication } from '@/types/job-application';
import { JobPosting } from '@/types/job-postings';
import { Head } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Clock, DollarSign, Weight } from 'lucide-react';
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
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Badge variant="secondary" className="flex items-center">
                                <Clock className="mr-1 h-4 w-4" /> {jobPosting.timeline}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center">
                                <DollarSign className="mr-1 h-4 w-4" /> {jobPosting.budget}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center">
                                <Weight className="mr-1 h-4 w-4" /> {jobPosting.experience_level}
                            </Badge>
                            {/*<Badge variant="secondary" className="flex items-center">*/}
                            {/*    <Calendar className="mr-1 h-4 w-4" /> Valid until{' '}*/}
                            {/*    {jobPosting.expiry_date && new Date(jobPosting.expiry_date).toLocaleDateString()}*/}
                            {/*</Badge>*/}
                        </div>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">Job Description</h2>
                            <div className="prose mb-4" dangerouslySetInnerHTML={{ __html: sanitizeHtml(jobPosting.description) || '' }}></div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">Skills Requirements</h2>
                            <ul className="list-none space-y-2">
                                {jobPosting.skills &&
                                    jobPosting.skills.map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="mt-1 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
