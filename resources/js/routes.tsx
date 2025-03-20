import { NavItem } from '@/types';
import { BriefcaseBusiness, LayoutGrid, MessageSquare, User } from 'lucide-react';

export const freelancerNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/freelancer/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Profile',
        href: '/freelancer/profile',
        icon: User,
    },
];
export const clientNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/client/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'My jobs',
        href: '/client/my-jobs',
        icon: BriefcaseBusiness,
    },
    {
        title: 'Inbox',
        href: '/inbox',
        icon: MessageSquare,
    },
    {
        title: 'Profile',
        href: '/client/profile',
        icon: User,
    },
];
