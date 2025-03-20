import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import ProfileRequiredCard from '@/pages/Freelancer/partials/popup-dialog/alert-create-profile';
import { User } from '@/types';
import { JobPosting, PaginatedResponse } from '@/types/job-postings';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

export default function Index({ client, jobPostings }: { client: User; jobPostings: PaginatedResponse<JobPosting> }) {
    const { delete: destroy } = useForm();

    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [deletingJob, setDeletingJob] = useState<JobPosting | null>(null);

    const handleDelete = () => {
        if (!deletingJob) return;

        setIsDeleting(deletingJob.id);

        destroy(route('client.job-posting.destroy', deletingJob.id), {
            onSuccess: () => {
                toast.success('Job posting deleted successfully');
                setIsDeleting(null);
                setDeletingJob(null);
            },
            onError: (errors) => {
                console.error(errors);
                toast.error('Failed to delete job posting. Please try again.');
                setIsDeleting(null);
                setDeletingJob(null);
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    console.log(jobPostings);
    return (
        <AppLayout>
            <Head title="My Jobs" />
            {!client && <ProfileRequiredCard variant={'client'} />}
            {client && (
                <div className="pt-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black">My Job Postings</h2>
                                <p className={'text-slate-400'}>Manage your job postings</p>
                            </div>
                        </div>

                        <Separator />

                        {/*Search Job*/}
                        <div className={'mt-5 flex justify-between'}>
                            <Input className={'max-w-[350px] ring-0'} placeholder={'Search job...'} />
                            <Link href={route('client.job-posting.create')}>
                                <Button size={'sm'}>+ Add New Job</Button>
                            </Link>
                        </div>

                        <div className="mt-2">
                            <Table className={'mt-3 w-full rounded border'}>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Job Id</TableHead>
                                        <TableHead>Job Title</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {jobPostings.data.length > 0 &&
                                        jobPostings.data.map((job) => (
                                            <TableRow key={job.id}>
                                                <TableCell className="font-medium">{job.id}</TableCell>
                                                <TableCell>
                                                    <div className={'flex gap-2'}>
                                                        <Badge variant={'secondary'}>{job.category?.category}</Badge>
                                                        <Link href={route('client.job-posting.show', job.id)} className={'underline'}>
                                                            {job.title}
                                                        </Link>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{job.status}</TableCell>
                                                <TableCell className="flex gap-2">
                                                    <Link href={route('client.job-posting.edit', job.id)}>
                                                        <Button variant="outline" size="sm">
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    <AlertDialog
                                                        open={deletingJob?.id === job.id}
                                                        onOpenChange={(open) => (open ? setDeletingJob(job) : setDeletingJob(null))}
                                                    >
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => setDeletingJob(job)}
                                                                disabled={isDeleting === job.id}
                                                            >
                                                                {isDeleting === job.id ? 'Deleting...' : 'Delete'}
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Do you want to delete this job posting?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action is irreversible. Are you sure?
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel onClick={() => setDeletingJob(null)}>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={handleDelete}
                                                                    className={'bg-red-500'}
                                                                >
                                                                    Confirm Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                                <TableCaption>
                                    {jobPostings.data.length < 1 && (
                                        <p className={'text-muted-foreground italic'}>No Jobs have been added! Add New Jobs.</p>
                                    )}
                                </TableCaption>
                            </Table>
                            <nav className={'my-3 flex w-full justify-center'}>
                                {jobPostings.links &&
                                    jobPostings.links.map((link) => (
                                        <Link
                                            preserveScroll
                                            href={link.url || ''}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            key={link.label}
                                            className={
                                                'inline-block rounded-lg px-3 py-2 text-xs' +
                                                (link.active ? 'bg-gray-200 text-black' : 'text-gray-200') +
                                                (!link.url ? 'cursor-not-allowed text-gray-400' : '')
                                            }
                                        ></Link>
                                    ))}
                            </nav>
                        </div>
                    </div>
                </div>
            )}
            <Toaster />
        </AppLayout>
    );
}
