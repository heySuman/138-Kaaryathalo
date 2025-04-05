import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { JobApplication } from '@/types/job-application';
import { Head } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, Award, Calendar, Link2, Tag } from 'lucide-react';
import sanitizeHtml from 'sanitize-html';

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
                    <Card className={'flex max-w-3/4 flex-wrap capitalize'}>
                        <CardHeader>
                            <CardTitle>
                                <h2 className={'text-bold text-2xl'}>Job Details</h2>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={''}>
                                <div className={'flex w-full flex-wrap justify-between gap-2'}>
                                    <div className="mb-5">
                                        <div className={'flex flex-wrap items-center gap-2'}>
                                            <h2 className="text-xl font-black">{application.job.title}</h2>
                                        </div>
                                        <div className={'my-4 flex flex-wrap items-center gap-2'}>
                                            <Badge>{application.job.status}</Badge>
                                            <p>{formatDistanceToNow(application.job.created_at as string, { addSuffix: true })}</p>
                                        </div>

                                        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(application.job.description) }}></div>
                                    </div>

                                    <div className={'border-l p-3'}>
                                        <div className="flex flex-col flex-wrap gap-4">
                                            <div className={'flex flex-wrap items-center gap-2'}>
                                                <Tag />
                                                <p>
                                                    Rs. {application.job.budget} {application.job.payment_type}
                                                </p>
                                            </div>
                                            <div className={'flex flex-wrap items-center gap-2'}>
                                                <Award />
                                                <p className={'capitalize'}>{application.job.experience_level}</p>
                                            </div>
                                            <div className={'flex flex-wrap items-center gap-2'}>
                                                <Calendar />
                                                <p className={'capitalize'}>{application.job.timeline}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Separator className={'my-2'} />
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-semibold">Skills and Expertise</h2>
                                    <div className="flex list-none items-center gap-3">
                                        {application.job.skills.map((item, index) => (
                                            <Badge key={index} variant="secondary">
                                                <span>{item}</span>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mx-auto mt-5 max-w-7xl px-4 sm:px-6 lg:px-8 mb-2">
                    <Card className={'flex max-w-3/4 flex-wrap'}>
                        <CardHeader>
                            <CardTitle>Cover Letter</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div dangerouslySetInnerHTML={{ __html: application.cover_letter }}></div>
                            {application.attachments?.map((i, index) => (
                                <Dialog key={index}>
                                    <DialogTrigger asChild>
                                        <Button variant={'ghost'} className={'text-blue-500 underline'}>
                                            <Link2 /> Attachment {index + 1}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogTitle>
                                        <span className={'sr-only'}>Attachment</span>
                                    </DialogTitle>
                                    <DialogContent className="max-w-4xl">
                                        <img src={i as string} alt={'attachments'} />
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
