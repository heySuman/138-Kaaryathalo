import { IClient } from '@/types/client';
import { ICategory } from '@/types/freelancer';
import { SharedData } from '@/types/index';

export type JobPosting = {
    id: number;
    title: string;
    description: string;
    expiry_date: Date | null;
    timeline: 'less than a month' | 'less than three months' | 'more than three months';
    budget: number;
    skills: string[];
    experience_level: 'fresher' | 'intermediate' | 'expert';
    status: 'pending' | 'in progress' | 'completed';
    visibility: 'public' | 'private';
    payment_type: 'fixed' | 'hourly';
    attachments?: string[] | null;
    client_id: number;
    category_id: number;
    category?: ICategory;
    client?: IClient;
};

export interface JobPostingFormErrors {
    title?: string;
    description?: string;
    expiry_date?: string;
    duration?: string;
    budget?: string;
    skills?: string;
    experience_level?: string;
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export type JobPageProps = {
    jobs: PaginatedResponse<JobPosting>;
};

export type JobIndexPageProps = SharedData<JobPageProps>;

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface JobCount {
    pending: number;
    'in progress': number;
    completed: number;
    total: number;
}
