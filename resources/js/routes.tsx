import type {BreadcrumbItem, NavItem} from '@/types';
import {LayoutGrid, User} from "lucide-react";

export const clientBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export const freelancerBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export const freelancerNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },    {
        title: 'Profile',
        href: '/freelancer/profile',
        icon: User,
    },
];
export const clientNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];
