import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';

export default function Hero() {
    return (
        <section className={'relative'}>
            <div
                className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
            ></div>
            <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-100">
                {/* Hero content */}
                <div className="py-12 md:py-20">
                    {/* Section header */}
                    <div className="pb-12 text-center md:pb-20">
                        <h1 className="bg-clip-text pb-5 text-4xl font-semibold md:text-5xl" data-aos="fade-up">
                            Connecting Talents with Opportunities
                        </h1>
                        <div className="mx-auto max-w-3xl">
                            <p className="mb-8 text-xl" data-aos="fade-up" data-aos-delay={200}>
                                Explore skilled talents and professionals, delivering high-quality solutions tailored to
                                your needs. Elevate your
                                experience with top-tier collaboration and services.
                            </p>
                            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                                <div
                                    className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                    <Link href={route('login')}>
                                        <Button variant={'default'}>
                                            Search talents <ArrowRightIcon />
                                        </Button>
                                    </Link>
                                    <Link href={route('login')}>
                                        <Button variant={'outline'}>
                                            Search jobs <ArrowRightIcon />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={'rounded-xl border bg-white p-4 shadow-lg dark:border-[#3E3E3A] dark:bg-black'}>
                        <img src="/dashboard.png" alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
}
