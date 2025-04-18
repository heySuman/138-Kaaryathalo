import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Earning } from '@/pages/Dashboard/Freelancer/FreelancerDashboard';
import { AppliedJobCount } from '@/types/job-postings';
import { Activity, CircleCheckBig, CircleXIcon, GalleryVerticalEnd } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function FreelancerOverview({ jobCountStatus, earningsData }: { jobCountStatus: AppliedJobCount; earningsData: Earning[] }) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const chartData = earningsData.map((item) => ({
        month: months[item.month - 1],
        earnings: item.total,
    }));
    return (
        <section className={'mb-4'}>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: 'Job Status Pending', value: jobCountStatus['pending'], icon: Activity },
                    { title: 'Jobs Rejected', value: jobCountStatus['rejected'], icon: CircleXIcon },
                    { title: 'Jobs Approved', value: jobCountStatus['accepted'], icon: CircleCheckBig },
                    { title: 'Total Jobs Applied', value: jobCountStatus['total'], icon: GalleryVerticalEnd },
                ].map((item, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                            <item.icon className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{item.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                        <CardTitle>Total Earning</CardTitle>
                        <CardDescription>Showing total earnings for the last 12 months</CardDescription>
                    </div>
                    <div className="flex"></div>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="earnings" fill="#4f46e5" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </section>
    );
}
