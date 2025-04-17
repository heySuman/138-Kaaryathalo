import { Button } from '@/components/ui/button';
import {Link} from "@inertiajs/react";

export default function Hero() {
    return (
        <>
            <section
                id="home"
                className="dark:bg-gray-dark relative z-10 overflow-hidden border-b pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]"
            >
                <div className="container">
                    <div className="flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="mx-auto max-w-[800px] text-center">
                                <h1 className="mb-5 text-3xl leading-tight font-bold text-black sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight dark:text-white">
                                    Connecting Talents with Opportunities
                                </h1>
                                <p className="text-body-color dark:text-body-color-dark mb-12 text-base leading-relaxed! sm:text-lg md:text-xl">
                                    Explore skilled talents and professionals, delivering high-quality solutions tailored to your needs. Elevate your
                                    experience with top-tier collaboration and services.
                                </p>
                                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                    <Link href={route('login')}>
                                        <Button>Search talents</Button>
                                    </Link>
                                    <Link href={route('login')}>
                                        <Button>Search jobs</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
