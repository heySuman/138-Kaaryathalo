import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { IFreelancer } from '@/types/freelancer';
import { JobPosting } from '@/types/job-postings';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    job: JobPosting;
    freelancer: IFreelancer;
}

export default function LeaveReviewDialog({ job, freelancer }: Props) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, reset, processing, errors } = useForm({
        job_posting_id: job.id,
        reviewer_id: freelancer.id,
        reviewee_id: job.client_id,
        rating: '',
        review: '',
    });

    const submit = () => {
        post(route('review.store'), {
            onSuccess: () => {
                toast.success('Review submitted');
                setOpen(false);
                reset();
            },
            onError: () => {
                toast.error('Something went wrong');
            },
        });
    };

    useEffect(() => {
        if (!open) reset();
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                    Leave Review
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Leave a Review</DialogTitle>
                    <DialogDescription>
                        Rate and review your client based on the job <strong>{job.title}</strong>.
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
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
