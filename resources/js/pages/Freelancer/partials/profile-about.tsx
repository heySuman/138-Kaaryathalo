import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IFreelancer } from '@/types/freelancer';
import FreelancerProfileDialog from "@/pages/Freelancer/partials/popup-dialog/alert-freelancer-profile-form";

export function ProfileAbout({ freelancer }: { freelancer: IFreelancer }) {
    return (
        <Card className="shadow-sm w-[90%] mx-auto mt-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-2xl">About</CardTitle>
                <FreelancerProfileDialog freelancer={freelancer}/>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{freelancer.about ? freelancer.about : 'Describe Yourself...'}</p>
            </CardContent>
        </Card>
    );
}
