import { User } from '@/types/index';

type IFreelancer = {
    id: number;
    user_id: number;
    headline?: string;
    about?: string;
    profile_picture?: string | File | null;

    user: User;
    experiences: IExperience[];
    projects: IProject[];
    certificates: ICertificate[];
    skills: IFreelancerSkills[];
};

type IExperience = {
    id: number;
    freelancer_id: number;
    company_name: string;
    job_title: string;
    start_date: string;
    end_date?: string;
    description?: string;
};

type IProject = {
    id: number;
    freelancer_id: number;
    title: string;
    description?: string;
    project_url?: string;
    start_date?: string;
    end_date?: string;
    status: 'completed' | 'in progress';
};

type ICertificate = {
    id: number;
    freelancer_id: number;
    title: string;
    issuer?: string;
    issued_date: string;
    certificate_url?: string | File | null;
};

type ICategory = {
    id: number;
    category: string;
};

type ISkills = {
    id: number;
    category_id: number;
    skill: string;
};

type IFreelancerSkills = {
    id: number;
    freelancer_id: number;
    category_id: string;
    skill_id: number;
};
