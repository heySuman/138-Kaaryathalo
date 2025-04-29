import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SharedData } from '@/types';
import { IFreelancer } from '@/types/freelancer';
import { JobPosting, Review } from '@/types/job-postings';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    job: JobPosting;
    review?: Review;
    freelancer: IFreelancer;
}

export default function LeaveClientReview({ job, review, freelancer }: Props) {
    const [open, setOpen] = useState(false);
    const auth = usePage<SharedData>().props.auth;

    const { data, setData, post, put, reset, processing, errors } = useForm({
        job_posting_id: job.id,
        reviewee_id: review?.reviewee_id || freelancer.user.id,
        reviewer_id: review?.reviewer_id || auth.user.id,
        rating: review?.rating || '',
        review: review?.review || '',
    });

    const submit = () => {
        if (review) {
            put(route('review.update', review.id), {
                onSuccess: () => {
                    toast.success('Review updated successfully');
                    setOpen(false);
                    reset();
                },
                onError: () => {
                    toast.error('Failed to update review');
                },
            });
        } else {
            post(route('review.store'), {
                onSuccess: () => {
                    console.log('Update Successful');
                    toast.success('Review submitted successfully');
                    setOpen(false);
                    reset();
                },
                onError: () => {
                    toast.error('Failed to submit review');
                },
                preserveScroll: true,
            });
        }
    };

    useEffect(() => {
        if (!open) reset();
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                    {review ? 'Update Review' : 'Leave Review'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{review ? 'Update Your Review' : 'Leave a Review'}</DialogTitle>
                    <DialogDescription>
                        Rate and review talent based on the job done by{' '}
                        <strong>{job.application?.find((application) => application?.status === 'accepted')?.freelancer?.user?.name || ''}</strong>.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="rating">Rating (1-5)</Label>
                        <Input id="rating" type="number" min={1} max={5} value={data.rating} onChange={(e) => setData('rating', e.target.value)} />
                        {errors.rating && <p className="text-sm text-red-500">{errors.rating}</p>}
                    </div>

                    <div>
                        <Label htmlFor="review">Review</Label>
                        <Textarea
                            id="review"
                            value={data.review}
                            onChange={(e) => setData('review', e.target.value)}
                            placeholder="Write your feedback..."
                        />
                        {errors.review && <p className="text-sm text-red-500">{errors.review}</p>}
                    </div>
                </div>

                <DialogFooter>
                    <Button disabled={processing} onClick={submit}>
                        {processing ? 'Processing...' : review ? 'Update Review' : 'Submit Review'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
