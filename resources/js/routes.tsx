import { NavItem } from '@/types';
import { AppWindowMac, BriefcaseBusiness, LayoutGrid, MessageSquare, Search, User } from 'lucide-react';

export const freelancerNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/freelancer/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Search Job',
        href: '/freelancer/jobs/search',
        icon: Search,
    },
    {
        title: 'Job Applications',
        href: '/freelancer/job-applications',
        icon: AppWindowMac,
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
