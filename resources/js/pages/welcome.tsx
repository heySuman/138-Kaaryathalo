import { type SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLogo from "@/components/app-logo";
import AppLogoIcon from "@/components/app-logo-icon";

enum ROLE {
    CLIENT = 'client',
    FREELANCER = 'freelancer',
}

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const role = auth?.user?.role;
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a] dark:text-white">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={role === ROLE.CLIENT ? route('client.dashboard') : route('freelancer.dashboard')}
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
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <div className={'p-3 sm:mx-auto sm:w-3/4 sm:text-center flex flex-col items-center gap-3'}>
                    <AppLogoIcon className={'w-[100px] h-[100px] mb-5'}/>
                        <h1 className={'mx-auto text-3xl font-black sm:text-5xl'}>Connecting Talents with Opportunities</h1>
                        <p className={'mx-auto my-3 text-gray-600 sm:text-2xl lg:w-3/4'}>
                            Explore skilled talents and professionals, delivering high-quality solutions tailored to your needs. Elevate your
                            experience with top-tier collaboration and services.
                        </p>

                        <div className={'mx-auto flex flex-wrap gap-2'}>
                            <Button variant={'outline'} size={'lg'}>
                                Find talent
                            </Button>
                            <Button size={'lg'}>Find work</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
