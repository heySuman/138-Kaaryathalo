import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useInitials } from '@/hooks/use-initials';
import ClientProfileDialog from '@/pages/Client/Partials/alert-client-profile-dialog';
import AlertDeleteClient from '@/pages/Client/Partials/alert-delete-client';
import { IClient } from '@/types/client';
import { Review } from '@/types/job-postings';
import { RenderStars } from '@/pages/JobPosting/partials/FreelancerCard';

export default function ClientProfile({ client, reviews }: { client: IClient; reviews: Review[] }) {
    const getInitials = useInitials();
    return (
        <>
            {client && (
                <Card className="border-0 shadow-none">
                    <div className="flex items-center gap-4 px-6 sm:items-start">
                        {/* Profile Picture */}
                        <div className="rounded-full border-4 border-white bg-white">
                            <div className="relative h-[100px] w-[100px] overflow-hidden rounded-full">
                                <Avatar className="h-full w-full object-cover">
                                    <AvatarImage src={client?.profile_picture as string} alt={client.user.name} />
                                    <AvatarFallback>{getInitials(client.user.name)}</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="mt-2 border-red-500">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold">{client.user.name}</h1>
                                <ClientProfileDialog client={client} />
                                <AlertDeleteClient />
                            </div>
                            <p className="text-muted-foreground text-lg">{client?.company_name || '--'}</p>
                        </div>
                    </div>
                </Card>
            )}

            <div className="mt-2 flex flex-col gap-4">
                <h2 className={'text-xl font-bold'}>Rating & Reviews</h2>
                {reviews && reviews.length > 0
                    && reviews.map((review, i) => (
                        <div className="space-y-1" key={i}>
                            <div className={'flex items-center gap-3'}>
                                <h3 className="text-md font-semibold">{review.review}</h3>

                                <RenderStars rating={review.rating} />
                            </div>
                            <p className="text-muted-foreground text-md">{review.reviewer?.name}</p>
                        </div>
                    ))}

                {reviews && reviews.length < 1 && <p className="text-muted-foreground text-md">No reviews yet.</p>}
            </div>
        </>
    );
}
