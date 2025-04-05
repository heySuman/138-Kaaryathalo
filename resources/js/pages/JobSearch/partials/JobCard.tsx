import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { JobPosting } from '@/types/job-postings';
import { Link } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Tag } from 'lucide-react';
import sanitizeHtml from 'sanitize-html';

export default function JobCard({ job }: { job: JobPosting }) {
    return (
        <Card key={job.id} className="overflow-hidden rounded-none">
            <CardHeader className="">
                <div className="flex items-start justify-between">
                    <div>
                        <Link href={route('job.show', job.id)} className={'hover:underline'}>
                            <h3 className="hover:text-primary cursor-pointer text-xl font-semibold">{job.title}</h3>
                        </Link>
                        <div className="text-muted-foreground mt-1 mt-2 flex items-center gap-2 text-sm">
                            <span className="flex items-center gap-1">
                                <Tag className="h-4 w-4" />
                                Rs. {job.budget}
                            </span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="">
                <div className="prose mb-4 capitalize line-clamp-2" dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.description) || '' }}></div>
                <div className="mb-3 flex flex-wrap gap-2">
                    {job.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary" className="font-normal">
                            {skill}
                        </Badge>
                    ))}
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatDistanceToNow(new Date(job.created_at as string), { addSuffix: true })}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
