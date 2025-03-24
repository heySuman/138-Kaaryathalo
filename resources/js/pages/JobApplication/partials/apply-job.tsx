import InputError from '@/components/input-error';
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
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { IFreelancer } from '@/types/freelancer';
import { JobApplication } from '@/types/job-application';
import { JobPosting } from '@/types/job-postings';
import { Input } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/react';
import React, { ChangeEvent, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { toast, Toaster } from 'sonner';

export default function ApplyJob({
    jobPosting,
    freelancer,
    applied,
}: {
    jobPosting: JobPosting;
    freelancer: IFreelancer | null;
    applied: JobApplication | null;
}) {
    const { data, setData, post, processing, errors } = useForm<Partial<JobApplication>>({
        job_posting_id: jobPosting.id,
        freelancer_id: freelancer?.id,
        cover_letter: '',
        proposed_budget: 0,
        attachments: [],
    });

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setData('attachments', Array.from(event.target.files));
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        post(route('job-applications.store'), {
            onSuccess: () => {
                toast('Job Application success');
            },
        });
    };

    const [isOpen, setIsOpen] = useState(false);
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {!applied ? (
                    <Button variant="outline" onClick={() => setIsOpen(true)} disabled={!freelancer}>
                        Apply
                    </Button>
                ) : (
                    <Link href={route('job-applications.index')}>
                        <Button variant="link" className={'underline'}>
                            View Application
                        </Button>
                    </Link>
                )}
            </AlertDialogTrigger>
            {isOpen && (
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apply for Job</AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                        <form>
                            <div className="mb-4">
                                <label className="block font-medium">Proposed Budget</label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded border p-2"
                                    value={data.proposed_budget || ''}
                                    onChange={(e) => setData('proposed_budget', Number(e.target.value))}
                                />
                                {errors.proposed_budget && <p className="text-sm text-red-500">{errors.proposed_budget}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Cover Letter</Label>
                                <div className={'max-h-[40vh] overflow-y-scroll'}>
                                    <ReactQuill
                                        theme="snow"
                                        value={data.cover_letter || ''}
                                        onChange={(value) => setData('cover_letter', value)}
                                        placeholder="Describe the job requirements and responsibilities"
                                    />
                                </div>
                                {errors.cover_letter && <InputError message={errors.cover_letter} className="mt-2" />}
                            </div>
                            <div className="my-4">
                                <label className="block font-medium">Attachments</label>
                                <Input type="file" multiple className="w-full rounded border p-2" onChange={handleFileChange} />
                                {errors.attachments && <p className="text-sm text-red-500">{errors.attachments}</p>}
                            </div>
                        </form>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSubmit} disabled={processing}>
                            {processing ? 'Applying...' : 'Apply'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                    <Toaster />
                </AlertDialogContent>
            )}
        </AlertDialog>
    );
}
