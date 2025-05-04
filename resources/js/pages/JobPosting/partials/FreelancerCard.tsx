import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import LeaveClientReview from '@/pages/JobPosting/partials/LeaveClientReview';
import { IFreelancer } from '@/types/freelancer';
import { JobPosting, Review } from '@/types/job-postings';
import { Star } from 'lucide-react';

export default function FreelancerCard({ jobPosting, freelancer, review }: {
    jobPosting: JobPosting;
    freelancer: IFreelancer;
    review: Review
}) {
    return (
        <Card className={'sticky top-4 flex items-center justify-center border-0 border-l shadow-none'}>
            <CardContent>
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
                    <p className={'text-muted-foreground text-center text-sm italic my-2'}>You can review once you have marked this job as completed.</p>
                )}

                {review && (
                    <div>
                        <h1 className={'mt-4 text-center text-xl font-bold mb-3'}>Your Review</h1>
                        <RenderStars rating={review.rating} />
                        <p className={'text-center'}>{review.review}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export const RenderStars = ({ rating }: { rating: number }) => {
    return (
        <div className={'flex items-center justify-center'}>
            {
                Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index}
                          className={`h-5 w-5 ${index < rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} />
                ))
            }
        </div>
    );
};
