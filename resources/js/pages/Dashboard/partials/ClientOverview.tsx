import {Activity, CircleCheckBig, CircleDashed, Plus, GalleryVerticalEnd} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Link} from "@inertiajs/react";
import {JobCount, JobPosting} from "@/types/job-postings";

export default function ClientOverview({jobCountStatus, latestJobPostings}: {
    jobCountStatus: JobCount,
    latestJobPostings: JobPosting[]
}) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {[
                    {title: "Active Jobs", value: jobCountStatus["pending"], icon: Activity},
                    {title: "Completed Jobs", value: jobCountStatus["in progress"], icon: CircleCheckBig},
                    {title: "Pending Jobs", value: jobCountStatus["completed"], icon: CircleDashed},
                    {title: "Total Jobs", value: jobCountStatus["total"], icon: GalleryVerticalEnd},
                ].map((item, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                            <item.icon className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{item.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card className="mb-6">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Latest Projects</CardTitle>
                        <Link href={route('client.job-posting.create')}>
                            <Button>
                                <Plus className="h-4 w-4"/> Add New Job
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mt-2 overflow-x-scroll lg:overflow-x-hidden">
                        <Table className={'w-full border rounded-md mt-3'}>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Job ID</TableHead>
                                    <TableHead>Job Title</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    latestJobPostings && latestJobPostings.map((job) => (
                                        <TableRow key={job.id}>
                                            <TableCell className="font-medium">{job.id}</TableCell>
                                            <TableCell>
                                                <div className={'flex gap-2'}>
                                                    <Badge variant={'secondary'}>{job.category?.category}</Badge>
                                                    <Link href={route('client.job-posting.show', job.id)} className={"underline"}>
                                                        {job.title}
                                                    </Link>
                                                </div>
                                            </TableCell>
                                            <TableCell>{job.status}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
