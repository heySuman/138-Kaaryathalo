export interface Dispute {
    id: number;
    job_posting_id: number | undefined;
    submitted_by_user_id: number;
    user_type: 'freelancer' | 'client';
    dispute_type: 'payment_issue' | 'task_not_submitted';
    description?: string;
    status: 'open' | 'resolved' | 'rejected';
    created_at: string;
    updated_at: string;

    job_posting?: JobPosting;
    user?: User;
    submitted_by_user?: User;
}
