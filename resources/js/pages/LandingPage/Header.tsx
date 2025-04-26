'use client';
import AppLogoIcon from '@/components/app-logo-icon';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { Auth } from '@/types';
import { Link } from '@inertiajs/react';

enum ROLE {
    CLIENT = 'client',
    FREELANCER = 'freelancer',
    ADMIN = 'admin',
}

const Header = ({ role, auth }: { role: ROLE; auth: Auth }) => {
    return (
        <>
            <header
                className={`sticky top-0 left-0 z-40 mx-auto flex w-full items-center bg-white dark:bg-black p-4`}
            >
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <div className={'flex items-center gap-3'}>
                            <div className="">
                                <AppLogoIcon className="fill-primary size-8" />
                            </div>
                            <div className="ml-1 grid flex-1 text-left text-2xl">
                                <span className="mb-0.5 truncate leading-none font-semibold hidden sm:block">Kaaryathalo</span>
                            </div>
                        </div>
                        <nav className="flex items-center justify-end gap-4">
                            {auth.user ? (
                                <Link
                                    href={
                                        role === ROLE.CLIENT
                                            ? route('client.dashboard')
                                            : role === ROLE.ADMIN
                                                ? route('admin.dashboard')
                                                : route('freelancer.dashboard')
                                    }
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>

                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                    <AppearanceToggleDropdown />
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
