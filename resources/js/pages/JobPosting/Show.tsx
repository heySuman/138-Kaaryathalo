import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { JobPosting } from '@/types/job-postings';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, CheckCircle, Clock, DollarSign, Pencil, Weight } from 'lucide-react';
import sanitizeHtml from 'sanitize-html';

export default function Show({ jobPosting }: { jobPosting: JobPosting }) {
    return (
        <AppLayout>
            <Head title={jobPosting.title} />

            <div className="bg-white pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-2 flex items-center justify-between">
                        <Button variant={'link'} className={'p-0 text-slate-600'} onClick={() => window.history.back()}>
                            <ArrowLeft /> Cancel
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
                                <div className="flex gap-2">
                                    <Link href={route('client.job-posting.edit', jobPosting.id)}>
                                        <Button variant="outline" size="sm">
                                            <Pencil className={'mr-1 h-4 w-4'} />
                                            Edit
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Badge variant="secondary" className="flex items-center">
                                <Clock className="mr-1 h-4 w-4" /> {jobPosting.timeline}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center">
                                <span>
                                Rs. {jobPosting.budget} {jobPosting.payment_type}
                                </span>
                            </Badge>
                            <Badge variant="secondary" className="flex items-center">
                                <Weight className="mr-1 h-4 w-4" /> {jobPosting.experience_level}
                            </Badge>
                            {jobPosting.expiry_date && (
                                <Badge variant="secondary" className="flex items-center">
                                    <Calendar className="mr-1 h-4 w-4" /> Valid until {new Date(jobPosting.expiry_date).toLocaleDateString()}
                                </Badge>
                            )}
                        </div>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">Job Description</h2>
                            <div className="prose mb-4" dangerouslySetInnerHTML={{ __html: sanitizeHtml(jobPosting.description) || '' }}></div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">Skills Requirements</h2>
                            <ul className="list-none space-y-2">
                                {jobPosting.skills.map((item, index) => (
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
