import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Dispute } from '@/types/dispute';
import { Head, Link, usePage } from '@inertiajs/react';
import { Activity, CircleCheckBig, CircleXIcon, Settings } from 'lucide-react';

export default function Index({
    totalUsers,
    totalJobs,
    totalTransactions,
    recentDisputes,
}: {
    totalUsers: number;
    totalJobs: number;
    totalTransactions: number;
    recentDisputes: Dispute[];
}) {
    const auth = usePage<SharedData>().props.auth;
    console.log(totalUsers)
    console.log(totalJobs)
    console.log(totalTransactions)
    return (
        <AppLayout>
            <Head title="Admin" />
            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black">Welcome, {auth.user.name}</h2>
                        </div>
                    </div>
                    <div className={'my-4 p-2 rounded-md bg-gray-100'}>
                        <a className={'text-md'} href={'/pulse'} target={'_blank'} rel={'noreferrer'}>
                            <h2 className={'flex items-center gap-2 underline'}>
                                <Settings /> See the server status
                            </h2>
                        </a>
                    </div>
                    <section className={'mb-4'}>
                        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                { title: 'Total Users', value: totalUsers, icon: Activity },
                                { title: 'Total Jobs Created', value: totalJobs, icon: CircleXIcon },
                                { title: 'Total Transactions', value: `Rs. ${totalTransactions}`, icon: CircleCheckBig },
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

                    <section className={'mb-4'}>
                        <h2 className="text-2xl font-black"></h2>

                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Recent reported disputes</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mt-2 overflow-x-scroll lg:overflow-x-hidden">
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
                                            {recentDisputes &&
                                                recentDisputes.map((dispute) => (
                                                    <TableRow key={dispute.id}>
                                                        <TableCell className="font-medium">{dispute.id}</TableCell>
                                                        <TableCell>
                                                            <div className={'flex gap-2'}>
                                                                <Link href={route('admin.disputes.show', dispute.id)} className={'underline'}>
                                                                    {dispute.dispute_type}
                                                                </Link>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{dispute.submitted_by_user.name}</TableCell>
                                                        <TableCell>{dispute.status}</TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                            <CardFooter className={'flex items-center justify-center'}>
                                {recentDisputes.length === 0 && <h2 className={'text-center'}>No Disputes have been filed.</h2>}
                            </CardFooter>
                        </Card>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
