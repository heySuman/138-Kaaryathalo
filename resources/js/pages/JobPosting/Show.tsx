import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { JobPosting } from '@/types/job-postings';
import { Head, Link, useForm } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, Award, Pencil, Tag } from 'lucide-react';
import sanitizeHtml from 'sanitize-html';

export default function Show({ jobPosting }: { jobPosting: JobPosting }) {
    console.log(jobPosting);
    const { data, patch } = useForm({
        status: 'accepted',
    });

    return (
        <AppLayout>
            <Head title={jobPosting.title.replace(/^./, jobPosting.title[0].toUpperCase())} />

            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-2 flex items-center justify-between">
                        <Button variant={'link'} className={'p-0 text-slate-600'} onClick={() => window.history.back()}>
                            <ArrowLeft /> Back
                        </Button>
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-4">
                    <div className="my-4 space-y-8 border-r lg:w-3/4">
                        <div className="space-y-4">
                            <div className={'flex flex-wrap items-center gap-2'}>
                                <h1 className="text-4xl font-bold capitalize">{jobPosting.title}</h1>
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
                            <p className={'text-gray-500'}>
                                Posted {formatDistanceToNow(new Date(jobPosting.created_at as string), { addSuffix: true })}
                            </p>
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
                        <div className="flex flex-wrap gap-4">
                            <div className={'flex w-1/2 flex-wrap items-center gap-2'}>
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
                                <Award />
                                <p className={'capitalize'}>{jobPosting.experience_level}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold">Skills and Expertise</h2>
                            <div className="list-none space-y-2">
                                {jobPosting.skills.map((item, index) => (
                                    <Badge key={index} variant="secondary">
                                        <span>{item}</span>
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        <section>
                            <h1 className={'mb-5 text-2xl font-bold'}>Applications</h1>
                            <Table className={'rounded border'}>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className={'rounded-tl-lg'}>Application</TableHead>
                                        <TableHead>Freelancer</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className={'rounded-tr-lg'}>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {jobPosting.application?.map((application) => (
                                        <TableRow key={application.id}>
                                            <TableCell className="font-medium">{application.id}</TableCell>
                                            <TableCell className={'col-span-3 capitalize'}>{application.freelancer.user.name}</TableCell>
                                            <TableCell>
                                                <Badge className={'capitalize'}>{application.status}</Badge>
                                            </TableCell>
                                            <TableCell className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={application.status === 'accepted' || application.status === 'rejected'}
                                                    onClick={() => patch(route('job-applications.update', application))}
                                                >
                                                    Approve
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                {jobPosting.application && jobPosting.application?.length < 1 && (
                                    <TableCaption>No applications is found</TableCaption>
                                )}
                            </Table>
                        </section>

                        <section>
                            {jobPosting.application && jobPosting.application?.length > 0 && (
                                <Link href={route('milestones.create', jobPosting.application)}>
                                    <Button>Create Milestone</Button>
                                </Link>
                            )}
                        </section>

                        <section>
                        </section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
