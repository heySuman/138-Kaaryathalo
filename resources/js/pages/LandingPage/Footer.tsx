import AppLogoIcon from '@/components/app-logo-icon';
import { HeartIcon } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="dark:bg-gray-dark relative z-10 mx-auto w-full border-t bg-white pt-16 md:pt-20 lg:p-6">
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 flex items-center justify-center">
                        <div className="mb-12">
                            <div className="flex flex-wrap items-center gap-3">
                                <div>
                                    <AppLogoIcon className="fill-primary size-12" />
                                </div>
                                <div className="ml-1 flex-1 text-left">
                                    <h1
                                        className="text-6xl leading-tight font-bold tracking-tight text-black dark:text-white"
                                        style={{
                                            WebkitTextStroke: '1px #9ca3af',
                                            color: 'transparent',
                                            WebkitTextFillColor: 'white',
                                        }}
                                    >
                                        Kaaryathalo
                                    </h1>
                                </div>
                            </div>
                            <p className="text-body-color dark:text-body-color-dark my-5 text-xl leading-relaxed text-center">
                                Nepal's own freelancer marketplace
                            </p>
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>

                <div className="py-8">
                    <p className="text-body-color flex items-center justify-center gap-3 text-center text-base dark:text-white">
                        Made with <HeartIcon fill={'#ff0000'} /> by Suman Shrestha.
                    </p>
                </div>
            </div>
        </footer>
    );
}
