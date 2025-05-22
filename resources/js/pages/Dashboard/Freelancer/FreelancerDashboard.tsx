import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import NotificationTab from '@/pages/Dashboard/client/notification-tab';
import FreelancerOverview from '@/pages/Dashboard/partials/FreelancerOverview';
import ProfileRequiredCard from '@/pages/Freelancer/partials/popup-dialog/alert-create-profile';
import { SharedData } from '@/types';
import { AppliedJobCount } from '@/types/job-postings';
import { Head, usePage } from '@inertiajs/react';

type dashboardPageProps = {
    jobStatusCount: AppliedJobCount;
};

export type Earning = {
    total: number;
    month: number;
};

export default function FreelancerDashboard({ earningsData, totalEarnings }: { earningsData: Earning[]; totalEarnings: number }) {
    const { jobStatusCount } = usePage<SharedData<dashboardPageProps>>().props;
    return (
        <AppLayout>
            <Head title={'Dashboard'} />
            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black">Dashboard</h2>
                        </div>
                    </div>

                    <Tabs defaultValue="overview" className="">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className={'mt-6'}>
                            {!jobStatusCount && <ProfileRequiredCard variant={'freelancer'} />}
                            {jobStatusCount && (
                                <FreelancerOverview jobCountStatus={jobStatusCount} earningsData={earningsData} totalEarning={totalEarnings} />
                            )}
                        </TabsContent>
                        <TabsContent value="notifications">
                            <NotificationTab />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}
