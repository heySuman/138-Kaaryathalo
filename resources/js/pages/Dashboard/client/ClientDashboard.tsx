import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import ClientProfileDialog from '@/pages/Client/Partials/alert-client-profile-dialog';
import AlertDeleteClient from '@/pages/Client/Partials/alert-delete-client';
import ClientOverview from '@/pages/Dashboard/partials/ClientOverview';
import ProfileRequiredCard from '@/pages/Freelancer/partials/popup-dialog/alert-create-profile';
import { SharedData } from '@/types';
import { IClient } from '@/types/client';
import { JobCount, JobPosting } from '@/types/job-postings';
import { Head, usePage } from '@inertiajs/react';
import NotificationTab from '@/pages/Dashboard/client/notification-tab';

type dashboardPageProps = {
    jobStatusCount: JobCount;
    latestJobPostings: JobPosting[];
};

export default function ClientDashboard({ client }: { client: IClient }) {
    const { jobStatusCount, latestJobPostings } = usePage<SharedData<dashboardPageProps>>().props;
    const getInitials = useInitials();
    return (
        <AppLayout>
            <Head title={'Dashboard'} />
            {!jobStatusCount && <ProfileRequiredCard variant={'client'} />}
            {jobStatusCount && (
                <div className="pt-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-black">Dashboard</h2>
                            </div>
                        </div>

                        {/*Tabs*/}
                        <Tabs defaultValue="overview" className="">
                            <TabsList>
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="analytics">Profile</TabsTrigger>
                                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" className={'mt-6'}>
                                <ClientOverview jobCountStatus={jobStatusCount} latestJobPostings={latestJobPostings} />
                            </TabsContent>
                            <TabsContent value="analytics">
                                {!client && <ProfileRequiredCard variant={'client'} />}
                                {client && (
                                    <Card className="">
                                        <div className="flex items-center px-6 sm:items-start gap-4">
                                            {/* Profile Picture */}
                                            <div className="rounded-full border-4 border-white bg-white">
                                                <div className="relative h-[100px] w-[100px] overflow-hidden rounded-full">
                                                    <Avatar className="h-full w-full object-cover">
                                                        <AvatarImage src={client?.profile_picture as string} alt={client.user.name} />
                                                        <AvatarFallback>{getInitials(client.user.name)}</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                            </div>

                                            {/* Profile Info */}
                                            <div className="mt-2 border-red-500">
                                                <div className="flex items-center justify-between">
                                                    <h1 className="text-2xl font-bold">{client.user.name}</h1>
                                                    <ClientProfileDialog client={client} />
                                                    <AlertDeleteClient />
                                                </div>
                                                <p className="text-muted-foreground text-lg">{client?.company_name || '--'}</p>
                                            </div>
                                        </div>
                                    </Card>
                                )}
                            </TabsContent>
                            <TabsContent value="notifications">
                                <NotificationTab/>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
