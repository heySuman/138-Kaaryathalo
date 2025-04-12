import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import FreelancerOverview from '@/pages/Dashboard/partials/FreelancerOverview';
import ProfileRequiredCard from '@/pages/Freelancer/partials/popup-dialog/alert-create-profile';
import { SharedData } from '@/types';
import { AppliedJobCount } from '@/types/job-postings';
import { Head, usePage } from '@inertiajs/react';

type dashboardPageProps = {
    jobStatusCount: AppliedJobCount;
};

export default function FreelancerDashboard() {
    const { jobStatusCount, jobApplication } = usePage<SharedData<dashboardPageProps>>().props;
    console.log(jobApplication)
    return (
        <AppLayout>
            <Head title={'Dashboard'} />
            {!jobStatusCount && <ProfileRequiredCard variant={'freelancer'} />}
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
                                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" className={'mt-6'}>
                                <FreelancerOverview jobCountStatus={jobStatusCount} />
                            </TabsContent>
                            <TabsContent value="analytics">Analytics</TabsContent>
                            <TabsContent value="notifications">Notification</TabsContent>
                        </Tabs>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
