import {
    AlertDialog,
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
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { JobPosting } from '@/types/job-postings';
import { JobApplication } from '@/types/job-application';

export function ApplicationAlert({application}: {application: JobApplication}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">View</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{application.freelancer.user.name ?? '--'}</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div>
                        <h2 className={'text-2xl text-black font-bold'}>Rs.{application.proposed_budget}</h2>
                        <p className={'text-muted-foreground text-md'}>Proposed Budget</p>
                        </div>

                        <div className={'max-h-1/2 overflow-y-auto mt-5'}>
                            <h2>Cover Letter</h2>
                            <p>{application.cover_letter ?? '--'}</p>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default function JobApplicationCard({ jobPosting, patch }: { jobPosting: JobPosting; patch: any }) {
    return (
        <section>
            <h1 className={'mb-5 text-2xl font-bold'}>Applications</h1>
            <Table className={'rounded'}>
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
                                <ApplicationAlert application={application}/>
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
                {jobPosting.application && jobPosting.application?.length < 1 && <TableCaption>No applications is found</TableCaption>}
            </Table>
        </section>
    );
}
