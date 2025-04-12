import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import AlertDeleteFreelancer from '@/pages/Freelancer/partials/popup-dialog/alert-delete-freelancer';
import FreelancerProfileDialog from '@/pages/Freelancer/partials/popup-dialog/alert-freelancer-profile-form';
import { SharedData } from '@/types';
import { IFreelancer } from '@/types/freelancer';
import { usePage } from '@inertiajs/react';

export function ProfileCard({ freelancer }: { freelancer: IFreelancer }) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    return (
        <>
        <div className="mx-auto w-[90%] overflow-hidden mt-5">
            <div className="flex items-center px-6 sm:items-start gap-2 flex-wrap">
                {/* Profile Picture */}
                <div className="rounded-full border-4 border-white bg-white">
                    <div className="relative h-[100px] w-[100px] overflow-hidden rounded-full border">
                        <Avatar className="h-full w-full object-cover">
                            <AvatarImage src={freelancer?.profile_picture as string} alt={auth.user.name} />
                            <AvatarFallback>{getInitials(auth.user.name)}</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="">
                    <div className="flex items-center justify-between gap-2">
                        <h1 className="text-2xl font-bold">{auth.user.name}</h1>
                        <FreelancerProfileDialog freelancer={freelancer} />
                        <AlertDeleteFreelancer />
                    </div>
                    <p className="text-muted-foreground text-lg">{freelancer.headline}</p>
                    <p className="text-muted-foreground text-lg">{freelancer.about}</p>
                </div>
            </div>
        </div>
        </>
    );
}
