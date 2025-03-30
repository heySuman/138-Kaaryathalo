import { IFreelancer } from '@/types/freelancer';
import { JobPosting } from '@/types/job-postings';

export type JobApplication = {
    id: number;
    job_posting_id: number;
    freelancer_id: number;
    cover_letter: string;
    proposed_budget: number;
    status: 'pending' | 'accepted' | 'rejected';
    attachments: File[] | string[] | null;

    job: JobPosting;
    freelancer: IFreelancer;

};

export type Milestone = {
    id: number;
    job_application_id: number;
    title: string;
    description: string;
    due_date: string | Date | null;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
};
