import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Layout from '@/layouts/app-layout';
import { User } from '@/types';
import { PaginatedResponse } from '@/types/job-postings';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { Activity, CircleCheckBig, CircleXIcon } from 'lucide-react';

export default function Users({
    totalUsers,
    totalFreelancers,
    totalClients,
    users,
}: {
    totalUsers: number;
    totalFreelancers: number;
    totalClients: number;
    users: PaginatedResponse<User>;
}) {
    const { current_page, last_page } = users;

    const goToPage = (page: number) => {
        if (page < 1 || page > last_page) return;
        router.get(`/admin/disputes?page=${page}`);
    };
    return (
        <Layout>
            <Head title="Users" />
            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black">Users</h2>
                            <p className={'text-muted-foreground'}>View the registered users.</p>
                        </div>
                    </div>
                    <section className={'mb-4'}>
                        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                { title: 'Total Clients', value: totalClients, icon: CircleXIcon },
                                { title: 'Total Freelancers', value: totalFreelancers, icon: CircleCheckBig },
                                { title: 'Total Users', value: totalUsers, icon: Activity },
                            ].map((item, index) => (
                                <Card key={index}>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-md font-medium">{item.title}</CardTitle>
                                        <item.icon className="text-muted-foreground h-4 w-4" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">{item.value}</div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                    <Table className={'mt-3 w-full rounded-md border capitalize'}>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User ID</TableHead>
                                <TableHead>User Name</TableHead>
                                <TableHead>Account Created</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users &&
                                users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{format(new Date(user.created_at), 'PPP')}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>

                    {users.data.length === 0 && <h2 className={'text-muted-foreground my-5 text-center italic'}>No Users found.</h2>}
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
