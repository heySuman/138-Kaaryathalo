import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import ClientProfile from '@/pages/Dashboard/client/client-profile';
import NotificationTab from '@/pages/Dashboard/client/notification-tab';
import ClientOverview from '@/pages/Dashboard/partials/ClientOverview';
import ProfileRequiredCard from '@/pages/Freelancer/partials/popup-dialog/alert-create-profile';
import { SharedData } from '@/types';
import { IClient } from '@/types/client';
import { JobCount, JobPosting, Review } from '@/types/job-postings';
import { Head, usePage } from '@inertiajs/react';

type dashboardPageProps = {
    jobStatusCount: JobCount;
    latestJobPostings: JobPosting[];
};

export default function ClientDashboard({ client, reviews }: { client: IClient; reviews: Review[] }) {
    const { jobStatusCount, latestJobPostings } = usePage<SharedData<dashboardPageProps>>().props;

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
                                <ClientProfile client={client} reviews={reviews} />
                            </TabsContent>
                            <TabsContent value="notifications">
                                <NotificationTab />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
