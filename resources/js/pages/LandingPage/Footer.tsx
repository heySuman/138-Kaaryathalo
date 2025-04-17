'use client';
import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { HeartIcon } from 'lucide-react';

export default function Footer() {
    return (
        <>
            <footer className="dark:bg-gray-dark relative z-10 mx-auto w-full border-t bg-white pt-16 md:pt-20 lg:pt-24">
                <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
                            <div className="mb-12">
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="">
                                        <AppLogoIcon className="fill-primary size-8" />
                                    </div>
                                    <div className="ml-1 grid flex-1 text-left text-xl">
                                        <span className="mb-0.5 truncate leading-none font-semibold">Kaaryathalo</span>
                                    </div>
                                </div>
                                <p className="text-body-color dark:text-body-color-dark mb-9 text-base leading-relaxed">
                                    Nepal's own freelancer marketplace
                                </p>
                            </div>
                        </div>

                        <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
                            <div className="mb-12 lg:mb-16">
                                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">Useful Links</h2>
                                <ul>
                                    <li>
                                        <Link
                                            href="/"
                                            className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary mb-4 inline-block text-base duration-300"
                                        >
                                            Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary mb-4 inline-block text-base duration-300"
                                        >
                                            Pricing
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary mb-4 inline-block text-base duration-300"
                                        >
                                            About
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
                            <div className="mb-12 lg:mb-16">
                                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">Terms</h2>
                                <ul>
                                    <li>
                                        <Link
                                            href="/"
                                            className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary mb-4 inline-block text-base duration-300"
                                        >
                                            TOS
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary mb-4 inline-block text-base duration-300"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary mb-4 inline-block text-base duration-300"
                                        >
                                            Refund Policy
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12">
                            <div className="mb-12 lg:mb-16">
                                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">Support & Help</h2>
                                <ul>
                                    <li>
                                        <Link
                                            href="/"
                                            className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary mb-4 inline-block text-base duration-300"
                                        >
                                            Open Support Ticket
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary mb-4 inline-block text-base duration-300"
                                        >
                                            Terms of Use
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary mb-4 inline-block text-base duration-300"
                                        >
                                            About
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="h-px w-full bg-linear-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
                    <div className="py-8">
                        <p className="text-body-color flex items-center justify-center gap-3 text-center text-base dark:text-white">
                            Made with <HeartIcon fill={'#ff0000'} /> by Suman Shrestha.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
