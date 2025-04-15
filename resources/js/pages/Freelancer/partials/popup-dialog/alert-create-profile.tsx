import ClientProfileDialog from '@/pages/Client/Partials/alert-client-profile-dialog';
import FreelancerProfileDialog from '@/pages/Freelancer/partials/popup-dialog/alert-freelancer-profile-form';
import { AlertCircleIcon } from 'lucide-react';

export default function ProfileRequiredCard({ variant }: { variant: 'client' | 'freelancer' }) {
    return (
        <div className={'dark:bg-white bg-black text-muted flex gap-4 items-center p-4'}>
            <AlertCircleIcon className={'text-red-500'} />
            {variant === 'freelancer' ? 'You need to complete the profile before you apply to the jobs.' : 'Please complete your profile.'}
            {variant === 'client' ? <ClientProfileDialog client={null} /> : <FreelancerProfileDialog freelancer={null} />}
        </div>
    );
}
