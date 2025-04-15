import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { JobPosting } from '@/types/job-postings';
import { Head, Link, useForm } from '@inertiajs/react';
import {format, formatDistanceToNow} from 'date-fns';
import { ArrowLeft, Award, Calendar, CircleCheck, Pencil, Plus, Tag, TrashIcon } from 'lucide-react';
import sanitizeHtml from 'sanitize-html';
import { toast } from 'sonner';

export default function Show({ jobPosting }: { jobPosting: JobPosting }) {
    console.log(jobPosting);
    const {
        data,
        patch,
        delete: destroy,
    } = useForm({
        status: 'accepted',
    });

    const handleComplete = () => {
        data.status = 'completed';
        patch(route('client.job-posting.update', jobPosting), {
            onSuccess: () => toast('Job marked as completed'),
        });
    };

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

            <div className="">
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
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={handleComplete}>
                                        <CircleCheck className={'mr-1 h-4 w-4'} />
                                        Mark as Complete
                                    </Button>
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
                        <div className="flex flex-wrap justify-between gap-4 px-3">
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
                            <div className="list-none flex gap-2">
                                {jobPosting.skills.map((item, index) => (
                                    <Badge key={index} variant="secondary">
                                        <span>{item}</span>
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <Separator />
                        <section>
                            <div className={'flex gap-2'}>
                                <h1 className={'mb-5 text-2xl font-bold'}>Milestones</h1>
                                {jobPosting.application && (
                                    <Link href={route('milestones.create', jobPosting.id)}>
                                        <Button variant={'outline'}>
                                            <Plus />
                                        </Button>
                                    </Link>
                                )}
                            </div>

                            <div>
                                {jobPosting.milestones &&
                                    jobPosting.milestones.map((milestone) => (
                                        <div key={milestone.id} className={'my-3 border-b p-2'}>
                                            <div className={'flex items-center gap-2 mb-3'}>
                                                <h2 className={'text-xl font-bold capitalize'}>{milestone.title}</h2>
                                                <Link href={route('milestones.edit', milestone)}>
                                                    <Button variant={'outline'} size={'sm'}>
                                                        <Pencil />
                                                    </Button>
                                                </Link>{' '}
                                                <Button
                                                    variant={'destructive'}
                                                    size={'sm'}
                                                    onClick={() => destroy(route('milestones.destroy', milestone))}
                                                >
                                                    <TrashIcon />
                                                </Button>
                                            </div>
                                            <p className={'mb- text-muted-foreground'}>{milestone.description}</p>
                                            <p className={'my-3'}>Due Date: {format(milestone.due_date as string,'MMMM' +
                                                ' dd, yyyy' )}</p>
                                            <p className={'capitalize'}>
                                                Status: {milestone.status}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </section>
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

                        <section></section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
