import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { JobApplication } from '@/types/job-application';
import { PaginatedResponse } from '@/types/job-postings';
import { Head, Link, router } from '@inertiajs/react'; // Added missing router import

export default function Index({ applications }: { applications: PaginatedResponse<JobApplication> }) {
    const { current_page, last_page } = applications;

    const goToPage = (page: number) => {
        if (page < 1 || page > last_page) return;
        router.get(`/jobs-application?page=${page}`);
    };

    return (
        <AppLayout>
            <Head title="Job Applications" />
            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black">Job Applications</h2>
                        </div>
                    </div>

                    <Separator />
                    <Table className="my-5 border">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Job Title</TableHead>
                                <TableHead>View Details</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications.data.length > 0 ? (
                                applications.data.map((application) => (
                                    <TableRow key={application.id}>
                                        <TableCell>
                                            <Link href={route('job.show', application.job.id)}>
                                                <Button variant="link">{application.job?.title || 'N/A'}</Button>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={route('job-applications.show', application.id)}>
                                                <Button variant="link" className="underline">
                                                    View
                                                </Button>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`capitalize rounded px-2 py-1 text-xs font-semibold ${
                                                    application.status === 'accepted'
                                                        ? 'bg-green-100 text-green-600'
                                                        : application.status === 'pending'
                                                          ? 'bg-yellow-100 text-yellow-600'
                                                          : 'bg-red-100 text-red-600'
                                                }`}
                                            >
                                                {application.status}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="py-4 text-center">
                                        No applications found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button variant="outline" onClick={() => goToPage(current_page - 1)} disabled={current_page === 1}>
                                    Previous
                                </Button>
                            </PaginationItem>

                            {Array.from({ length: last_page }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink isActive={page === current_page} onClick={() => goToPage(page)}>
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <Button variant="outline" onClick={() => goToPage(current_page + 1)} disabled={current_page === last_page}>
                                    Next
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </AppLayout>
    );
}
