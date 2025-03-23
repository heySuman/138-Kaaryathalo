import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppliedJobCount } from '@/types/job-postings';
import {Activity, CircleCheckBig, CircleXIcon, GalleryVerticalEnd} from 'lucide-react';

export default function FreelancerOverview({ jobCountStatus }: { jobCountStatus: AppliedJobCount }) {
    return (
        <>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: 'Job Status Pending', value: jobCountStatus['pending'], icon: Activity },
                    { title: 'Jobs Rejected', value: jobCountStatus['rejected'], icon:  CircleXIcon},
                    { title: 'Jobs Approved', value: jobCountStatus['approved'], icon: CircleCheckBig },
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
        </>
    );
}
