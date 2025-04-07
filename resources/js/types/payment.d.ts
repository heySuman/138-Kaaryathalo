import {JobPosting} from "@/types/job-postings";

export type PaymentRequest = {
    id:number;
    freelancer_id: number;
    client_id: number;
    amount: number;
    job_id: number;
    status: 'pending' | 'rejected' | 'approved';

    job: JobPosting
    freelancer: IFreelancer

    created_at: Date | string;
    updated_at: Date | string;
};
