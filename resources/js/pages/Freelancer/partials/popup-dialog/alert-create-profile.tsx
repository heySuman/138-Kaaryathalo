import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ClientProfileDialog from '@/pages/Client/Partials/alert-client-profile-dialog';
import FreelancerProfileDialog from '@/pages/Freelancer/partials/popup-dialog/alert-freelancer-profile-form';
import { AlertCircleIcon } from 'lucide-react';

export default function ProfileRequiredCard({ variant }: { variant: 'client' | 'freelancer' }) {
    return (
        <Card className="mx-auto mt-2 w-[90%] shadow-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                    <AlertCircleIcon className={'text-red-500'} />
                    <p> Incomplete Profile.</p>
                </CardTitle>
            </CardHeader>
            <CardContent className={'text-muted-foreground'}>
                {variant === 'freelancer' ? 'You need to complete the profile before you apply to the jobs.' : 'Please complete your profile.'}
            </CardContent>
            <CardFooter>{variant === 'client' ? <ClientProfileDialog client={null} /> : <FreelancerProfileDialog freelancer={null} />}</CardFooter>
        </Card>
    );
}
