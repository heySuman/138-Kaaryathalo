import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { JobApplication } from '@/types/job-application';
import { Head } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import sanitizeHtml from 'sanitize-html';
import {Badge} from "@/components/ui/badge";

export default function Show({ application }: { application: JobApplication }) {
    console.log(application);
    return (
        <AppLayout>
            <Head title={'Job Application'} />
            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-2 flex items-center justify-between">
                        <Button variant={'link'} className={'p-0 text-slate-600'} onClick={() => window.history.back()}>
                            <ArrowLeft /> Cancel
                        </Button>
                    </div>
                </div>
            </div>
            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-5 flex items-center justify-between">
                        <div className={'flex flex-wrap items-center gap-2'}>
                            <h2 className="text-2xl font-black">{application.job.title}</h2>
                            <Badge>{application.status}</Badge>
                        </div>
                    </div>
                    <Separator />
                </div>
                <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black">Cover Letter</h2>
                            <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(application.cover_letter) }} className={'mt-3 rounded border p-2'}></p>
                        </div>
                    </div>
                </div>
                <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8 mb-5">
                    <h2 className={'text-md font-bold'}>Attachments</h2>
                    {application.attachments?.map((i) => (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant={'link'} className={'text-blue-500 underline'}>
                                    {i as string}
                                </Button>
                            </DialogTrigger>
                            <DialogTitle>
                                <span className={'sr-only'}>Attachment</span>
                            </DialogTitle>
                            <DialogContent className="max-w-4xl">
                                <img src={i as string} />
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
