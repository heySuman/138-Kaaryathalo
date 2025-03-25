import {JobApplication} from "@/types/job-application";
import {JobPosting} from "@/types/job-postings";

export type Milestone = {
    title : string
    description : string
    job_application_id: number
    due_date: Date | string
    created_at: string
    updated_at: string
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled'

    job_application?: JobApplication
    job_posting?: JobPosting
}
