import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Layout from '@/layouts/app-layout';
import { Dispute } from '@/types/dispute';
import { PaginatedResponse } from '@/types/job-postings';
import { Head, Link, router } from '@inertiajs/react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

export default function AdminIndex({ disputes }: { disputes: PaginatedResponse<Dispute> }) {
    const { current_page, last_page } = disputes;

    const goToPage = (page: number) => {
        if (page < 1 || page > last_page) return;
        router.get(`/admin/disputes?page=${page}`);
    };

    return (
        <Layout>
            <Head title="Disputes" />

            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black">Disputes</h2>
                            <p className={'text-muted-foreground'}>View the disputes reported by the user.</p>
                        </div>
                    </div>

                    <Table className={'mt-3 w-full rounded-md border capitalize'}>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Dispute ID</TableHead>
                                <TableHead>Dispute Type</TableHead>
                                <TableHead>Submitted by</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {disputes &&
                                disputes.data.map((dispute) => (
                                    <TableRow key={dispute.id}>
                                        <TableCell className="font-medium">{dispute.id}</TableCell>
                                        <TableCell>
                                            <div className={'flex gap-2'}>
                                                <Link href={route('admin.disputes.show', dispute.id)} className={'underline'}>
                                                    {dispute.dispute_type}
                                                </Link>
                                            </div>
                                        </TableCell>
                                        <TableCell>{dispute.user.name}</TableCell>
                                        <TableCell>{dispute.status}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>

                    {disputes.data.length === 0 && <h2 className={'text-center italic text-muted-foreground my-5'}>No Disputes have been filed.</h2>}
                </div>

                <Pagination className={'my-3'}>
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
        </Layout>
    );
}
