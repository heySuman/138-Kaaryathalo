import {User} from '@/types/index';

type IClient = {
    id: number;
    user_id: number;
    company_name: string
    industry?: string;
    about?: string;
    profile_picture?: string | File | null;

    user: User;
};
