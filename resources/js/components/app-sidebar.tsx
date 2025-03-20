import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { clientNavItems, freelancerNavItems } from '@/routes';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import AppLogo from './app-logo';

export enum ROLE {
    CLIENT = 'client',
    FREELANCER = 'freelancer',
}

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const mainNavItems = auth.user.role === 'freelancer' ? freelancerNavItems : clientNavItems;
    const role = auth.user.role;
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={role === ROLE.CLIENT ? route('client.dashboard') : route('freelancer.dashboard')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={null} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
