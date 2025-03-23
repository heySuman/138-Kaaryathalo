import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { JobPosting } from '@/types/job-postings';
import { Link } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { Briefcase, Clock } from 'lucide-react';

export default function JobCard({ job }: { job: JobPosting }) {
    return (
        <Card key={job.id} className="overflow-hidden">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div>
                        <Link href={route('job.show', job.id)} className={'hover:underline'}>
                            <h3 className="hover:text-primary cursor-pointer text-xl font-semibold">{job.title}</h3>
                        </Link>
                        <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                            <span className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                {job.category?.category}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {formatDistanceToNow(new Date(job.created_at as string), { addSuffix: true })}
                            </span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="">
                <div className="mb-3 flex flex-wrap gap-2">
                    {job.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary" className="font-normal">
                            {skill}
                        </Badge>
                    ))}
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                        <span className="text-xl font-bold">Rs. {job.budget}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
