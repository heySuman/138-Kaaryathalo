import { NavItem } from '@/types';
import {
    AppWindowMac,
    BriefcaseBusiness,
    CircleDollarSign,
    CreditCard,
    Eye,
    LayoutGrid, LayoutList,
    MessageSquare,
    Search,
    SearchIcon,
    User
} from 'lucide-react';

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
        icon: LayoutList,
    },
    {
        title: 'Deliver Work',
        href: '/milestones',
        icon: AppWindowMac,
    },
    {
        title: 'Message',
        href: '/chat',
        icon: MessageSquare,
    },
    {
        title: 'Payments',
        href: '/freelancer/request-payment',
        icon: CircleDollarSign,
    },
    {
        title: 'Profile',
        href: '/freelancer/profile',
        icon: User,
    },
];
export const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Disputes',
        href: '/admin/disputes',
        icon: Eye,
    },
    {
        title: 'Users',
        href: '/admin/users',
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
        title: 'Search talents',
        href: '/client/talents',
        icon: SearchIcon,
    },
    {
        title: 'Message',
        href: '/chat',
        icon: MessageSquare,
    },
    {
        title: 'Payment',
        href: '/payment',
        icon: CreditCard,
    },
];
