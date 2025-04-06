import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { JobPosting } from '@/types/job-postings';
import { Head, router } from '@inertiajs/react';
import sanitizeHtml from "sanitize-html";
import {Badge} from "@/components/ui/badge";

export default function Index({ jobs }: { jobs?: JobPosting[] }) {
    const handleStatusChange = (milestoneId: number, newStatus: string) => {
        router.patch(
            route('milestones.update.status', milestoneId),
            {
                status: newStatus,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    console.log(`Milestone ${milestoneId} updated to ${newStatus}`);
                },
            },
        );
    };

    return (
        <AppLayout>
            <Head title={'Milestones'} />

            <div className="min-h-screen">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Milestones</h2>
                            <p className="mt-1 text-slate-500 dark:text-slate-400">Track progress on your active projects</p>
                        </div>
                    </div>

                    <Separator className="mb-8" />

                    {jobs?.length ? (
                        <div className="space-y-12">
                            {jobs.map((job) => (
                                <div key={job.id} className="rounded-lg p-6 shadow-sm">
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{job.title}</h3>
                                        <div
                                            className="prose prose-slate dark:prose-invert mt-2 lg:max-w-1/2 1 text-sm"
                                            dangerouslySetInnerHTML={{__html: sanitizeHtml(job.description)}}
                                        ></div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {job.milestones?.map((milestone) => {
                                            return (
                                                <Card
                                                    key={milestone.id}
                                                    className="overflow-hidden transition-all hover:shadow-md"
                                                >
                                                    <CardHeader className="pb-2">
                                                        <CardTitle className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                                                            <span className="font-medium">{milestone.title}</span>
                                                            <Badge
                                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize`}
                                                            >
                                                                {milestone.status}
                                                            </Badge>
                                                        </CardTitle>
                                                    </CardHeader>

                                                    <CardContent className="pt-0">
                                                        <p className="mb-4 text-sm text-slate-500 dark:text-slate-300">{milestone.description}</p>

                                                        <div className="mt-4">
                                                            <Label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                                                Update Status
                                                            </Label>
                                                            <Select
                                                                defaultValue={milestone.status}
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
                                                    </CardContent>
                                                </Card>
                                            );
                                        })}
                                    </div>
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
        </AppLayout>
    );
}
