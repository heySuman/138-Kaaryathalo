import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import ClientOverview from '@/pages/Dashboard/partials/ClientOverview';
import { SharedData } from '@/types';
import { JobCount, JobPosting } from '@/types/job-postings';
import { Head, usePage } from '@inertiajs/react';

type dashboardPageProps = {
    jobStatusCount: JobCount;
    latestJobPostings: JobPosting[];
};

export default function ClientDashboard() {
    const { jobStatusCount, latestJobPostings } = usePage<SharedData<dashboardPageProps>>().props;
    return (
        <AppLayout>
            <Head title={'Dashboard'} />
            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black">Dashboard</h2>
                        </div>
                    </div>

                    {/*Tabs*/}
                    <Tabs defaultValue="overview" className="">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="analytics">Analytics</TabsTrigger>
                            <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className={'mt-6'}>
                            <ClientOverview jobCountStatus={jobStatusCount} latestJobPostings={latestJobPostings} />
                        </TabsContent>
                        <TabsContent value="analytics">Analytics</TabsContent>
                        <TabsContent value="notifications">Notification</TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}
