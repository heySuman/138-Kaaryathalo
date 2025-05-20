import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import LeaveClientReview from '@/pages/JobPosting/partials/LeaveClientReview';
import { IFreelancer } from '@/types/freelancer';
import { JobPosting, Review } from '@/types/job-postings';
import { useForm } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

export default function FreelancerCard({ jobPosting, freelancer, review }: { jobPosting: JobPosting; freelancer: IFreelancer; review: Review }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        destroy(route('review.destroy', id), {
            onSuccess: () => toast.success('Review deleted successfully'),
            onError: () => toast.error('Review deletion failed'),
        });
    };
    return (
        <Card className={'sticky top-4 flex items-center justify-center border-0 border-l shadow-none'}>
            <CardContent className={'flex flex-col items-center justify-center gap-2'}>
                <Avatar className={'h-[150px] w-[150px]'}>
                    <AvatarImage src={freelancer.profile_picture as string} alt={freelancer.user.name} />
                    <AvatarFallback>{freelancer.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className={'text-center text-2xl font-bold'}>{freelancer.user.name}</h1>
                <p className={'text-center'}>{freelancer.headline || '---'}</p>
                {!review && jobPosting.status === 'completed' && (
                    <div className="flex justify-center">
                        <LeaveClientReview job={jobPosting} freelancer={freelancer} />
                    </div>
                )}

                {jobPosting.status !== 'completed' && (
                    <p className={'text-muted-foreground my-2 text-center text-sm italic'}>
                        You can review once you have marked this job as completed.
                    </p>
                )}

                {review && (
                    <div>
                        <h1 className={'mt-4 mb-3 text-center text-xl font-bold'}>Your Review</h1>
                        <RenderStars rating={review.rating} />
                        <p className={'text-center'}>{review.review}</p>
                    </div>
                )}

                {review && (
                    <CardFooter className={'mt-4 flex justify-center gap-3'}>
                        <LeaveClientReview review={review} freelancer={freelancer} job={jobPosting} />
                        <Button variant={'destructive'} size={'sm'} onClick={() => handleDelete(review.id)}>
                            Delete
                        </Button>
                    </CardFooter>
                )}
            </CardContent>
        </Card>
    );
}

export const RenderStars = ({ rating }: { rating: number }) => {
    return (
        <div className={'flex items-center justify-center'}>
            {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className={`h-5 w-5 ${index < rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} />
            ))}
        </div>
    );
};
