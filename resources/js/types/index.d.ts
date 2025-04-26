import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export type SharedData<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
};

export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    phone: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role: ROLE;
};

export enum ROLE {
    CLIENT = 'client',
    FREELANCER = 'freelancer',
    ADMIN = 'admin',
}

export type Message = {
    id: number;
    sender_id: number;
    receiver_id: number;
    message: string;
    created_at: string;
};
