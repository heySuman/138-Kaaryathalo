export type JobApplication = {
    id: number;
    job_id: number;
    freelancer_id: number;
    cover_letter: string;
    proposed_budget: number;
    status: 'pending' | 'accepted' | 'rejected';
    attachments: File[] | string[] | null;
};
